import http from './http';
import links from '../constants/links';

// ----------------------------------------------------------------------

const todoUrl = links.todo;

function getTodos() {
    return http.get(todoUrl.getTodos);
}

function addTodo(data: { text: string, status: number }) {
    return http.post(todoUrl.addTodo, data);
}

function editTodo(id: number, data: { text: string, status: number }) {
    return http.put(todoUrl.editTodo(id), data);
}

function deleteTodo(id: number) {
    return http.delete(todoUrl.deleteTodo(id));
}

export default {
    addTodo,
    getTodos,
    editTodo,
    deleteTodo
};