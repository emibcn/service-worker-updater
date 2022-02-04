import React from 'react'
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import withServiceWorkerUpdater from './withServiceWorkerUpdater'

import PersistenceService, {
  InMemoryPersistenceService,
  NullPersistenceService
} from './PersistenceService'

const createServiceWorkerUpdater = (
  persistenceService: PersistenceService = new NullPersistenceService()
) => {
  return withServiceWorkerUpdater(
    (props: {
      onAccept?: (t: string) => void
      onLoadNewServiceWorkerAccept?: (a: unknown) => void
      newServiceWorkerDetected?: unknown
    }) => (
      <>
        <button
          data-testid='dashboard-mock-fn-accept-sw'
          onClick={() => {
            props.onAccept?.('tested')
            props.onLoadNewServiceWorkerAccept?.({
              detail: { registration: 'tested' }
            })
          }}
        >
          Accept Service Worker
        </button>
        <div data-testid='dashboard-mock-sw-detected'>
          {JSON.stringify(props.newServiceWorkerDetected)}
        </div>
      </>
    ),
    { persistenceService }
  )
}

// Fire event for new service worker detection
const triggerNewServiceWorker = () => {
  const event = new CustomEvent('onNewServiceWorker', {
    detail: { registration: 'tested' }
  })
  fireEvent(document, event)
}

test('detects new service worker', async () => {
  const SWDetector = createServiceWorkerUpdater()

  render(<SWDetector />)

  act(triggerNewServiceWorker)

  let detectedNewSW: unknown
  await waitFor(() => {
    detectedNewSW = screen.getByTestId('dashboard-mock-sw-detected')
  })
  await act(() => {
    expect(detectedNewSW).toHaveTextContent('true')
  })
})

test('detects new service worker acceptance', async () => {
  const SWDetector = createServiceWorkerUpdater()

  const onLoadNewServiceWorkerAccept = jest.fn()
  render(<SWDetector onAccept={onLoadNewServiceWorkerAccept} />)

  act(triggerNewServiceWorker)

  // User accepts it
  const button = screen.getByTestId('dashboard-mock-fn-accept-sw')
  expect(button).toBeInTheDocument()

  fireEvent.click(button)

  await waitFor(() => {
    expect(onLoadNewServiceWorkerAccept).toHaveBeenCalledTimes(1)
  })
  await waitFor(() => {
    expect(onLoadNewServiceWorkerAccept).toHaveBeenCalledWith('tested')
  })
})

test('persistence service returns FALSE when new service worker hasnt been detected', async () => {
  const persistenceService = new InMemoryPersistenceService()
  const SWDetector = createServiceWorkerUpdater(persistenceService)

  persistenceService.clear()

  render(<SWDetector />)

  await waitFor(() => {
    expect(persistenceService.isUpdateNeeded()).toBe(false)
  })
})

test('persistence service returns TRUE when new service worker is detected', async () => {
  const persistenceService = new InMemoryPersistenceService()
  const SWDetector = createServiceWorkerUpdater(persistenceService)

  persistenceService.clear()

  render(<SWDetector />)

  act(triggerNewServiceWorker)

  await waitFor(() => {
    expect(persistenceService.isUpdateNeeded()).toBe(true)
  })
})

test('when persistence service returns true, component state reflects that', async () => {
  const persistenceService = new InMemoryPersistenceService()
  const SWDetector = createServiceWorkerUpdater(persistenceService)

  persistenceService.setUpdateIsNeeded()

  render(<SWDetector />)

  const detectedNewSW = screen.getByTestId('dashboard-mock-sw-detected')
  await waitFor(() => {
    expect(detectedNewSW).toHaveTextContent('true')
  })
})
