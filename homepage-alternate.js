const numberSection = document.querySelector('.practice-numbers');
const alternateReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (numberSection && !alternateReduceMotion) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    numberSection.querySelectorAll('[data-count]').forEach((counter) => {
      const target = Number(counter.dataset.count);
      const decimals = Number(counter.dataset.decimals || 0);
      const duration = 1100;
      const start = performance.now();
      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        counter.textContent = (target * eased).toLocaleString('en', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  }, { threshold: .4 });
  counterObserver.observe(numberSection);
}
if (window.gsap && window.ScrollTrigger && !alternateReduceMotion) {
  gsap.from('.service-tile', {
    y: 55,
    opacity: 0,
    duration: .9,
    stagger: .11,
    ease: 'power4.out',
    scrollTrigger: { trigger: '.service-gallery', start: 'top 82%', once: true }
  });
}
