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
