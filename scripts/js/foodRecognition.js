$("#analyze-btn").hide();
$("#canvas").hide();
$("#cameraVid").hide();
let $img = $("#image");
$img.hide();
let canvas = $('#canvas')[0];

let videoStream;
let $video = $("#cameraVid");
$video.attr({
    "playsinline": "",
    "autoplay": "",
    "muted": ""
});

let model, webcam, labelContainer, maxPredictions;

const facingMode = 'user';
const constraints = {
    audio: false,
    video: {
        facingMode: facingMode
    }
};

const KEY = "keyForTheLocalSessionForThePredictionsMadeByTheModel";
const URL = "<teachable-url>";

async function openCamera() {
    $("#analyze-btn").show();
    $("#cameraVid").show();
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        videoStream = stream;
        $video[0].srcObject = videoStream;
    });
}

function closeCamera() {
    $("#analyze-btn").hide();
    $("#cameraVid").hide();
    videoStream.getTracks().forEach(function(track) {
        track.stop();
    });
}

function takePic() {
    canvas.width = $video[0].videoWidth;
    canvas.height = $video[0].videoHeight;
    let ctx = canvas.getContext('2d');
    ctx.drawImage($video[0], 0, 0, canvas.width, canvas.height);
    let imgDataUrl = canvas.toDataURL("image/jpeg");
    $img[0].src = imgDataUrl;

    $img.show();
    analyze(imgDataUrl);
}

async function analyze(image) {
    const prediction = await model.predict(canvas);
    let d = JSON.stringify(prediction);
    $("#img-data").val(d)
    window.sessionStorage[KEY] = d;
    $("#form")[0].requestSubmit();
}

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

init();

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
        $('header').addClass('visible').removeClass('hidden');
    } else {
        $('header').addClass('hidden').removeClass('visible');
    }
});
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting){
            entry.target.classList.add("show");
        } 
        else { entry.target.classList.remove("show");}
    });
});
const paraelements = document.querySelectorAll('.para');
paraelements.forEach((el)=> observer.observe (el));
