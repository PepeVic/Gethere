import CategoryController from '../../../../../modules/events/main/controllers/CategoryController';
import { Router } from 'express';

const categoriesRouter = Router();

const categoryController = new CategoryController();

categoriesRouter.get('/', categoryController.getAllCategories);
categoriesRouter.post('/', categoryController.createCategory);

export default categoriesRouter;
