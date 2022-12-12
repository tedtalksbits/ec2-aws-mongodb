import mongoose from 'mongoose';

const { Schema } = mongoose;

const billSchema = new Schema(
    {
        billName: {
            type: String,
            required: true,
        },
        billAmount: {
            type: Number,
            required: true,
        },
        billDueDay: {
            type: String,
            required: true,
        },
        billFrequency: {
            type: String,
            required: true,
        },
        billCategory: {
            type: String,
            required: true,
        },
        billNotes: {
            type: String,
            default: '',
        },
        isAutoPay: {
            type: Boolean,
            default: false,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Bill', billSchema);
