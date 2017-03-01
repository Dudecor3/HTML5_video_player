const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);


function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    var percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = percent + '%';
}
function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function add_events() {

    var i = 0;
    var mouse_down = false;

    for (i; i < skipButtons.length; i++) {
        skipButtons[i].addEventListener('click', skip)
    }

    for (i; i < ranges.length; i++) {
        ranges[i].addEventListener('change', handleRangeUpdate);
        ranges[i].addEventListener('mousemove', handleRangeUpdate);
    }

    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', function (event) {
        return mouse_down && scrub(event);
    });
    progress.addEventListener('mouse_down', function () {
        return mouse_down = true;
    });
    progress.addEventListener('mouseup', function () {
        return mouse_down = false;
    });
}

add_events();