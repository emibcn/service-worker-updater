import PersistenceService from './persistenceService'
import NullPersistenceService from './nullPersistenceService'
import InMemoryPersistenceService from './inMemoryPersistenceService'
import LocalStoragePersistenceService from './localStoragePersistenceService'

export {
  NullPersistenceService,
  InMemoryPersistenceService,
  LocalStoragePersistenceService
}
export default PersistenceService
