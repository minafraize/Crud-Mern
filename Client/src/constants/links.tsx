const API_URL = 'http://localhost:8000';

const TODO_SERVICE = `${API_URL}/todo`;
const AUTH_SERVICE = `${API_URL}/auth`;

const auth = {
  login: `${AUTH_SERVICE}/login`,
  signup: `${AUTH_SERVICE}/signup`,
};

const todo = {
  addTodo: TODO_SERVICE,
  getTodos: TODO_SERVICE,
  editTodo: (id: number) => `${TODO_SERVICE}/${id}`,
  deleteTodo: (id: number) => `${TODO_SERVICE}/${id}`,
};

export default {
  todo,
  auth
};