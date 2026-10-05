import { useMemo } from 'react'
import { topKeywords } from '../utils/text'

export default function TrendingBar({ articles, onPick }) {
  const words = useMemo(() => topKeywords(articles.map((a) => a.title)), [articles])
  if (!words.length) return null
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="font-bold">Trending in this feed</span>
      {words.map((w) => <button key={w} onClick={() => onPick(w)} className="rounded-full border border-line bg-card px-3 py-1 hover:bg-line">{w}</button>)}
    </div>
  )
}
