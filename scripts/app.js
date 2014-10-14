var player = document.querySelector('audio');

if (navigator.mozAudioChannelManager) {
  navigator.mozAudioChannelManager.volumeControlChannel = 'content';
} 

var audioCtx = new AudioContext();
var source = audioCtx.createMediaElementSource(player);
audioCtx.mozAudioChannelType = 'content';
source.connect(audioCtx.destination);

player.addEventListener('mozinterruptbegin', function() {
  var notification = new Notification('Metal interrupted!', { body: "Something more important?" });
});

player.addEventListener('mozinterruptend', function() {
  var notification = new Notification('Metal resumed!', { body: "Important thing finished." });
}); 

if (navigator.mozAudioChannelManager) {
  navigator.mozAudioChannelManager.onheadphoneschange = function() {
    if(navigator.mozAudioChannelManager.headphones == true) {
      var notification = new Notification('Headphones plugged in!');
    } else {
      var notification = new Notification('Headphones unplugged!');
    }
  }
}