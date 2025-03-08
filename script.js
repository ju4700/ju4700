gsap.registerPlugin();

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
        this.opacity = Math.random() * 0.4 + 0.6;
        shardContainer.appendChild(this.element);
        this.updateStyle();
    }

    randomCode() {
        const snippets = ['func()', 'class{}', 'if()', 'while()', 'for(i)', 'x=>y', '0xFF', '{...}', 'array[]', 'map()'];
        return snippets[Math.floor(Math.random() * snippets.length)];
    }

    update() {
        const bhX = window.innerWidth / 2;
        const bhY = window.innerHeight / 2;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        const dx = bhX - this.x;
        const dy = bhY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 600) {
            const angle = Math.atan2(dy, dx);
            this.x = bhX + Math.cos(angle) * 600;
            this.y = bhY + Math.sin(angle) * 600;
            this.vx = -this.vx * 0.7;
            this.vy = -this.vy * 0.7;
        }

        this.vx = Math.min(Math.max(this.vx, -1.5), 1.5);
        this.vy = Math.min(Math.max(this.vy, -1.5), 1.5);
        if (Math.random() < 0.01) {
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
            textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
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

const floatingItems = [
    { id: 'letter-j', radius: 320, angle: 0, angleSpeed: 0.005 },
    { id: 'letter-u', radius: 300, angle: Math.PI / 3, angleSpeed: 0.007 },
    { id: 'letter-4', radius: 340, angle: 2 * Math.PI / 3, angleSpeed: 0.004 },
    { id: 'letter-7', radius: 310, angle: Math.PI, angleSpeed: 0.006 },
    { id: 'letter-0', radius: 330, angle: 4 * Math.PI / 3, angleSpeed: 0.0055 },
    { id: 'letter-0-2', radius: 290, angle: 5 * Math.PI / 3, angleSpeed: 0.0065 },
    { id: 'projects-item', radius: 250, angle: Math.PI / 2, angleSpeed: 0.008 },
    { id: 'linkedin-item', radius: 230, angle: Math.PI / 4, angleSpeed: 0.009 },
    { id: 'github-item', radius: 240, angle: 5 * Math.PI / 4, angleSpeed: 0.0085 },
    { id: 'debris-1', radius: 280, angle: 0.2, angleSpeed: 0.006 },
    { id: 'debris-2', radius: 260, angle: Math.PI / 2.5, angleSpeed: 0.007 },
    { id: 'debris-3', radius: 300, angle: Math.PI, angleSpeed: 0.005 },
    { id: 'debris-4', radius: 240, angle: 3 * Math.PI / 2, angleSpeed: 0.008 },
    { id: 'debris-5', radius: 270, angle: 2 * Math.PI / 1.5, angleSpeed: 0.0065 }
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

function animateSpaceVesselString(stringId) {
    const element = document.getElementById(stringId);
    if (!element) return console.error(`Element ${stringId} not found`);
    const text = element.textContent;
    const chars = text.split('');

    element.innerHTML = '';
    element.style.opacity = 1;
    element.style.position = 'absolute';
    element.style.left = '50%';
    element.style.top = '50%';
    element.style.transform = 'translate(-50%, -50%)';

    createNebulaBurst();

    let dimOverlay = document.getElementById('dim-overlay');
    if (!dimOverlay) {
        dimOverlay = document.createElement('div');
        dimOverlay.id = 'dim-overlay';
        dimOverlay.style.position = 'fixed';
        dimOverlay.style.top = '0';
        dimOverlay.style.left = '0';
        dimOverlay.style.width = '100%';
        dimOverlay.style.height = '100%';
        dimOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
        dimOverlay.style.zIndex = '999';
        dimOverlay.style.opacity = '0';
        document.body.appendChild(dimOverlay);
    }

    gsap.to(dimOverlay, {
        opacity: 0.5,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            gsap.to(dimOverlay, {
                opacity: 0,
                delay: 2.5,
                duration: 0.5,
                ease: 'power2.in'
            });
        }
    });

    const baseSpacing = 30; 
    const minDistance = 35; 
    const positions = [];

    chars.forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.margin = '0 2px';
        element.appendChild(charSpan);

        const baseX = (index - (chars.length - 1) / 2) * baseSpacing; 
        const baseY = 0; 

        let randomXOffset = (Math.random() - 0.5) * 10; 
        let randomYOffset = (Math.random() - 0.5) * 20; 
        let randomX = baseX + randomXOffset;
        let randomY = baseY + randomYOffset;

        positions.push({ x: randomX, y: randomY, span: charSpan });
    });

    for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions.length; j++) {
            if (i === j) continue;

            let pos1 = positions[i];
            let pos2 = positions[j];
            const dx = pos1.x - pos2.x;
            const dy = pos1.y - pos2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance && distance > 0) {
                const angle = Math.atan2(dy, dx);
                const adjustX = Math.cos(angle) * (minDistance - distance) / 2;
                const adjustY = Math.sin(angle) * (minDistance - distance) / 2;

                positions[i].x += adjustX;
                positions[i].y += adjustY;
                positions[j].x -= adjustX;
                positions[j].y -= adjustY;

                if (Math.abs(positions[i].x - ((i - (chars.length - 1) / 2) * baseSpacing)) > 15) {
                    positions[i].x = ((i - (chars.length - 1) / 2) * baseSpacing) + (Math.random() - 0.5) * 10;
                }
                if (Math.abs(positions[j].x - ((j - (chars.length - 1) / 2) * baseSpacing)) > 15) {
                    positions[j].x = ((j - (chars.length - 1) / 2) * baseSpacing) + (Math.random() - 0.5) * 10;
                }
            }
        }
    }

    positions.forEach((pos, index) => {
        const charSpan = pos.span;
        gsap.set(charSpan, {
            x: pos.x,
            y: pos.y,
            scale: 0.1,
            opacity: 0,
            z: -500
        });

        const randomDelay = Math.random() * 0.5;

        gsap.to(charSpan, {
            delay: randomDelay,
            duration: 1.5,
            scale: 2,
            z: 500,
            opacity: 1,
            ease: 'power2.out',
            onStart: () => {
                if (index === 0) {
                    gsap.to('body', {
                        x: '+=10',
                        y: '+=10',
                        duration: 0.1,
                        repeat: 10,
                        yoyo: true,
                        ease: 'power2.inOut',
                        onComplete: () => gsap.set('body', { x: 0, y: 0 })
                    });
                }
            },
            onComplete: () => {
                gsap.to(charSpan, {
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.in',
                    onComplete: () => {
                        if (index === chars.length - 1) {
                            element.style.opacity = 0;
                        }
                    }
                });
            }
        });
    });
}

