const BACKGROUND_COLLOR = '#000000'
const LINE_COLOUR = '#BCFF00'
const LINE_WIDTH = 15;
var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;
var isPainting = false;

var canvas;
var context;


function prepareCanvas() {
    // console.log('Preparing canvas');
    canvas = document.getElementById('my_canvas');
    context = canvas.getContext('2d');
    context.fillStyle = BACKGROUND_COLLOR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    document.addEventListener('mousedown', function (event) {
        // console.log('mouse down');
        isPainting = true;
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetTop;
    });

    document.addEventListener('mousemove', function (event) {
        if (isPainting) {
            previousX = currentX;
            previousY = currentY;
            currentX = event.clientX - canvas.offsetLeft;
            currentY = event.clientY - canvas.offsetTop;
            draw();
        }

    });
    document.addEventListener('mouseup', function (event) {
        // console.log('mouse up');
        isPainting = false;
    });
    canvas.addEventListener('mouseleave', function (event) {
        isPainting = false;
    });


    //Touch events
    canvas.addEventListener('touchstart', function (event) {
        // console.log('tuch down');
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;
    });
    canvas.addEventListener('touchend', function (event) {
        isPainting = false;
    });


    canvas.addEventListener('touchmove', function (event) {
        if (isPainting) {
            previousX = currentX;
            previousY = currentY;
            currentX = event.touches[0].clientX - canvas.offsetLeft;
            currentY = event.touches[0].clientY - canvas.offsetTop;
            draw();
        }
    });
}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}