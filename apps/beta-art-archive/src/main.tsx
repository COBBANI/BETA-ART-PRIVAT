import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts (replaces the Google Fonts <link> that was in
// index.html): only the weights the app actually uses, measured by
// grepping the source — Fraunces 300 (font-light ×20) / 400 (font-normal
// ×12) / 400-italic (×2), Inter 400 (body) / 500 (button+label), JetBrains
// Mono 400 (font-record default) / 600 (masthead wordmark). Same-origin
// woff2 via @fontsource, no third-party request.
import '@fontsource/fraunces/300.css'
import '@fontsource/fraunces/400.css'
import '@fontsource/fraunces/400-italic.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
