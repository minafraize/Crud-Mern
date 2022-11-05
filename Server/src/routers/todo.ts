import { Router } from "express";

import isAuth from '../middleware/is-auth';
import * as todoController from '../controllers/todo';

// ----------------------------------------------------------------------

const router = Router();

router.get('/todo', isAuth, todoController.getTodo);

router.post('/todo', isAuth, todoController.postTodo);

router.put('/todo/:todoId', isAuth, todoController.editTodo);

router.delete('/todo/:todoId', isAuth, todoController.deleteTodo);

export default router;