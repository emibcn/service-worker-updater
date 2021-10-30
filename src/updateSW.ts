// Reference: https://developers.google.com/web/tools/workbox/guides/advanced-recipes

import PersistenceService from './PersistenceService'

/*
 * Callback to call when user accepts loading the new service worker
 * - Send message to SW to trigger the update
 * - Once the SW has been updated, reload this window to load new assets
 */
const updateSW = (
  registration: ServiceWorkerRegistration,
  message: unknown,
  log: () => void,
  persistenceService: PersistenceService
): void => {
  // `waiting` is the newly detected SW
  if (registration.waiting) {
    /*
     * When the user asks to refresh the UI, we'll need to reload the window
     * Register an event to controllerchange, wich will be fired when the
     * `waiting` SW executes `skipWaiting`
     */
    let preventDevToolsReloadLoop = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      /*
       * Ensure refresh is only called once.
       * This works around a bug in "force update on reload".
       */
      if (preventDevToolsReloadLoop) {
        return
      }

      preventDevToolsReloadLoop = true
      log()

      // Clear the persisted state about service worker update being available
      persistenceService.clear()

      // Finally, refresh the page
      global.location.reload()
    })

    /*
     * Send a message to the new serviceWorker to activate itself
     * by executing its own `skipWaiting` method
     * The SW must register an event listener to messages which
     * identifies this `message` and runs its `skipWaiting` method
     */
    registration.waiting.postMessage(message)
  }
}

export default updateSW
