import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
    theme: {
        type: String,
        default: 'light',
    },
    language: {
        type: String,
        default: 'en',
    },
});

export default mongoose.model('Preference', preferenceSchema);
