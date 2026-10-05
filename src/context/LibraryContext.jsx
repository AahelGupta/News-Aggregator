import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const Ctx = createContext(null)
export const useLibrary = () => useContext(Ctx)
const slim = (a) => ({ ...a, body: (a.body || '').slice(0, 6000) })

export function LibraryProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage('nw:bookmarks', [])
  const [history, setHistory] = useLocalStorage('nw:history', [])
  const readIds = useMemo(() => new Set(history.map((h) => h.id)), [history])

  const toggleBookmark = (a) => setBookmarks((b) => (b.some((x) => x.id === a.id) ? b.filter((x) => x.id !== a.id) : [slim(a), ...b]))
  const markRead = useCallback((a) => setHistory((h) => [{ ...slim(a), readAt: new Date().toISOString() }, ...h.filter((x) => x.id !== a.id)].slice(0, 50)), [setHistory])

  return (
    <Ctx.Provider value={{
      bookmarks, history, toggleBookmark, markRead,
      isBookmarked: (id) => bookmarks.some((b) => b.id === id), isRead: (id) => readIds.has(id),
      clearHistory: () => setHistory([]), clearBookmarks: () => setBookmarks([]),
    }}>
      {children}
    </Ctx.Provider>
  )
}
