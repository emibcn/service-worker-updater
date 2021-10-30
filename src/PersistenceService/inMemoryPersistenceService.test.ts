import { InMemoryPersistenceService } from '.'

describe('InMemoryPersistenceService', () => {
  describe('initialisation', () => {
    it('has a false state', () => {
      const inMemoryPersistenceService = new InMemoryPersistenceService()
      expect(inMemoryPersistenceService.isUpdateNeeded()).toBe(false)
    })
  })

  describe('setUpdateIsNeeded()', () => {
    it('updates the state to true', () => {
      const inMemoryPersistenceService = new InMemoryPersistenceService()
      expect(inMemoryPersistenceService.isUpdateNeeded()).toBe(false)
      inMemoryPersistenceService.setUpdateIsNeeded()
      expect(inMemoryPersistenceService.isUpdateNeeded()).toBe(true)
    })
  })

  describe('clear()', () => {
    it('updates the state to false', () => {
      const inMemoryPersistenceService = new InMemoryPersistenceService()
      inMemoryPersistenceService.setUpdateIsNeeded()
      expect(inMemoryPersistenceService.isUpdateNeeded()).toBe(true)
      inMemoryPersistenceService.clear()
      expect(inMemoryPersistenceService.isUpdateNeeded()).toBe(false)
    })
  })
})
