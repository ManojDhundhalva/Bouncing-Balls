let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let interval;

let colorArray = [

    "#2185C5",
    "#7ECEFD",
    "#FFF6E5",
    "#FF7F66"

    // "#00E3CC",
    // "#32A89C",
    // "#009688",
    // "#44E3D3",
    // "#00635A",

    // "#8C376E",
    // "#BF93B8",
    // "#CEF2F2",
    // "#03A696",
    // "#07D99D",

    // "#DAFDBA",
    // "#9AEBA3",
    // "#45C4B0",
    // "#13678A",
    // "#012030"
];

class myCircle {
    constructor(x, y, radius, dx, dy, color, friction) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.friction = friction;
    }

    draw() {
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
    }

    update() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    gravityUpdate() {
        if (this.y + this.radius + this.dy > (window.innerHeight)) {
            this.dy = -this.dy * (this.friction);
        }
        else {
            this.dy += 1;
        }

        if (this.x + this.radius + this.dx > (window.innerWidth) || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.y += this.dy;
        this.x += this.dx;
    }
};

let myCircleArray = [];
init();
function init() {
    for (let i = 0; i < 400; i++) {

        let radius = 30;
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];
        let x = Math.floor(Math.random() * (window.innerWidth - 2 * radius)) + radius;
        let y = Math.floor(Math.random() * (window.innerHeight - 4 * radius)) + radius;
        let dx = Math.floor((Math.random() - 0.5) * 6);

        myCircleArray.push(new myCircle(x, y, radius, dx, 0, color, 0.95));
    }
}
// for (let i = 0; i < myCircleArray.length; i++) {
// myCircleArray[i].draw();
// myCircleArray[i].gravityUpdate();
// }
console.log(myCircleArray);
// let oneCircle = new myCircle(200, 200, 60, 0, 0, "red", 100);

animate();
function animate() {
    interval = requestAnimationFrame(animate);

    context.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < myCircleArray.length; i++) {
        myCircleArray[i].draw();
        myCircleArray[i].gravityUpdate();
    }
};
