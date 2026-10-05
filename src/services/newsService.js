import { fetchGuardian } from './guardian'
import { fetchBBC } from './bbc'
import { fetchHN } from './hackernews'

const guardianSection = (category, topics) => {
  if (category === 'foryou') return topics.join('|')
  return category === 'top' ? undefined : category
}

// Queries every selected source in parallel and merges the results by date.
// One failing source never hides the others; an error is shown only if every source fails.
export async function fetchFeed({ category, topics = [], query, page, sources, signal }) {
  const tasks = []
  if (sources.includes('guardian')) tasks.push(['The Guardian', fetchGuardian({ section: guardianSection(category, topics), query, page, signal })])
  if (sources.includes('bbc')) tasks.push(['BBC News', fetchBBC({ category, topics, query, page, signal })])
  const techView = ['top', 'technology'].includes(category) || (category === 'foryou' && topics.includes('technology'))
  if (sources.includes('hn') && (query || techView)) tasks.push(['Hacker News', fetchHN({ query, page, signal })])
  if (!tasks.length) throw new Error('None of the selected sources cover this view. Turn on another source.')

  const results = await Promise.allSettled(tasks.map((t) => t[1]))
  const ok = results.filter((r) => r.status === 'fulfilled').map((r) => r.value)
  if (!ok.length) {
    if (signal?.aborted) throw results[0].reason
    throw new Error(results.map((r, i) => {
      const m = r.reason?.message
      return `${tasks[i][0]}: ${m === 'Failed to fetch' ? 'could not be reached (network or blocked)' : m || 'failed'}`
    }).join(' | '))
  }
  const items = ok.flatMap((r) => r.items).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  return { items, hasMore: ok.some((r) => r.hasMore) }
}
