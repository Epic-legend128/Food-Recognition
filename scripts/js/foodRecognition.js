let videoStream;
let $video = $("#cameraVid");
$video.attr({
    "playsinline": "",
    "autoplay": "",
    "muted": ""
});

const facingMode = 'user';
const constraints = {
    audio: false,
    video: {
        facingMode: facingMode
    }
};

function openCamera() {
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        $video[0].srcObject = stream;
        videoStream = stream;
    });
}

function closeCamera() {
    videoStream.getTracks().forEach(function(track) {
        track.stop();
    });
}