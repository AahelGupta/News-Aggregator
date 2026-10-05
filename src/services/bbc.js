// BBC News category feeds (RSS), converted to JSON by the free rss2json service. No key needed.
import { stripHtml } from '../utils/text'

const FEEDS = {
  top: 'news', world: 'news/world', business: 'news/business', technology: 'news/technology', sport: 'sport',
  science: 'news/science_and_environment', politics: 'news/politics', culture: 'news/entertainment_and_arts',
}

const normalize = (i, cat) => ({
  id: `b:${i.guid || i.link}`, title: stripHtml(i.title), summary: stripHtml(i.description), image: i.thumbnail || i.enclosure?.link || null,
  url: i.link, source: 'BBC News', author: '', body: '',
  publishedAt: i.pubDate ? new Date(i.pubDate.replace(' ', 'T') + 'Z').toISOString() : new Date().toISOString(),
  section: cat === 'top' ? 'News' : cat[0].toUpperCase() + cat.slice(1),
})

async function loadFeed(cat, signal) {
  const url = `https://feeds.bbci.co.uk/${FEEDS[cat]}/rss.xml`
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, { signal })
  if (!res.ok) throw new Error(`feed failed (${res.status})`)
  const d = await res.json()
  if (d.status !== 'ok') throw new Error(d.message || 'feed unavailable')
  return d.items.map((i) => normalize(i, cat))
}

export async function fetchBBC({ category, topics = [], query, page = 1, signal }) {
  if (page > 1) return { items: [], hasMore: false }
  const cats = category === 'foryou' ? topics : [category]
  let items = (await Promise.all(cats.map((c) => loadFeed(c, signal)))).flat()
  if (query) {
    const q = query.toLowerCase()
    items = items.filter((i) => `${i.title} ${i.summary}`.toLowerCase().includes(q))
  }
  return { items: [...new Map(items.map((i) => [i.id, i])).values()], hasMore: false }
}
