import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { server } from './src/test-utils/setup/msw';
import './src/test-utils/setup/polyfills';
import './src/test-utils/mocks/localStorage';
import './src/test-utils/setup/mocks';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
