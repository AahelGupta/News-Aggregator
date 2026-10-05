import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchFeed } from '../services/newsService'
import { cacheGet, cacheSet } from '../utils/cache'

const init = { items: [], status: 'idle', error: '', page: 1, hasMore: false, stale: false }
const dedupe = (list) => [...new Map(list.map((a) => [a.id, a])).values()]

// Paged feed with caching, request cancellation and a stale-cache fallback when a request fails.
export default function useInfiniteFeed(params, enabled = true) {
  const key = JSON.stringify(params)
  const [s, setS] = useState(init)
  const ctrl = useRef(null)

  const load = useCallback(async (page) => {
    ctrl.current?.abort()
    const c = new AbortController()
    ctrl.current = c
    const ck = `${key}:${page}`
    const merge = (p, r, extra) => ({ ...p, items: page === 1 ? r.items : dedupe([...p.items, ...r.items]), hasMore: r.hasMore, page, status: 'done', error: '', ...extra })
    const cached = cacheGet(ck)
    if (cached) { setS((p) => merge(p, cached, { stale: false })); return }
    setS((p) => ({ ...p, status: page === 1 ? 'loading' : 'more', error: '' }))
    try {
      const r = await fetchFeed({ ...JSON.parse(key), page, signal: c.signal })
      cacheSet(ck, r)
      setS((p) => merge(p, r, { stale: false }))
    } catch (e) {
      if (c.signal.aborted) return
      const old = cacheGet(ck, true)
      setS((p) => (old ? merge(p, { ...old, hasMore: false }, { stale: true }) : { ...p, status: 'error', error: e.message }))
    }
  }, [key])

  useEffect(() => {
    setS(init)
    if (enabled) load(1)
    return () => ctrl.current?.abort()
  }, [key, enabled, load])

  const loadMore = useCallback(() => { if (s.hasMore && s.status === 'done') load(s.page + 1) }, [s.hasMore, s.status, s.page, load])
  const reload = useCallback(() => { setS(init); load(1) }, [load])
  return { ...s, loadMore, reload }
}
