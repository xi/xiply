/**
 * xiply.js - very simple js/html5 audio player
 * (C) 2014 Tobias Bengfort <tobias.bengfort@posteo.de>
 * License: GPL-3+
 */

"use strict";

function init_xiply(container) {
	var tracks = container.getElementsByClassName('track');
	var player = document.createElement('audio');
	player.setAttribute('controls', true);
	container.appendChild(player);

	function dispatchEvent(name, trackTitle) {
		player.dispatchEvent(new CustomEvent(name, {
			'detail': trackTitle
		}));
	}

	function _current() {
		return container.getElementsByClassName('current')[0];
	}

	function _next() {
		var current = _current();
		for (var i=0; i<tracks.length-1; i++) {
			if (tracks[i] === current) {
				return tracks[i+1];
			}
		}
	}

	function unselect() {
		var current = _current();
		if (current) {
			current.classList.remove('current');
			dispatchEvent('unselectTrack', current.textContent);
		}
	}

	function select(element) {
		if (element) {
			element.classList.add('current');
			dispatchEvent('selectTrack', element.textContent);
		}
	}

	function load(track) {
		unselect();
		if (track) {
			select(track);
			player.src = track.getAttribute('href');
			player.title = track.textContent;
			player.play();
		}
	}

	function loadNext() {
		var next = _next();
		if (next) {
			load(next);
		} else {
			unselect();
			player.src = null;
			player.title = null;
		}
	}

	for (var i=0; i<tracks.length; i++) {
		tracks[i].addEventListener('click', function(e) {
			e.preventDefault();
			load(this);
		});
	}

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
