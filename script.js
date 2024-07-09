document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'perspective(400px) rotateX(10deg) rotateY(10deg)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'perspective(400px) rotateX(0) rotateY(0)';
    });
});
