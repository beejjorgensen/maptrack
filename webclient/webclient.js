/**
 * Main web client
 */

var maptracker = {}; // globals

(function(maptracker) {
	
	var control; // control namespace socket
	
	var currentChannel;
	
	var self; // user info
	
	var users = [];
	
	var posThrottleHandle;
	var posWatchHandle;
	var posOKToSend = true;
	
	var map;
	
	/**
	 * Get the current position
	 */
	function getCurrentPosition() {
	
		if (!posThrottleHandle) {
			posThrottleHandle = setTimeout(function() {
				posOKToSend = true;
			}, 1000);
		}
		
		function onSuccess(position) {
			if (posOKToSend) {
				posOKToSend = false;
				// update location position on map
				// TODO

				// submit to server
				control.emit('set location', {
					"id": self.sid,
					"lat": position.coords.lat,
					"lon": position.coords.lon
				});
			}
		}
		
		function onError(error) {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					break;
				case error.POSITION_UNAVAILABLE:
					break;
				case error.TIMEOUT:
					break;
				default:
					break;
			}
		}
				
		posWatchHandle = navigator.geolocation.watchPosition(onSuccess, onError, { "enableHighAccuracy": true});
	}

	/**
	 * Handle a user being added
	 */
	function onUserAdded(msg) {
		console.log('user added: ' + JSON.stringify(msg));
		
		self = msg;
		
		// join first channel
		control.emit('join room', {
			'id': self.sid,
			'room': currentChannel
		});
	}
	
	/**
	 * Handle user join
	 */
	function onUserJoined(msg) {
		console.log("user joined: " + JSON.stringify(msg));
		
		if (msg.id === self.id) {
			// it's me
		} else {
			// it's someone else
			// TODO add to user list
		}
	}

	/**
	 * Make a control channel
	 */
	function makeControl() {
		var control = io('/control');
		control.on('user added', onUserAdded);
		control.on('user joined', onUserJoined);
		
		return control;
	}
	
	/**
	 * Handle join request
	 */
	function onJoin() {
		var name = $('#name').val().trim();
		var email = $('#email').val().trim();
		currentChannel = $('#channel').val().trim();
		
		if (currentChannel === '') { currentChannel = null; }
		
		if (name === '') {
			alert("Must specify a name!");
			return;
		}
		
		var userRec = {
			"name": name,
			"email": email === ''? null: email
		};
		
		control = makeControl();
		
		control.emit('add user', userRec);
		
		$("#login").hide();
		
		if (!map) {
			map = L.map('map-holder').setView([51.505, -0.09], 13);
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				"attribution": 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
				"maxZoom": 18
			}).addTo(map);
		}
	}
	
	/**
	 * Test to see if geolocation is supported
	 */
	function testGeoSupport() {
		if (!navigator.geolocation) {
			// show error
			// TODO
		}
	}
	
	$(function () {
		$('#join').on('click', onJoin);
		testGeoSupport();
	});
	
}(maptracker));
