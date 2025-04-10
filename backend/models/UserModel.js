import { Schema, model } from 'mongoose';
import { emailRegex } from '../utils/regex.js';

const ReadingListEntry = new Schema({
  bookRefId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  status: {
    type: String,
    enum: ['read', 'pending', 'wishlist'],
    default: 'wishlist',
  },
  rating: Number,
});

const userSchema = new Schema({
  firstName: {
    type: String,
    maxLength: 100,
  },
  lastName: {
    type: String,
    maxLength: 100,
  },
  email: {
    type: String,
    match: [emailRegex, 'Please provide a valid email address.'],
    unique: [true, 'User already exists'],
    required: [true, 'Please provide an email address'],
  },
  readingList: [ReadingListEntry],
});

const User = model('User', userSchema);
export default User;
