import { useEffect, useState } from 'react'

export default function useSpeech(text) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [speaking, setSpeaking] = useState(false)
  useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); setSpeaking(false) }, [supported, text])
  const toggle = () => {
    if (!supported) return
    const s = window.speechSynthesis
    s.cancel()
    if (speaking) { setSpeaking(false); return }
    const u = new SpeechSynthesisUtterance(text.slice(0, 3000))
    u.onend = u.onerror = () => setSpeaking(false)
    s.speak(u)
    setSpeaking(true)
  }
  return { supported, speaking, toggle }
}
