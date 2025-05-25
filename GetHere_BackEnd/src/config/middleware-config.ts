import { contentType, noCache } from '../shared/main/middlewares';
import { Express } from 'express';

export default (app: Express): void => {
  app.use(contentType);
  app.use(noCache);
};
