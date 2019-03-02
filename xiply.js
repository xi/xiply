/**
 * xiply.js - very simple js/html5 audio player
 * (C) 2014 Tobias Bengfort <tobias.bengfort@posteo.de>
 * License: GPL-3+
 */

function init_xiply(container) {
	"use strict";

	var player = document.createElement('audio');
	player.setAttribute('controls', true);
	container.appendChild(player);

	var dispatchEvent = function(name, trackTitle) {
		player.dispatchEvent(new CustomEvent(name, {
			'detail': trackTitle,
		}));
	};

	var _current = function() {
		return container.querySelector('.current');
	};

	var _next = function() {
		var tracks = container.querySelectorAll('.track');
		var current = _current();
		for (var i = 0; i < tracks.length - 1; i++) {
			if (tracks[i] === current) {
				return tracks[i + 1];
			}
		}
	};

	var unselect = function() {
		var current = _current();
		if (current) {
			current.classList.remove('current');
			dispatchEvent('unselectTrack', current.textContent);
		}
	};

	var select = function(element) {
		if (element) {
			element.classList.add('current');
			dispatchEvent('selectTrack', element.textContent);
		}
	};

	var load = function(track) {
		unselect();
		if (track) {
			select(track);
			player.src = track.getAttribute('href');
			player.title = track.textContent;
			player.play();
		}
	};

	var loadNext = function() {
		var next = _next();
		if (next) {
			load(next);
		} else {
			unselect();
			player.src = null;
			player.title = null;
		}
	};

	container.addEventListener('click', function(e) {
		if (e.target.classList.contains('track') && e.button === 0) {
			e.preventDefault();
			load(e.target);
		}
	});

	// 'ended' event is unreliable, so we use polling instead
	setInterval(function() {
		if (player.ended) {
			loadNext();
		}
	}, 200);

	// player.addEventListener('ended', function(e) {
	// 	loadNext();
	// });

	return player;
}
