import AddressController from '../../../../../modules/events/main/controllers/AddressController';
import { Router } from 'express';

const addressRouter = Router();

const activityController = new AddressController();

addressRouter.get('/', activityController.getAll);
addressRouter.post('/', activityController.create);

export default addressRouter;
