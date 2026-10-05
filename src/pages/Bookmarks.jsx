import { useLibrary } from '../context/LibraryContext'
import ArticleCard from '../components/ArticleCard'
import StatusMessage from '../components/StatusMessage'

export default function Bookmarks() {
  const { bookmarks, clearBookmarks } = useLibrary()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-extrabold">Saved articles</h1>
        {bookmarks.length > 0 && <button onClick={() => window.confirm('Remove all saved articles?') && clearBookmarks()} className="rounded-full border border-line px-4 py-1.5 hover:bg-line">Clear all</button>}
      </div>
      {bookmarks.length === 0 && <StatusMessage>Nothing saved yet. Select Save on any article to read it later.</StatusMessage>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{bookmarks.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
    </div>
  )
}
