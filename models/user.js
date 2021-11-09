const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    password: { type: String },
    isMember: { type: Boolean }
  }
);

// virtuals

// get url for user
UserSchema.virtual('url').get(function () {
  return '/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);