var video;
var playBtn, pauseBtn, slowerBtn, fasterBtn, skipBtn;
var muteBtn, slider, volumeSpan;
var vintageBtn, origBtn;

window.addEventListener("load", function() {
	console.log("Good job opening the window");
	
	video = document.querySelector("#player1");
	playBtn = document.querySelector("#play");
	pauseBtn = document.querySelector("#pause");
	slowerBtn = document.querySelector("#slower");
	fasterBtn = document.querySelector("#faster");
	skipBtn = document.querySelector("#skip");
	muteBtn = document.querySelector("#mute");
	slider = document.querySelector("#slider");
	volumeSpan = document.querySelector("#volume");
	vintageBtn = document.querySelector("#vintage");
	origBtn = document.querySelector("#orig");

	if (!video) {
		console.error("Video element not found (#player1).");
		return;
	}


	try {
		video.autoplay = false;
		video.loop = false;
	} catch (e) {
		console.warn("Failed to change autoplay/loop properties:", e);
	}

	updateVolumeUI(Math.round(video.volume * 100));


	playBtn.addEventListener("click", handlePlay);
	pauseBtn.addEventListener("click", handlePause);
	slowerBtn.addEventListener("click", handleSlowDown);
	fasterBtn.addEventListener("click", handleSpeedUp);
	skipBtn.addEventListener("click", handleSkip);
	muteBtn.addEventListener("click", handleMute);
	slider.addEventListener("input", handleSlider); // 'input' for live response
	vintageBtn.addEventListener("click", handleVintage);
	origBtn.addEventListener("click", handleOrig);

	console.log("Video controls initialized. Autoplay:", video.autoplay, "Loop:", video.loop);
});



function handlePlay() {
	video.play();
	updateVolumeUI(Math.round(video.volume * 100));
	console.log("Play Video. Volume:", (video.volume * 100).toFixed(0) + "%");
}

function handlePause() {
	video.pause();
	console.log("Pause Video.");
}

// Slowign down
function handleSlowDown() {
	video.playbackRate = roundToFiveDecimals(video.playbackRate * 0.9);
	console.log("New playback rate (slower):", video.playbackRate);
}

// Speeding Up
function handleSpeedUp() {
	var inverse = 1 / 0.9;
	video.playbackRate = roundToFiveDecimals(video.playbackRate * inverse);
	console.log("New playback rate (faster):", video.playbackRate);
}


function handleSkip() {
	var oldTime = video.currentTime;
	var newTime = oldTime + 10;

	if (isFinite(video.duration) && newTime >= video.duration) {
		video.currentTime = 0;
		console.log("Skip Ahead: exceeded duration; returning to start (0s).");
	} else {
		video.currentTime = newTime;
		console.log("Skip Ahead: new time =", video.currentTime.toFixed(2), "seconds");
	}
}


function handleMute() {
	video.muted = !video.muted;
	muteBtn.textContent = video.muted ? "Unmute" : "Mute";
	console.log(video.muted ? "Muted" : "Unmuted");
	updateVolumeUI(Math.round(video.volume * 100));
}

function handleSlider(e) {
	var val = Number(e.target.value); // 0..100
	video.volume = val / 100;
	if (video.muted && video.volume > 0) {
		video.muted = false;
		muteBtn.textContent = "Mute";
	}
	updateVolumeUI(val);
	console.log("Volume set to:", val + "%");
}

function handleVintage() {
	video.classList.add("oldSchool");
	console.log("Added 'oldSchool' class to video.");
}

function handleOrig() {
	video.classList.remove("oldSchool");
	console.log("Removed 'oldSchool' class from video.");
}

function roundToFiveDecimals(num) {
	return Math.round(num * 100000) / 100000;
}

function updateVolumeUI(percent) {
	if (volumeSpan) {
		volumeSpan.textContent = percent + "%";
	}
	if (slider && Number(slider.value) !== percent) {
		slider.value = percent;
	}
}
