# streamrail video player for web/mobile web

![streamrail logo](https://avatars2.githubusercontent.com/u/8501254?v=3&s=200)

## Overview

[Quickstart & Examples](#quickstart) | [General](#general) | [Video Content](#video-content) | [Flash Tech API](#flash-api) | [HTML5 Tech API] (#html5-api) | [Streamrail for JW Player](#jw_plugin) | [Streamrail for video.js](#vjs_plugin) 

## <a name="quickstart"></a> Quickstart & Examples

### The Playground

At the [Playground](http://play.streamrail.com) you can use your own ad tags or content videos using the different players and plugins. 

Check out:

- The [HTML5 example](http://play.streamrail.com/index.html#/html5), using VAST ad tags, mobile web auto-play and content videos
- The [Flash example](http://play.streamrail.com/index.html#/flash), using VPAID ad tags and content videos
- Our [Plugin for JW Player](http://play.streamrail.com/index.html#/jw) example using content videos
- Our [Plugin for video.js](http://play.streamrail.com/index.html#/vjs) example using content videos

[<img src="http://play.streamrail.com/img/screenshot.jpg?v1">](http://play.streamrail.com/)


### Code Examples
Dive into the code samples (source available on the [github repo](https://github.com/streamrail/player-api-docs/blob/master/app/examples/)):

- Minimalistic [html5 vast tag integration](https://github.com/streamrail/player-api-docs/blob/master/app/examples/minimal_js.html) (html5, web & mobile web)
- Minimalistic [flash vpaid tag integration](https://github.com/streamrail/player-api-docs/blob/master/app/examples/minimal_flash.html) (javascript & flash)
- [Vpaid preloading with flash](https://github.com/streamrail/player-api-docs/blob/master/app/examples/flash_preload.html) (javascript & flash)
- [Vpaid preloading with flash, bring player to front only after prelaod is done](https://github.com/streamrail/player-api-docs/blob/master/app/examples/flash_reload_reveal_after.html) (javascript & flash)
- A sequence of [two html5 players with different skip policies](https://github.com/streamrail/player-api-docs/blob/master/app/examples/two_players_sequence_html5.html)
- A sequence of [two flash players with different skip policies](https://github.com/streamrail/player-api-docs/blob/master/app/examples/two_players_sequence_flash.html)
- Use the [Playground](http://play.streamrail.com/index.html) to test out your VAST tags.
- Minimalistic [JW Player 6.12 integration](https://github.com/streamrail/player-api-docs/blob/master/app/examples/jw.html)
- Minimalistic [video.js integration](https://github.com/streamrail/player-api-docs/blob/master/app/examples/vjs)

To run the examples on your machine, clone the repo and install the package deps:

	$ git clone https://github.com/streamrail/player-api-docs.git
	$ cd player-api-docs && npm install


then run a local connect server:

	grunt connect


browse to the examples on your dev machine at [http://localhost:8000/app/examples/](http://localhost:8000/app/examples/)

## <a name="general"></a> General

To get an instance of the player, supply the ID of the container, and a configuration object:

	var player = SR('ad-container1', {
		tech: 'html5',
		companion: false,
		autoplay: true,
		width: 778,
		height: 468,
		content: { // optionally show a content video after the ad
          url:'https://sdk.streamrail.com/demos/debugger/nasa_is_with_you_when_you_fly.mp4',
          id: 'nasa_is_with_you_when_you_fly.mp4',
          title: 'Nasa Video',
          description: 'Cool video by nasa',
          keywords: 'space,nasa',
          categories: 'science'
	    },
		ads: {
			url: 'sample_files/vast.xml',
			skip: {
				enabled: true
			}
		}
	});
	
Events are emitted from the player. For a complete list check out the list of events on the flash/html5 APIs. You can subscribe to events like this:

		// subscribe to the AdVideoStart event
		player.on('AdVideoStart', function(eventDetails) {
			console.log('ad video has actually started');
		});
		
		// subscribe to multiple events
		['AdLoaded',
		'AdStarted',
		'AdVolumeChange',
		'AdImpression',
		'AdVideoStart',
		'AdVideoFirstQuartile',
		'AdVideoMidpoint',
		'AdVideoThirdQuartile',
		'AdVideoComplete',
		'AdClickThru',
		'AdUserClose',
		'AdPaused',
		'AdPlaying',
		'AdError',
		'AdSkipped',
		'AdLoadTimeout']
			.map(function(eventName) {
				player.on(eventName, function(eventDetails) {
					console.log(eventName + ' from player ' + player.sessionID);
				});
		});
		
The player also exposes functions. For a complete list check out the list of events on the flash/html5 APIs. 

	if (player.getTime() > 30) {
		// do something after the video has been playing for 30 sec
	}
	
	// don't allow muting before 10 sec have passed
	var ticker = setInterval(function() {
		if (player().getTime() < 10) {
			if (player.muted()) {
				player.unmute();
			} 
		} else {
			clearInterval(ticker)
		}
	}, 100);
	
The HTML5 API only supports VAST tags, as VPAID tags often return flash or content otherwise problematic for the HTML5 environment. 

When using a VPAID tag (for web), set the tech to "flash". when using VAST tags (for web and mobile), use either "html5" (for web or mobile) or "flash" (for web only).

	var player1 = SR('ad-container1', {
		tech: 'flash', // ad tag can be either VAST or VPAID
		...
		...
		..
	});

	var player2 = SR('ad-container1', {
		tech: 'html5', // ad tag has to be VAST
		...
		...
		..
	});


## <a name="video-content"></a>Video Content

Content and ads can be used independantly of each other (i.e. you can try to get ads from an ad server without having content, and of course, you can render content videos without showing ads). 

The optional content node, if used, has only one mandatory parameter - the source url of the video. The rest of the parameters are optional, but are recommended if you are using ads, as they are reported to the ad servers.

	var player = SR('ad-container1', {
		tech: 'html5',
		companion: false,
		autoplay: true,
		width: 778,
		height: 468,
		content: { // optionally show a content video after the ad
          url:'https://sdk.streamrail.com/demos/debugger/nasa_is_with_you_when_you_fly.mp4',
          id: 'nasa_is_with_you_when_you_fly.mp4',
          title: 'Nasa Video',
          description: 'Cool video by nasa',
          keywords: 'space,nasa',
          categories: 'science'
	    }
	});

	
## <a name="flash-api"></a> Flash Tech API

If you are using VPAID ad tags, you have to use flash tech on the player. 

	var player = SR('ad-container1', {
		tech: 'flash',
		...
		...
	});

### Basic functions

- id() - get player DOM element ID. e.g. "sr-player-ad22f244-e0d9-35e4-bdd4-97ebbd3367b5"
- play() - start playing video if not already playing
- playPreloaded() - start playing an ad that was preloaded. this is only possible if preloadMode was set to true in the general configuration object (this means that ad would not start immediatly, but would be instead prelaoded and waiting for the playPreloaded function call to begin.
- pause() - pause video 
- resume() - resume video
- mute() - mute video
- unmute() - umute video
- dispose() - remove the instance of player from the page and turn off the events for this instance
- stop() - stop video
- seek(time) - seek to time
- getVolume() - get current volume
- setVolume(n) - set volume to n
- getTime() - get current time in video
- isPaused() - is the video currently paused?
- isPlaying() - is the video currently playing?
- isFullscreen() - is the video currently in full screen mode?
- toggleFullscreen() - set the video fullscreen/not full screen
- isLoaded() - is the player ready, all the swf's were loaded
- hide() - hide player
- show() - show player
- isHidden() - is the player currently hidden
- getClip() - get the content video that's currently set 
- getPlaylist() - get the playlist of content video's currently set


### Properties
- sessionID - unique GUID to set this session apart from other possible players being used on the same page 

### Events

**Video Events**

- onBegin
- onFinish
- onLastSecond
- onMetaData
- onMetaDataChange
- onPause
- onResized
- onResume
- onSeek
- onStart
- onStop
- onUpdate
- onBufferEmpty
- onBufferFull
- onBufferStop

**Player Events**

- onBeforeClick
- onLoad
- onUnload
- onMouseOver
- onMouseOut
- onKeyPress
- onVolume
- onMute
- onUnmute
- onFullscreen
- onFullscreenExit
- onClipAdd
- onPlaylistReplace
- onError

**Ad Events**

for a description of ad events, please refer to the [IAB spec](http://www.iab.net/guidelines/508676/digitalvideo/vsuite/vast)

- AdLoaded
- AdStarted
- AdStopped
- AdLinearChange
- AdExpandedChange
- AdRemainingTimeChange
- AdVolumeChange
- AdImpression
- AdVideoStart
- AdVideoFirstQuartile
- AdVideoMidpoint
- AdVideoThirdQuartile
- AdVideoComplete
- AdClickThru
- AdUserAcceptInvitation
- AdUserMinimize
- AdUserClose
- AdPaused
- AdPlaying
- AdLog
- AdError
- AdSkipped
- AdSizeChange
- AdSkippableStateChange
- AdDurationChange
- AdInteraction

The AdError event has an additional details object. To obtain it:

	player.on('AdError', function(event, data) {
		console.log('error code:', data.code);
		console.log('error description:', data.description);
		// console output would look like:
		// error code: -1
		// error description: Publisher ID not valid.
	});
	
On top of IAB ad errors, the following errors are reported with -1 error code

- "vast could not be loaded from url." - the http request to the VAST endpoint returned an error (e.g. 404 or 403)
- "vast response is not well-formed." - the VAST XML contains invalid VAST nodes
- "Publisher ID not valid" - specific LiveRail error
	
**Setting up VAST2-VPAID ad tags**

to specify ads to the flash player, you need to define the ad schedule (pre-roll, mid-roll, etc.). the following is an example of setting up a preroll:

	ads: {
			pauseOnClickThrough: true,
			schedule: [{
				position: 'pre-roll',
				server: {
					type: 'direct',
					tag: 'https://ad4.liverail.com/?LR_PUBLISHER_ID=1331&LR_SCHEMA=vast2-vpaid'
				}
			}]
	}

normally the ad would start immediatly when choosing to autoplay. however, it is possible to specify preloadMode to load the ad without starting it. See example on [vpaid preloading with flash](http://play.streamrail.com/examples/flash_preload.html) (javascript & flash) 
## <a name="html5-api"></a> HTML5 Tech API

If you are using VAST ads (not VPAID), then you may use HTML5 tech. If you are working with mobile web sites, use this option. 


	var player = SR('ad-container1', {
		tech: 'html5',
		...
		...
	});

Normally the ad would start immediatly when choosing to autoplay. however, it is possible to specify preloadMode to load the ad without starting it:

	player.vast.preload()
		.then(function(rslt) {
			console.log(rslt);
			// fill, rslt = Object {timeToPreload: 103, adUrl: "https://cdn-secure.liverail.com/adasset4/1331/229/7969/lo.webm"}
		})
		.fail(function() {
			// no fill
			console.log('no fill')
		});
	
See example on [vast preloading with html5](https://github.com/streamrail/player-api-docs/blob/master/app/examples/html5_vast_preloading.html) (javascript).


### Mobile web autplay
On mobile web, the player is able to auto play some video ads. Some ads would require a warm up period for the player to be able to autoplay them, so the first few impressions would not enjoy autoplay, but after a few minutes the autoplay mechanism will kick in and you will see the ad playing without any user gesture even being made. 

### Basic functions

- autoplay(autoplay) - set autoplay true/false
- bufferedPercent() - how much of the video is buffered (e.g. 25%)
- controls(show) - show or hide controls (e.g. controls(false) to hide)
- currentSrc() -  get the current source of the video
- currentTime() -  get the current time of the video
- dispose() - remove the instance of player from the page and turn off the events for this instance
- duration() - get the duraion of the video being played 
- ended(callback) - do something when the video ends
- exitFullscreen() - exit full screen if full screen is being used
- isFullscreen() - is full screen begin used?
- loop(doLoop) - loop or unloop the video
- muted() - is the video muted?
- pause() - pause the video
- paused() - is the video paused?
- play() - play the video if not already playing 
- poster(src) - set or get the poster attribute of the video
- remainingTime() - how much time is left to the video to end
- requestFullscreen() - request full screen (HTML5 API)
- volume(n) - set or get the volume
- height(h) - set or get the video's height
- hide() - hide video
- id() - get the GUID of the video container
- show() - show the video if hidden
- width() - set or get the video's width

### Properties
- sessionID - unique GUID to set this session apart from other possible players being used on the same page 


### Player Events

- durationchange
- ended
- error
- firstplay
- fullscreenchange
- loadedalldata
- loadeddata
- loadedmetadata
- loadstart
- pause
- play
- progress
- seeked
- seeking
- timeupdate
- volumechange
- waiting
- resize 

**Ad Events**

for a description of ad events, please refer to the [IAB spec](http://www.iab.net/guidelines/508676/digitalvideo/vsuite/vast)

- AdLoaded
- AdError
- AdStarted
- AdImpression
- AdVideoStart
- AdVideoFirstQuartile
- AdVideoMidpoint
- AdVideoThirdQuartile
- AdVideoComplete
- AdClickThru
- AdPaused
- AdPlaying

The AdError event has an additional details object. To obtain it:

	player.on('AdError', function(eventData) {
		console.log('error code:', eventData.code);
		console.log('error description:', eventData. description);
		// console output would look like:
		// error code: -1
		// error description: vast response is not well formed
	});
	

On top of IAB ad errors, the following errors are reported with -1 error code

- "vast response error or empty vast." - the http request to the VAST endpoint returned an error (malformed XML) or an empty vast.

**Setting up VAST ad tags**

Just specify an ads object when initializing the player. you can optionally add skip button configurations, or disable skipping.

		var player1 = SR('ad-container1', {
		tech: 'html5',
		companion: false,
		autoplay: true,
		width: 778,
		height: 468,
		ads: {
			url: '../sample_files/vast.xml',
			skip: {
				enabled: true,
				btnText: 'Continue',
				seconds: 5
			}
		}
	});


## <a name="jw_plugin"></a> Streamrail for JW Player

If you are already using JW Player (version 6.12.x) you could integrate Streamrail's delivery technology simply by including the Streamrail JW Player plugin like so:

First, include your JW Player script as you would normally do:

	<script type="text/javascript" src="https://sdk.streamrail.com/jwplayer/jwplayer.js"></script>
Then, include the Streamrail JW Plugin that you were given by your Streamrail account manager. **Make sure that you include the streamrail script before initiating the player using JavaScript**:

	<script type="text/javascript" src="https://sdk.streamrail.com/jwplayer/jwplayer.streamrail.js"></script>

And that's it, your'e done. Streamrail's plugin will connect to the JW Player instance and provide on-the-fly [DASH](http://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) transcoding on top of Streamrail's CDN network. Streamrail's plugin will automatically serve the video from the Streamrail CDN **after a few minutes** (the video is first transcoded and the Streamrail cache is warmed up before it takes control over the delivery process).

So, for example, if you set the JW Player settings objects with a reference to a video (mp4/mov etc.) like so:

	var settings = {
			file: 'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/ToS-4k-1920.mov',
			autostart: true,
			fallback: false,
			width: 640,
			height: 320
		}
		
Once the input video is ready to be delivered from the Streamrail CDN, it will automatically switch to using Streamrail CDN (until then, the video will be played from your original CDN as usual).

You could also input a DASH stream directly if you already have one like so:

	<script type="text/javascript">
		var settings = {
			file: 'https://sdk.streamrail.com/pepsi/cdn/0.0.1/4067bfbe7ebfaa8551d5548ada69d8a40936ff40/dash/manifest_hd.mpd',
			autostart: true,
			fallback: false,
			width: 640,
			height: 32
		jwplayer.key = '<your JW Player key>';
		jwplayer('jw-container').setup(settings);
	</script>
For a complete example of playing a DASH stream using JW Player and Streamrail's plugin, see [Minimalistic JW Player 6.12 integration](https://github.com/streamrail/player-api-docs/blob/master/app/examples/jw.html), or view the JW Player example on the  [Playground](http://play.streamrail.com/index.html#/jw).

## <a name="vjs_plugin"></a> Streamrail for video.js

If you are already using video.js you could integrate Streamrail's delivery technology simply by including the Streamrail video.js plugin like so:

First, include your video.js script as you would normally do:

	<link href="http://vjs.zencdn.net/4.6/video-js.css" rel="stylesheet">
	<script src="http://vjs.zencdn.net/4.6/video.js"></script>

Then, include the Streamrail video.js that you were given by your Streamrail account manager:

	<script type="text/javascript" src="https://sdk.streamrail.com/video.js/videojs.streamrail.js"></script>

Then, when initializing your video.js player, tell it that you want Streamrail plugin to be enabled like so:

	videojs.streamrail = { enabled: true };
	var player = videojs('my_video');
	   
And that's it, your'e done. Streamrail's plugin will connect to the video.js instance and provide on-the-fly [DASH](http://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) transcoding on top of Streamrail's CDN network. Streamrail's plugin will automatically serve the video from the Streamrail CDN **after a few minutes** (the video is first transcoded and the Streamrail cache is warmed up before it takes control over the delivery process).

So, for example, if you set the video with a reference to a video (mp4/mov etc.) like so:

	<video id="vid1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" autoplay>
		<source src="http://sdk.streamrail.com/pepsi/cdn/0.0.1/366d5ab1829ae452b7e39122213861bc4b20d568/video.mp4" type="video/mp4">
	</video>
		
Once the input video is ready to be delivered from the Streamrail CDN, it will automatically switch to using Streamrail CDN (until then, the video will be played from your original CDN as usual).

You could also input a DASH stream directly if you already have one like so:

	<video id="vid1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" autoplay>
		<source src="https://sdk.streamrail.com/pepsi/cdn/0.0.1/f900457ca09c6bf6680ea62281bbe7490f2c3b1f/dash/manifest.mpd" type='application/dash+xml'>
	</video>
		
For a complete example of playing a DASH stream using video.js and Streamrail's plugin, see minimalistic [video.js integration](https://github.com/streamrail/player-api-docs/blob/master/app/examples/min_vjs.html), or view the video.js example on the [Playground](http://play.streamrail.com/index.html#/vjs).