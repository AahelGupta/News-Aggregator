import { createContext, useCallback, useContext, useState } from 'react'
import { useLibrary } from './LibraryContext'
import ArticleReader from '../components/ArticleReader'

const Ctx = createContext(null)
export const useReader = () => useContext(Ctx)

export function ReaderProvider({ children }) {
  const [article, setArticle] = useState(null)
  const { markRead } = useLibrary()
  const open = useCallback((a) => { markRead(a); setArticle(a) }, [markRead])
  const close = useCallback(() => setArticle(null), [])
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {article && <ArticleReader article={article} onClose={close} />}
    </Ctx.Provider>
  )
}
