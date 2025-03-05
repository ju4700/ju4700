// Navigation link animations
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'perspective(500px) rotateX(15deg) scale(1.1)';
        link.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.9)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'perspective(500px) rotateX(0) scale(1)';
        link.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
    });
});

// Dynamic particle effect (optional enhancement)
const particleBg = document.querySelector('.particle-bg');
let hue = 0;

setInterval(() => {
    hue = (hue + 1) % 360;
    particleBg.style.filter = `hue-rotate(${hue}deg)`;
}, 100);