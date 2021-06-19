import React, { useState, forwardRef, useEffect } from 'react';
import updateSW from './updateSW';

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
const withServiceWorkerUpdater = (
  WrappedComponent,
  {
    message={type: 'SKIP_WAITING'},
    log=() => console.log('Controller loaded'),
  }={}) => {

  const SWUpdater = ({forwardedRef, ...props}) => {

    /*
     * States managed by this component:
     * - registration: received from event listener registered in index on SW registration
     * - newServiceWorkerDetected: wether a new SW has been detected
     */
    const [registration, setRegistration] = useState(false);
    const [newServiceWorkerDetected, setNewServiceWorkerDetected] = useState(false);

    // Callback to execute when user accepts the update
    const handleLoadNewServiceWorkerAccept = () => {
      updateSW(registration, message, log);
    }

    // Add/remove event listeners for event thrown from `index.js`
    useEffect(() => {
      const handleNewServiceWorker = (event) => {
        setRegistration(event.detail.registration);
        setNewServiceWorkerDetected(true);
      }

      document.addEventListener('onNewServiceWorker', handleNewServiceWorker);
      return () => document.removeEventListener('onNewServiceWorker', handleNewServiceWorker);
    }, [setRegistration, setNewServiceWorkerDetected]);

    /*
     * Render the WrappedComponent with:
     * - All passed props
     * - This HOC's added props
     * - Respecting refs
     */
    return <WrappedComponent
      {...props}
      ref={ forwardedRef }
      newServiceWorkerDetected={ newServiceWorkerDetected }
      onLoadNewServiceWorkerAccept={ handleLoadNewServiceWorkerAccept }
    />;
  }

  // Return wrapper respecting ref
  return forwardRef(
    (props, ref) => <SWUpdater { ...props } forwardedRef={ ref } />
  );
}

export default withServiceWorkerUpdater;
