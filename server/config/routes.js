var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('./index');
var secret = require('./secret');
var models = require('./models');
var restify = require('express-restify-mongoose');


module.exports = function(app) {
	app.post(config.routes.api + '/login', function(req, res) {
		req.body.username = 'admin';
		var authenticate = passport.authenticate(
			'local', { session: false },
			function(err, user, info) {
				if (err) {
					error(res, err);
				}
				if (!user) {
					failure(res);
				}
				success(res, jwt.sign(user, secret.key));
			}
		);

		authenticate(req, res);
	});

    for(var name in models) {
        var model = models[name];
        var options = {
            version: ''
        };

        if (model.options && model.options.restify) {
            for(var key in model.options.restify) {
                options[key] = model.options.restify[key];
            }
        }

        restify.serve(app, model.odm, options);
    }
};