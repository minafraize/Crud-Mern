import { Schema, model } from 'mongoose';

import { user } from '../types/common';

// ----------------------------------------------------------------------

// Schema
const userSchema = new Schema<user>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
});

export default model('User', userSchema)