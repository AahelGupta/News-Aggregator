import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import useLocalStorage from '../hooks/useLocalStorage'

export default function SearchBox({ value, onSearch }) {
  const [text, setText] = useState(value)
  const [recent, setRecent] = useLocalStorage('nw:searches', [])
  const debounced = useDebounce(text, 450)

  useEffect(() => { if (debounced.trim() !== value) onSearch(debounced.trim()) }, [debounced])
  useEffect(() => { setText(value) }, [value])

  const commit = () => { const q = text.trim(); if (q) setRecent((r) => [q, ...r.filter((x) => x !== q)].slice(0, 8)) }
  return (
    <form onSubmit={(e) => { e.preventDefault(); commit(); onSearch(text.trim()) }} className="flex gap-2">
      <label htmlFor="search" className="sr-only">Search news</label>
      <input id="search" list="recent-searches" value={text} onChange={(e) => setText(e.target.value)} onBlur={commit}
        placeholder="Search any topic  (press / to focus)" className="min-w-0 flex-1 rounded-full border border-line bg-card px-4 py-2 outline-none focus:border-accent" />
      <datalist id="recent-searches">{recent.map((r) => <option key={r} value={r} />)}</datalist>
      {text && <button type="button" onClick={() => setText('')} className="rounded-full border border-line px-4 hover:bg-line">Clear</button>}
    </form>
  )
}
