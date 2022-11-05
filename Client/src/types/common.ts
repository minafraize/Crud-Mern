export interface ITodo {
    _id: number;
    text: string;
    status: number;
    __v?: number
}

export type TodoContextType = {
    todos: ITodo[];
    getTodos: () => void;
    addTodo: (data: { text: string, status: number }) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number, data: { text: string, status: number }) => void;
}

export type AuthContextType = {
    isAuth: boolean,
    login: (data: { email: string, password: string }) => void;
    signup: (data: { name: string, email: string, password: string }) => void;
    logout: () => void;
}

export interface FunctionComponent {
    children?: React.ReactNode | React.ReactNode[];
}