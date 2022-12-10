import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: Object,
            required: true,
            default: {
                value: '',
                createdAt: Date.now(),
                lastUpdatedAt: Date.now(),
                incorrectTries: 0,
                locked: false,
            },
        },
        avatar: {
            type: String,
            default:
                'https://robohash.org/' +
                Math.random() +
                '.png?size=200x200&set=set1',
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
