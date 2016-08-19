/**
 * @author Neelam Kumari <neelam1899@gmail.com>, 
 *         Sethuraman Sundararaman <sthrm91@gmail.com>
 */

var express = require('express');
var router = express.Router();
var ViewHistory = require('../models/videoViewHistory');

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  console.log(req.query.danceroom);
  res.render('videos',{
  	'danceroom': 'req.query.danceroom'
  });
});

router.post('/', ensureAuthenticated, function(req, res, next) {
  var videoId = req.body.videoId;
  if(videoId == ''){
    videoId = '8v98bjJPivs';
  }
  var userEvent = req.body.event;
  
  var videoViewed = { username: req.user.username, videoId: videoId, userEvent: userEvent, sessionId : req.sessionID };
  ViewHistory.createVideoLog(videoViewed, function(){
  	console.log("this is successful!");
  });
  res.send();
});


function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}
module.exports = router;