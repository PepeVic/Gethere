import EventController from '../../../../../modules/events/main/controllers/EventController';
import ensureAuthenticationMiddleware from '../../../../../shared/main/middlewares/ensure-authentication';
import { Router } from 'express';

const eventsRouter = Router();

const eventController = new EventController();

eventsRouter.get('/available', eventController.getAvailableEvents);
eventsRouter.get('/', eventController.getEventFilter);
eventsRouter.get(
  '/participated',
  ensureAuthenticationMiddleware,
  eventController.getEventsParticipated
);
eventsRouter.get('/:id', eventController.getEventById);
eventsRouter.post('/', eventController.createEvent);

export default eventsRouter;
