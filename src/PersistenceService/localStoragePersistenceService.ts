import PersistenceService from './persistenceService'

class LocalStoragePersistenceService implements PersistenceService {
  private appId: string

  constructor(appId: string) {
    this.appId = appId
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
    return `LocalStoragePersistenceService-${this.appId}`
  }
}

export default LocalStoragePersistenceService
