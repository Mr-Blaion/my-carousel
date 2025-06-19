// Datos de ejemplo de analogías
const analogies = [
  {
    title: "Función",
    prompt: "Valiente es a héroe como sabio es a…",
    options: ["Científico", "Panadero", "Dragón"],
    correct: 0,    // índice en options
    justifications: [
      "Porque un científico usa la sabiduría para investigar.",
      "Porque un panadero amasa pan, no es sabio.",
      "Porque un dragón no representa sabiduría."
    ]
  },
  {
    title: "Categoría",
    prompt: "Manzana es a fruta como…",
    options: ["Rosa", "Melón", "Tornillo"],
    correct: 1,
    justifications: [
      "Porque una rosa es flor, no fruta.",
      "Porque un melón es fruta, igual que la manzana.",
      "Porque un tornillo no es fruta."
    ]
  },
  {
    title: "Parte–Todo",
    prompt: "Rueda es a coche como hoja es a…",
    options: ["Árbol", "Papel", "Casa"],
    correct: 0,
    justifications: [
      "Porque una hoja es parte de un árbol.",
      "Porque un papel no es parte de un coche.",
      "Porque una casa no es parte de un coche."
    ]
  },
  {
    title: "Características",
    prompt: "Blanco es a luz como negro es a…",
    options: ["Ausencia de color", "Luz", "Azul"],
    correct: 0,
    justifications: [
      "Porque el negro es la ausencia de color.",
      "Porque la luz no es ausencia de color.",
      "Porque el azul es un color."
    ]
  }
];

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const promptText = document.getElementById("prompt-text");
const optionsContainer = document.getElementById("options-container");
const freeText = document.getElementById("free-text");
const checkBtn = document.getElementById("check-btn");

let currentIdx = null;

// Girar rueda
spinBtn.addEventListener("click", () => {
  const extraSpins = 3;
  const randomAngle = Math.floor(Math.random() * 360);
  const totalAngle = extraSpins * 360 + randomAngle;
  wheel.style.transform = `rotate(${totalAngle}deg)`;

  wheel.addEventListener("transitionend", () => {
    const final = totalAngle % 360;
    const sectorIndex = Math.floor(final / 90);
    showAnalogy(sectorIndex);
  }, { once: true });
});

// Mostrar modal con la analogía
function showAnalogy(idx) {
  currentIdx = idx;
  const data = analogies[idx];
  modalTitle.textContent = data.title;
  promptText.textContent = data.prompt;

  // botones de opciones
  optionsContainer.innerHTML = "";
  data.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => handleChoice(i));
    optionsContainer.appendChild(btn);
  });

  // ocultar libre
  freeText.classList.add("hidden");
  checkBtn.classList.add("hidden");

  modal.classList.remove("hidden");
}

// Evaluar opción múltiple
function handleChoice(chosen) {
  const data = analogies[currentIdx];

  // Limpiar contenedor y mostrar justificaciones
  optionsContainer.innerHTML = "";
  data.justifications.forEach((text, i) => {
    const bub = document.createElement("button");
    bub.textContent = text;
    bub.addEventListener("click", () => {
      alert(i === data.correct ? "✅ ¡Correcto!" : "❌ Intenta de nuevo");
      closeModalFn();
    });
    optionsContainer.appendChild(bub);
  });

  // además, mostrar campo de texto libre
  freeText.classList.remove("hidden");
  checkBtn.classList.remove("hidden");
}

// Envío de texto libre
checkBtn.addEventListener("click", () => {
  const txt = freeText.value.trim().toLowerCase();
  const keyword = analogies[currentIdx].options[analogies[currentIdx].correct].toLowerCase();
  if (txt.includes(keyword)) {
    alert("✅ ¡Buen razonamiento!");
  } else {
    alert("❌ No veo la palabra clave; inténtalo otra vez.");
  }
  closeModalFn();
});

// Cerrar modal
closeModal.addEventListener("click", closeModalFn);
function closeModalFn() {
  modal.classList.add("hidden");
  freeText.value = "";
}
