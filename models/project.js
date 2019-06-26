const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  idproject: Number,
  name: String,
  desc: String,
  pic_url: String,
  stack_front: [String],
  stack_back: [String],
  days_spent: Number,
});

module.exports = mongoose.model('projects', projectSchema);
