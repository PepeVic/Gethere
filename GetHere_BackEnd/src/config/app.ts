import setupRoutes from './routes-config';
import setupMiddlewares from './middleware-config';
import setupErrorHandling from './error-handling-config';

import express, { Express } from 'express';

export const setupApp = (): Express => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  setupErrorHandling(app);

  return app;
};
