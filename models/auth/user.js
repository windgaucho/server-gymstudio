/* eslint func-names: */
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: String,
  password: String,
  apellido: String,
  nombre: String,
  roles: [String],
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  return bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) { return next(err); }
    user.password = hash;
    return next();
  });
});

UserSchema.methods.comparePassword = function comparePassword(inputPassword, cb) {
  const user = this;
  bcrypt.compare(inputPassword, user.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

mongoose.model('user', UserSchema);
