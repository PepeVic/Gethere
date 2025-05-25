import HostController from '../../../../../modules/events/main/controllers/HostController';
import { Router } from 'express';

const hostsRouter = Router();

const hostsController = new HostController();

hostsRouter.get('/', hostsController.getAllHosts);
hostsRouter.post('/', hostsController.createHost);

export default hostsRouter;
