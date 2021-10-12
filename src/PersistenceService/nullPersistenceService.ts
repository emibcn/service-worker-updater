import PersistenceService from './persistenceService'

class NullPersistenceService implements PersistenceService {
  setUpdateIsNeeded(): void {}

  clear(): void {}

  isUpdateNeeded(): boolean {
    return false
  }
}

export default NullPersistenceService
