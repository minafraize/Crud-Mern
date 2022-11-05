import React, { useState, useContext } from 'react';

import { TodoContext } from "../../contexts/todo";
import { ITodo, TodoContextType } from '../../types/common';

// ----------------------------------------------------------------------

type Props = {
    todo: ITodo;
    closeEditForm: () => void
};

const EditTodo = ({ todo, closeEditForm }: Props) => {

    const { editTodo } = useContext(TodoContext) as TodoContextType;
    const [formData, setFormData] = useState(todo.text);
    const [todoStatus, setTodoStatus] = useState(todo.status);

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData(e.currentTarget.value);
    };

    const handleTodoStatus = (e: React.FormEvent<HTMLSelectElement>): void => {
        setTodoStatus(Number(e.currentTarget.value));
    };

    const handleEditTodo = (e: React.FormEvent) => {
        const data = {
            text: formData,
            status: todoStatus
        }
        e.preventDefault();
        editTodo(todo._id, data);
        setFormData("");
        closeEditForm()
    };

    return (
        <form onSubmit={(e) => handleEditTodo(e)}>
            <div>
                <div>
                    <input onChange={handleForm} type="text" id="title" value={formData} />
                    <select onChange={handleTodoStatus} value={todoStatus} data-testid="task-status">
                        <option value="0">Pending</option>
                        <option value="1">Done</option>
                    </select>
                </div>
            </div>
            <button disabled={formData === ""}>Edit Todo</button>
        </form>
    );
};

export default EditTodo;