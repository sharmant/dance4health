var mongoose = require('mongoose');
var User = require('./user');
var mongoose = User.mongoose;

var db = mongoose.connection;

// User Schema
var VideoHistorySchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	videoId:{
		type: String
	},
    userEvent:{
		type: String
	},
	sessionId:{
		type: String
	},
    time : { 
        type : Date, default: Date.now 
    }
});

var VideoHistory = module.exports = mongoose.model('VideoHistory', VideoHistorySchema);


var findbySessionId = function(sessionId){
	var query = {};
	query['sessionId'] = sessionId;
	VideoHistory.findOne(query, function (err, doc){
		if (err) return handleError(err);
		if(doc){
			console.log(' from sessionId %s %s', doc.username, doc.videoId);
		}
  

	});
}



module.exports.createVideoLog = function(view, callback) {
	//var existingDoc = findbySessionId(view.sessionId);
	//console.dir(existingDoc);
	var newView = new VideoHistory({
		username : view.username,
		videoId : view.videoId,
        userEvent : view.userEvent,
		sessionId : view.sessionId
	});
	newView.save(callback);
}
