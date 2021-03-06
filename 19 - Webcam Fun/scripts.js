const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
          };
    }).catch(function(err) { console.log(err.name + ": " + err.message);});
    
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function redEffect(pixels) {
    for(let i=0; i<pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //g
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //b 
    }
    return pixels;
}


function takePhoto() {
    //played the sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href=data;
    link.setAttribute('download', 'face');
    //link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="face"/>`;
    strip.insertBefore(link, strip.firstChild);
}

video.addEventListener('canplay', paintToCanvas);


getVideo();
