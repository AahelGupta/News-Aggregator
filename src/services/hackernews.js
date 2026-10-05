// Hacker News via the Algolia API (free, no key).
const normalize = (h) => ({
  id: `h:${h.objectID}`, title: h.title, summary: `${h.points ?? 0} points and ${h.num_comments ?? 0} comments on Hacker News`,
  image: null, url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`, source: 'Hacker News',
  author: h.author, publishedAt: h.created_at, section: 'Technology', body: '',
})

export async function fetchHN({ query, page = 1, signal }) {
  const p = new URLSearchParams({ tags: query ? 'story' : 'front_page', hitsPerPage: '12', page: String(page - 1) })
  if (query) p.set('query', query)
  const res = await fetch(`https://hn.algolia.com/api/v1/search?${p}`, { signal })
  if (!res.ok) throw new Error(`Hacker News request failed (${res.status})`)
  const d = await res.json()
  return { items: d.hits.filter((h) => h.title).map(normalize), hasMore: page < d.nbPages }
}
