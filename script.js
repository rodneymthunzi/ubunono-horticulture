const projects = [
  ["portfolio-astro-turf.jpeg", "Astro turf installation.jpeg"],
  ["portfolio-courtyard-hard-soft.jpeg", "Courtyard hard and soft landscaping.jpeg"],
  ["portfolio-entrance-garden.jpeg", "Entrance garden.jpeg"],
  ["portfolio-hard-landscaping-paving.jpeg", "Hard landscaping - paving including garden furniture.jpeg"],
  ["portfolio-lawn-installation.jpeg", "Lawn installation.jpeg"],
  ["portfolio-living-wall.jpeg", "Living wall installation.jpeg"],
  ["portfolio-raised-flower-bed.jpeg", "Raised Flower Bed Installation.jpeg"],
  ["portfolio-image01.jpeg", "image01.jpeg"],
  ["portfolio-image02.jpeg", "image02.jpeg"],
];

let activeIndex = 0;

const activeImage = document.querySelector("#cardActive");
const backOne = document.querySelector("#cardBackOne");
const backTwo = document.querySelector("#cardBackTwo");
const caption = document.querySelector("#cardCaption");
const counter = document.querySelector("#projectCounter");
const dots = document.querySelector("#carouselDots");
const carousel = document.querySelector(".portfolioCarousel");

projects.forEach((project, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `View ${project[1]}`);
  dot.addEventListener("click", () => {
    activeIndex = index;
    renderCarousel();
  });
  dots.appendChild(dot);
});

function asset(filename) {
  return `./assets/${filename}`;
}

function renderCarousel() {
  const current = projects[activeIndex];
  activeImage.src = asset(current[0]);
  activeImage.alt = current[1];
  caption.textContent = current[1];
  backOne.src = asset(projects[(activeIndex + 1) % projects.length][0]);
  backTwo.src = asset(projects[(activeIndex + 2) % projects.length][0]);
  counter.innerHTML = `<strong>${String(activeIndex + 1).padStart(2, "0")}</strong><span> / ${String(projects.length).padStart(2, "0")}</span>`;

  [...dots.children].forEach((dot, index) => {
    dot.classList.toggle("isActive", index === activeIndex);
    if (index === activeIndex) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function showPrevious() {
  activeIndex = (activeIndex - 1 + projects.length) % projects.length;
  renderCarousel();
}

function showNext() {
  activeIndex = (activeIndex + 1) % projects.length;
  renderCarousel();
}

document.querySelector("#previousProject").addEventListener("click", showPrevious);
document.querySelector("#nextProject").addEventListener("click", showNext);
carousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPrevious();
  if (event.key === "ArrowRight") showNext();
});

renderCarousel();
