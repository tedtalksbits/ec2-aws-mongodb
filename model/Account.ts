// create a schema for a bank account

import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;
interface iAccount {
    userId: string;
    preferenceId: string;
    bills: iBill[];
    createdAt: Date;
    updatedAt: Date;
}
interface iBill {
    // _id: Types.ObjectId;
    _id: string;
    billId: string;
    billName: string;
    billAmount: number;
    billDueDate: Date;
    billFrequency: string;
    billCategory: string;
    billStatus: string;
    billCompanyImg: string;
    isAutoPay: boolean;
    billNotes: [
        {
            note: string;
            noteId: string;
            noteDate: Date;
            createdAt: Date;
        }
    ];
    billReminders: [
        {
            reminderId: string;
            reminderDate: Date;
            reminderStatus: string;
        }
    ];
}
const accountSchema = new Schema<iAccount>(
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
                billCompanyImg: String,
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
