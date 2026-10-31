const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.textContent = open ? "Menu" : "Close";
  mobileMenu.hidden = open;
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
    mobileMenu.hidden = true;
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const serviceItems = [...document.querySelectorAll(".service-accordion-item")];

function openService(selected) {
  serviceItems.forEach((item) => {
    const panel = item.querySelector(".service-panel");
    const button = item.querySelector(".service-trigger");
    const opening = item === selected;
    const wasOpen = item.classList.contains("is-open");
    item.classList.toggle("is-open", opening);
    button.setAttribute("aria-expanded", String(opening));

    if (window.gsap && !reduceMotion) {
      gsap.killTweensOf(panel);
      if (opening) {
        if (!wasOpen) {
          panel.style.height = "0px";
          gsap.to(panel, { height: panel.scrollHeight, duration: 0.72, ease: "power4.out", onComplete: () => { panel.style.height = "auto"; } });
          gsap.fromTo(item.querySelector(".service-panel-inner"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, delay: 0.08, ease: "power4.out" });
        }
      } else if (wasOpen) {
        panel.style.height = `${panel.scrollHeight}px`;
        gsap.to(panel, { height: 0, duration: 0.42, ease: "power3.inOut" });
      }
    } else {
      panel.style.height = opening ? "auto" : "0px";
    }
  });
}

serviceItems.forEach((item) => {
  const trigger = item.querySelector(".service-trigger");
  trigger.addEventListener("click", () => openService(item));
  item.addEventListener("mouseenter", () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) openService(item);
  });
});

function setupCarousel(name) {
  const viewport = document.querySelector(`[data-carousel="${name}"]`);
  if (!viewport) return;
  const previous = document.querySelector(`[data-carousel-prev="${name}"]`);
  const next = document.querySelector(`[data-carousel-next="${name}"]`);
  const firstCard = viewport.querySelector(":scope > .carousel-track > *");
  const step = () => firstCard.getBoundingClientRect().width + 16;

  previous.addEventListener("click", () => viewport.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }));
  next.addEventListener("click", () => viewport.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }));

  let pointerStart = 0;
  let scrollStart = 0;
  let dragged = false;
  let activePointer = null;
  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    activePointer = event.pointerId;
    pointerStart = event.clientX;
    scrollStart = viewport.scrollLeft;
    dragged = false;
  });
  viewport.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointer) return;
    const distance = event.clientX - pointerStart;
    if (Math.abs(distance) > 5 && !dragged) {
      dragged = true;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(event.pointerId);
    }
    if (!dragged) return;
    viewport.scrollLeft = scrollStart - distance;
  });
  const stopDragging = (event) => {
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    viewport.classList.remove("is-dragging");
    activePointer = null;
  };
  viewport.addEventListener("pointerup", stopDragging);
  viewport.addEventListener("pointercancel", stopDragging);
  viewport.addEventListener("click", (event) => { if (dragged) event.preventDefault(); }, true);
}

setupCarousel("doctors");
setupCarousel("reviews");

if (window.gsap && window.ScrollTrigger && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const hero = gsap.timeline({ defaults: { ease: "power4.out" } });
  hero
    .from(".hero-image", { scale: 1.1, duration: 1.45 })
    .from(".hero h1 span", { yPercent: 115, opacity: 0, duration: 0.85, stagger: 0.1 }, 0.12)
    .from(".trust-seal", { scale: 0.2, rotate: -35, opacity: 0, duration: 0.7 }, 0.52)
    .from(".hero-note", { y: 24, opacity: 0, duration: 0.6 }, 0.58);

  gsap.to(".hero-image", {
    yPercent: 7,
    scale: 1.04,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  if (document.querySelector(".marquee-track")) gsap.to(".marquee-track", {
    xPercent: -50,
    duration: 22,
    repeat: -1,
    ease: "none"
  });

  document.querySelectorAll("[data-reveal]").forEach((element, index) => {
    const isPicture = element.matches("figure, .consultation-image");
    gsap.from(element, {
      y: isPicture ? 0 : 32,
      scale: isPicture ? 1.045 : 1,
      opacity: 0,
      duration: isPicture ? 1.1 : 0.75,
      delay: (index % 3) * 0.045,
      ease: "power4.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  gsap.from(".doctor-card", {
    y: 20,
    opacity: 0,
    duration: 0.65,
    stagger: 0.08,
    ease: "power4.out",
    scrollTrigger: { trigger: ".doctors-track", start: "top 90%", once: true }
  });

  gsap.from(".review-card", {
    x: 30,
    opacity: 0,
    duration: 0.75,
    stagger: 0.08,
    ease: "power4.out",
    scrollTrigger: { trigger: ".reviews-track", start: "top 90%", once: true }
  });

  gsap.to(".consultation-image img", {
    rotate: 2.5,
    scale: 1.05,
    ease: "none",
    scrollTrigger: { trigger: ".consultation", start: "top bottom", end: "bottom top", scrub: true }
  });

  gsap.from(".site-footer > *", {
    y: 22,
    opacity: 0,
    duration: 0.65,
    stagger: 0.075,
    ease: "power4.out",
    scrollTrigger: { trigger: ".site-footer", start: "top 88%", once: true }
  });
}
