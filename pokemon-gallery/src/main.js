import "./style.css";

const API_BASE = "https://pokeapi.co/api/v2";
const app = document.getElementById("app");
const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");
const limitInput = document.getElementById("limit");
const reloadBtn = document.getElementById("reload");

async function safeFetch(url) {
  const res = await fetch(url, { headers: { "Accept": "application/json" }});
  if (!res.ok) throw new Error(`HTTP ${res.status} al solicitar ${url}`);
  return res.json();
}

function cardTemplate({ name, image, types, weight }) {
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
    <img alt="${name}" loading="lazy" src="${image ?? ""}"/>
    <h2>${name}</h2>
    <p class="meta"><strong>Tipos:</strong> ${types.join(", ")}</p>
    <p class="meta"><strong>Peso:</strong> ${weight/10} kg</p>
  `;
  return el;
}

async function loadPokemons(limit = 30, offset = 0) {
  grid.innerHTML = "";
  statusEl.textContent = "Cargando Pokémon…";

  const list = await safeFetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);

  const details = await Promise.all(
    list.results.map((p) => safeFetch(p.url))
  );

  const cards = details.map((d) => {
    const image =
      d?.sprites?.other?.["official-artwork"]?.front_default ||
      d?.sprites?.front_default ||
      "";
    const types = (d.types || []).map((t) => t.type.name);
    return {
      name: d.name,
      image,
      types,
      weight: d.weight,
    };
  });

  for (const c of cards) grid.appendChild(cardTemplate(c));

  statusEl.textContent = `Listo: ${cards.length} Pokémon.`;
}

reloadBtn.addEventListener("click", () => {
  const n = Math.max(1, Math.min(60, Number(limitInput.value || 30))); 
  loadPokemons(n, 0);
});

loadPokemons(30, 0).catch((e) => {
  console.error(e);
  statusEl.textContent = "Error cargando datos. Intenta nuevamente.";
});
