var context = new (window.AudioContext || window.webkitAudioContext)();
var windchimes;

function loadChimes(method, url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.send();
  });
}

function playChimes() {
  var chimes = context.createBufferSource();
  chimes.buffer = windchimes;
  chimes.connect(context.destination);
  chimes.start(0);
};

loadChimes('GET', 'windchimes.mp3')
  .then(function(res) {
    context.decodeAudioData(res, function(buffer) {
      windchimes = buffer;
      playChimes();
    });
  });
