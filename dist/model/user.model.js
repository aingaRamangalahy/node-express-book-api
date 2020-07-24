"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const isUnique = (doc, username) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield User.findOne(username);
    return !existing || doc._id === existing._id;
});
const usernameSchema = () => {
    return {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 16,
        validate: [
            {
                validator: validator_1.default.isAlphanumeric,
                message: (props) => `${props.value} contains special characters`
            },
            {
                validator: (str) => !str.match(/^admin$/i),
                message: (props) => 'Invalid username'
            },
            {
                validator: function (username) { return isUnique(this, username); },
                message: (props) => 'Username is taken'
            }
        ]
    };
};
const emailSchema = (opts = {}) => {
    const { required } = opts;
    return {
        type: String,
        required: !!required,
        validate: {
            validator: validator_1.default.isEmail,
            message: (props) => `${props.value} is not a valid email address`
        }
    };
};
let Schema = mongoose_1.default.Schema;
let UserSchema = new Schema({
    username: usernameSchema(),
    password: String,
    name: String,
    accountType: String,
    connected: {
        type: Boolean,
        default: false
    },
    phone_number: {
        type: String,
        required: false
    },
    email: emailSchema({ required: false }),
    address: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    }
}, { _id: true });
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
