// When new ServiceWorker is available, trigger an event on `document`,
// passing `registration` as extra data
const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration): void  => {
  const event = new CustomEvent('onNewServiceWorker', {
    detail: { registration }
  })
  document.dispatchEvent(event)
}

export default onServiceWorkerUpdate
