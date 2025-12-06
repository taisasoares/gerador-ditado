document.addEventListener("DOMContentLoaded", () => {
  document.body.style.backgroundColor = corAleatoria();
});

async function carregarDados() {
  const animais = await fetch("animais.json").then(r => r.json());
  const adjetivos = await fetch("adjetivos.json").then(r => r.json());
  const complemento = await fetch("complemento.json").then(r => r.json());

  return { animais, adjetivos, complemento };
}

function aleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function corAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

document.querySelector(".newPhrase").addEventListener("click", async () => {
  const dados = await carregarDados();

  const animal = aleatorio(dados.animais);
  const adj = aleatorio(dados.adjetivos);
  const comp = aleatorio(dados.complemento);

  const adjetivoFinal = animal.genero === "f" ? adj.f : adj.m;

  const frase = `${animal.nome} ${adjetivoFinal} não ${comp}.`;

  document.getElementById("resultado").textContent = frase;
  document.body.style.backgroundColor = corAleatoria();
});


document.querySelector(".copyPhrase").addEventListener("click", () => {
  const texto = document.getElementById("resultado").textContent;

  navigator.clipboard.writeText(texto)
    .then(() => {
      console.log("Copiado!");
    })
    .catch(err => {
      console.error("Erro ao copiar:", err);
    });
});

const toast = document.getElementById("toast");
const btnCopiar = document.querySelector(".copyPhrase");
const btnFechar = document.querySelector(".toast .fechar");
let timeout;

function mostrarToast() {
  toast.classList.add("show");

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

btnCopiar.addEventListener("click", mostrarToast);

btnFechar.addEventListener("click", () => {
  toast.classList.remove("show");
});
