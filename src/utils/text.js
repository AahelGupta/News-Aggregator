export const stripHtml = (h = '') =>
  h.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x?27;|&#39;/g, "'").trim()

export const readMinutes = (text) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220))

export function timeAgo(iso) {
  const m = Math.floor((Date.now() - new Date(iso)) / 60000)
  if (m < 1) return 'now'
  if (m < 60) return `${m}m ago`
  if (m < 1440) return `${Math.floor(m / 60)}h ago`
  return `${Math.floor(m / 1440)}d ago`
}

const STOP = new Set('about after again also amid been before being could from have into just more most over says said than that their them then there these they this what when where which while will with would your were your news live latest how why who'.split(' '))

// Most frequent meaningful words across headlines.
export function topKeywords(titles, n = 8) {
  const counts = {}
  titles.join(' ').toLowerCase().match(/[a-z][a-z'-]{3,}/g)?.forEach((w) => { if (!STOP.has(w)) counts[w] = (counts[w] || 0) + 1 })
  return Object.entries(counts).filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]).slice(0, n).map(([w]) => w)
}
