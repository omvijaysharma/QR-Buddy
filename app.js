let qrimage = document.querySelector("#qrimage");
let input = document.querySelector("#input");
let downloadLink = document.querySelector("#downloadLink");

function generateQR() {
    let qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(input.value);
    qrimage.src = qrUrl;
    downloadLink.href = qrUrl;
    downloadLink.setAttribute("download", "qr_code.png");
    downloadLink.style.display = "block";
}
