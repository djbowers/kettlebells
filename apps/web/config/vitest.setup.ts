import '@testing-library/jest-dom/vitest';
import fetch from 'node-fetch';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from '../src/mocks/server';

// @ts-ignore
global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
