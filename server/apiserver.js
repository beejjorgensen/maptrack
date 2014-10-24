/**
 * Main server
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');

var conf, server;

/**
 * Read the configuration file
 */
function readConf(filename) {
	var data = fs.readFileSync(filename);
	
	return JSON.parse(data);
}

/**
 * Handle requests
 */
function requestListener(request, response) {
	var parsedURL = url.parse(request.url);
	var pathname = parsedURL.pathname;
		
	if (pathname.substr(0, 4) == "/api") {
		// send api calls off to the api
		if (typeof api != 'undefined' && api.handleRequest) {
			api.handleRequest(parsedURL.pathname.substr(4), request, response);
		}

		//console.log("API: " + parsedURL);

	} else {
		// do file serving
		var fileRoot = conf.fileroot || ".";
		var fileName = pathname == '/'? '/' + (conf.defaultfile || 'index.html'): pathname;

		var mimeType = mime.lookup(fileName);
		
		response.writeHead(200, { "Content-Type": mimeType });

		//console.log(fileRoot + fileName);

		var stream = fs.createReadStream(fileRoot + fileName);
		
		stream.on('error', function(err) {
			console.log("FS Error: " + JSON.stringify(err));
			
			switch (err.code) {
				case "ENOENT":
					response.writeHead(404, "Not Found");
					response.write("<h1>404: Not Found</h1>");
					break;
				default:
					response.writeHead(500, "Internal Server Error");
					response.write("<h1>500: Internal Server Error</h1>");
					break;
			}
			
			response.end();
		});
		
		stream.on('end', function() {
			response.end();
		});
		
		stream.pipe(response);
	}
}

// read conf file
try {
	conf = readConf('apiserver.json');
} catch (err) {
	conf = {};
	console.log("Warning: " + err.message);
}

// start server
server = http.createServer(requestListener);
var io = require('socket.io')(server);
var maptracker = require('./maptracker')(server, io);

server.listen(+conf.port || 9091);
