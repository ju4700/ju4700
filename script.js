// GSAP Animations
gsap.registerPlugin();

// Space Background with White Stars
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starCount = 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 1;
        this.speedZ = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.z -= this.speedZ;
        if (this.z <= 0) {
            this.z = 1000;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        const scale = 1000 / this.z;
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = this.size * scale;

        if (x2d >= 0 && x2d <= canvas.width && y2d >= 0 && y2d <= canvas.height) {
            ctx.beginPath();
            ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.z / 1000})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
        }
    }
}

function initStars() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

initStars();
animateStars();

// 3D Black Hole Code Shards (More Correct, Fixed Grayish Color)
const shardContainer = document.querySelector('.code-shards');
const shards = [];
const shardCount = 25;

class CodeShard {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'shard';
        this.element.textContent = this.randomCode();
        this.x = window.innerWidth / 2 + (Math.random() - 0.5) * 600;
        this.y = window.innerHeight / 2 + (Math.random() - 0.5) * 600;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 20 + 5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.opacity = Math.random() * 0.4 + 0.6; // Slightly varied opacity (0.6-1)
        shardContainer.appendChild(this.element);
        this.updateStyle();
    }

    randomCode() {
        const snippets = [
            'func()', 'class{}', 'if()', 'while()', 'for(i)', 
            'x=>y', '0xFF', '{...}', 'array[]', 'map()',
            'async', 'await', 'try{}', 'catch(e)', 'this.x',
            'import', 'export', 'const', 'let', 'var',
            '++i', '--j', 'rand()', 'log()', 'sqrt()'
        ];
        return snippets[Math.floor(Math.random() * snippets.length)];
    }

    update() {
        const bhX = window.innerWidth / 2;
        const bhY = window.innerHeight / 2;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Confine within 600px radius with smooth bounce
        const dx = bhX - this.x;
        const dy = bhY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 600) {
            const angle = Math.atan2(dy, dx);
            this.x = bhX + Math.cos(angle) * 600;
            this.y = bhY + Math.sin(angle) * 600;
            this.vx = -this.vx * 0.7; // Consistent dampening
            this.vy = -this.vy * 0.7;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05; // Reset spin
        }

        // Smooth velocity adjustments
        this.vx = Math.min(Math.max(this.vx, -1.5), 1.5); // Cap velocity
        this.vy = Math.min(Math.max(this.vy, -1.5), 1.5);
        if (Math.random() < 0.01) { // 1% chance for subtle nudge
            this.vx += (Math.random() - 0.5) * 0.1;
            this.vy += (Math.random() - 0.5) * 0.1;
        }

        this.updateStyle();
    }

    updateStyle() {
        gsap.set(this.element, {
            x: this.x,
            y: this.y,
            scale: this.size / 25,
            rotationZ: this.rotation,
            opacity: this.opacity,
            fontSize: `${this.size}px`,
            textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' // Fixed subtle glow
        });
    }
}

function initShards() {
    for (let i = 0; i < shardCount; i++) {
        shards.push(new CodeShard());
    }
}

function animateShards() {
    shards.forEach(shard => shard.update());
    requestAnimationFrame(animateShards);
}

initShards();
animateShards();

// GSAP Animations
// Black Hole
gsap.to('.black-hole', {
    rotationZ: 360,
    duration: 20,
    ease: 'none',
    repeat: -1,
    transformOrigin: 'center center'
});

gsap.to('.black-hole', {
    scale: 1.05,
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
});

// Floating Items with Diverse, Slower Motion
const floatingItems = [
    { id: 'letter-j', radius: 320, angle: 0, angleSpeed: 0.005 },
    { id: 'letter-u', radius: 300, angle: Math.PI / 3, angleSpeed: 0.007 },
    { id: 'letter-4', radius: 340, angle: 2 * Math.PI / 3, angleSpeed: 0.004 },
    { id: 'letter-7', radius: 310, angle: Math.PI, angleSpeed: 0.006 },
    { id: 'letter-0', radius: 330, angle: 4 * Math.PI / 3, angleSpeed: 0.0055 },
    { id: 'letter-0-2', radius: 290, angle: 5 * Math.PI / 3, angleSpeed: 0.0065 },
    { id: 'projects-item', radius: 250, angle: Math.PI / 2, angleSpeed: 0.008 },
    { id: 'skills-item', radius: 270, angle: 3 * Math.PI / 2, angleSpeed: 0.0075 },
    { id: 'linkedin-item', radius: 230, angle: Math.PI / 4, angleSpeed: 0.009 },
    { id: 'github-item', radius: 240, angle: 5 * Math.PI / 4, angleSpeed: 0.0085 }
];

floatingItems.forEach(item => {
    const element = document.getElementById(item.id);
    gsap.set(element, {
        x: window.innerWidth / 2 + Math.cos(item.angle) * item.radius,
        y: window.innerHeight / 2 + Math.sin(item.angle) * item.radius
    });
});

