import { useLibrary } from '../context/LibraryContext'
import { useReader } from '../context/ReaderContext'
import { usePrefs } from '../context/PrefsContext'
import { timeAgo } from '../utils/text'

export default function ArticleCard({ article: a }) {
  const { isBookmarked, toggleBookmark, isRead } = useLibrary()
  const { open } = useReader()
  const { view } = usePrefs()
  const list = view === 'list'
  const saved = isBookmarked(a.id)
  return (
    <article className={`flex overflow-hidden rounded-2xl border border-line bg-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${list ? 'flex-row' : 'flex-col'} ${isRead(a.id) ? 'opacity-70' : ''}`}>
      {a.image && <img src={a.image} alt="" loading="lazy" className={list ? 'hidden w-44 object-cover sm:block' : 'aspect-video w-full object-cover'} />}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="flex flex-wrap gap-x-3 text-sm text-muted"><span className="font-bold text-accent">{a.source}</span><span>{a.section}</span><span>{timeAgo(a.publishedAt)}</span></p>
        <h2 className="font-serif text-xl font-bold leading-snug">
          <button data-article onClick={() => open(a)} className="text-left hover:underline">{a.title}</button>
        </h2>
        {a.summary && <p className="line-clamp-3 text-muted">{a.summary}</p>}
        <button onClick={() => toggleBookmark(a)} aria-pressed={saved}
          className={`mt-auto self-start rounded-full px-3 py-1 text-sm ${saved ? 'bg-flare font-bold text-black' : 'border border-line hover:bg-line'}`}>{saved ? 'Saved' : 'Save'}</button>
      </div>
    </article>
  )
}
