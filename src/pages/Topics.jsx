import { FOLLOWABLE } from '../constants'
import { usePrefs } from '../context/PrefsContext'
import SourceFilter from '../components/SourceFilter'

export default function Topics() {
  const { topics, toggleTopic, fontSize, setFontSize, view, setView } = usePrefs()
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-extrabold">Your topics</h1>
      <section>
        <h2 className="mb-2 font-bold">Follow topics to build your For you feed</h2>
        <div className="flex flex-wrap gap-2">
          {FOLLOWABLE.map((t) => (
            <button key={t.id} onClick={() => toggleTopic(t.id)} aria-pressed={topics.includes(t.id)}
              className={`rounded-full px-4 py-2 font-medium ${topics.includes(t.id) ? 'bg-accent text-onaccent' : 'border border-line bg-card hover:bg-line'}`}>
              {topics.includes(t.id) ? 'Following ' : 'Follow '}{t.label}
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="font-bold">Sources</h2>
        <SourceFilter />
      </section>
      <section className="space-y-2">
        <h2 className="font-bold">Reading preferences</h2>
        <label className="flex items-center gap-3">Reader text size
          <input type="range" min="0" max="3" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="accent-accent" />
        </label>
        <label className="flex items-center gap-3">Default layout
          <select value={view} onChange={(e) => setView(e.target.value)} className="rounded-full border border-line bg-card px-3 py-1.5">
            <option value="grid">Grid</option><option value="list">List</option>
          </select>
        </label>
      </section>
    </div>
  )
}
