var	express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./index');
var secret = require('./secret');
var expressJwt = require('express-jwt');
var path = require('path');

module.exports = function(app) {
	app.use(function(req, res, next) {
		if (config.log) {
			console.log(req.url);
		}
		next();
	});

	app.use(bodyParser());

	// to emulate delete and put requests
	app.use(methodOverride());

	////
	// implement your own passport strategy here.
	////
	passport.use(
	  new LocalStrategy(function(username, password, done) {
		if (password === secret.password) {
			return done(null, {name: 'User'});
		}
		return done(null, false);
	}));
	
	// initializes passport auth system
	app.use(passport.initialize());
	// this will set the req.user object for authenticated API calls
	app.use(config.routes.secure_api, expressJwt({secret: secret.key}));

    app.use(express.static('../build'));
};