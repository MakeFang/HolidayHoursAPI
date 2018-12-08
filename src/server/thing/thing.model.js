// #TODO: Implement thing.model.js.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HourSchema = new Schema({
  date: { type: Date, required: true },
  open: { type: Number, required: true },
  close: { type: Number, required: true },
  name: { type: Schema.Types.ObjectId, ref: 'Auth', required: true }
});

const Hour = mongoose.model('Hour', HourSchema);
module.exports = Hour;
