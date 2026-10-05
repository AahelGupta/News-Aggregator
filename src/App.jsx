import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import OfflineBanner from './components/OfflineBanner'
import ShortcutsDialog from './components/ShortcutsDialog'
import Feed from './pages/Feed'
import Bookmarks from './pages/Bookmarks'
import History from './pages/History'
import Topics from './pages/Topics'
import useHotkeys from './hooks/useHotkeys'
import { usePrefs } from './context/PrefsContext'

export default function App() {
  const [help, setHelp] = useState(false)
  const { cycleTheme } = usePrefs()
  useHotkeys({ '?': () => setHelp((h) => !h), t: cycleTheme })
  return (
    <>
      <Navbar onHelp={() => setHelp(true)} />
      <OfflineBanner />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/saved" element={<Bookmarks />} />
          <Route path="/history" element={<History />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="*" element={<p className="text-muted">Page not found.</p>} />
        </Routes>
      </main>
      {help && <ShortcutsDialog onClose={() => setHelp(false)} />}
    </>
  )
}
