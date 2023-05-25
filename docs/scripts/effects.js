const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numCells = 50;
const cellSize = 100;
const connectThreshold = 300;
const maxSpeed = 1;
const cellColor = 'rgb(255, 255, 255)';

const cells = [];

let mouseX = 0;
let mouseY = 0;

class Cell {
    constructor(x, y) 
    {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * maxSpeed * 2 - maxSpeed;
        this.vy = Math.random() * maxSpeed * 2 - maxSpeed;
    }

    update() 
    {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }
    }

    draw()  
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, cellSize / 2, 0, Math.PI * 2);
        ctx.strokeStyle = cellColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}

function createCells()
{
    for (let i = 0; i < numCells; i++)
    {
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * canvas.height;
        cells.push(new Cell(randomX, randomY));
    }
}

function drawWires() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cells.length; i++) 
    {
        cells[i].update();
        cells[i].draw();

        const distance = Math.sqrt((cells[i].x - mouseX) ** 2 + (cells[i].y - mouseY) ** 2);

        if (distance < connectThreshold) 
        {
            ctx.beginPath();
            ctx.moveTo(cells[i].x, cells[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.closePath();
        }
    }

    requestAnimationFrame(drawWires);
}

createCells();
drawWires();


document.addEventListener('mousemove', (event) => 
{
    mouseX = event.clientX;
    mouseY = event.clientY;
});

  
function resizeCanvas() 
{
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}
  
window.addEventListener('resize', resizeCanvas);