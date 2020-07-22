import mongoose from 'mongoose';

let Schema = mongoose.Schema

let UserSchema = new Schema({
  pseudo: String,
  password: String,
  name: String,
  accountType: String,
  connected: {
    type: Boolean,
    default: false
  }, // status client
  phone_number: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, required: false }
}, { _id: true });

const User = mongoose.model('User', UserSchema);

export default User;