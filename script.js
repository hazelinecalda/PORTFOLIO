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

// Use the uploaded portrait in the existing CH/brand logo marks.
document.querySelectorAll(".brand-mark").forEach(mark => {
  const logoPortrait = document.createElement("img");
  logoPortrait.src = "PHOTO-Calda-Hazeline.jpg";
  logoPortrait.alt = "";
  logoPortrait.setAttribute("aria-hidden", "true");
  mark.replaceChildren(logoPortrait);
});

// Keep the full uploaded sample screenshot visible without cropping any details.
const sampleImage = document.querySelector(".sample-image img");
const sampleFrame = document.querySelector(".sample-image");
if (sampleImage && sampleFrame) {
  sampleImage.src = "sample%20work.png";
  sampleImage.alt = "Full screenshot of Hazeline Calda's Zoom sample work";
  sampleImage.style.cssText = "display:block;width:100%;height:auto;max-height:none;object-fit:contain;object-position:center;";
  sampleFrame.style.height = "auto";
  sampleFrame.style.minHeight = "0";
  sampleFrame.style.aspectRatio = "auto";
  sampleFrame.style.overflow = "visible";
  sampleImage.addEventListener("error", () => {
    sampleFrame.classList.add("image-fallback");
  });
}

const imageStyles = document.createElement("style");
imageStyles.textContent = `
.brand-mark { display: inline-flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%; }
.brand-mark img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center 20%; }
.sample-image img { display: block; width: 100%; height: auto; max-height: none; object-fit: contain; }
`;
document.head.appendChild(imageStyles);

document.getElementById("year").textContent = new Date().getFullYear();
