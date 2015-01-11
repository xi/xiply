/**
 * xiply.js - very simple js/html5 audio player
 * (C) 2014 Tobias Bengfort <tobias.bengfort@gmx.net>
 * License: GPL-3+
 *
 * Example usage:
 *
 * <div id="player">
 *   <p>This is a nice song: <a class="track" href="1.mp3">Track 1</a></p>
 *   <p>But this one is even nicer: <a class="track" href="2.mp3">Track 2</a></p>
 * </div>
 *
 * <script src="player.js"></script>
 * <script>
 *   init_player(document.getElementById('player'));
 * </script>
 *
 * xiply.js will add an audio element to the `player` div.
 * When you click a `track` it will start playing.
 * When it is finished playing it will automatically start the
 * next `track` from the same `player` div.
 *
 * xiply.js tries to be accessible and degrade gracefully
 */

"use strict";

function init_xiply(container) {
	var tracks = container.getElementsByClassName('track');
	var player = document.createElement('audio');
	player.setAttribute('controls', true);
	container.appendChild(player);

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
		}
	}

	function select(element) {
		if (element) {
			element.classList.add('current');
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
}
