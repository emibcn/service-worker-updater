import withServiceWorkerUpdater, {
  ServiceWorkerUpdaterProps,
  WithServiceWorkerUpdaterOptions
} from './withServiceWorkerUpdater'
import onServiceWorkerUpdate from './onServiceWorkerUpdate'
import PersistenceService, {
  LocalStoragePersistenceService
} from './PersistenceService'

export {
  withServiceWorkerUpdater,
  onServiceWorkerUpdate,
  LocalStoragePersistenceService
}
export type {
  ServiceWorkerUpdaterProps,
  WithServiceWorkerUpdaterOptions,
  PersistenceService
}
