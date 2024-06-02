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

async function openCamera() {
    $("#analyze-btn").show();
    $("#cameraVid").show();
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        videoStream = stream;
        $video[0].srcObject = videoStream;
    });
    $(".button").attr("class", "button-2");
}

function closeCamera() {
    $("#analyze-btn").hide();
    $("#cameraVid").hide();
    videoStream.getTracks().forEach(function(track) {
        track.stop();
    });
    $(".button-2").attr("class", "button");
}

function takePic() {
    canvas.width = 423;
    canvas.height = 284;
    let ctx = canvas.getContext('2d');
    ctx.drawImage($video[0], 0, 0, canvas.width, canvas.height);

    $img.show();
    analyze(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

async function analyze(canvasData) {
    $("#img-data").val(JSON.stringify(canvasData.data));
    $("#form")[0].requestSubmit();
}

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
