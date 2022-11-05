import { Types } from 'mongoose';

// ----------------------------------------------------------------------

export interface user {
    name: string,
    email: string,
    password: string,
    todos?: object[]
}

export interface todo {
    text: string,
    status: number,
    creator: Types.ObjectId
}

export interface todoBody {
    text: string,
    status: number,
    creator: string
}

export interface RequestParams {
    todoId: string
}

export interface SignupRequestBody {
    email: string,
    name: string,
    password: string
};
export interface LoginRequestBody {
    email: string,
    password: string
};