import activitiesRouter from '../modules/events/infra/http/routes/activities.routes';
import addressRouter from '../modules/events/infra/http/routes/address.routes';
import categoriesRouter from '../modules/events/infra/http/routes/categories.routes';
import companiesRouter from '../modules/events/infra/http/routes/companies.routes';
import eventsRouter from '../modules/events/infra/http/routes/events.routes';
import groupsRouter from '../modules/events/infra/http/routes/groups.routes';
import hostBranchesRouter from '../modules/events/infra/http/routes/hostBranches.routes';
import hostsRouter from '../modules/events/infra/http/routes/hosts.routes';
import placesRouter from '../modules/events/infra/http/routes/places.routes';
import sessionRoute from '../modules/users/infra/http/routes/session.routes';
import usersRouter from '../modules/users/infra/http/routes/users.routes';
import { json } from 'body-parser';
import cors from 'cors';
import { Express, Router } from 'express';

export default (app: Express): void => {
  const router = Router();

  router.use('/session', sessionRoute);
  router.use('/user', usersRouter);
  router.use('/groups', groupsRouter);
  router.use('/events', eventsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/activities', activitiesRouter);
  router.use('/companies', companiesRouter);
  router.use('/places', placesRouter);
  router.use('/hosts', hostsRouter);
  router.use('/addresses', addressRouter);
  router.use('/hostBranches', hostBranchesRouter);

  app.use('/api', cors(), json(), router);
};
