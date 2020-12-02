const mongoose = require('mongoose');

const user = new mongoose.Schema({

	userId: {
		type: Number
	},

	gameNames: [{
		type: String
	}],

	steamIds: [{
		type: Number
	}]


});

module.exports = User = mongoose.model('user', user);
