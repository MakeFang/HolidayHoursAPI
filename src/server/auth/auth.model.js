// #TODO: Implement thing.model.js.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, select: false }
});

const Auth = mongoose.model('Auth', AuthSchema);
module.exports = Auth;
