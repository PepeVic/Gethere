import CompanyController from '../../../../../modules/events/main/controllers/CompanyController';
import ensureAuthenticationMiddleware from '../../../../../shared/main/middlewares/ensure-authentication';
import { Router } from 'express';

const companiesRouter = Router();

const categoryController = new CompanyController();

companiesRouter.get(
  '/',
  ensureAuthenticationMiddleware,
  categoryController.getAllCompanies
);
companiesRouter.post(
  '/',
  ensureAuthenticationMiddleware,
  categoryController.createCompanies
);

export default companiesRouter;
