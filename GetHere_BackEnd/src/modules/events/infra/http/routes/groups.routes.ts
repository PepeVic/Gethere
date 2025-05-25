import GroupController from '../../../../../modules/events/main/controllers/GroupController';
import { Router } from 'express';

const groupsRouter = Router();

const groupController = new GroupController();

groupsRouter.get('/search', groupController.getGroupByName);
groupsRouter.get('/', groupController.getAllGroups);
groupsRouter.post('/', groupController.createGroup);

export default groupsRouter;
