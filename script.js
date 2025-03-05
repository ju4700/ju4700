// Particle System
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.type = Math.random() > 0.5 ? 'ml' : 'cyber';
        this.hue = this.type === 'ml' ? 300 : 180; // Magenta for ML, Cyan for Cyber
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.hue += 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue % 360}, 80%, 50%)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${this.hue % 360}, 80%, 50%)`;
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Navigation and Module Interactions
document.querySelectorAll('.nav-link, .module').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'perspective(600px) translateZ(10px)';
        element.style.boxShadow = '0 0 30px rgba(0, 204, 255, 0.8)';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(600px) translateZ(0)';
        element.style.boxShadow = 'none';
    });
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});