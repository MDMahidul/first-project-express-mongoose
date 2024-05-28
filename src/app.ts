import express, {Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1', router);

//app.use('/api/v1/users', UserRoutes);

const test = (req: Request, res: Response) => {
  res.send('ph university running succesfully!!!');
};
app.get('/', test);

//global error handler
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
