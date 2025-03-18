// Selección de elementos
const carrusel = document.getElementById("carrusel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
const items = document.querySelectorAll(".item");

let currentIndex = 0;
const totalItems = items.length;

// Clonar las imágenes para el efecto infinito
const clones = [];
items.forEach((item) => {
    const clone = item.cloneNode(true);
    clones.push(clone);
    carrusel.appendChild(clone); // Clonar al final
});
items.forEach((item) => {
    const clone = item.cloneNode(true);
    clones.push(clone);
    carrusel.insertBefore(clone, carrusel.firstChild); // Clonar al inicio
});


// Actualizar lista de todos los elementos (originales + clones)
const allItems = document.querySelectorAll(".item");

// Crear los dots dinámicamente
function crearDots() {
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => moverA(i));
        dotsContainer.appendChild(dot);
    }
}
crearDots();

// Función para actualizar el carrusel y aplicar animaciones
// Función para actualizar el carrusel y aplicar animaciones
function actualizarCarrusel() {
    // Calcular el desplazamiento (considerando los clones)
    const offset = (currentIndex + totalItems) * -300; 
    carrusel.style.transition = "transform 0.8s ease"; 
    carrusel.style.transform = `translateX(${offset}px)`;

    // Volver a seleccionar los elementos (incluidos los clones)
    const allItems = document.querySelectorAll(".item");

    // Restablecer estilos para todos los elementos
    // Restablecer estilos para todos los elementos
    allItems.forEach((item) => {
        item.classList.remove("active");
        item.style.width = "250px"; // Tamaño original
        item.style.height = "350px"; // Tamaño original
    });


    // Calcular el centro del contenedor
    const carruselRect = carrusel.getBoundingClientRect();
    const carruselCentro = carruselRect.width / 2;

    // Ajuste: Sumar la mitad del ancho de un ítem
    const itemWidth = allItems[0].getBoundingClientRect().width / 2;

    // Encontrar el elemento más cercano al centro
    let itemMasCercano = null;
    let menorDiferencia = Infinity;

    allItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCentro = itemRect.left + itemRect.width / 2;

        // Ajuste: Considerar el centro desplazado a la derecha
        const diferencia = Math.abs(itemCentro - (carruselCentro + itemWidth));

        if (diferencia < menorDiferencia) {
            menorDiferencia = diferencia;
            itemMasCercano = index; // Guardamos el índice
        }
    });

    // Ajustar el índice al siguiente para corregir la posición
    const activeIndex = (itemMasCercano + 1) % allItems.length;
    const activeItem = allItems[activeIndex];

    // Aplicar el efecto de escala a la imagen central
   // Aplicar el efecto de aumento de tamaño real a la imagen central
    if (activeItem) {
        activeItem.classList.add("active");
        activeItem.style.width = "270px"; // Aumenta el ancho (8% más de 250px)
        activeItem.style.height = "378px"; // Aumenta el alto (8% más de 350px)
    }


    // Actualizar los dots (para el índice real dentro de los originales)
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("active"));

    const centralIndex = (currentIndex % totalItems + totalItems) % totalItems;
    dots[centralIndex].classList.add("active");
}




// Función para avanzar al siguiente elemento
function siguiente() {
    currentIndex++;
    if (currentIndex >= totalItems) currentIndex = 0;
    actualizarCarrusel();
}

// Función para retroceder al elemento anterior
function anterior() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = totalItems - 1;
    actualizarCarrusel();
}

// Función para moverse a un índice específico (desde los dots)
function moverA(index) {
    currentIndex = index;
    actualizarCarrusel();
}

// Event listeners para los botones de navegación
nextBtn.addEventListener("click", siguiente);
prevBtn.addEventListener("click", anterior);

// Inicializar el carrusel
actualizarCarrusel();

//Código para re-escalar el navbar cuando no estemos en el inicio
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const logo = document.querySelector("header img");

  const originalHeaderHeight = header.offsetHeight;
  const shrinkHeaderHeight = originalHeaderHeight / 2;

  const originalLogoHeight = logo.offsetHeight;
  const shrinkLogoHeight = originalLogoHeight / 2;

  const originalLogoWidth = logo.offsetWidth; // Ancho original de la imagen
  const aspectRatio = originalLogoWidth / originalLogoHeight; // Calculamos la proporción

  window.addEventListener("scroll", function () {
    const threshold = window.innerHeight * 0.65;

    if (window.scrollY > threshold) {
      header.style.height = `${shrinkHeaderHeight}px`;
      logo.style.height = `${shrinkLogoHeight}px`; 
      logo.style.width = `${shrinkLogoHeight * aspectRatio}px`; // Ajustamos el ancho proporcionalmente
    } else {
      header.style.height = `${originalHeaderHeight}px`;
      logo.style.height = `${originalLogoHeight}px`;
      logo.style.width = `${originalLogoHeight * aspectRatio}px`; // Restauramos el ancho
    }
  });
});