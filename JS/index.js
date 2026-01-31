// Planets data array
let planets = [
  {
    "name": "Mercury",
    "image": "src/images/mercury.png",
    "distanceFromSun": "58 million km",
    "diameter": "4,879 km",
    "moons": 0,
    "temperature": "-173°C to 427°C",
    "atmosphere": "Virtually none",
    "facts": [
      "Closest planet to the Sun",
      "Has extreme temperature variations",
      "No atmosphere to retain heat",
      "Covered in craters like our Moon"
    ]
  },
  {
    "name": "Venus",
    "image": "src/images/Venus.png",
    "distanceFromSun": "108 million km",
    "diameter": "12,104 km",
    "moons": 0,
    "temperature": "462°C (average)",
    "atmosphere": "Carbon dioxide, sulfuric acid clouds",
    "facts": [
      "Hottest planet in the Solar System",
      "Rotates backwards compared to most planets",
      "Similar size and composition to Earth",
      "Thick atmosphere traps heat in a runaway greenhouse effect"
    ]
  },
  {
    "name": "Earth",
    "image": "src/images/Earth.png",
    "distanceFromSun": "150 million km",
    "diameter": "12,742 km",
    "moons": 1,
    "temperature": "-88°C to 58°C",
    "atmosphere": "Nitrogen, oxygen",
    "facts": [
      "Only planet known to support life",
      "70% of surface covered in water",
      "Has a protective magnetic field",
      "Active plate tectonics constantly reshape the surface"
    ]
  },
  {
    "name": "Mars",
    "image": "src/images/mars.png",
    "distanceFromSun": "228 million km",
    "diameter": "6,779 km",
    "moons": 2,
    "temperature": "-125°C to 20°C",
    "atmosphere": "Thin, mostly carbon dioxide",
    "facts": [
      "Known as the Red Planet due to iron oxide dust",
      "Home to Olympus Mons, the tallest volcano in the Solar System",
      "Has the largest canyon, Valles Marineris",
      "Evidence suggests liquid water once existed on the surface"
    ]
  },
  {
    "name": "Jupiter",
    "image": "src/images/jupiter.png",
    "distanceFromSun": "778 million km",
    "diameter": "139,820 km",
    "moons": 95,
    "temperature": "-145°C (average)",
    "atmosphere": "Hydrogen, helium",
    "facts": [
      "Largest planet in the Solar System",
      "Has a massive storm called the Great Red Spot",
      "Strong magnetic field",
      "Its moon Europa may have a subsurface ocean"
    ]
  },
  {
    "name": "Saturn",
    "image": "src/images/saturn.png",
    "distanceFromSun": "1.43 billion km",
    "diameter": "116,460 km",
    "moons": 83,
    "temperature": "-178°C (average)",
    "atmosphere": "Hydrogen, helium",
    "facts": [
      "Famous for its beautiful ring system",
      "Lowest density planet—it could float in water",
      "Its moon Titan has a thick atmosphere",
      "Winds reach speeds of 1,800 km/h"
    ]
  },
  {
    "name": "Uranus",
    "image": "src/images/Uranus.png",
    "distanceFromSun": "2.87 billion km",
    "diameter": "50,724 km",
    "moons": 27,
    "temperature": "-224°C (average)",
    "atmosphere": "Hydrogen, helium, methane",
    "facts": [
      "Rotates on its side with a tilt of 98 degrees",
      "Has faint rings",
      "Appears blue-green due to methane in the atmosphere",
      "First planet discovered with a telescope"
    ]
  },
  {
    "name": "Neptune",
    "image": "src/images/neptune.png",
    "distanceFromSun": "4.5 billion km",
    "diameter": "49,244 km",
    "moons": 14,
    "temperature": "-214°C (average)",
    "atmosphere": "Hydrogen, helium, methane",
    "facts": [
      "Windiest planet with speeds over 2,000 km/h",
      "Deep blue color due to methane absorption",
      "Takes 165 Earth years to orbit the Sun",
      "Discovered in 1846 using mathematics"
    ]
  }
];

let currentIndex = 0;
let swiper;

// DOM load hone ka wait karein
document.addEventListener('DOMContentLoaded', function() {
  initializeSwiper();
  setupEventListeners();
});

function initializeSwiper() {
  // Slides generate
  const slidesContainer = document.getElementById("planetSlides");
  if (!slidesContainer) {
    console.error("planetSlides element not found!");
    return;
  }
  
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
    speed: 500,
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
    
    // Swiper ke events
    on: {
      init: function() {
        console.log("Swiper initialized successfully!");
        showPlanet(currentIndex);
      },
      slideChange: function() {
        currentIndex = this.realIndex;
        showPlanet(currentIndex);
      }
    }
  });
}

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
function setupEventListeners() {
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
}