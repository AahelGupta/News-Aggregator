import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { PrefsProvider } from './context/PrefsContext.jsx'
import { LibraryProvider } from './context/LibraryContext.jsx'
import { ReaderProvider } from './context/ReaderContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PrefsProvider>
        <LibraryProvider>
          <ReaderProvider>
            <App />
          </ReaderProvider>
        </LibraryProvider>
      </PrefsProvider>
    </HashRouter>
  </React.StrictMode>
)
