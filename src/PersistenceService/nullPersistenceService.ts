import PersistenceService from './persistenceService'

class NullPersistenceService implements PersistenceService {
  setUpdateIsNeeded(): void {
    // Do nothing
  }

  clear(): void {
    // Do nothing
  }

  isUpdateNeeded(): boolean {
    return false
  }
}

export default NullPersistenceService
