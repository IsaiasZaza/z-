// ==========================================================================
//  ⚠️ CONFIGURE AQUI O NÚMERO DE WHATSAPP QUE VAI RECEBER AS CONFIRMAÇÕES
//  Formato: código do país + DDD + número, só dígitos. Ex.: Brasil (61) 99999-8888
//  => "5561999998888"
// ==========================================================================
const WHATSAPP_NUMERO = "5561983111017";

// Lista de presentes (nome, emoji e link da Shopee)
const PRESENTES = [
  { nome: "Esconde esconde", emoji: "🙈", link: "https://s.shopee.com.br/9UzUdeLILQ" },
  { nome: "Croco ball", emoji: "🐊", link: "https://s.shopee.com.br/2BCtuEtQuf" },
  { nome: "Ouriço educativo", emoji: "🦔", link: "https://s.shopee.com.br/2g9AVC3vC0" },
  { nome: "Livro maleta sensorial", emoji: "📚", link: "https://s.shopee.com.br/BRpWde820" },
  { nome: "Livro toque e ouça", emoji: "📖", link: "https://s.shopee.com.br/903E2uQajR" },
  { nome: "Montanha russa e encaixe", emoji: "🎢", link: "https://s.shopee.com.br/5AqVTtsXRe" },
  { nome: "Torre de encaixe e xilofone", emoji: "🎼", link: "https://s.shopee.com.br/3ViHUvAGjR" },
  { nome: "Cadeirinha com blocos de montar", emoji: "🧱", link: "https://s.shopee.com.br/1qa3VuEEWb" },
  { nome: "Mini cesta de basquete", emoji: "🏀", link: "https://s.shopee.com.br/18PKZknrp" },
  { nome: "Microfone infantil", emoji: "🎤", link: "https://s.shopee.com.br/7Kv046aEdh" },
  { nome: "Fruta e legumes com velcro", emoji: "🍓", link: "https://s.shopee.com.br/9fIuqQvY6X" },
  { nome: "Cubos de empilhar", emoji: "🧊", link: "https://s.shopee.com.br/903E3HqUxw" },
];

// Frutas decorativas espalhadas ao fundo
const FRUTAS = ["🍓", "🍌", "🍇", "🍉", "🍎", "🍐", "🥝", "🍊", "🍍", "🫐", "🥑", "🍈"];

function montarFrutasDeFundo() {
  const campo = document.querySelector(".fruit-field");
  if (!campo) return;
  const total = 14;
  for (let i = 0; i < total; i++) {
    const el = document.createElement("span");
    el.textContent = FRUTAS[i % FRUTAS.length];
    el.style.left = Math.random() * 95 + "%";
    el.style.top = Math.random() * 95 + "%";
    el.style.fontSize = 1.8 + Math.random() * 1.8 + "rem";
    el.style.animationDelay = Math.random() * 6 + "s";
    el.style.animationDuration = 7 + Math.random() * 6 + "s";
    campo.appendChild(el);
  }
}

// Cores das frutas para variar os cards de presente
const CORES_PRESENTE = ["#e23b3b", "#f7a531", "#7fb539", "#4ba3e3", "#7b4ba0", "#ec5b2a"];

function montarPresentes() {
  const grid = document.getElementById("gift-grid");
  const select = document.getElementById("presente");
  if (!grid) return;

  PRESENTES.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "gift";
    card.style.setProperty("--gift-color", CORES_PRESENTE[i % CORES_PRESENTE.length]);
    card.innerHTML = `
      <div class="gift__emoji">${p.emoji}</div>
      <h3 class="gift__name">${p.nome}</h3>
      <a class="gift__btn" href="${p.link}" target="_blank" rel="noopener">Comprar</a>
    `;
    grid.appendChild(card);

    if (select) {
      const opt = document.createElement("option");
      opt.value = p.nome;
      opt.textContent = `${p.emoji} ${p.nome}`;
      select.appendChild(opt);
    }
  });
}

function configurarFormulario() {
  const form = document.getElementById("rsvp-form");
  const hint = document.getElementById("rsvp-hint");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();
    const presente = document.getElementById("presente").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome) {
      hint.textContent = "Por favor, preencha seu nome 🙂";
      return;
    }
    hint.textContent = "";

    const qtd = Number(quantidade) || 1;
    const pessoasLabel = qtd === 1 ? "1 pessoa" : `${qtd} pessoas`;

    let texto = `*Confirmação de presença*\n`;
    texto += `*José faz 1 aninho!* \n\n`;
    texto += `*Nome:* ${nome}\n`;
    texto += `*Quantidade:* ${pessoasLabel}\n`;
    texto += `*Data:* 12/07/2026 (domingo)\n`;
    texto += `*Detalhe do local:* É perto do estacionamento do adorável café\n`;
    texto += `*Horário:* 15:00\n`;
    texto += `*Local:* Parque de Águas Claras\n`;
    texto += `Av. das Castanheiras — Águas Claras\n`;
    if (presente) texto += `\n*Presente:* ${presente}\n`;
    if (mensagem) texto += `\n*Recadinho:*\n_${mensagem}_\n`;
    texto += `\n*Contamos com a presença!*`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  montarFrutasDeFundo();
  montarPresentes();
  configurarFormulario();
});
