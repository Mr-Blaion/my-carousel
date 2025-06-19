// --- Datos de analogías ---
const analogies = [
  {
    title: "Función",
    prompt: "Valiente es a héroe como sabio es a…",
    options: ["Científico", "Panadero", "Dragón"],
    correct: 0,  // índice correcto
    justifications: [ /* no se usan aquí */ ]
  },
  {
    title: "Categoría",
    prompt: "Manzana es a fruta como…",
    options: ["Rosa", "Melón", "Tornillo"],
    correct: 1,
    justifications: []
  },
  {
    title: "Parte–Todo",
    prompt: "Rueda es a coche como hoja es a…",
    options: ["Árbol", "Papel", "Casa"],
    correct: 0,
    justifications: []
  },
  {
    title: "Características",
    prompt: "Blanco es a luz como negro es a…",
    options: ["Ausencia de color", "Luz", "Azul"],
    correct: 0,
    justifications: []
  }
];

// --- Referencias DOM ---
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const promptText = document.getElementById("prompt-text");
const optsContainer = document.getElementById("options-container");
const submitBtn = document.getElementById("submit-justif-btn");

let currentIdx = null;
let selectedOption = null;

// 1️⃣ Giro con reinicio para que la animación siempre salte
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  void wheel.offsetWidth; // reflow
  const spins = 10;
  const rand = Math.floor(Math.random() * 360);
  const total = spins * 360 + rand;
  wheel.style.transition = "transform 6s cubic-bezier(0.25,0.1,0.25,1)";
  wheel.style.transform = `rotate(${total}deg)`;
  wheel.addEventListener("transitionend", () => {
    spinBtn.disabled = false;
    const final = total % 360;
    const sector = Math.floor(final / 90);
    showQuestion(sector);
  }, { once: true });
});

// 2️⃣ Mostrar pregunta y opciones
function showQuestion(idx) {
  currentIdx = idx;
  const data = analogies[idx];
  modalTitle.textContent = `Zona: ${data.title}`;
  promptText.textContent = data.prompt;
  optsContainer.innerHTML = "";
  data.options.forEach((opt, i) => {
    const id = `opt-${i}`;
    optsContainer.innerHTML += `
      <label for="${id}">
        <input type="radio" name="option" id="${id}" value="${i}"> ${opt}
      </label>`;
  });
  submitBtn.textContent = "Enviar justificación";
  submitBtn.classList.remove("hidden");
  modal.classList.remove("hidden");
}

// 3️⃣ Al enviar justificación, comprobamos selección y validamos
submitBtn.addEventListener("click", () => {
  // Leer opción seleccionada
  const radio = document.querySelector('input[name="option"]:checked');
  if (!radio) {
    alert("Por favor, selecciona primero tu justificación.");
    return;
  }
  const chosen = parseInt(radio.value, 10);
  const data = analogies[currentIdx];

  // Parámetro de validación:
  // comparamos chosen === data.correct
  if (chosen === data.correct) {
    // acierto
    confetti();
    alert("✅ ¡Muy bien! La justificación es correcta.");
    closeModalFn();
  } else {
    // error: mostramos justificaciones modelo
    alert("❌ Esa justificación no es la ideal. Mira las opciones recomendadas:");
    showModelJustifications();
  }
});

// 4️⃣ Mostrar justificaciones modelo si falla
function showModelJustifications() {
  const data = analogies[currentIdx];
  // Ejemplo de justificaciones modelo
  const models = [
    `Porque ${data.options[data.correct]} es la opción lógica.`,
    "Revisa cómo encaja cada término en la analogía."
  ];
  optsContainer.innerHTML = "";
  models.forEach(text => {
    optsContainer.innerHTML += `<p>• ${text}</p>`;
  });
  submitBtn.textContent = "Cerrar";
  submitBtn.onclick = closeModalFn;
}

// Cerrar modal
closeModal.addEventListener("click", closeModalFn);
function closeModalFn() {
  modal.classList.add("hidden");
  submitBtn.onclick = null;
  submitBtn.classList.add("hidden");
}
