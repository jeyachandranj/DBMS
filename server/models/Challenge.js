const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  contestId: String,
  tableName: String,
  attributes: String,
  question: String,
  description: String,
  hints: String,
  tags: String,
  outputData: [mongoose.Schema.Types.Mixed]
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
