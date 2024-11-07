const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
  contestName: { type: String, required: true },
  description: { type: String, required: true }, 
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Contest', ContestSchema);
