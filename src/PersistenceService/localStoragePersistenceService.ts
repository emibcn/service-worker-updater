import PersistenceService from './persistenceService'

class LocalStoragePersistenceService implements PersistenceService {
  private id: number

  constructor() {
    this.id = Math.random()
  }

  setUpdateIsNeeded(): void {
    window.localStorage.setItem(this.key(), JSON.stringify(true))
  }

  clear(): void {
    window.localStorage.setItem(this.key(), JSON.stringify(false))
  }

  isUpdateNeeded(): boolean {
    return JSON.parse(window.localStorage.getItem(this.key()) ?? 'false')
  }

  private key() {
    return `LocalStoragePersistenceService-${this.id}`
  }
}

export default LocalStoragePersistenceService
