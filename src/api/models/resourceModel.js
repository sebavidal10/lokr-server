const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: String,
  url: String,
});

module.exports = mongoose.model('Resource', resourceSchema);
