let nextVideo;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: `zBjJUV-lzHo`,
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

// As the current video ends fetch the next video from the server (fetchNectVide())
// Then load that video and play it :).
async function  onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    await fetchNextVideo();
    console.log("Inside Onplayer ready");
    console.log(nextVideo);
    player.loadVideoById({'videoId': nextVideo,
               'startSeconds': 1});
  }
}


function stopVideo() {
  player.stopVideo();
}



// Fetch the next song that is to be played
async function fetchNextVideo() {
  await fetch("/getNextVideoId")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
      console.log("VideoId: " + res.videoId);
      nextVideo = res.videoId;
    });
}

// As the current video is ready to be played add the next video.
