import ActivityController from '../../../../../modules/events/main/controllers/ActivityController';
import ensureAuthenticationMiddleware from '../../../../../shared/main/middlewares/ensure-authentication';
import { Router } from 'express';

const activitiesRouter = Router();

const activityController = new ActivityController();

activitiesRouter.post(
  '/subscribe',
  ensureAuthenticationMiddleware,
  activityController.subscribe
);

activitiesRouter.post(
  '/unsubscribe',
  ensureAuthenticationMiddleware,
  activityController.unsubscribe
);

export default activitiesRouter;
