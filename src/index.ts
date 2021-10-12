import withServiceWorkerUpdater, {
  ServiceWorkerUpdaterProps,
  WithServiceWorkerUpdaterOptions
} from './withServiceWorkerUpdater'
import onServiceWorkerUpdate from './onServiceWorkerUpdate'
import PersistenceService, {
  LocalStoragePersistenceService
} from './PersistenceService'

export { withServiceWorkerUpdater, onServiceWorkerUpdate }
export type {
  ServiceWorkerUpdaterProps,
  WithServiceWorkerUpdaterOptions,
  PersistenceService,
  LocalStoragePersistenceService
}
