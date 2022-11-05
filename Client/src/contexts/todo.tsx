import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FunctionComponent, TodoContextType, ITodo } from '../types/common';
import todoServices from '../services/todo';

// ----------------------------------------------------------------------

//Aliases
type ContextType = TodoContextType | null;

// TodoContext
export const TodoContext = createContext<ContextType>(null);

const TodoContextProvider: React.FC<FunctionComponent> = ({ children }) => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState<ITodo[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate("/auth/login");
        }
        if (todos.length === 0 && token)
            getTodos();
    }, []);

    const getTodos = () => {
        todoServices.getTodos()
            .then(res => {
                setTodos(res.data.todo)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addTodo = (data: { text: string, status: number }): void => {
        todoServices.addTodo(data)
            .then(res => {
                setTodos([...todos, res.data.todo]);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const deleteTodo = (id: number): void => {
        todoServices.deleteTodo(id)
            .then(res => {
                const filteredTodos = todos.filter(todo => todo._id !== id);
                setTodos(filteredTodos);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const editTodo = (id: number, data: { text: string, status: number }): void => {
        todoServices.editTodo(id, data)
            .then(res => {
                const editedTodo = [...todos];
                const selectedTask = editedTodo.find(todo => todo._id === res.data.todo._id)!;
                selectedTask.text = data.text;
                selectedTask.status = data.status;
                setTodos(editedTodo);
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <TodoContext.Provider value={{ todos, getTodos, addTodo, deleteTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider