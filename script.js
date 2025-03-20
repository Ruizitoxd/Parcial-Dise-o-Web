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

//Sección para los botones del tipo cena
const btn1 = document.getElementById("btn-almuerzo");
const btn2 = document.getElementById("btn-cena");
const slider = document.querySelector(".slider");

function toggleButtons(selected) {
    if (selected === btn1) {
        slider.classList.remove("right");
        slider.classList.add("left");
        btn1.classList.add("active");
        btn2.classList.remove("active");
    } else {
        slider.classList.remove("left");
        slider.classList.add("right");
        btn2.classList.add("active");
        btn1.classList.remove("active");
    }
}

btn1.addEventListener("click", () => toggleButtons(btn1));
btn2.addEventListener("click", () => toggleButtons(btn2));

//Código para desplegar el menú del dropdown
document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.querySelector(".mi-dropdown-button");
    const dropdownContent = document.querySelector(".mi-dropdown-content");
    const dropdownInput = document.querySelector(".mi-dropdown-input");

    // Mostrar/ocultar el menú al hacer clic en el botón
    dropdownButton.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdownContent.classList.toggle("show-menu");
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener("click", function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove("show-menu");
        }
    });

    // Asignar valor al input cuando se selecciona una opción del menú
    document.querySelectorAll(".mi-dropdown-menu li").forEach(item => {
        item.addEventListener("click", function () {
            dropdownInput.value = this.textContent;
            dropdownContent.classList.remove("show-menu");
        });
    });

    // Validar que el input tenga un número entre 1 y 3
    dropdownInput.addEventListener("input", function () {
        let value = parseInt(this.value);

        if (isNaN(value)) return;

        if (value < 1) {
            this.value = 1;
        } else if (value > 3) {
            this.value = 3;
        }
    });
});

//Script del calendario
document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function generateCalendar(month, year) {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let html = `<div class="calendar-header">
                        <button id="prevMonth" class="nav-btn">◀</button>
                        <span>${months[month]} ${year}</span>
                        <button id="nextMonth" class="nav-btn">▶</button>
                    </div>`;

        html += '<div class="days">' + daysOfWeek.map(day => `<div>${day}</div>`).join("") + '</div>';
        html += '<div class="dates">';

        for (let i = 0; i < firstDay; i++) {
            html += '<div class="empty"></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear();
            html += `<div class="date ${isToday ? 'selected' : ''}" data-day="${day}">${day}</div>`;
        }

        html += '</div>';

        calendar.innerHTML = html;

        document.querySelectorAll(".date").forEach(date => {
            date.addEventListener("click", () => {
                document.querySelectorAll(".date").forEach(d => d.classList.remove("selected"));
                date.classList.add("selected");
            });
        });

        document.getElementById("prevMonth").addEventListener("click", () => changeMonth(-1));
        document.getElementById("nextMonth").addEventListener("click", () => changeMonth(1));
    }

    function changeMonth(direction) {
        currentMonth += direction;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    }

    generateCalendar(currentMonth, currentYear);
});