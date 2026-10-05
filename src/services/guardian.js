// The Guardian Open Platform. "test" is a shared demo key; add your own in .env as VITE_GUARDIAN_KEY.
import { stripHtml } from '../utils/text'

const KEY = import.meta.env.VITE_GUARDIAN_KEY || 'test'

const normalize = (r) => ({
  id: `g:${r.id}`, title: r.webTitle, summary: stripHtml(r.fields?.trailText), image: r.fields?.thumbnail || null,
  url: r.webUrl, source: 'The Guardian', author: r.fields?.byline || '', publishedAt: r.webPublicationDate,
  section: r.sectionName, body: r.fields?.bodyText || '',
})

export async function fetchGuardian({ section, query, page = 1, signal }) {
  let res
  // If the full set of fields is refused, retry with a smaller set.
  for (const fields of ['thumbnail,trailText,byline,bodyText', 'thumbnail,trailText']) {
    const p = new URLSearchParams({ 'api-key': KEY, 'page-size': '12', page: String(page), 'order-by': query ? 'relevance' : 'newest', 'show-fields': fields })
    if (section) p.set('section', section)
    if (query) p.set('q', query)
    res = await fetch(`https://content.guardianapis.com/search?${p}`, { signal })
    if (res.ok || res.status === 429 || res.status === 401) break
  }
  if (res.status === 429) throw new Error('rate limit reached. Wait a minute or add your own key')
  if (res.status === 401 || res.status === 403) throw new Error('API key rejected. Add your own key in .env (VITE_GUARDIAN_KEY)')
  if (!res.ok) throw new Error(`request failed (${res.status})`)
  const { response } = await res.json()
  return { items: response.results.map(normalize), hasMore: response.currentPage < response.pages }
}
