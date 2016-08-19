/**
 * @author Neelam Kumari <neelam1899@gmail.com>, 
 *         Sethuraman Sundararaman <sthrm91@gmail.com>
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

// Members Page
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Members'});
});

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('welcome', { title: 'Members', name : req.user.name });
});

router.get('/class', ensureAuthenticated, function(req, res, next) {
  res.render('class', { title: 'Members' });
});

router.get('/carousel', ensureAuthenticated, function(req, res, next) {
  res.render('carousel', { title: 'Members' });
});

router.get('/forgotpassword', function(req, res, next) {
  res.render('forgotpass', { title: 'Members' });
});

router.post('/forgotpassword', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      console.log('user emil-' + req.body.email );
      User.findOne({ email: req.body.email }, function(err, user) {
        console.dir(user);
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgotpassword');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'dance4healing',
          pass: 'dance4healing132016'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'password-reset@dance4healing.com',
        subject: 'Dance4healing password-reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'https://' + 'dance4healing-jan16.herokuapp.com' + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgotpassword');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    console.log(req.params.token);
    res.render('resetpass', {
      token:req.params.token
    });
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        
        console.log('req.body.password-' + req.body.password);

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        User.updateUser(user, function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'dance4healing',
          pass: 'dance4healing132016'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'password-reset@dance4healing.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/index');
}

/*function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
} */
module.exports = router;