function updateFloatingItems() {
    const bhX = window.innerWidth / 2;
    const bhY = window.innerHeight / 2;

    floatingItems.forEach(item => {
        const element = document.getElementById(item.id);
        item.angle += item.angleSpeed;
        const x = bhX + Math.cos(item.angle) * item.radius;
        const y = bhY + Math.sin(item.angle) * item.radius;

        gsap.to(element, {
            x: x,
            y: y,
            duration: 0.1,
            ease: 'none'
        });
    });

    requestAnimationFrame(updateFloatingItems);
}

updateFloatingItems();

// Spaceship Physics with Constant Black Hole Influence
const spaceship = document.getElementById('spaceship');
let ship = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 50,
    vx: 0,
    vy: 0,
    mass: 5,
    friction: 0.95
};
const G = 0.005;
const blackHoleMass = 500;

gsap.set(spaceship, { x: ship.x, y: ship.y });

const keys = {};
document.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
document.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

function moveSpaceship() {
    const thrust = 0.5;
    const bhX = window.innerWidth / 2;
    const bhY = window.innerHeight / 2;

    if (keys['w']) ship.vy -= thrust;
    if (keys['s']) ship.vy += thrust;
    if (keys['a']) ship.vx -= thrust;
    if (keys['d']) ship.vx += thrust;

    // Black hole influence always active
    const dx = bhX - ship.x;
    const dy = bhY - ship.y;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = (G * blackHoleMass * ship.mass) / (distance * distance);
    const ax = (force * dx) / distance;
    const ay = (force * dy) / distance;
    ship.vx += ax;
    ship.vy += ay;

    // Apply friction
    ship.vx *= ship.friction;
    ship.vy *= ship.friction;

    ship.x += ship.vx;
    ship.y += ship.vy;

    // Boundary checks with bounce
    if (ship.x < 20) { ship.x = 20; ship.vx = -ship.vx * 0.5; }
    if (ship.x > window.innerWidth - 20) { ship.x = window.innerWidth - 20; ship.vx = -ship.vx * 0.5; }
    if (ship.y < 20) { ship.y = 20; ship.vy = -ship.vy * 0.5; }
    if (ship.y > window.innerHeight - 20) { ship.y = window.innerHeight - 20; ship.vy = -ship.vy * 0.5; }

    gsap.to(spaceship, {
        x: ship.x,
        y: ship.y,
        duration: 0.1,
        ease: 'none'
    });

    checkCollisions();
    requestAnimationFrame(moveSpaceship);
}

moveSpaceship();

// Collision Detection and Interaction
let activePanel = null;

function checkCollisions() {
    const shipRect = spaceship.getBoundingClientRect();

    floatingItems.forEach(item => {
        const element = document.getElementById(item.id);
        const rect = element.getBoundingClientRect();

        if (
            shipRect.left < rect.right &&
            shipRect.right > rect.left &&
            shipRect.top < rect.bottom &&
            shipRect.bottom > rect.top
        ) {
            gsap.to(element, { scale: 1.1, duration: 0.2, ease: 'power2.out' });
            if (keys['enter']) {
                const action = element.getAttribute('data-action');
                if (action === 'link') {
                    const href = element.getAttribute('data-href');
                    if (href) window.open(href, '_blank');
                } else if (action === 'panel') {
                    const panelId = element.getAttribute('data-panel');
                    const panel = document.getElementById(panelId);
                    if (activePanel && activePanel !== panel) {
                        gsap.to(activePanel, {
                            opacity: 0,
                            rotationY: -90,
                            duration: 0.5,
                            ease: 'power2.in',
                            onComplete: () => { activePanel.style.pointerEvents = 'none'; }
                        });
                    }
                    if (activePanel !== panel) {
                        gsap.fromTo(panel, 
                            { opacity: 0, rotationY: 90 },
                            { 
                                opacity: 1, 
                                rotationY: 0, 
                                duration: 0.5, 
                                ease: 'power2.out',
                                onStart: () => { panel.style.pointerEvents = 'auto'; }
                            }
                        );
                        activePanel = panel;
                    }
                }
                keys['enter'] = false;
            }
        } else {
            gsap.to(element, { scale: 1, duration: 0.2, ease: 'power2.out' });
        }
    });
}

// Close Panel on Spacebar
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && activePanel) {
        gsap.to(activePanel, {
            opacity: 0,
            rotationY: -90,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                activePanel.style.pointerEvents = 'none';
                activePanel = null;
            }
        });
    }
});

// Resize Handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    shards.forEach(shard => {
        shard.x = window.innerWidth / 2 + (Math.random() - 0.5) * 600;
        shard.y = window.innerHeight / 2 + (Math.random() - 0.5) * 600;
    });
    ship.x = window.innerWidth / 2;
    ship.y = window.innerHeight - 50;
    gsap.set(spaceship, { x: ship.x, y: ship.y });
});