function createNebulaBurst() {
    const burstCanvas = document.createElement('canvas');
    burstCanvas.className = 'nebula-burst';
    burstCanvas.width = window.innerWidth;
    burstCanvas.height = window.innerHeight;
    document.body.appendChild(burstCanvas);
    const burstCtx = burstCanvas.getContext('2d');

    const burstParticles = [];
    const burstCount = 100;

    class BurstParticle {
        constructor() {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 3;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.size = Math.random() * 4 + 2;
            this.opacity = 1;
            this.life = Math.random() * 60 + 40;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= 0.015;
            this.life -= 1;
            this.vx *= 0.98;
            this.vy *= 0.98;
            const dx = window.innerWidth / 2 - this.x;
            const dy = window.innerHeight / 2 - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            this.vx += (dx / distance) * 0.02;
            this.vy += (dy / distance) * 0.02;
        }

        draw() {
            burstCtx.beginPath();
            burstCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            burstCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            burstCtx.shadowBlur = 15;
            burstCtx.shadowColor = '#ffffff';
            burstCtx.fill();
        }
    }

    for (let i = 0; i < burstCount; i++) {
        burstParticles.push(new BurstParticle());
    }

    function animateBurst() {
        burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
        let allDead = true;
        burstParticles.forEach(particle => {
            if (particle.life > 0) {
                particle.update();
                particle.draw();
                allDead = false;
            }
        });
        if (!allDead) requestAnimationFrame(animateBurst);
        else document.body.removeChild(burstCanvas);
    }

    animateBurst();
}

const spaceship = document.getElementById('spaceship');
let ship = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 50,
    vx: 0,
    vy: 0,
    mass: 5,
    friction: 0.92
};
const G = 0.05;
const blackHoleMass = 1000;

gsap.set(spaceship, { x: ship.x, y: ship.y });

const projectsSection = document.getElementById('projects-section');
projectsSection.style.display = 'none';
gsap.set(projectsSection, { top: '100vh' });
gsap.set('.project-tile', { opacity: 0, scale: 0 });

