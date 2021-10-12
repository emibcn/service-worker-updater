import React, { useState, forwardRef, useEffect } from 'react'
import PersistenceService, {
  NullPersistenceService
} from './PersistenceService/'
import updateSW from './updateSW'

export interface ServiceWorkerUpdaterProps {
  newServiceWorkerDetected: boolean
  onLoadNewServiceWorkerAccept: () => void
}

export interface WithServiceWorkerUpdaterOptions {
  message?: unknown
  log?: () => void
  persistenceService?: PersistenceService
}

/*
 * HOC to generate a Wrapper component which
 * will add to the WrappedComponent the next props:
 * - newServiceWorkerDetected: boolean - True when a new service
 *   worker has been detected
 * - onLoadNewServiceWorkerAccept: function - callback to execute
 *   when the user accepts to load the new service worker (and,
 *   maybe, after saving all data): page will be reloaded
 *
 * HOC Parameters:
 * - WrappedComponent: The React component to wrap
 * - message: default: `{type: 'SKIP_WAITING'}` (standard for CRA and others):
 *   the message to send to the SW to fire the `skipWaiting` service worker method
 */
function withServiceWorkerUpdater<P>(
  WrappedComponent: React.ComponentType<P & ServiceWorkerUpdaterProps>,
  {
    message = { type: 'SKIP_WAITING' },
    log = () => console.log('Controller loaded'),
    persistenceService = new NullPersistenceService()
  }: WithServiceWorkerUpdaterOptions = {}
) {
  function SWUpdater({
    forwardedRef,
    ...props
  }: {
    forwardedRef: React.ForwardedRef<
      React.ComponentType<P & ServiceWorkerUpdaterProps>
    >
  }) {
    /*
     * States managed by this component:
     * - registration: received from event listener registered in index on SW registration
     * - newServiceWorkerDetected: wether a new SW has been detected
     */
    const [registration, setRegistration] =
      useState<ServiceWorkerRegistration | null>(null)
    const [newServiceWorkerDetected, setNewServiceWorkerDetected] =
      useState(false)

    // Callback to execute when user accepts the update
    const handleLoadNewServiceWorkerAccept = () => {
      if (!registration) throw new Error('ServiceWorkerRegistration not found')

      updateSW(registration, message, log, persistenceService)
    }

    // Add/remove event listeners for event thrown from `index.js`
    useEffect(() => {
      const handleNewServiceWorker = ((
        event: CustomEvent<{
          registration: ServiceWorkerRegistration
        }>
      ) => {
        setRegistration(event.detail.registration)
        setNewServiceWorkerDetected(true)
        persistenceService.setUpdateIsNeeded()
      }) as EventListener

      document.addEventListener('onNewServiceWorker', handleNewServiceWorker)
      return () =>
        document.removeEventListener(
          'onNewServiceWorker',
          handleNewServiceWorker
        )
    }, [setRegistration, setNewServiceWorkerDetected])

    useEffect(() => {
      setNewServiceWorkerDetected(persistenceService.isUpdateNeeded())
    }, [setNewServiceWorkerDetected])

    /*
     * Render the WrappedComponent with:
     * - All passed props
     * - This HOC's added props
     * - Respecting refs
     */
    return (
      <WrappedComponent
        {...(props as P)}
        ref={forwardedRef}
        newServiceWorkerDetected={newServiceWorkerDetected}
        onLoadNewServiceWorkerAccept={handleLoadNewServiceWorkerAccept}
      />
    )
  }

  // Return wrapper respecting ref
  function SWUpdaterForwardingRef(
    props: P,
    ref: React.ForwardedRef<React.ComponentType<P & ServiceWorkerUpdaterProps>>
  ) {
    return <SWUpdater {...props} forwardedRef={ref} />
  }
  return forwardRef<React.ComponentType<P & ServiceWorkerUpdaterProps>, P>(
    SWUpdaterForwardingRef
  )
}

export default withServiceWorkerUpdater
