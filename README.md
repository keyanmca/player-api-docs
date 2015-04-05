# streamrail video player for web

![streamrail logo](https://avatars2.githubusercontent.com/u/8501254?v=3&s=200)


## Quickstart

Dive into the samples:

- minimalistic vast tag integration (html5, web & mobile web)
- minimalistic vpaid tag integration (javascript & flash)
- a sequence of two players with different skip policies

To run the examples, first install the package deps:
```
cd player-api-docs && npm install
```

then run a local connect server:
```
grunt connect
```

you can now browse to the examples at localhost (e.g. http://localhost:8000/app/examples/minimal_js.html)

## Overview


### General

To get an instance of the player, supply the ID of the container, and a configuration object:

	var player = SR('ad-container1', {
		tech: 'html5',
		companion: false,
		autoplay: true,
		width: 778,
		height: 468,
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
	
## Flash API

### Basic functions

- id() - get player DOM element ID. e.g. "sr-player-ad22f244-e0d9-35e4-bdd4-97ebbd3367b5"
- play() - start playing video if not already playing
- pause() - pause video 
- resume() - resume video
- mute() - mute video
- unmute() - umute video
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

**Setting up VAST2-VPAID ad tags**

to specify ads to the flash player, you need to define the ad schedule (pre-roll, mid-roll, etc.). the following is an example of setting up a preroll:

	ads: {
			pauseOnClickThrough: true,
			schedule: [{
				position: 'pre-roll',
				server: {
					type: 'direct',
					tag: 'https://ad4.liverail.com/?LR_PUBLISHER_ID=1331&LR_SCHEMA=vast2-vpaid'.replace(/&/g, '__amp__')
				}
			}]
	}

## HTML5 API

### Basic functions

- autoplay(autoplay) - set autoplay true/false
- bufferedPercent() - how much of the video is buffered (e.g. 25%)
- controls(show) - show or hide controls (e.g. controls(false) to hide)
- currentSrc() -  get the current source of the video
- currentTime() -  get the current time of the video
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


