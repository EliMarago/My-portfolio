// Variabile per tracciare l'ultimo scroll
let lastScrollTop = 0;

// Seleziona la navbar e la sezione "about" (o qualsiasi altra tu voglia come riferimento per lo sticky)
const navbar = document.querySelector(".header");
const section1 = document.querySelector(".about"); // Cambia ".about" con la sezione desiderata
const coords = section1.getBoundingClientRect(); // Coordinate per l'effetto sticky

window.addEventListener("scroll", function () {
  // Ottieni la posizione di scroll corrente
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // ----- Nascondi/Mostra navbar in base alla direzione dello scroll -----
  if (scrollTop > lastScrollTop) {
    // Scorrimento verso il basso - nascondi la navbar
    navbar.style.top = "-100px";
  } else {
    // Scorrimento verso l'alto - mostra la navbar
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;

  // ----- Modifica l'opacità della navbar in base alla posizione dello scroll -----
  let scrollY = window.scrollY || document.documentElement.scrollTop;
  let newOpacity = Math.min(1, scrollY / 300); // 300px per l'opacità massima
  navbar.style.backgroundColor = `rgba(252, 190, 110, ${newOpacity})`;

  // ----- Aggiungi la classe sticky se si scorre oltre la sezione -----
  if (scrollY > coords.top) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// Seleziona il menu icon per ulteriori modifiche (se necessario)
const menuIcon = document.getElementById("menu-icon");
/*----- ----- -------- ---------- --------- */

// Aggiungi un evento di clic per mostrare o nascondere il menu
const navToggle = document.getElementById("menu-icon");
const links = document.querySelector(".navbar");

const toggleMenu = function () {
  links.classList.toggle("show");
};

navToggle.addEventListener("click", toggleMenu);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && links.classList.contains("show")) {
    links.classList.remove("show");
  }
});

document.addEventListener("click", function (e) {
  // Se il click non avviene all'interno del menu o sull'icona
  if (!links.contains(e.target) && !navToggle.contains(e.target)) {
    links.classList.remove("show");
  }
});
/*----- ----- -------- ---------- --------- */
/*effetto su immagine */

// Seleziona le immagini che hanno la classe 'about-img'
const imgTargets = document.querySelectorAll(".about-img");

// Funzione callback dell'IntersectionObserver
const loadImg = function (entries, observer) {
  const [entry] = entries; // destruttura la prima entry

  // Se l'elemento non è visibile nel viewport, esce dalla funzione
  if (!entry.isIntersecting) return;

  // Rimuovi la classe che contiene l'effetto blur
  entry.target.classList.remove("blur-filter");

  // Una volta che l'immagine è caricata, rimuovi l'osservatore
  entry.target.addEventListener("load", function () {
    observer.unobserve(entry.target);
  });
};

// Creazione dell'osservatore con il margine inferiore di 200px
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -200px 0px",
});

// Osserva tutte le immagini selezionate
imgTargets.forEach((img) => imgObserver.observe(img));

document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dots__dot");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let currentIndex = 0;

  function showSlide(index) {
    // Rimuovi la classe active da tutti i punti
    dots.forEach((dot) => dot.classList.remove("active"));
    // Aggiungi la classe active al punto corrente
    dots[index].classList.add("active");
    // Sposta il contenitore della slider
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  function moveToNextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function moveToPreviousSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Gestisci il click sui pulsanti
  btnRight.addEventListener("click", moveToNextSlide);
  btnLeft.addEventListener("click", moveToPreviousSlide);

  // Gestisci il click sui punti
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Mostra la prima slide all'inizio
  showSlide(0);
});
console.log(dots);
