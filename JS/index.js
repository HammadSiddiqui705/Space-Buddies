let planets = [];
let currentIndex = 0;
let swiper;

// JSON load karna
fetch("/Data/Planets.json")
  .then(response => response.json())
  .then(data => {
    planets = data;

    // Slides generate
    const slidesContainer = document.getElementById("planetSlides");
    slidesContainer.innerHTML = "";
    planets.forEach((planet, i) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide text-center";
      slide.innerHTML = `
        <img src="${planet.image}" alt="${planet.name}" style="width:140px; object-fit:contain;">
      `;
      slidesContainer.appendChild(slide);
    });

    // Swiper initialize
    swiper = new Swiper(".planetSwiper", {
      slidesPerView: 3,
      centeredSlides: true,
      loop: true,
      watchSlidesProgress: true,

      breakpoints: {
        0: { // mobile
          slidesPerView: 1,
        },
        768: { // tablet
          slidesPerView: 1,
        },
        992: { // laptop and up
          slidesPerView: 3,
        },
      },
    });

    // Show first planet details
    showPlanet(currentIndex);
  })
  .catch(error => console.error("Error loading planets:", error));

function showPlanet(index) {
  const planet = planets[index];
  if (!planet) return;

  document.getElementById("planetName").textContent = planet.name;
  document.getElementById("planetDistance").textContent = planet.distanceFromSun;
  document.getElementById("planetDiameter").textContent = planet.diameter;
  document.getElementById("planetMoons").textContent = planet.moons;
  document.getElementById("planetTemperature").textContent = planet.temperature;
  document.getElementById("planetAtmosphere").textContent = planet.atmosphere;

  // Facts list update
  const factsList = document.getElementById("planetFacts");
  factsList.innerHTML = "";
  planet.facts.forEach(fact => {
    const li = document.createElement("li");
    li.textContent = fact;
    factsList.appendChild(li);
  });

  document.getElementById("planetCount").textContent = `${index + 1} of ${planets.length}`;
}

// Buttons click events
document.getElementById("nextBtn").addEventListener("click", () => {
  swiper.slideNext(); // Swiper ke sath sync
  currentIndex = (currentIndex + 1) % planets.length;
  showPlanet(currentIndex);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  swiper.slidePrev(); // Swiper ke sath sync
  currentIndex = (currentIndex - 1 + planets.length) % planets.length;
  showPlanet(currentIndex);
});

