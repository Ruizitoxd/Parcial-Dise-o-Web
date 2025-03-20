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

//Código para acomodar el modal de las imagenes de platos principales.
document.addEventListener("DOMContentLoaded", function () {
    const foodImages = document.querySelectorAll(".food-item img");

    // Crear el overlay para la imagen en pantalla completa
    const overlay = document.createElement("div");
    overlay.classList.add("fullscreen-overlay");
    overlay.innerHTML = `<img src="" alt="Imagen ampliada">`;
    document.body.appendChild(overlay);

    const overlayImage = overlay.querySelector("img");

    foodImages.forEach(img => {
        img.addEventListener("click", () => {
            overlayImage.src = img.src;
            overlay.classList.add("active");
        });
    });

    // Cerrar la imagen al hacer clic en cualquier parte del overlay
    overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
    });
});



btn1.addEventListener("click", () => toggleButtons(btn1));
btn2.addEventListener("click", () => toggleButtons(btn2));

//Código para desplegar el menú del dropdown
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar todos los dropdowns de personas y horas
    const dropdowns = document.querySelectorAll(".personas-dropdown, .hora-dropdown");

    dropdowns.forEach(dropdown => {
        const dropdownButton = dropdown.querySelector("button");
        const dropdownContent = dropdown.querySelector(".personas-dropdown-content, .hora-dropdown-content");
        const dropdownInput = dropdown.querySelector("input");

        // Mostrar/ocultar el menú al hacer clic en el botón
        dropdownButton.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdownContent.classList.toggle("show-menu");

            // Cerrar otros dropdowns abiertos
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherContent = otherDropdown.querySelector(".personas-dropdown-content, .hora-dropdown-content");
                    otherContent.classList.remove("show-menu");
                }
            });
        });

        // Cerrar el menú al hacer clic fuera
        document.addEventListener("click", function () {
            dropdownContent.classList.remove("show-menu");
        });

        // Asignar valor al input al seleccionar una opción
        dropdownContent.querySelectorAll("li").forEach(item => {
            item.addEventListener("click", function () {
                dropdownInput.value = this.textContent;
                dropdownContent.classList.remove("show-menu");
            });
        });

        // Validar el rango del input en el dropdown de personas (1-3)
        if (dropdownInput.placeholder === "Personas") {
            dropdownInput.addEventListener("input", function () {
                let value = parseInt(this.value);

                if (isNaN(value)) return;

                if (value < 1) this.value = 1;
                if (value > 3) this.value = 3;
            });
        }
    });
});

// Validar el formulario de reserva
document.querySelector(".reserva-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Evita que se envíe el formulario si hay errores

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let personas = document.querySelector(".personas-dropdown-input").value.trim();
    let hora = document.querySelector(".hora-dropdown-input").value.trim();
    let fecha = document.getElementById("calendar").textContent.trim(); // Ajusta según cómo obtienes la fecha

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar email
    let telefonoRegex = /^[0-9]{7,15}$/; // Teléfono: solo números y mínimo 7 dígitos

    if (!nombre) {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

    if (!telefonoRegex.test(telefono)) {
        alert("Por favor, ingresa un número de teléfono válido (mínimo 7 dígitos).");
        return;
    }

    if (!personas || isNaN(personas) || personas < 1 || personas > 3) {
        alert("Selecciona una cantidad válida de personas (1-3).");
        return;
    }

    if (!hora) {
        alert("Selecciona una hora válida.");
        return;
    }

    if (!fecha) {
        alert("Selecciona una fecha para la reserva.");
        return;
    }

    alert("Reserva realizada con éxito.");
    document.querySelector("form").submit(); // Envía el formulario si todo está bien
});


document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("X1hTCkeS_6iqy9AsH"); // Reemplaza con tu User ID de EmailJS

    document.querySelector(".reserva-btn").addEventListener("click", function (event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        let nombre = document.getElementById("nombre").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        let personas = document.querySelector(".personas-dropdown-input").value.trim();
        let hora = document.querySelector(".hora-dropdown-input").value.trim();
        
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let telefonoRegex = /^[0-9]{7,15}$/;

        if (!nombre || !emailRegex.test(email) || !telefonoRegex.test(telefono) || !personas || !hora) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        // Datos que se enviarán al correo
        let templateParams = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            personas: personas,
            hora: hora,
        };

        // Enviar correo
        emailjs.send("service_jpzv2nl", "template_ay0w05s", templateParams)
            .then(function (response) {
                alert("Reserva enviada con éxito. Revisa tu correo.");
                document.querySelector("form").reset(); // Limpia el formulario
            }, function (error) {
                alert("Error al enviar la reserva. Inténtalo más tarde.");
                console.error("Error al enviar:", error);
            });
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


//cambiar fondo de reserva
document.addEventListener("DOMContentLoaded", function () {
    const btnAlmuerzo = document.getElementById("btn-almuerzo");
    const btnCena = document.getElementById("btn-cena");
    const divReserva = document.getElementById("Reserva");
    const sliderOscuro = document.querySelector(".slider-oscuro");

    btnAlmuerzo.addEventListener("click", function () {
        divReserva.classList.remove("fondo-oscuro");
        btnAlmuerzo.classList.add("active");
        btnCena.classList.remove("active");
        sliderOscuro.classList.remove("right");
        sliderOscuro.classList.add("left");
    });

    btnCena.addEventListener("click", function () {
        divReserva.classList.add("fondo-oscuro");
        btnCena.classList.add("active");
        btnAlmuerzo.classList.remove("active");
        sliderOscuro.classList.remove("left");
        sliderOscuro.classList.add("right");
    });
});



window.addEventListener("scroll", function () {
    let scrollY = window.scrollY;
    let newSize = 100 + (scrollY / 100); // Tamaño inicial - Ajusta la velocidad del zoom
    document.querySelector(".GastronomiaAutentica").style.backgroundSize = `${newSize}%`;
});

//Desplegar sillas según la opción
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el dropdown de personas
    const dropdownPersonas = document.querySelector(".calendarioDropdown .personas-dropdown");
    const inputPersonas = dropdownPersonas.querySelector(".personas-dropdown-input");
    const opcionesPersonas = dropdownPersonas.querySelectorAll(".personas-dropdown-menu li");
    const sillaContainer = document.getElementById("silla-container");

    // Mostrar/Ocultar el menú de personas
    dropdownPersonas.addEventListener("click", function () {
        dropdownPersonas.classList.toggle("open");
    });

    // Asignar evento de selección a cada opción del dropdown de personas
    opcionesPersonas.forEach(opcion => {
        opcion.addEventListener("click", function () {
            let valor = this.getAttribute("data-value");

            if (!valor) return; // Prevenir errores si no hay data-value

            // Actualizar el input con el número seleccionado
            inputPersonas.value = valor;

            // Cambiar la clase del contenedor de sillas
            sillaContainer.classList.remove("Sillas-0", "Sillas-1", "Sillas-2", "Sillas-3");
            sillaContainer.classList.add(`Sillas-${valor}`);

            // Cerrar el dropdown después de seleccionar
            dropdownPersonas.classList.remove("open");
        });
    });

    // Cerrar el menú si se hace clic fuera del dropdown
    document.addEventListener("click", function (event) {
        if (!dropdownPersonas.contains(event.target)) {
            dropdownPersonas.classList.remove("open");
        }
    });
});

