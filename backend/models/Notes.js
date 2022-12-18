const mongoose = require('mongoose');

const userSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String},
    date: { type: Date, default: date.now },
  });
  
module.exports = mongoose.model('Note', notesSchema);
