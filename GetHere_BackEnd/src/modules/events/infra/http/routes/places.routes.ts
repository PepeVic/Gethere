import PlaceController from '../../../../../modules/events/main/controllers/PlaceController';
import { Router } from 'express';

const placesRouter = Router();

const placesController = new PlaceController();

placesRouter.get('/', placesController.getAllLocals);
placesRouter.post('/', placesController.createLocal);

export default placesRouter;
