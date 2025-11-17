body {
    margin: 0;
    font-family: Arial, sans-serif;
    overflow: hidden;
}

#topBar {
    width: 100%;
    background: #222;
    padding: 10px;
    color: white;
    display: flex;
    gap: 10px;
}

#canvasWrapper {
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
    background: #f0f0f0;
    cursor: grab;
}

#canvasWrapper:active {
    cursor: grabbing;
}

#canvas {
    width: 3000px;
    height: 3000px;
    position: absolute;
    transform-origin: 0 0;
}

.textBox {
    position: absolute;
    background: white;
    border: 1px solid #888;
    padding: 10px;
    border-radius: 8px;
    min-width: 150px;
    min-height: 50px;
    resize: both;
    overflow: auto;
}

.textBox:focus {
    outline: none;
    border: 2px solid blue;
}

.imageBox {
    position: absolute;
    border: 2px solid #444;
    border-radius: 6px;
    resize: both;
    overflow: hidden;
}

.imageBox img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

#contextMenu {
    position: absolute;
    background: #222;
    color: white;
    padding: 8px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: 9999;
}

.hidden {
    display: none;
}

#lineLayer {
    position: absolute;
    top: 0;
    left: 0;
    width: 3000px;
    height: 3000px;
    pointer-events: none;
}
