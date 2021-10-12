import { LocalStoragePersistenceService } from '.'

const fakeLocalStorage = (function () {
  let store: { [key: string]: string } = {}

  return {
    getItem: (key: string): string | null => {
      return store[key] || null
    },
    setItem: (key: string, value: string): void => {
      store[key] = value
    },
    removeItem: (key: string): void => {
      delete store[key]
    },
    clear: (): void => {
      store = {}
    }
  }
})()

describe('LocalStoragePersistenceService', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage
    })
  })

  describe('initialisation', () => {
    it('has a false state', () => {
      const localStoragePersistenceService =
        new LocalStoragePersistenceService()
      expect(localStoragePersistenceService.isUpdateNeeded()).toBe(false)
    })
  })

  describe('setUpdateIsNeeded()', () => {
    it('updates the state to true', () => {
      const localStoragePersistenceService =
        new LocalStoragePersistenceService()
      expect(localStoragePersistenceService.isUpdateNeeded()).toBe(false)
      localStoragePersistenceService.setUpdateIsNeeded()
      expect(localStoragePersistenceService.isUpdateNeeded()).toBe(true)
    })
  })

  describe('clear()', () => {
    it('updates the state to false', () => {
      const localStoragePersistenceService =
        new LocalStoragePersistenceService()
      localStoragePersistenceService.setUpdateIsNeeded()
      expect(localStoragePersistenceService.isUpdateNeeded()).toBe(true)
      localStoragePersistenceService.clear()
      expect(localStoragePersistenceService.isUpdateNeeded()).toBe(false)
    })
  })
})
