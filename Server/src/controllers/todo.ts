import { Response, NextFunction } from 'express';

import Todo from '../models/todo';
import User from '../models/user';
import { errorHandler } from '../utils/error';
import { todoBody, RequestParams } from '../types/common';

// ----------------------------------------------------------------------

export const getTodo = async (req: any, res: Response, next: NextFunction) => {
    const todos = await Todo.find({ creator: req.userId });
    return res.status(200).json({ message: 'Success', todo: todos })
};

export const postTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const body = req.body as todoBody;
        const todo = new Todo({
            text: body.text,
            status: body.status,
            creator: req.userId
        });
        await todo.save();
        const user = await User.findById(req.userId);
        if (!user) {
            return errorHandler('A user with this email could not be found.', 401);
        }
        user?.todos?.push(todo);
        await user?.save();
        return res.status(200).json({ message: 'Added Todo', todo: todo, creator: { _id: user._id, name: user.name } })
    }
    catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

export const editTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const params = req.params as RequestParams;
        const tid = params.todoId;
        const body = req.body as todoBody;
        const todo = await Todo.findById(tid);
        if (!todo) {
            return res.status(404).json({ message: 'Could not find todo for this id.' })
        };
        if (todo.creator.toString() !== req.userId) {
            return errorHandler('Not authorized!', 403);
        }
        todo.text = body.text;
        todo.status = body.status;
        const updatedTodo = await todo.save();
        return res.status(200).json({ message: 'Updated todo', todo: updatedTodo });
    }
    catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
}

export const deleteTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const params = req.params;
        const todo = await Todo.findById(params.todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Could not find todo for this id.' })
        };
        if (todo.creator.toString() !== req.userId) {
            return errorHandler('Not authorized!', 403);
        }
        await Todo.findByIdAndRemove(params.todoId);
        const user = await User.findById(req.userId);
        const findTodoIdx = user?.todos?.indexOf(params.todoId)!;
        user?.todos?.splice(findTodoIdx, 1);
        user?.save();
        return res.status(200).json({ message: 'Deleted todo' });
    }
    catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
}