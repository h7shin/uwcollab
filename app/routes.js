module.exports = function(router) {
	router.get('/', function(req, res) {
	    var path = __dirname + '../public/index.html';
	    res.sendfile(path);
	});
}