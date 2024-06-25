import { createSSRApp } from 'vue'

import App from './App'

import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
