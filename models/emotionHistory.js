var mongoose = require('mongoose');
var User = require('./user');
var mongoose = User.mongoose;

var db = mongoose.connection;

// User Schema
var EmotionHistorySchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
    emotion:{
		type: String
	},
	sessionId:{
		type: String
	},
    time : { 
        type : Date, default: Date.now 
    }
});

var EmotionHistory = module.exports = mongoose.model('EmotionHistory', EmotionHistorySchema);


module.exports.createLog = function(view, callback) {
	//var existingDoc = findbySessionId(view.sessionId);
	//console.dir(existingDoc);
	var newView = new EmotionHistory({
		username : view.username,
		emotion : view.emotion,
		sessionId : view.sessionId
	});
	newView.save(callback);
}
