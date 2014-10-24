/**
 * Map Tracker
 */

var users = {};
var usersSecret = {};

/**
 * Generate an ID
 */
function genID() {
	function genPartial() {
		var z ="0000000";
		var p = ((Math.random() * 0xfffffff)|0).toString(16);
		var l = p.length;
		
		return z.substr(l) + p;
	}
	
	return genPartial() + '-' + genPartial() + '-' + genPartial();
}

/**
 * Add a user
 */
function addUser(meta, msg) {
	var user = {
		"name": msg.name,
		"email": msg.email,
		"id": meta.id,
		"sid": meta.sid
	};
	
	users[meta.id] = usersSecret[meta.sid] = user;
	
	return user;
}

/**
 * Join a particular room
 */
function joinRoom(socket, msg) {
	var user = usersSecret[msg.id];
	
	if (msg.room === null) {
		msg.room = genID(); // user didn't specify a room
	}
	
	console.log("Joining room: " + msg.room);
	socket.join(msg.room);
	
	return {
		"name": user.name,
		"email": user.email,
		"id": user.id,
		"room": msg.room
	};
}

/**
 * Initialize listeners
 */
function init(io) {
	/**
	 * Main /control namespace
	 */
	io.of('control').on('connection', function(socket) {
		var meta = {
			"id": genID(),
			"sid": genID()
		};
		
		socket.on('add user', function(msg) {
			console.log('ADD USER: ' + JSON.stringify(msg));
			console.log('adding user ' + meta.id);
			
			var user = addUser(meta, msg);

			socket.emit('user added', user);
		});
		
		socket.on('join room', function(msg) {
			var user = joinRoom(socket, msg);
			console.log("emitting: " + JSON.stringify(user));
			socket.emit('user joined', user);
			socket.to(msg.room).emit('user joined', user);
		});
		
		socket.on('disconnect', function() {
			console.log('deleting user ' + meta.id);
			delete users[meta.id];
			delete usersSecret[meta.sid];
		});
	});
}

/**
 * Exports
 */
module.exports = function (httpModule, ioModule) {
	io = ioModule;
	
	init(io);
};
