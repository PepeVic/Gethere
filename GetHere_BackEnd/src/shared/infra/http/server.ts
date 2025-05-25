import 'reflect-metadata';
import 'express-async-errors';
import { config } from 'dotenv';

config();

import { setupApp } from '../../../config/app';

const app = setupApp();

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server started !, port: ${port}`);
});
