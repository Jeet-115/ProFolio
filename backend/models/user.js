import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

UserSchema.plugin(passportLocalMongoose); // adds username + hashed password

const User = mongoose.model('User', UserSchema);
export default User;