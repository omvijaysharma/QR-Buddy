const fileInput = document.querySelector("input");
const imageContainer = document.querySelector(".img-scan");
const data = document.querySelector(".data");
let scan = document.querySelector(".scan-line");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const imgUrl = URL.createObjectURL(file);
  
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
    if (qrCode) {
      data.innerHTML = "Scanning.....";
      scan.style.display = "initial";
      setTimeout(() => {
        scan.style.display = "none";
        navigator.vibrate(0);
        data.innerHTML = qrCode.data;
        // window.location.href = qrCode.data; // Remove this line
      }, 5000);
    } else {
      data.innerHTML = "Scanning.....";
      scan.style.display = "initial";
      setTimeout(() => {
        scan.style.display = "none";
        data.innerHTML = "No QR code found in the image";
      }, 5000);
    }
  };

  let image = document.createElement("img");
  image.setAttribute("src", imgUrl);
  imageContainer.innerHTML = "";
  imageContainer.appendChild(image);
  img.src = URL.createObjectURL(file);
});

function startScan() {
  const constraints = {
    video: {
      facingMode: { exact: "environment" },
    },
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scanArea = {  
        x: canvas.width * 0.2,
        y: canvas.height * 0.2,
        width: canvas.width * 0.6,
        height: canvas.height * 0.6,
      };

      function scan() {
        requestAnimationFrame(scan);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(scanArea.x, scanArea.y, scanArea.width, scanArea.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCode) {
          console.log(qrCode.data);
        }
      }

      video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        setTimeout(scan, 100);
      });

      document.body.appendChild(video);

      const scanButton = document.querySelector("button");
      scanButton.addEventListener("click", () => {
        startScan();
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

const copyButton = document.querySelector(".copy-logo img");

copyButton.addEventListener('click', function() {
  let textarea = document.createElement("textarea");
  textarea.value = data.innerHTML;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  copyButton.setAttribute("src", "/success.png");
  document.body.removeChild(textarea);

  setTimeout(function() {
    copyButton.setAttribute("src", "/copy (1).png");
  }, 5000);
});
