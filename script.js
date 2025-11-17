let canvas = document.getElementById("canvas");
let connections = document.getElementById("connections");
let lineColor = document.getElementById("lineColor");
let bgColor = document.getElementById("bgColor");

let scale = 1;
let isPanning = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

let elements = [];
let connecting = false;
let firstElement = null;

// --------------------
// ZOOM con la rueda
// --------------------
document.getElementById("canvasContainer").addEventListener("wheel", (evt) => {
    evt.preventDefault();

    let zoomIntensity = 0.1;
    let delta = evt.deltaY > 0 ? -1 : 1;
    let newScale = scale + delta * zoomIntensity;

    if (newScale < 0.3) newScale = 0.3;
    if (newScale > 3) newScale = 3;

    scale = newScale;
    canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
});

// --------------------
// MOVER EL LIENZO
// --------------------
document.getElementById("canvasContainer").addEventListener("mousedown", (evt) => {
    if (evt.target !== document.getElementById("canvasContainer")) return;
    isPanning = true;
    startX = evt.clientX - offsetX;
    startY = evt.clientY - offsetY;
});

document.addEventListener("mousemove", (evt) => {
    if (!isPanning) return;
    offsetX = evt.clientX - startX;
    offsetY = evt.clientY - startY;
    canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
});

document.addEventListener("mouseup", () => {
    isPanning = false;
});

// --------------------
// CREAR TEXTO
// --------------------
document.getElementById("addText").onclick = () => {
    let div = document.createElement("div");
    div.className = "elemento";
    div.contentEditable = true;
    div.innerText = "Nuevo texto";
    div.style.left = "100px";
    div.style.top = "100px";
    canvas.appendChild(div);

    elements.push(div);
    activarMovimiento(div);
};

// --------------------
// CREAR IMAGEN
// --------------------
document.getElementById("addImage").onclick = () => {
    document.getElementById("imgLoader").click();
};

document.getElementById("imgLoader").onchange = (evt) => {
    let file = evt.target.files[0];
    let url = URL.createObjectURL(file);

    let div = document.createElement("div");
    div.className = "elemento";
    div.style.left = "100px";
    div.style.top = "100px";

    let img = document.createElement("img");
    img.src = url;
    div.appendChild(img);

    canvas.appendChild(div);
    elements.push(div);
    activarMovimiento(div);
};

// --------------------
// CONECTAR ELEMENTOS CTRL + C
// --------------------
document.addEventListener("keydown", (evt) => {
    if (evt.ctrlKey && evt.key === "c") {
        connecting = true;
        firstElement = null;
    }
});

elements.forEach(() => {}); // placeholder

canvas.addEventListener("click", (evt) => {
    if (!connecting) return;
    if (!evt.target.classList.contains("elemento")) return;

    if (!firstElement) {
        firstElement = evt.target;
        evt.target.style.borderColor = "red";
    } else {
        crearLinea(firstElement, evt.target);
        firstElement.style.borderColor = "#aaa";
        connecting = false;
    }
});

// --------------------
// CREAR LÍNEA
// --------------------
function crearLinea(a, b) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", lineColor.value);
    line.setAttribute("stroke-width", "3");
    connections.appendChild(line);

    function actualizar() {
        let ar = a.getBoundingClientRect();
        let br = b.getBoundingClientRect();
        let cx = connections.getBoundingClientRect();

        line.setAttribute("x1", ar.left - cx.left + ar.width / 2);
        line.setAttribute("y1", ar.top - cx.top + ar.height / 2);
        line.setAttribute("x2", br.left - cx.left + br.width / 2);
        line.setAttribute("y2", br.top - cx.top + br.height / 2);
    }

    actualizar();
    setInterval(actualizar, 20);
}

// --------------------
// MOVER ELEMENTOS
// --------------------
function activarMovimiento(div) {
    let moving = false;
    let mx, my;

    div.addEventListener("mousedown", (evt) => {
        moving = true;
        mx = evt.clientX - parseInt(div.style.left);
        my = evt.clientY - parseInt(div.style.top);
    });

    document.addEventListener("mousemove", (evt) => {
        if (!moving) return;
        div.style.left = evt.clientX - mx + "px";
        div.style.top = evt.clientY - my + "px";
    });

    document.addEventListener("mouseup", () => moving = false);
}

// --------------------
// FONDO
// --------------------
bgColor.oninput = () => {
    document.getElementById("canvasContainer").style.background = bgColor.value;
};

// --------------------
// EXPORTAR A PDF
// --------------------
document.getElementById("exportPDF").onclick = () => {
    alert("Exportar PDF se agregará con html2canvas + jsPDF en la siguiente versión");
};