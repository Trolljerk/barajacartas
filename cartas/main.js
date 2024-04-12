// Cargar datos desde el archivo JSON y guardarlos en localStorage
fetch("sources/data.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("cartasData", JSON.stringify(data.data));
    renderTable();
  })
  .catch((error) => console.error("Error al cargar los datos:", error));

const datosFormulario = document.getElementById("datosForm");
const datosTabla = document.querySelector("#tablaCartas tbody");
const botones = document.querySelectorAll(".contenedor-cartas button");

datosFormulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const numeroCarta = this.elements["numCarta"].value;
  const cartasData = JSON.parse(localStorage.getItem("cartasData"));
  const cartaExistente = cartasData.find((card) => card.numero === numeroCarta);

  if (cartaExistente) {
    cartaExistente.cantidad++;
  }

  localStorage.setItem("cartasData", JSON.stringify(cartasData));
  renderTable();
});

botones.forEach((button) => {
  button.addEventListener("click", function () {
    const numeroCarta = this.getAttribute("carta");
    const cartasData = JSON.parse(localStorage.getItem("cartasData"));
    const cartaExistente = cartasData.find(
      (card) => card.numero === numeroCarta
    );
    if (cartaExistente) {
      cartaExistente.cantidad++;
      localStorage.setItem("cartasData", JSON.stringify(cartasData));
      renderTable();
    }
  });
});

function renderTable() {
  const cartasData = JSON.parse(localStorage.getItem("cartasData")) || [];

  const fragment = document.createDocumentFragment();

  cartasData.sort((a, b) => b.cantidad - a.cantidad);

  cartasData.forEach((card) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${card.numero}</td>
      <td>${card.carta}</td>
      <td>${card.cantidad}</td>
    `;
    fragment.appendChild(row);
  });

  datosTabla.textContent = "";
  datosTabla.appendChild(fragment);
}
