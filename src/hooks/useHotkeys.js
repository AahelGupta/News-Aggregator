import { useEffect, useRef } from 'react'

// map: { key: handler }. Ignored while typing in form fields or holding a modifier key.
export default function useHotkeys(map) {
  const ref = useRef(map)
  ref.current = map
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return
      const fn = ref.current[e.key]
      if (fn) { e.preventDefault(); fn(e) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
