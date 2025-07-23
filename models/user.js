const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  githubId: String
});

module.exports = mongoose.model('User', userSchema);
