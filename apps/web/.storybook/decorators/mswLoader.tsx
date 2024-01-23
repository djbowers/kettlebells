import { isNodeProcess } from 'is-node-process';
import { RequestHandler, http, passthrough } from 'msw';
import type { SetupWorkerApi } from 'msw/browser';

export type SetupApi = SetupWorkerApi;
export type InitializeOptions = Parameters<SetupWorkerApi['start']>[0];

export type MswParameters = {
  msw?:
    | RequestHandler[]
    | { handlers: RequestHandler[] | Record<string, RequestHandler> };
};

type Context = {
  parameters: MswParameters;
};

const IS_BROWSER = !isNodeProcess();
let api: SetupApi;
let workerPromise: Promise<unknown>;

export async function initialize(
  options?: InitializeOptions,
): Promise<SetupApi> {
  const defaultHandlers = [
    http.get('/hot-update/*', () => {
      return passthrough();
    }),
    http.get('/node_modules/*', () => {
      return passthrough();
    }),
  ];

  if (IS_BROWSER) {
    const { setupWorker } = await import('msw/browser');
    const worker = setupWorker(...defaultHandlers);
    workerPromise = worker.start(options);
    api = worker as SetupApi;
  }

  return api;
}

const setupHandlers = (msw: MswParameters['msw']) => {
  if (api) {
    api.resetHandlers();

    if (msw) {
      if (Array.isArray(msw) && msw.length > 0) {
        // Support an Array of request handlers (backwards compatibility).
        api.use(...msw);
      } else if ('handlers' in msw && msw.handlers) {
        // Support an Array named request handlers handlers
        // or an Object of named request handlers with named arrays of handlers
        const handlers = Object.values(msw.handlers)
          .filter(Boolean)
          .reduce(
            (handlers, handlersList) => handlers.concat(handlersList),
            [] as RequestHandler[],
          );

        if (handlers.length > 0) {
          api.use(...handlers);
        }
      }
    }
  }
};

export const mswLoader = async (context: Context) => {
  const {
    parameters: { msw },
  } = context;

  setupHandlers(msw);

  if (workerPromise) {
    await workerPromise;
  }
  return {};
};
