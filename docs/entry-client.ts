import { createApp } from './main'

if (import.meta.env.DEV) {
  const { app } = createApp()
  app.mount('#app')
}
