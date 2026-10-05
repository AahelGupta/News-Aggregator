import { useLibrary } from '../context/LibraryContext'
import ArticleCard from '../components/ArticleCard'
import StatusMessage from '../components/StatusMessage'

export default function History() {
  const { history, clearHistory } = useLibrary()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-extrabold">Reading history</h1>
        {history.length > 0 && <button onClick={clearHistory} className="rounded-full border border-line px-4 py-1.5 hover:bg-line">Clear history</button>}
      </div>
      {history.length === 0 && <StatusMessage>You haven’t opened any articles yet. The last 50 you read will appear here.</StatusMessage>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{history.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
    </div>
  )
}
