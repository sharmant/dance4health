/**
 * @author Neelam Kumari <neelam1899@gmail.com>, 
 *         Sethuraman Sundararaman <sthrm91@gmail.com>
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('instructor',{
  	'danceroom': 'req.query.danceroom'
  });
});


function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}
module.exports = router;