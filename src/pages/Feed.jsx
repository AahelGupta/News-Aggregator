import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import SearchBox from '../components/SearchBox'
import SourceFilter from '../components/SourceFilter'
import TrendingBar from '../components/TrendingBar'
import ArticleCard from '../components/ArticleCard'
import StatusMessage from '../components/StatusMessage'
import useInfiniteFeed from '../hooks/useInfiniteFeed'
import useHotkeys from '../hooks/useHotkeys'
import { usePrefs } from '../context/PrefsContext'
import { CATEGORIES } from '../constants'

const focusMove = (d) => {
  const els = [...document.querySelectorAll('[data-article]')]
  els[Math.max(0, Math.min(els.length - 1, els.indexOf(document.activeElement) + d))]?.focus()
}

export default function Feed() {
  const [params, setParams] = useSearchParams()
  const category = params.get('c') || 'top'
  const query = params.get('q') || ''
  const { topics, sources, view, setView } = usePrefs()
  const blocked = category === 'foryou' && topics.length === 0
  const feed = useInfiniteFeed({ category, topics: category === 'foryou' ? topics : [], query, sources }, !blocked)
  const sentinel = useRef(null)

  const set = (patch) => setParams((p) => {
    const n = new URLSearchParams(p)
    Object.entries(patch).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k)))
    return n
  }, { replace: true })

  useHotkeys({
    '/': () => document.getElementById('search')?.focus(), j: () => focusMove(1), k: () => focusMove(-1),
    ...Object.fromEntries(CATEGORIES.map((c, i) => [String(i + 1), () => set({ c: c.id === 'top' ? '' : c.id })])),
  })

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && feed.loadMore(), { rootMargin: '400px' })
    io.observe(el)
    return () => io.disconnect()
  }, [feed.loadMore])

  const loading = feed.status === 'loading'
  return (
    <div className="space-y-4">
      <CategoryTabs value={category} onChange={(c) => set({ c: c === 'top' ? '' : c })} />
      <SearchBox value={query} onSearch={(q) => set({ q })} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SourceFilter />
        <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')} className="rounded-full border border-line px-3 py-1 text-sm hover:bg-line">
          Layout: {view === 'grid' ? 'Grid' : 'List'}
        </button>
      </div>
      <TrendingBar articles={feed.items} onPick={(w) => set({ q: w })} />

      {blocked && <StatusMessage>Your For you feed is empty. <Link to="/topics" className="text-accent underline">Follow some topics</Link> to fill it.</StatusMessage>}
      {feed.stale && <StatusMessage>Showing saved results because the latest request failed.</StatusMessage>}
      {feed.status === 'error' && (
        <StatusMessage type="error">{feed.error} <button onClick={feed.reload} className="ml-2 font-bold underline">Try again</button></StatusMessage>
      )}
      {feed.status === 'done' && feed.items.length === 0 && <StatusMessage>No articles match “{query}”. Try a broader search or another category.</StatusMessage>}

      <div className={view === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
        {loading && Array.from({ length: 6 }, (_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-line" />)}
        {feed.items.map((a) => <ArticleCard key={a.id} article={a} />)}
      </div>
      <div ref={sentinel} />
      {feed.status === 'more' && <p className="text-center text-muted" role="status">Loading more…</p>}
      {feed.status === 'done' && !feed.hasMore && feed.items.length > 0 && <p className="text-center text-muted">You’re all caught up.</p>}
    </div>
  )
}
