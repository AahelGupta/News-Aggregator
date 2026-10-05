import { useEffect, useRef } from 'react'
import { useLibrary } from '../context/LibraryContext'
import { usePrefs } from '../context/PrefsContext'
import useSpeech from '../hooks/useSpeech'
import { readMinutes, timeAgo } from '../utils/text'

const SIZES = ['text-base', 'text-lg', 'text-xl', 'text-2xl']

export default function ArticleReader({ article: a, onClose }) {
  const { fontSize, setFontSize } = usePrefs()
  const { isBookmarked, toggleBookmark } = useLibrary()
  const text = a.body || a.summary || ''
  const speech = useSpeech(`${a.title}. ${text}`)
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = prev }
  }, [onClose])

  const btn = 'rounded-full border border-line px-3 py-1 text-sm hover:bg-line disabled:opacity-40'
  const saved = isBookmarked(a.id)
  return (
    <div role="dialog" aria-modal="true" aria-label={a.title} onClick={onClose} className="fixed inset-0 z-40 overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="animate-rise mx-auto max-w-2xl rounded-2xl bg-card p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button ref={closeRef} onClick={onClose} className={btn}>Close</button>
          <button onClick={() => setFontSize(Math.max(0, fontSize - 1))} disabled={fontSize === 0} className={btn} aria-label="Smaller text">A−</button>
          <button onClick={() => setFontSize(Math.min(3, fontSize + 1))} disabled={fontSize === 3} className={btn} aria-label="Larger text">A+</button>
          {speech.supported && <button onClick={speech.toggle} aria-pressed={speech.speaking} className={btn}>{speech.speaking ? 'Stop listening' : 'Listen'}</button>}
          <button onClick={() => toggleBookmark(a)} aria-pressed={saved} className={btn}>{saved ? 'Saved' : 'Save'}</button>
        </div>
        {a.image && <img src={a.image} alt="" className="mb-4 w-full rounded-xl" />}
        <p className="text-sm text-muted">{a.source}{a.author ? ` – ${a.author}` : ''}, {timeAgo(a.publishedAt)}, {readMinutes(text)} min read</p>
        <h1 className="my-2 font-serif text-3xl font-extrabold leading-tight">{a.title}</h1>
        <div className={`${SIZES[fontSize]} space-y-4 leading-relaxed`}>
          {text.split(/\n+/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {!a.body && <p className="mt-4 text-muted">Only a summary is available for this source.</p>}
        <a href={a.url} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-full bg-accent px-5 py-2 font-bold text-onaccent">Read the original</a>
      </div>
    </div>
  )
}
