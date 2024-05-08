document.getElementById('analyzeButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please upload an image first.');
        return;
    }

    try {
        const model = await cocoSsd.load();
        console.log("COCO-SSD model loaded.");

        const image = new Image();
        const reader = new FileReader();
        reader.onload = function (event) {
            image.src = event.target.result;
            console.log("Image loaded successfully.");

            image.onload = async function () {
                const canvas = document.getElementById('output');
                const ctx = canvas.getContext('2d');

                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                const predictions = await model.detect(image);
                console.log("Object detection completed.");

                predictions.forEach((prediction) => {
                    ctx.beginPath();
                    ctx.rect(...prediction.bbox);
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = 'red';
                    ctx.stroke();

                    ctx.fillStyle = 'red';
                    ctx.font = '18px Arial';
                    ctx.fillText(
                        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
                        prediction.bbox[0],
                        prediction.bbox[1] > 20 ? prediction.bbox[1] - 10 : 20
                    );
                });
            };
        };
        reader.readAsDataURL(fileInput.files[0]);
    } catch (error) {
        console.error("Error analyzing photo:", error);
    }
});
