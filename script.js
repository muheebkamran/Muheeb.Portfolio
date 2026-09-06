document.addEventListener('DOMContentLoaded', () => {
  const ambientGlow = document.getElementById('ambientGlow');
  const heroStage = document.querySelector('.hero-stage');

  // Interactive mouse follow on ambient lime glow
  if (window.matchMedia('(pointer: fine)').matches && ambientGlow && heroStage) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX - innerWidth / 2) * 0.08;
      targetY = (e.clientY - innerHeight / 2) * 0.08;
    });

    const animateAura = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      ambientGlow.style.transform = `translate(calc(-50% + ${currentX}px), ${currentY}px)`;
      requestAnimationFrame(animateAura);
    };

    animateAura();
  }

  // Smooth appearance reveal
  const elements = document.querySelectorAll('.p-card, .work-tile, .deck-item, .trait-tag');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});