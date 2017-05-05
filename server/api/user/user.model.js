import pify from 'pify';
import {Schema} from 'mongoose';
import emailAddress from 'email-address';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    match: emailAddress.single,
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  admin: Boolean
});

/**
 * Plugins
 */
UserSchema
  .plugin(passportLocalMongoose, {
    usernameField: 'email'
  });

/**
 * Virtuals
 */

UserSchema
  .virtual('name.full')
  .get(function () {
    return `${this.name.first} ${this.name.last}`;
  });

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
  });

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    if (!this._password) {
      return next();
    }

    this.setPassword(this._password)
      .then(() => next());
  });

/**
 * Methods
 */

// Use promises
UserSchema.methods.setPassword = pify(UserSchema.methods.setPassword);
UserSchema.methods.authenticate = pify(UserSchema.methods.authenticate);

export default createSeedModel('User', UserSchema, seed);