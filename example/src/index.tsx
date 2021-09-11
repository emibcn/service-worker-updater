import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { onServiceWorkerUpdate } from '@3m1/service-worker-updater'

// Render the App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: onServiceWorkerUpdate
})
