var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


mongoose.connect('mongodb://test:test123@ds037155.mongolab.com:37155/edancedb');
//mongoose.connect('mongodb://localhost/dance4healing');

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password:{
		type: String, required: true, bcrypt:true
	},
	email: {
		type:String, required: true, index: true
	},
	name:{
		type: String
	},
    resetPasswordToken: { type:String, default:''},
    resetPasswordExpires: { type:Date, default:null}
});

/*
UserSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
*/

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = function(candidatePassword, passwordhash, callback){
  if(bcrypt.compareSync(candidatePassword, passwordhash)){
    callback(null, true);
  }
  else{
    callback(null, false);
  }
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.createUser = function(newUser, callback) {
  var hash = bcrypt.hashSync(newUser.password, salt);
  newUser.password = hash;
  newUser.save(callback);
}

module.exports.updateUser = function(user, callback) {
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  user.save(callback);
}

module.exports.mongoose = mongoose;