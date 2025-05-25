import { Router } from 'express';
import sessionController from '../../../../../modules/users/main/controllers/SessionController';

const sessionRouter = Router();

sessionRouter.post('/', sessionController);

export default sessionRouter;
