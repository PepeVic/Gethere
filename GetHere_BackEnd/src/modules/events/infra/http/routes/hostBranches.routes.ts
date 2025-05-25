import HostBranchController from '../../../../../modules/events/main/controllers/HostBranchesController';
import { Router } from 'express';

const hostBranchesRouter = Router();

const hostBranchController = new HostBranchController();

hostBranchesRouter.get('/', hostBranchController.getAll);
hostBranchesRouter.post('/', hostBranchController.create);

export default hostBranchesRouter;
