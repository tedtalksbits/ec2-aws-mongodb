// create a schema for a bank account

import mongoose from 'mongoose';
const { Schema } = mongoose;
const accountSchema = new Schema(
    {
        preferenceId: {
            type: String,
            default: '',
        },
        bills: [
            {
                billId: String,
                billName: String,
                billAmount: Number,
                billDueDate: Date,
                billFrequency: String,
                billCategory: String,
                billStatus: {
                    type: String,
                    default: 'Unpaid',
                },
                isAutoPay: Boolean,
                billNotes: [
                    {
                        note: String,
                        noteId: String,
                        noteDate: Date,
                        createdAt: Date,
                    },
                ],
                billReminders: [
                    {
                        reminderId: String,
                        reminderDate: Date,
                        reminderStatus: String,
                    },
                ],
            },
        ],
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Account', accountSchema);
