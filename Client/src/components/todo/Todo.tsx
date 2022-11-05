import React, { useState, useContext } from 'react';

import EditTodo from './EditTodo';
import { TodoContext } from "../../contexts/todo";
import { ITodo, TodoContextType } from '../../types/common';

// ----------------------------------------------------------------------

type Props = {
  todo: ITodo;
};

const Todo = ({ todo }: Props) => {
  
  const { deleteTodo } = useContext(TodoContext) as TodoContextType;
  const [edit, setEdit] = useState(false);

  const openEditForm = (): void => setEdit(true);
  const closeEditForm = (): void => setEdit(false);

  return (
    <div>
      {
        edit ?
          <EditTodo todo={todo} closeEditForm={closeEditForm} />
          :
          <>
            <div>
              <h1>{todo.text}</h1>
              <p>status: {todo.status === 1 ? 'Done' : 'Pending'} </p>
            </div>
            <button onClick={openEditForm}> Edit </button>
            <button onClick={() => deleteTodo(todo._id)}> Delete </button>
          </>
      }
    </div>
  );
};

export default Todo;