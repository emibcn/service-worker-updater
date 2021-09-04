import { withServiceWorkerUpdater, onServiceWorkerUpdate } from '.'

describe('withServiceWorkerUpdater', () => {
  it('is truthy', () => {
    expect(withServiceWorkerUpdater).toBeTruthy()
  })
})

describe('onServiceWorkerUpdate', () => {
  it('is truthy', () => {
    expect(onServiceWorkerUpdate).toBeTruthy()
  })
})