const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    console.log(`Key down: ${e.key}`);
});
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    console.log(`Key up: ${e.key}`);
});

function screenShake() {
    gsap.to('body', {
        x: '+=5',
        y: '+=5',
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: 'power2.inOut',
        onComplete: () => gsap.set('body', { x: 0, y: 0 })
    });
}

let isAnimating = false;

function fallAndShowProjects() {
    if (isAnimating) return;
    isAnimating = true;

    const coderUniverse = document.querySelector('.coder-universe');
    const duration = 2;

    projectsSection.style.display = 'block';
    gsap.fromTo(projectsSection, 
        { top: '100vh' }, 
        { 
            top: 0, 
            duration: duration, 
            ease: 'power2.inOut',
            onComplete: () => {
                animateProjects();
                isAnimating = false;
            }
        }
    );

    gsap.to(ship, {
        y: window.innerHeight - 20,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: () => gsap.set(spaceship, { x: ship.x, y: ship.y })
    });

    gsap.to(coderUniverse, {
        opacity: 0,
        duration: duration,
        ease: 'power2.inOut'
    });
}

function animateProjects() {
    const tiles = document.querySelectorAll('.project-tile');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    tiles.forEach((tile, index) => {
        let radius;
        if (index === 4) {
            radius = 150;
        } else {
            radius = 200 + index * 50;
        }
        const startAngle = (index * 2 * Math.PI) / tiles.length;
        const orbitDuration = 20 - index * 2;

        const initialX = centerX + Math.cos(startAngle) * radius - 100;
        const initialY = centerY + Math.sin(startAngle) * radius - 60;
        gsap.set(tile, {
            left: initialX,
            top: initialY,
            opacity: 0,
            scale: 0
        });

        gsap.to(tile, {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
            delay: index * 0.5,
            onComplete: () => {
                gsap.to(tile, {
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        });

        gsap.to(tile, {
            motionPath: {
                path: [
                    { left: initialX, top: initialY },
                    { left: centerX + Math.cos(startAngle + Math.PI / 2) * radius - 100, top: centerY + Math.sin(startAngle + Math.PI / 2) * radius - 60 },
                    { left: centerX + Math.cos(startAngle + Math.PI) * radius - 100, top: centerY + Math.sin(startAngle + Math.PI) * radius - 60 },
                    { left: centerX + Math.cos(startAngle + 3 * Math.PI / 2) * radius - 100, top: centerY + Math.sin(startAngle + 3 * Math.PI / 2) * radius - 60 },
                    { left: initialX, top: initialY }
                ],
                curviness: 1
            },
            duration: orbitDuration,
            repeat: -1,
            ease: 'linear',
            onUpdate: function() {
                const progress = this.progress();
                const angle = startAngle + progress * 2 * Math.PI;
                gsap.set(tile, {
                    rotation: Math.sin(angle) * 10
                });
            }
        });
    });
}

function resetProjects() {
    if (isAnimating) return;
    isAnimating = true;

    const coderUniverse = document.querySelector('.coder-universe');
    const duration = 2;

    gsap.to(ship, {
        y: window.innerHeight - 50,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: () => gsap.set(spaceship, { x: ship.x, y: ship.y })
    });

    gsap.to(projectsSection, {
        top: '100vh',
        duration: duration,
        ease: 'power2.inOut',
        onComplete: () => {
            projectsSection.style.display = 'none';
            gsap.set('.project-tile', { opacity: 0, scale: 0 });
            isAnimating = false;
        }
    });

    gsap.to(coderUniverse, {
        opacity: 1,
        duration: duration,
        ease: 'power2.inOut'
    });
}

function moveSpaceship() {
    const thrust = 1.0;
    const bhX = window.innerWidth / 2;
    const bhY = window.innerHeight / 2;

    if (!isAnimating) {
        if (keys['w']) ship.vy -= thrust;
        if (keys['s']) ship.vy += thrust;
        if (keys['a']) ship.vx -= thrust;
        if (keys['d']) ship.vx += thrust;

        const dx = bhX - ship.x;
        const dy = bhY - ship.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (G * blackHoleMass * ship.mass) / (distance * distance);
        const ax = (force * dx) / distance;
        const ay = (force * dy) / distance;
        ship.vx += ax;
        ship.vy += ay;

        ship.vx *= ship.friction;
        ship.vy *= ship.friction;

        ship.x += ship.vx;
        ship.y += ship.vy;

        if (ship.x < 20) { ship.x = 20; ship.vx = -ship.vx * 0.5; }
        if (ship.x > window.innerWidth - 20) { ship.x = window.innerWidth - 20; ship.vx = -ship.vx * 0.5; }
        if (ship.y < 20) { ship.y = 20; ship.vy = -ship.vy * 0.5; if (projectsSection.style.top === '0px') resetProjects(); }
        if (ship.y > window.innerHeight - 20) { ship.y = window.innerHeight - 20; ship.vy = -ship.vy * 0.5; }
    }

    gsap.set(spaceship, { x: ship.x, y: ship.y });
    checkCollisions();
    requestAnimationFrame(moveSpaceship);
}

moveSpaceship();

let lastDebrisCollision = 0;
let lastJalalTrigger = 0;
let lastDebuggingTrigger = 0;
const COOLDOWN_MS = 5000;

function checkCollisions() {
    const shipRect = spaceship.getBoundingClientRect();
    const now = Date.now();

    floatingItems.forEach(item => {
        const element = document.getElementById(item.id);
        const rect = element.getBoundingClientRect();

        if (
            shipRect.left < rect.right &&
            shipRect.right > rect.left &&
            shipRect.top < rect.bottom &&
            shipRect.bottom > rect.top
        ) {
            console.log(`Collision with ${item.id}`);
            if (element.classList.contains('debris') && now - lastDebrisCollision > 500) {
                screenShake();
                lastDebrisCollision = now;
            } else if (!element.classList.contains('debris')) {
                gsap.to(element, { scale: 1.1, duration: 0.2, ease: 'power2.out' });
                if (keys['enter']) {
                    const action = element.getAttribute('data-action');
                    if (action === 'link') {
                        const href = element.getAttribute('data-href');
                        if (href) window.open(href, '_blank');
                        console.log(`Opened ${href}`);
                    } else if (action === 'fall') {
                        fallAndShowProjects();
                        console.log('Triggered projects');
                    } else if (item.id === 'letter-j' && now - lastJalalTrigger > COOLDOWN_MS) {
                        animateSpaceVesselString('vessel-string-1');
                        lastJalalTrigger = now;
                        console.log('Triggered Jalal Uddin');
                    } else if (item.id === 'letter-4' && now - lastDebuggingTrigger > COOLDOWN_MS) {
                        animateSpaceVesselString('vessel-string-2');
                        lastDebuggingTrigger = now;
                        console.log('Triggered Debugging Humanity');
                    }
                    keys['enter'] = false;
                }
            }
        } else if (!element.classList.contains('debris')) {
            gsap.to(element, { scale: 1, duration: 0.2, ease: 'power2.out' });
        }
    });

    const projectTiles = document.querySelectorAll('.project-tile');
    projectTiles.forEach(tile => {
        const rect = tile.getBoundingClientRect();

        if (projectsSection.style.display === 'block' && projectsSection.style.top === '0px') {
            if (
                shipRect.left < rect.right &&
                shipRect.right > rect.left &&
                shipRect.top < rect.bottom &&
                shipRect.bottom > rect.top
            ) {
                gsap.to(tile, { scale: 1.1, duration: 0.2, ease: 'power2.out' });
                if (keys['enter']) {
                    const action = tile.getAttribute('data-action');
                    if (action === 'link') {
                        const href = tile.getAttribute('data-href');
                        if (href) window.open(href, '_blank');
                        console.log(`Opened project link ${href}`);
                    }
                    keys['enter'] = false;
                }
            } else {
                gsap.to(tile, { scale: 1, duration: 0.2, ease: 'power2.out' });
            }
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !isAnimating) resetProjects();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    shards.forEach(shard => {
        shard.x = window.innerWidth / 2 + (Math.random() - 0.5) * 600;
        shard.y = window.innerHeight / 2 + (Math.random() - 0.5) * 600;
    });
    ship.x = window.innerWidth / 2;
    ship.y = Math.min(ship.y, window.innerHeight - 20);
    gsap.set(spaceship, { x: ship.x, y: ship.y });
});

window.addEventListener('load', () => {
    projectsSection.style.display = 'none';
    gsap.set(projectsSection, { top: '100vh' });
    gsap.set('.project-tile', { opacity: 0, scale: 0 });
    gsap.set('.space-vessel-string', { opacity: 0 });
});