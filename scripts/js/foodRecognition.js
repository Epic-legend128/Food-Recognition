$("#analyze-btn").hide();
$("#canvas").hide();

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

async function openCamera() {
    let videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    $video[0].srcObject = videoStream;
    $("#analyze-btn").show();
}

function closeCamera() {
    $("#analyze-btn").hide();
    videoStream.getTracks().forEach(function(track) {
        track.stop();
    });
}

function takePic() {
    let canvas = $('#canvas')[0];
    let ctx = canvas.getContext('2d');
    ctx.drawImage($video[0], 0, 0, canvas.width, canvas.height);
    let imgDataUrl = canvas.toDataURL("image/jpeg");

    analyze(imgDataUrl);
}

function analyze(image) {
    //analyze picture using model
}