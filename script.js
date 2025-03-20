// Selección de elementos
const carrusel = document.getElementById("carrusel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
let items = Array.from(document.querySelectorAll(".item"));

let currentIndex = items.length; // Empieza en el primer clon
let isTransitioning = false;

// ✅ Clonar los elementos para el bucle infinito fluido
function duplicarItems() {
    const fragmentoInicio = document.createDocumentFragment();
    const fragmentoFin = document.createDocumentFragment();

    // Clonar el primer y último set de elementos
    items.forEach(item => {
        fragmentoFin.appendChild(item.cloneNode(true)); // Final
    });
    items.forEach(item => {
        fragmentoInicio.appendChild(item.cloneNode(true)); // Inicio
    });

    // Agregar los clones
    carrusel.appendChild(fragmentoFin);
    carrusel.insertBefore(fragmentoInicio, items[0]);

    // Actualizar el array de items
    items = Array.from(document.querySelectorAll(".item"));
}
duplicarItems();

// ✅ Crear los dots dinámicamente (solo para el set principal)
function crearDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < items.length / 3; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => moverA(i + items.length / 3));
        dotsContainer.appendChild(dot);
    }
}
crearDots();

// ✅ Función para actualizar la posición del carrusel
// ✅ Ajusta el cálculo de la posición central
function actualizarCarrusel(immediate = false) {
    if (isTransitioning) return;
    isTransitioning = true;

    const carruselWidth = carrusel.offsetWidth; // Ancho total del carrusel
    const itemWidth = items[0].offsetWidth;     // Ancho de un elemento

    // ✅ Centrar la imagen activa
    const offset = (itemWidth * currentIndex) - (carruselWidth / 2) + (itemWidth / 2);

    // ✅ Aplicar la transición o el cambio inmediato
    carrusel.style.transition = immediate ? "none" : "transform 0.8s ease";
    carrusel.style.transform = `translateX(${-offset}px)`;

    // ✅ Asegurar el efecto de zoom solo en la imagen activa
    items.forEach((item, index) => {
        item.style.transform = index === currentIndex ? "scale(1.08)" : "scale(1)";
    });

    // ✅ Sincronizar los dots
    const dotIndex = (currentIndex % (items.length / 3));
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === dotIndex);
    });

    // ✅ Corregir la posición al final/inicio para el bucle infinito
    setTimeout(() => {
        if (currentIndex >= items.length - items.length / 3) {
            carrusel.style.transition = "none";
            currentIndex = items.length / 3;
            actualizarCarrusel(true);
        } else if (currentIndex < items.length / 3) {
            carrusel.style.transition = "none";
            currentIndex = items.length - items.length / 3 - 1;
            actualizarCarrusel(true);
        }
        isTransitioning = false;
    }, 800);
}


// ✅ Función para avanzar
function siguiente() {
    if (!isTransitioning) {
        currentIndex++;
        actualizarCarrusel();
    }
}

// ✅ Función para retroceder
function anterior() {
    if (!isTransitioning) {
        currentIndex--;
        actualizarCarrusel();
    }
}

// ✅ Función para ir a un índice específico
function moverA(index) {
    if (!isTransitioning) {
        currentIndex = index;
        actualizarCarrusel();
    }
}

// ✅ Event listeners
nextBtn.addEventListener("click", siguiente);
prevBtn.addEventListener("click", anterior);
window.addEventListener("load", () => actualizarCarrusel(true));


// 🔽 Re-escalar el navbar cuando no estamos en el inicio
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const logo = document.querySelector("header img");

    const originalHeaderHeight = header.offsetHeight;
    const shrinkHeaderHeight = originalHeaderHeight / 2;

    const originalLogoHeight = logo.offsetHeight;
    const shrinkLogoHeight = originalLogoHeight / 2;

    const originalLogoWidth = logo.offsetWidth;
    const aspectRatio = originalLogoWidth / originalLogoHeight;

    window.addEventListener("scroll", function () {
        const threshold = window.innerHeight * 0.65;

        if (window.scrollY > threshold) {
            header.style.height = `${shrinkHeaderHeight}px`;
            logo.style.height = `${shrinkLogoHeight}px`;
            logo.style.width = `${shrinkLogoHeight * aspectRatio}px`;
        } else {
            header.style.height = `${originalHeaderHeight}px`;
            logo.style.height = `${originalLogoHeight}px`;
            logo.style.width = `${originalLogoHeight * aspectRatio}px`;
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const monthName = document.getElementById("monthName");
    const calDays = document.getElementById("calDays");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentDate = new Date();

    function renderCalendar(date) {
        calDays.innerHTML = "";
        const year = date.getFullYear();
        const month = date.getMonth();
        monthName.textContent = `${months[month]}`;

        // Primer día del mes
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Días del mes anterior
        const prevLastDate = new Date(year, month, 0).getDate();

        for (let i = firstDay; i > 0; i--) {
            calDays.innerHTML += `<button class="btn cal-btn" disabled>${prevLastDate - i + 1}</button>`;
        }

        // Días del mes actual
        for (let i = 1; i <= lastDate; i++) {
            calDays.innerHTML += `<button class="btn cal-btn">${i}</button>`;
        }
    }

    // Navegación de mes
    prevMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Renderizar el calendario inicial
    renderCalendar(currentDate);
});

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

