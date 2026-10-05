// Session cache with a 5 minute freshness window; stale entries are used as an offline fallback.
const TTL = 5 * 60 * 1000

export function cacheGet(key, allowStale = false) {
  try {
    const v = JSON.parse(sessionStorage.getItem('news:' + key))
    return v && (allowStale || Date.now() - v.t < TTL) ? v.d : null
  } catch { return null }
}
export function cacheSet(key, data) {
  try { sessionStorage.setItem('news:' + key, JSON.stringify({ t: Date.now(), d: data })) } catch {}
}
