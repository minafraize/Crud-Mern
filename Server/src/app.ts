import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import todosRoutes from './routers/todo';
import authRoutes from './routers/auth';

// ----------------------------------------------------------------------

// Express
const app: Application = express();

// Convert the coming data to json format
app.use(bodyParser.json());

// Solve cors issue
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API routes
app.use(todosRoutes);
app.use('/auth', authRoutes);

// Error handler middleware
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
};

app.use(errorHandler);

// Connect with mongodb
mongoose
  .connect(
    'mongodb+srvUrl'
  )
  .then(result => {
    app.listen(8000);
  })
  .catch(err => console.log(err));