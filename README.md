xiply.js - very simple js/html5 audio player

Example usage:

	<div id="player">
		<p>This is a nice song: <a class="track" href="1.mp3">Track 1</a></p>
		<p>But this one is even nicer: <a class="track" href="2.mp3">Track 2</a></p>
	</div>

	<script src="xiply.js"></script>
	<script>
		init_xiply(document.getElementById('player'));
	</script>

xiply.js will add an audio element to the `player` div.
When you click a `track` it will start playing.
When it is finished playing it will automatically start the
next `track` from the same `player` div.

`init_xiply` returns the generated audio element. Two additional event types
will be triggered on this element: `'selectTrack'` and `'unselectTrack'`. In
both cases, `event.detail` contains the title.

xiply.js tries to be accessible and degrade gracefully
