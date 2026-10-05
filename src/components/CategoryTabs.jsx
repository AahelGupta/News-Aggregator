import { CATEGORIES } from '../constants'

export default function CategoryTabs({ value, onChange }) {
  return (
    <div role="tablist" aria-label="Categories" className="flex gap-2 overflow-x-auto pb-1">
      {CATEGORIES.map((c, i) => (
        <button key={c.id} role="tab" aria-selected={value === c.id} onClick={() => onChange(c.id)} title={`Shortcut: ${i + 1}`}
          className={`shrink-0 rounded-full px-4 py-1.5 font-medium ${value === c.id ? 'bg-accent text-onaccent' : 'border border-line bg-card hover:bg-line'}`}>{c.label}</button>
      ))}
    </div>
  )
}
