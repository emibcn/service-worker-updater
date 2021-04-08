import React from 'react'
import { withServiceWorkerUpdater } from '@3m1/service-worker-updater'

const App = (props) => {
  const {newServiceWorkerDetected, onLoadNewServiceWorkerAccept} = props;
  return newServiceWorkerDetected ? (
    <>
      New version detected.
      <button onClick={ onLoadNewServiceWorkerAccept }>Update!</button>
    </>
  ) : null; // If no update is available, render nothing
}

export default withServiceWorkerUpdater(App)
