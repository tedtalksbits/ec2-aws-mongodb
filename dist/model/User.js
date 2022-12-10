"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
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
        default: 'https://robohash.org/' +
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
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map