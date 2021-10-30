export default interface PersistenceService {
  isUpdateNeeded: () => boolean
  setUpdateIsNeeded: () => void
  clear: () => void
}
