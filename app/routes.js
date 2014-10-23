var presentations = require('./models/presentations.js');

module.exports = function(app) {

	app.get('/api/presentations', function(req, res) {
			res.json(presentations); 
	});

	app.get('*', function(req, res) {
		res.sendfile('./index.html');
	});
};