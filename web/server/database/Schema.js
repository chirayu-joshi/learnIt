let mongoose = require('mongoose');

// UserSchema acts like skeleton. This file creates model of it.
exports.User = mongoose.model('User', require('./UserSchema'));
