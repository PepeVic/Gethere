import { configUpload } from '../../../../../config/upload';
import UsersController from '../../../../../modules/users/main/controllers/UsersController';
import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticationMiddleware from '../../../../../shared/main/middlewares/ensure-authentication';

const usersRouter = Router();
const upload = multer(configUpload);

const usersController = new UsersController();

usersRouter.post('/', usersController.createUser);

usersRouter.put(
  '/:id',
  // ensureAuthenticationMiddleware,
  usersController.updateUser
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticationMiddleware,
  upload.single('avatar'),
  usersController.updateUserAvatar
);

export default usersRouter;
