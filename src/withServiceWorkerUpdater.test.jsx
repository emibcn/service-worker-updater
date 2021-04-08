import React from 'react';
import { render, createEvent, fireEvent, act, waitFor, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import withServiceWorkerUpdater from './withServiceWorkerUpdater';

const delay = (millis) => new Promise((resolve) => setTimeout(resolve, millis));

const SWDetector = withServiceWorkerUpdater( (props) => (
  <>
    <button
      data-testid="dashboard-mock-fn-accept-sw"
      onClick={ () => {
        props.onAccept("tested");
        props.onLoadNewServiceWorkerAccept({ detail: { registration: "tested" } })
      }}
    >
      Accept Service Worker
    </button>
    <div data-testid="dashboard-mock-sw-detected">
      { JSON.stringify(props.newServiceWorkerDetected) }
    </div>
  </>
));

// Fire event for new service worker detection
const triggerNewServiceWorker = () => {
  const event = new CustomEvent('onNewServiceWorker', { detail: { registration: "tested" } });
  fireEvent(document, event);
};

test('detects new service worker', async () => {
  let app;
  act( () => {
    app = render(<SWDetector />);
  });
  
  act( triggerNewServiceWorker );

  await act( async () => {
    await waitFor(() => {
      const detectedNewSW = app.getByTestId("dashboard-mock-sw-detected");
      expect(detectedNewSW).toHaveTextContent("true");
    });
  });
});

test('detects new service worker acceptance', async () => {
  const onLoadNewServiceWorkerAccept = jest.fn();
  let app;
  act(() => {
    app = render(<SWDetector onAccept={ onLoadNewServiceWorkerAccept } />);
  });

  act( triggerNewServiceWorker );

  await act( async () => {
    // User accepts it
    const button = app.getByTestId("dashboard-mock-fn-accept-sw");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(() => {
      expect(onLoadNewServiceWorkerAccept).toHaveBeenCalledTimes(1);
      expect(onLoadNewServiceWorkerAccept).toHaveBeenCalledWith("tested");
    });
  });
});
