import { NavLink, Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { usePrefs } from '../context/PrefsContext'

export default function Navbar({ onHelp }) {
  const { bookmarks } = useLibrary()
  const { theme, cycleTheme } = usePrefs()
  const cls = ({ isActive }) => `rounded-full px-3 py-1.5 font-medium ${isActive ? 'bg-accent text-onaccent' : 'hover:bg-line'}`
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3">
        <Link to="/" className="mr-auto font-serif text-2xl font-extrabold text-accent">Briefly</Link>
        <NavLink to="/" end className={cls}>Feed</NavLink>
        <NavLink to="/saved" className={cls}>Saved ({bookmarks.length})</NavLink>
        <NavLink to="/history" className={cls}>History</NavLink>
        <NavLink to="/topics" className={cls}>Topics</NavLink>
        <button onClick={cycleTheme} className="rounded-full border border-line px-3 py-1.5 hover:bg-line" aria-label={`Theme: ${theme}. Select to change`}>Theme: {theme}</button>
        <button onClick={onHelp} className="rounded-full border border-line px-3 py-1.5 hover:bg-line" aria-label="Keyboard shortcuts">?</button>
      </nav>
    </header>
  )
}
