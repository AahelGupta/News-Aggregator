import { SOURCES } from '../constants'
import { usePrefs } from '../context/PrefsContext'

export default function SourceFilter() {
  const { sources, toggleSource } = usePrefs()
  return (
    <fieldset className="flex flex-wrap items-center gap-3 text-sm">
      <legend className="sr-only">News sources</legend>
      <span className="font-bold">Sources</span>
      {SOURCES.map((s) => (
        <label key={s.id} className="flex items-center gap-1.5">
          <input type="checkbox" checked={sources.includes(s.id)} onChange={() => toggleSource(s.id)} className="accent-accent" />{s.label}
        </label>
      ))}
    </fieldset>
  )
}
