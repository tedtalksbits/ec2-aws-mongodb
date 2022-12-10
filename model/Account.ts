// create a schema for a bank account

import mongoose from 'mongoose';
const { Schema } = mongoose;
const accountSchema = new Schema(
    {
        preferenceId: {
            type: String,
            default: '',
        },
        bills: {
            type: Array,
            default: [],
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Account', accountSchema);
