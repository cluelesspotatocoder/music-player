const songList = [
    {
        name: "Dark Horse",
        artist: "Kate Perry",
        src: "items/darkhorse.mp3",
        cover: "items/darkhorse.jpg"
    },
    {
        name: "Bloodline",
        artist: "Ariana Grande",
        src: "items/bloodline.mp3",
        cover: "items/bloodline.jpeg"
    },
    {
        name: "Tiptoe",
        artist: "Hybs",
        src: "items/tiptoe.mp3",
        cover: "items/tiptoe.jpg"
    },
    {
        name: "Mask Off",
        artist: "Future",
        src: "items/maskoff.mp3",
        cover: "items/maskoff.jpeg"
    },
    {
        name: "New Jeans Remix",
        artist: "Jiandro",
        src: "items/newjeans.mp3",
        cover: "items/newjeans.jpg"
    },
    
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.querySelector('.cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} / ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}
