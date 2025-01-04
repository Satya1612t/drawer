
// Step 1. Get the canvas context, Context type = 2d.
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


// Step 2. Set Canvas width & height.
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//  Step 3. Describing variables for Draw, Earse and CurrentColor functionality.
let isDrawing = false;
let isErasing = false;
let currentColor = "#faacac"

//  Step 4. Update color display
const updateColorPen = () => {
    const colorBox = document.getElementById('color');
    colorBox.style.backgroundColor = currentColor
}


// Step 5. ME - start drawing function
const startDrawing = (x, y) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(x, y)
}


// Step 6. ME - draw lines
const draw = (x, y) => {
    if (!isDrawing) return

    else if (isErasing) {
        context.clearRect(x - 10, y - 10, 20, 20);
    }
    else {
        context.strokeStyle = currentColor;
        context.lineWidth = 3
        context.lineCap = "round"
        context.lineTo(x, y)
        context.stroke();
    }
}

// Step 6. ME - stop drawing
const stopDrawing = () => {
    isDrawing = false;
    context.closePath();
}

//All MouseEvents (ME)

canvas.addEventListener("mousedown", (e) => startDrawing(e.clientX, e.clientY));
canvas.addEventListener("mousemove", (e) => draw(e.clientX, e.clientY));
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

//All TouchEvents (TE)
canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    startDrawing(touch.clientX, touch.clientY);
});
canvas.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    draw(touch.clientX, touch.clientY);
});
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

// Eraser Button
document.getElementById('eraser').addEventListener('click', () => {
    isErasing = !isErasing;
    const eraser = document.getElementById('eraser');
    eraser.textContent = isErasing ? " Stop Erasing" : "Eraser 🧼"
})

// Color change button
document.getElementById("pen").addEventListener("click", () => {
    currentColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    isErasing = false;
    const eraser = document.getElementById("eraser");
    eraser.textContent = isErasing ? "Stop Erasing" : "Eraser 🧼";
    updateColorPen();
});

updateColorPen();
