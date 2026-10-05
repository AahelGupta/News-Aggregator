import { useEffect } from 'react'

const KEYS = [['/', 'Focus search'], ['1 – 9', 'Switch category'], ['j / k', 'Next / previous article'], ['Enter', 'Open focused article'],
  ['t', 'Change theme'], ['Esc', 'Close reader or dialog'], ['?', 'Show this list']]

export default function ShortcutsDialog({ onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" onClick={onClose} className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div onClick={(e) => e.stopPropagation()} className="animate-rise w-full max-w-sm rounded-2xl bg-card p-5">
        <h2 className="mb-3 font-serif text-xl font-bold">Keyboard shortcuts</h2>
        <dl className="space-y-2">
          {KEYS.map(([k, d]) => <div key={k} className="flex justify-between gap-4"><dt className="rounded bg-line px-2 font-bold">{k}</dt><dd className="text-muted">{d}</dd></div>)}
        </dl>
        <button onClick={onClose} className="mt-4 rounded-full bg-accent px-4 py-1.5 font-bold text-onaccent">Close</button>
      </div>
    </div>
  )
}
