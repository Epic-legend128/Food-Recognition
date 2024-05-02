$("#analyze-btn").hide();
$("#canvas").hide();
$("#cameraVid").hide();
let $img = $("#image");
$img.hide();

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
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        videoStream = stream;
        $video[0].srcObject = videoStream;
    });
    $("#analyze-btn").show();
    $("#cameraVid").show();
}

function closeCamera() {
    $("#analyze-btn").hide();
    $("#cameraVid").hide();
    videoStream.getTracks().forEach(function(track) {
        track.stop();
    });
}

function takePic() {
    let canvas = $('#canvas')[0];
    canvas.width = $video[0].videoWidth;
    canvas.height = $video[0].videoHeight;
    let ctx = canvas.getContext('2d');
    ctx.drawImage($video[0], 0, 0, canvas.width, canvas.height);
    let imgDataUrl = canvas.toDataURL("image/jpeg");
    $img[0].src = imgDataUrl;

    $img.show();
    analyze(imgDataUrl);
}

function analyze(image) {
    const img = document.getElementById('image');
    console.log(img);
    cocoSsd.load().then(model => {
        model.detect(img).then(predictions => {
            console.log('Predictions: ', predictions);
        });
    });
}