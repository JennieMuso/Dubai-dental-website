const plans = {
  smile: {
    name: "Smile consultation",
    copy: "A dentist reviews your goals, bite and facial balance, then maps the options that can produce a natural result.",
    time: "45 minutes",
    subject: "Smile consultation"
  },
  health: {
    name: "Dental health assessment",
    copy: "A complete examination, digital imaging where needed and a preventive plan shaped around the health of your teeth and gums.",
    time: "45 minutes",
    subject: "Dental health assessment"
  },
  restore: {
    name: "Restorative consultation",
    copy: "We assess the tooth, bone and bite, then explain the suitable implant or restorative paths with their likely sequence.",
    time: "60 minutes",
    subject: "Restorative consultation"
  },
  urgent: {
    name: "Urgent assessment",
    copy: "We focus first on diagnosis and comfort, then outline the immediate treatment and any follow-up your tooth may need.",
    time: "Same day",
    subject: "Urgent dental assessment"
  }
};

const planCards = document.querySelectorAll(".planner-card");
const planName = document.querySelector("#plan-name");
const planCopy = document.querySelector("#plan-copy");
const planTime = document.querySelector("#plan-time");
const planLink = document.querySelector("#plan-link");

function selectPlan(card) {
  const selected = plans[card.dataset.plan];
  planCards.forEach((item) => {
    const active = item === card;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });

  const update = () => {
    planName.textContent = selected.name;
    planCopy.textContent = selected.copy;
    planTime.textContent = selected.time;
    planLink.href = `mailto:hello@nacredental.ae?subject=${encodeURIComponent(selected.subject)}`;
  };

  if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.to(".planner-result > *", {
      opacity: 0,
      y: 10,
      duration: 0.16,
      stagger: 0.04,
      onComplete: () => {
        update();
        gsap.to(".planner-result > *", { opacity: 1, y: 0, duration: 0.42, stagger: 0.07, ease: "power4.out" });
      }
    });
  } else {
    update();
  }
}

planCards.forEach((card) => card.addEventListener("click", () => selectPlan(card)));

const plannerTrack = document.querySelector(".planner-track");
let dragStart = 0;
let scrollStart = 0;
let dragged = false;

plannerTrack.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") return;
  dragStart = event.clientX;
  scrollStart = plannerTrack.scrollLeft;
  dragged = false;
  plannerTrack.classList.add("is-dragging");
  plannerTrack.setPointerCapture(event.pointerId);
});

plannerTrack.addEventListener("pointermove", (event) => {
  if (!plannerTrack.hasPointerCapture(event.pointerId)) return;
  const distance = event.clientX - dragStart;
  if (Math.abs(distance) > 5) dragged = true;
  plannerTrack.scrollLeft = scrollStart - distance;
});

function stopDrag(event) {
  if (plannerTrack.hasPointerCapture(event.pointerId)) plannerTrack.releasePointerCapture(event.pointerId);
  plannerTrack.classList.remove("is-dragging");
}

plannerTrack.addEventListener("pointerup", stopDrag);
plannerTrack.addEventListener("pointercancel", stopDrag);
plannerTrack.addEventListener("click", (event) => {
  if (dragged) event.preventDefault();
}, true);

const serviceRows = document.querySelectorAll(".service-row");
const serviceImages = document.querySelectorAll(".service-image");

function selectService(row) {
  const key = row.dataset.service;
  serviceRows.forEach((item) => item.classList.toggle("is-active", item === row));
  serviceImages.forEach((image) => {
    const active = image.dataset.serviceImage === key;
    if (active && !image.classList.contains("is-active") && window.gsap) {
      gsap.fromTo(image, { opacity: 0, scale: 1.055 }, { opacity: 1, scale: 1, duration: 0.75, ease: "power4.out" });
    }
    image.classList.toggle("is-active", active);
  });
}

serviceRows.forEach((row) => {
  row.addEventListener("mouseenter", () => selectService(row));
  row.addEventListener("focus", () => selectService(row));
  row.addEventListener("click", () => selectService(row));
  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectService(row);
    }
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  mobileMenu.hidden = open;
  menuToggle.textContent = open ? "Menu" : "Close";
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
    mobileMenu.hidden = true;
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.gsap && window.ScrollTrigger && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
  heroTimeline
    .from(".hero-image", { scale: 1.1, duration: 1.2 })
    .from(".hero-copy h1", { y: 54, opacity: 0, duration: 0.8 }, 0.08)
    .from(".hero-copy p", { y: 24, opacity: 0, duration: 0.6 }, 0.28)
    .from(".hero-copy .button", { y: 20, opacity: 0, duration: 0.55 }, 0.4)
    .from(".hero-location span", { y: 16, opacity: 0, duration: 0.45, stagger: 0.08 }, 0.52)
    .from(".pearl-seal", { scale: 0.4, rotate: -35, opacity: 0, duration: 0.7 }, 0.38);

  gsap.to(".hero-image", {
    yPercent: 7,
    scale: 1.04,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  gsap.from(".planner-card", {
    x: 70,
    opacity: 0,
    duration: 0.8,
    stagger: 0.09,
    ease: "power4.out",
    scrollTrigger: { trigger: ".planner-track", start: "top 82%", once: true }
  });

  document.querySelectorAll("[data-reveal]").forEach((element, index) => {
    const fromX = element.classList.contains("services-media") || element.classList.contains("approach-image") ? -28 : 0;
    gsap.from(element, {
      x: fromX,
      y: fromX ? 0 : 26,
      opacity: 0,
      duration: 0.85 + (index % 3) * 0.08,
      ease: "power4.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  gsap.utils.toArray(".service-row").forEach((row, index) => {
    gsap.from(row, {
      x: 24,
      opacity: 0,
      duration: 0.65,
      delay: index * 0.055,
      ease: "power4.out",
      scrollTrigger: { trigger: ".service-list", start: "top 82%", once: true }
    });
  });

  document.querySelectorAll(".experience-step").forEach((step) => {
    const image = step.querySelector("img");
    gsap.fromTo(image, { scale: 1.11 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: step, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  gsap.from(".footer-content nav a", {
    x: 34,
    opacity: 0,
    duration: 0.65,
    stagger: 0.075,
    ease: "power4.out",
    scrollTrigger: { trigger: ".site-footer", start: "top 72%", once: true }
  });
}
