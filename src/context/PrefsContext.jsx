import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const Ctx = createContext(null)
export const usePrefs = () => useContext(Ctx)
const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

export function PrefsProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('nw:theme', 'system')
  const [topics, setTopics] = useLocalStorage('nw:topics', [])
  const [sources, setSources] = useLocalStorage('nw:sources2', ['guardian', 'bbc', 'hn'])
  const [fontSize, setFontSize] = useLocalStorage('nw:font', 1)
  const [view, setView] = useLocalStorage('nw:view', 'grid')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && mq.matches))
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  return (
    <Ctx.Provider value={{
      theme, cycleTheme: () => setTheme((t) => ({ system: 'light', light: 'dark', dark: 'system' })[t]),
      topics, toggleTopic: (id) => setTopics((t) => toggle(t, id)),
      sources, toggleSource: (id) => setSources((s) => toggle(s, id)),
      fontSize, setFontSize, view, setView,
    }}>
      {children}
    </Ctx.Provider>
  )
}
