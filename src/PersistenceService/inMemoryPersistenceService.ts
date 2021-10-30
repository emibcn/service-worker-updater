import PersistenceService from './persistenceService'

class InMemoryPersistenceService implements PersistenceService {
  private value = false

  setUpdateIsNeeded(): void {
    this.value = true
  }

  clear(): void {
    this.value = false
  }

  isUpdateNeeded(): boolean {
    return this.value
  }
}

export default InMemoryPersistenceService
