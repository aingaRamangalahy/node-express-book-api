import mongoose, { SchemaTypeOpts, MongooseDocument } from 'mongoose';
import validator from 'validator';

const isUnique = async (doc: any, username: String): Promise<boolean> => {
  const existing = await User.findOne(username)
  return !existing || doc._id === existing._id
}

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
        validator: validator.isAlphanumeric,
        message: (props :any) => `${props.value} contains special characters`
      },
      {
        validator: (str: any) => !str.match(/^admin$/i),
        message: (props: any) => 'Invalid username'
      },
      {
        validator:  function(username: String) { return isUnique(this, username) },
        message: (props: any) => 'Username is taken'
      }
    ]
  } 
}

const emailSchema = (opts: any = {}) => {
  const { required } = opts
  return {
    type: String,
    required: !!required,
    validate: {
      validator: validator.isEmail,
      message: (props: any) => `${props.value} is not a valid email address`
    }
  }
}

let Schema = mongoose.Schema
let UserSchema = new Schema({
  username: {type: String, required: true},
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
  email: emailSchema( {required: false} ),
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


const User = mongoose.model('User', UserSchema);

export default User;