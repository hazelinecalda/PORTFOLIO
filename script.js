const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// Display the photos uploaded by Hazeline in the portfolio.
const hero = document.querySelector(".hero");
const heroCopy = hero?.querySelector(".hero-copy");
if (hero && heroCopy) {
  const portrait = document.createElement("img");
  portrait.className = "profile-photo-attachment reveal";
  portrait.src = "PHOTO-Calda-Hazeline.jpg";
  portrait.alt = "Hazeline Calda, profile portrait";
  heroCopy.insertAdjacentElement("afterend", portrait);
  observer.observe(portrait);
}

const sampleWorkImage = document.querySelector(".sample-image img");
if (sampleWorkImage) {
  sampleWorkImage.src = "sample%20work.png";
  sampleWorkImage.alt = "Zoom meeting screenshot showing Hazeline Calda's appointment-setting sample work";
  sampleWorkImage.style.display = "block";
  sampleWorkImage.parentElement.classList.remove("image-fallback");
}

const imageStyles = document.createElement("style");
imageStyles.textContent = `
.hero { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(220px, .65fr); align-items: center; column-gap: clamp(2rem, 6vw, 6rem); position: relative; }
.hero-topline, .hero-marquee { grid-column: 1 / -1; }
.hero-copy { grid-column: 1; grid-row: 2; }
.profile-photo-attachment { grid-column: 2; grid-row: 2; display: block; width: min(100%, 360px); aspect-ratio: 4 / 5; height: auto; object-fit: cover; object-position: center 28%; justify-self: center; border-radius: 24px; border: 1px solid rgba(255,255,255,.16); box-shadow: 0 24px 70px rgba(0,0,0,.4); }
.sample-image img { width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 800px) { .hero { grid-template-columns: 1fr; } .hero-topline, .hero-copy, .profile-photo-attachment, .hero-marquee { grid-column: 1; } .hero-topline { grid-row: 1; } .hero-copy { grid-row: 2; } .profile-photo-attachment { grid-row: 3; width: min(72vw, 300px); margin: 1.5rem auto; } .hero-marquee { grid-row: 4; } }
`;
document.head.appendChild(imageStyles);

document.getElementById("year").textContent = new Date().getFullYear();
