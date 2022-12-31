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
        billDueDate: {
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
        billStatus: {
            type: String,
            default: 'Unpaid',
        },
        billNotes: {
            type: Array,
            default: [
                // {
                //     note: {
                //         type: String,
                //         default: '',
                //     },
                //     noteDate: {
                //         type: String,
                //         default: '',
                //     },
                //     createdAt: {
                //         type: Date,
                //         default: Date.now(),
                //     },
                // },
            ],
        },
        billReminders: {
            type: Array,
            default: [
                // {
                //     reminderDate: {
                //         type: String,
                //         default: '',
                //     },
                //     reminderStatus: {
                //         type: String,
                //         default: 'Pending',
                //     },
                // },
            ],
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
