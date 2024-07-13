let qrimage = document.querySelector("#qrimage");
let input = document.querySelector("#textinput");
let downloadbutton = document.querySelector("#downloadbutton");

function generateQR() {
    let qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(input.value);
    qrimage.src = qrUrl;
    downloadbutton.href = qrUrl;
    downloadbutton.setAttribute("download", "qr_code.png");
    downloadbutton.style.display = "block";
}
