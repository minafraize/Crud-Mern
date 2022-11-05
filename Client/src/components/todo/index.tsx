import React, { useContext } from "react";

import AddTodo from './AddTodo';
import TodoItems from './Todo';
import { TodoContext } from "../../contexts/todo";
import { AuthContext } from "../../contexts/auth";
import { TodoContextType, ITodo, AuthContextType } from '../../types/common';

// ----------------------------------------------------------------------

const Todo = () => {

    const { todos } = useContext(TodoContext) as TodoContextType;
    const { logout } = useContext(AuthContext) as AuthContextType;

    return (
        <>
            <button onClick={() => logout()}>logout</button>
            {/* Add Todo Form */}
            <AddTodo />
            {/* Display User Todos  */}
            {todos.length !== 0 ?
                todos.map((todo: ITodo) => (
                    <TodoItems key={todo._id} todo={todo} />
                ))
                :
                <p>you finished your tasks congrats :) </p>
            }
        </>
    )
}

export default Todo