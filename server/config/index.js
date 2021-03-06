module.exports = {
	routes: {
		api: 		'',		// url for the server's basic api
		secure_api: '/auth',	// url for the server's secure api
	},

	log: true,

	mongo_url: 'mongodb://localhost:27017/testifications', // url for the mongo instance

	http_port: 8000,
}