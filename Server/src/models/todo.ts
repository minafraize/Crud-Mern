import { Schema, model } from 'mongoose';

import { todo } from '../types/common';

// ----------------------------------------------------------------------

// Schema
const todoSchema = new Schema<todo>({
    text: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Todo', todoSchema)