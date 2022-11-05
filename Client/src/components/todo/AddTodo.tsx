import React, { useState, useContext } from 'react';

import { TodoContext } from "../../contexts/todo";
import { TodoContextType } from '../../types/common';

// ----------------------------------------------------------------------

const AddTodo = () => {
    
    const { addTodo } = useContext(TodoContext) as TodoContextType;
    const [formData, setFormData] = useState("");

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData(e.currentTarget.value);
    };

    const handleAddTodo = (e: React.FormEvent) => {
        const data = {
            text: formData,
            status: 0
        }
        e.preventDefault();
        addTodo(data);
        setFormData("");
    };

    return (
        <form onSubmit={(e) => handleAddTodo(e)}>
            <div>
                <div>
                    <label htmlFor="name">Title</label>
                    <input onChange={handleForm} type="text" value={formData} placeholder='Add a new task here...' />
                </div>
            </div>
            <button disabled={formData === ''}>Add Todo</button>
        </form>
    );
};

export default AddTodo;