
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(playOn, 1000));

function playOn(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}
const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime !== null) {
  player.setCurrentTime(savedTime);
}