let playButton = document.querySelector(".player__button[title='Toggle Play']");
let volumeInput = document.querySelector("input[name=volume]");
let rangeInput = document.querySelector("input[name=playbackRate]");
let video = document.querySelector('video');
let progressBar = document.querySelector('.progress__filled');
let progress = document.querySelector('.progress');

let playbackBtn = document.querySelector('.player__button[data-skip="-10"]');
let playForwardBtn = document.querySelector('.player__button[data-skip="25"]');


let isPlaying = false;
let time = 0;
let vDuration = 0;
let currentVolume = 0;


function play() {
    if(!isPlaying) {
        //get total duration in minutes
        vDuration = (video.duration/60).toFixed(2);
        video.play();
        playButton.innerHTML = '&#10074;'+'&#10074;'; 
        isPlaying = !isPlaying;
    } else {
        video.pause();
        playButton.innerHTML = '►';
        isPlaying = !isPlaying;
    }    
}

function setVolume() {
    video.volume = this.value;
}

function setPlayRate() {
    video.playbackRate = this.value;
}


function playBackward() {
    let rate = parseInt(this.dataset.skip);
    video.currentTime+=rate;
}

function playForward() {
    let rate = parseInt(this.dataset.skip);
    video.currentTime+=rate;
}


(function updateProgressBar(){
        video.ontimeupdate = () => {
        time = ((video.currentTime)/60).toFixed(2);
        let progressRate = (time * 100) / vDuration;
        progressBar.style.flexBasis = `${progressRate}%`;
      };
})();



function changeTime(e) {
    let newTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = newTime;
}


playButton.addEventListener('click', play);
volumeInput.addEventListener('input', setVolume);
rangeInput.addEventListener('input', setPlayRate);
playbackBtn.addEventListener('click', playBackward);
playForwardBtn.addEventListener('click', playForward);


let mousedown = false;
progress.addEventListener('click', changeTime);
progress.addEventListener('mousemove', e => mousedown && changeTime(e));
progress.addEventListener('mousedown', () => mousedown=true);
progress.addEventListener('mouseup', () => mousedown=false);







