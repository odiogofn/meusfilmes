// ==================== CONFIG SUPABASE ====================

const SUPABASE_URL = "https://koytoiwfvwzjvgcqhlal.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtveXRvaXdmdnd6anZnY3FobGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDExNzAsImV4cCI6MjA3OTcxNzE3MH0.mrMRUGJFqzOBjj7M4giHcWr5qsqUn_0woVMFikDxrjM";

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== CONFIG TMDB ====================

const TMDB_API_KEY = "34d1febeb2c306bd928d270c1990c076";
const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGQxZmViZWIyYzMwNmJkOTI4ZDI3MGMxOTkwYzA3NiIsIm5iZiI6MTc2NDU0NzczNC43MDIwMDAxLCJzdWIiOiI2OTJjZGM5Njg1ZTg0OGEwYjAyNmVhZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Htppj_TDovsK4-xrjzwZrBduPQJZSy9HErIjkvm8DgY";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";

// ==================== ESTADO GLOBAL ====================

let todasMidias = [];
let statusFiltroAba = "";
let filtroFranquiaSelecionada = null;
let midiaEmEdicao = null;

// Episódios
let midiaSelecionadaParaEpisodios = null;
let episodiosDaMidiaAtual = [];
let episodioEmEdicao = null;

// ==================== ELEMENTOS DOM ====================

// views
const viewPrincipal = document.getElementById("view-principal");
const viewGerir = document.getElementById("view-gerir");
const viewEpisodios = document.getElementById("view-episodios");

// Navegação
const btnIrPrincipal = document.getElementById("btn-ir-principal");
const btnIrGerir = document.getElementById("btn-ir-gerir");
const btnVoltarPrincipal = document.getElementById("btn-voltar-principal");
const btnVoltarPrincipalDeEpisodios = document.getElementById(
  "btn-voltar-principal-de-episodios"
);

// Filtros principais
const filtroBuscaNome = document.getElementById("filtro-busca-nome");
const filtroNotaMin = document.getElementById("filtro-nota-min");
const filtroStreaming = document.getElementById("filtro-streaming");
const filtroAno = document.getElementById("filtro-ano");
const filtroGenero = document.getElementById("filtro-genero");
const filtroDiretor = document.getElementById("filtro-diretor");
const filtroFranquia = document.getElementById("filtro-franquia");
const filtroTipo = document.getElementById("filtro-tipo");

const tabsStatus = document.querySelectorAll(".tab");

// Destaques
const listaTopMais = document.getElementById("lista-top-mais");
const listaTopMenos = document.getElementById("lista-top-menos");
const listaTopRecentes = document.getElementById("lista-top-recentes");

// Franquias
const franquiasGrid = document.getElementById("franquias-grid");
const subtabsFranquia = document.querySelectorAll(".subtab");

// Cards
const midiasList = document.getElementById("midias-list");

// Gerir
const formMidia = document.getElementById("midia-form");
const nomeInput = document.getElementById("nome");
const sinopseInput = document.getElementById("sinopse");
const diretorInput = document.getElementById("diretor");
const generoInput = document.getElementById("genero");
const dataLancInput = document.getElementById("data-lancamento");
const anoInput = document.getElementById("ano");
const streamingInput = document.getElementById("streaming");
const tipoSelect = document.getElementById("tipo");
const numTemporadasInput = document.getElementById("numero-temporadas");
const numEpisodiosInput = document.getElementById("numero-episodios");
const franquiaInput = document.getElementById("franquia");
const statusSelect = document.getElementById("status");
const avaliacaoInput = document.getElementById("avaliacao");
const midiaRatingStars = document.getElementById("midia-rating-stars");
const imagemUrlInput = document.getElementById("imagem-url");
const tmdbIdInput = document.getElementById("tmdb-id");

const btnSalvarMidia = document.getElementById("btn-salvar-midia");
const btnCancelarEdicaoMidia = document.getElementById(
  "btn-cancelar-edicao-midia"
);

const tabelaGerirMidiasBody = document.getElementById("tabela-gerir-midias");

// TMDb
const tmdbQueryInput = document.getElementById("tmdb-query");
const btnTmdbBuscar = document.getElementById("btn-tmdb-buscar");
const tmdbResultadosDiv = document.getElementById("tmdb-resultados");

// Import/Export midias
const btnExportMidias = document.getElementById("btn-export-midias");
const btnExportModeloMidias = document.getElementById(
  "btn-export-modelo-midias"
);
const inputImportMidias = document.getElementById("input-import-midias");
const btnImportMidias = document.getElementById("btn-import-midias");

// Episódios view
const episodiosTitulo = document.getElementById("episodios-titulo");
const episodiosSubtitulo = document.getElementById("episodios-subtitulo");
const episodiosResumo = document.getElementById("episodios-resumo");
const filtroEpisodioTemporada = document.getElementById(
  "filtro-episodio-temporada"
);
const filtroEpisodioStatus = document.getElementById("filtro-episodio-status");
const episodiosContainer = document.getElementById("episodios-container");

const btnNovoEpisodio = document.getElementById("btn-novo-episodio");
const btnExportEpisodios = document.getElementById("btn-export-episodios");
const inputImportEpisodios = document.getElementById("input-import-episodios");

// Modal episodio
const episodioModalBackdrop = document.getElementById(
  "episodio-modal-backdrop"
);
const episodioModalTitulo = document.getElementById("episodio-modal-titulo");
const episodioTemporadaInput = document.getElementById("episodio-temporada");
const episodioNumeroInput = document.getElementById("episodio-numero");
const episodioTituloInput = document.getElementById("episodio-titulo");
const episodioResumoInput = document.getElementById("episodio-resumo");
const episodioStatusSelect = document.getElementById("episodio-status");
const episodioAvaliacaoInput = document.getElementById("episodio-avaliacao");
const episodioRatingStars = document.getElementById("episodio-rating-stars");
const btnSalvarEpisodio = document.getElementById("btn-salvar-episodio");
const btnCancelarEpisodio = document.getElementById("btn-cancelar-episodio");

// Toast
const toastEl = document.getElementById("toast");

// ==================== UTIL ====================

function showMessage(msg, type = "success", timeout = 2500) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.remove("hidden", "success", "error");
  toastEl.classList.add("show", type);
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, timeout);
}

function sanitizeRating(val) {
  if (val === null || val === undefined || val === "") return null;
  const num = parseFloat(val);
  if (Number.isNaN(num)) return null;
  const clamped = Math.max(0, Math.min(5, num));
  return Math.round(clamped * 2) / 2;
}

function renderStars(rating) {
  if (rating === null || rating === undefined || rating === "") {
    return "☆☆☆☆☆";
  }
  let num = parseFloat(rating);
  if (Number.isNaN(num)) return "☆☆☆☆☆";
  num = Math.max(0, Math.min(5, num));
  const full = Math.floor(num);
  const half = num - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  if (empty < 0) return "☆☆☆☆☆";
  return "★".repeat(full) + (half ? "⯨" : "") + "☆".repeat(empty);
}

function statusLabel(status) {
  switch (status) {
    case "ASSISTINDO":
      return "Assistindo";
    case "ASSISTIDOS":
      return "Assistidos";
    case "AINDA_NAO_COMECEI":
      return "Ainda não comecei";
    default:
      return status || "";
  }
}

function toEpisodeCode(temp, num) {
  const t = String(temp).padStart(2, "0");
  const e = String(num).padStart(2, "0");
  return `T${t}E${e}`;
}

// ==================== RATING INTERATIVO ====================

function initInteractiveRating(starsEl, inputEl) {
  if (!starsEl || !inputEl) return;

  function updateFromInput() {
    const val = sanitizeRating(inputEl.value);
    starsEl.textContent = renderStars(val);
  }

  starsEl.addEventListener("click", (ev) => {
    const rect = starsEl.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const ratio = x / rect.width;
    let rating = Math.round(ratio * 10) / 2; // 0..5 passos 0.5
    rating = Math.max(0, Math.min(5, rating));
    inputEl.value = rating.toFixed(1).replace(".0", "");
    updateFromInput();
  });

  inputEl.addEventListener("input", updateFromInput);
  updateFromInput();
}

// ==================== VIEW SWITCH ====================

function setActiveView(view) {
  [viewPrincipal, viewGerir, viewEpisodios].forEach((v) =>
    v.classList.remove("active")
  );
  view.classList.add("active");
}

function mostrarPrincipal() {
  setActiveView(viewPrincipal);
}

function mostrarGerirView() {
  setActiveView(viewGerir);
}

function mostrarEpisodiosView() {
  setActiveView(viewEpisodios);
}

// ==================== MIDIAS: CARREGAR ====================

async function carregarMidias() {
  const { data, error } = await db
    .from("midias")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    showMessage("Erro ao carregar mídias.", "error");
    return;
  }

  todasMidias = data || [];
  popularFiltrosComBaseNasMidias();
  renderizarDashboard();
  aplicarFiltrosEAtualizar();
  renderizarTabelaGerir();
}

// ==================== FILTROS ====================

function popularFiltrosComBaseNasMidias() {
  const streamings = new Set();
  const anos = new Set();
  const generos = new Set();
  const diretores = new Set();
  const franquias = new Set();

  todasMidias.forEach((m) => {
    if (m.streaming) streamings.add(m.streaming);
    if (m.ano) anos.add(m.ano);
    if (m.genero) generos.add(m.genero);
    if (m.diretor) diretores.add(m.diretor);
    if (m.franquia) franquias.add(m.franquia);
  });

  function preencherSelect(select, valores) {
    const atual = select.value;
    select.innerHTML = `<option value="">${
      select === filtroFranquia
        ? "Todas"
        : select === filtroTipo
        ? "Filmes e Séries"
        : "Todos"
    }</option>`;
    Array.from(valores)
      .sort((a, b) => (a > b ? 1 : -1))
      .forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        select.appendChild(opt);
      });
    if (atual && [...select.options].some((o) => o.value === atual)) {
      select.value = atual;
    }
  }

  preencherSelect(filtroStreaming, streamings);
  preencherSelect(filtroAno, anos);
  preencherSelect(filtroGenero, generos);
  preencherSelect(filtroDiretor, diretores);
  preencherSelect(filtroFranquia, franquias);
}

// ==================== RENDER DASHBOARD (TOP 10 ETC) ====================

function renderizarDashboard() {
  const avaliadas = todasMidias.filter(
    (m) => m.avaliacao !== null && m.avaliacao !== undefined
  );

  const melhores = [...avaliadas]
    .sort((a, b) => {
      const diff = (b.avaliacao || 0) - (a.avaliacao || 0);
      if (diff !== 0) return diff;
      return (b.id || 0) - (a.id || 0);
    })
    .slice(0, 10);

  const piores = [...avaliadas]
    .sort((a, b) => {
      const diff = (a.avaliacao || 0) - (b.avaliacao || 0);
      if (diff !== 0) return diff;
      return (a.id || 0) - (b.id || 0);
    })
    .slice(0, 10);

  const recentes = [...todasMidias]
    .sort((a, b) => {
      const da = a.created_at || a.id;
      const db = b.created_at || b.id;
      return db > da ? 1 : -1;
    })
    .slice(0, 10);

  function preencherLista(ul, lista) {
    ul.innerHTML = "";
    lista.forEach((m) => {
      const li = document.createElement("li");
      const left = document.createElement("span");
      left.textContent = m.nome || "(sem nome)";
      const right = document.createElement("span");
      right.textContent = m.avaliacao ? `${m.avaliacao.toFixed(1)} ⭐` : "-";
      li.appendChild(left);
      li.appendChild(right);
      ul.appendChild(li);
    });
  }

  preencherLista(listaTopMais, melhores);
  preencherLista(listaTopMenos, piores);
  preencherLista(listaTopRecentes, recentes);

  renderizarFranquias();
}

// ==================== RENDER FRANQUIAS ====================

function renderizarFranquias() {
  franquiasGrid.innerHTML = "";
  const franquiasMap = new Map();

  todasMidias.forEach((m) => {
    if (!m.franquia) return;
    if (!franquiasMap.has(m.franquia)) {
      franquiasMap.set(m.franquia, []);
    }
    franquiasMap.get(m.franquia).push(m);
  });

  const tipoFiltroFranquiaSubtab = document.querySelector(
    ".subtab.active"
  )?.dataset.franquiaTipo;

  const entries = [...franquiasMap.entries()].sort((a, b) =>
    a[0] > b[0] ? 1 : -1
  );

  entries.forEach(([nomeFranquia, midias]) => {
    const filmes = midias.filter((m) => m.tipo === "FILME");
    const series = midias.filter((m) => m.tipo === "SERIE");

    let colecaoConsiderada = midias;
    if (tipoFiltroFranquiaSubtab === "FILME") colecaoConsiderada = filmes;
    if (tipoFiltroFranquiaSubtab === "SERIE") colecaoConsiderada = series;
    if (!colecaoConsiderada.length) return;

    const card = document.createElement("div");
    card.className = "franquia-card";
    card.dataset.franquia = nomeFranquia;

    const postersRow = document.createElement("div");
    postersRow.className = "franquia-poster-row";

    // agora mostra TODOS os pôsteres com URL
    colecaoConsiderada
      .filter((m) => m.imagem_url)
      .forEach((m) => {
        const img = document.createElement("img");
        img.src = m.imagem_url;
        img.alt = m.nome || "";
        postersRow.appendChild(img);
      });

    const title = document.createElement("div");
    title.className = "franquia-title";
    title.textContent = nomeFranquia;

    card.appendChild(postersRow);
    card.appendChild(title);

    card.addEventListener("click", () => {
      filtroFranquiaSelecionada = nomeFranquia;
      filtroFranquia.value = nomeFranquia;
      aplicarFiltrosEAtualizar();
    });

    franquiasGrid.appendChild(card);
  });
}

// ==================== RENDER LISTA PRINCIPAL ====================

function aplicarFiltrosEAtualizar() {
  let lista = [...todasMidias];

  const nomeBusca = filtroBuscaNome.value.trim().toLowerCase();
  const notaMin = sanitizeRating(filtroNotaMin.value);
  const streaming = filtroStreaming.value;
  const ano = filtroAno.value;
  const genero = filtroGenero.value;
  const diretor = filtroDiretor.value;
  const franquia = filtroFranquiaSelecionada || filtroFranquia.value;
  const tipo = filtroTipo.value;

  if (nomeBusca) {
    lista = lista.filter((m) =>
      (m.nome || "").toLowerCase().includes(nomeBusca)
    );
  }

  if (notaMin !== null) {
    lista = lista.filter(
      (m) => m.avaliacao !== null && m.avaliacao >= notaMin
    );
  }

  if (streaming) {
    lista = lista.filter((m) => m.streaming === streaming);
  }

  if (ano) {
    lista = lista.filter((m) => String(m.ano) === String(ano));
  }

  if (genero) {
    lista = lista.filter((m) => m.genero === genero);
  }

  if (diretor) {
    lista = lista.filter((m) => m.diretor === diretor);
  }

  if (franquia) {
    lista = lista.filter((m) => m.franquia === franquia);
  }

  if (tipo) {
    lista = lista.filter((m) => m.tipo === tipo);
  }

  if (statusFiltroAba) {
    lista = lista.filter((m) => m.status === statusFiltroAba);
  }

  renderizarListaMidias(lista);
}

function criarCardMidia(midia) {
  const card = document.createElement("div");
  card.className = "card";

  const posterDiv = document.createElement("div");
  posterDiv.className = "card-poster";
  const img = document.createElement("img");
  img.src =
    midia.imagem_url ||
    "https://via.placeholder.com/150x220.png?text=Sem+Imagem";
  img.alt = midia.nome || "";
  posterDiv.appendChild(img);

  const content = document.createElement("div");
  content.className = "card-content";

  const titleLine = document.createElement("div");
  titleLine.className = "card-title-line";

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = midia.nome || "(sem nome)";

  const badgeTipo = document.createElement("span");
  badgeTipo.className = "badge-tipo";
  if (midia.tipo === "SERIE") {
    badgeTipo.classList.add("badge-serie");
    badgeTipo.textContent = "Série";
  } else if (midia.tipo === "FILME") {
    badgeTipo.classList.add("badge-filme");
    badgeTipo.textContent = "Filme";
  } else {
    badgeTipo.textContent = midia.tipo || "?";
  }

  titleLine.appendChild(title);
  titleLine.appendChild(badgeTipo);

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const metaParts = [];
  if (midia.ano) metaParts.push(midia.ano);
  if (midia.streaming) metaParts.push(midia.streaming);
  if (midia.diretor) metaParts.push(midia.diretor);
  if (midia.genero) metaParts.push(midia.genero);
  if (midia.franquia) metaParts.push(`Franquia: ${midia.franquia}`);

  meta.textContent = metaParts.join(" • ");

  const sinopse = document.createElement("div");
  sinopse.className = "serie-resumo";
  if (midia.sinopse) {
    const txt =
      midia.sinopse.length > 140
        ? midia.sinopse.slice(0, 137) + "..."
        : midia.sinopse;
    sinopse.textContent = txt;
  }

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const badgeStatus = document.createElement("span");
  badgeStatus.className = "badge-status";

  if (midia.status === "ASSISTINDO") {
    badgeStatus.classList.add("assistindo");
  } else if (midia.status === "ASSISTIDOS") {
    badgeStatus.classList.add("assistidos");
  } else if (midia.status === "AINDA_NAO_COMECEI") {
    badgeStatus.classList.add("nao-comecou");
  }

  badgeStatus.textContent = statusLabel(midia.status);

  const rightFooter = document.createElement("div");
  rightFooter.style.display = "flex";
  rightFooter.style.alignItems = "center";
  rightFooter.style.gap = "6px";
  rightFooter.style.flexWrap = "wrap";

  const starsSpan = document.createElement("span");
  starsSpan.className = "card-stars";
  starsSpan.textContent = renderStars(midia.avaliacao);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "card-actions";

  const btnGerir = document.createElement("button");
  btnGerir.className = "btn ghost";
  btnGerir.textContent = "Editar";
  btnGerir.addEventListener("click", () => {
    entrarModoEdicaoMidia(midia);
  });

  actionsDiv.appendChild(btnGerir);

  if (midia.tipo === "SERIE") {
    const btnEps = document.createElement("button");
    btnEps.className = "btn secondary";
    btnEps.textContent = "Ver episódios";
    btnEps.addEventListener("click", () => {
      abrirGuiaEpisodios(midia);
    });
    actionsDiv.appendChild(btnEps);
  }

  rightFooter.appendChild(starsSpan);
  rightFooter.appendChild(actionsDiv);

  footer.appendChild(badgeStatus);
  footer.appendChild(rightFooter);

  content.appendChild(titleLine);
  content.appendChild(meta);
  if (midia.sinopse) content.appendChild(sinopse);
  content.appendChild(footer);

  card.appendChild(posterDiv);
  card.appendChild(content);

  return card;
}

function renderizarListaMidias(lista) {
  midiasList.innerHTML = "";
  if (!lista.length) {
    const vazio = document.createElement("p");
    vazio.textContent = "Nenhuma mídia encontrada com os filtros atuais.";
    vazio.style.fontSize = "0.9rem";
    vazio.style.color = "#6b7280";
    midiasList.appendChild(vazio);
    return;
  }

  lista.forEach((m) => {
    const card = criarCardMidia(m);
    midiasList.appendChild(card);
  });
}

// ==================== GERIR MIDIAS ====================

function clearMidiaForm() {
  formMidia.reset();
  statusSelect.value = "ASSISTINDO";
  midiaRatingStars.textContent = "☆☆☆☆☆";
  imagemUrlInput.value = "";
  anoInput.value = "";
  sinopseInput.value = "";
  numTemporadasInput.value = "";
  numEpisodiosInput.value = "";
  tmdbIdInput.value = "";
  tmdbResultadosDiv.innerHTML = "";
}

function sairModoEdicaoMidia() {
  midiaEmEdicao = null;
  btnSalvarMidia.innerHTML = "<span>💾</span><span>Salvar</span>";
  btnCancelarEdicaoMidia.style.display = "none";
  clearMidiaForm();
}

function entrarModoEdicaoMidia(midia) {
  midiaEmEdicao = midia;
  nomeInput.value = midia.nome || "";
  sinopseInput.value = midia.sinopse || "";
  diretorInput.value = midia.diretor || "";
  generoInput.value = midia.genero || "";
  dataLancInput.value = midia.data_lancamento || "";
  anoInput.value = midia.ano || "";
  streamingInput.value = midia.streaming || "";
  tipoSelect.value = midia.tipo || "";
  numTemporadasInput.value =
    midia.numero_temporadas !== undefined && midia.numero_temporadas !== null
      ? midia.numero_temporadas
      : "";
  numEpisodiosInput.value =
    midia.numero_episodios !== undefined && midia.numero_episodios !== null
      ? midia.numero_episodios
      : "";
  franquiaInput.value = midia.franquia || "";
  statusSelect.value = midia.status || "ASSISTINDO";
  avaliacaoInput.value =
    midia.avaliacao !== undefined && midia.avaliacao !== null
      ? midia.avaliacao
      : "";
  midiaRatingStars.textContent = renderStars(avaliacaoInput.value);
  imagemUrlInput.value = midia.imagem_url || "";
  tmdbIdInput.value =
    midia.tmdb_id !== undefined && midia.tmdb_id !== null ? midia.tmdb_id : "";

  btnSalvarMidia.innerHTML = "<span>💾</span><span>Atualizar</span>";
  btnCancelarEdicaoMidia.style.display = "inline-flex";

  mostrarGerirView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function salvarMidia(e) {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  if (!nome) {
    showMessage("Informe um nome para a mídia.", "error");
    return;
  }

  const tipo = tipoSelect.value;
  if (!tipo) {
    showMessage("Informe se é filme ou série.", "error");
    return;
  }

  const diretor = diretorInput.value.trim() || null;
  const genero = generoInput.value.trim() || null;
  const data_lancamento = dataLancInput.value || null;
  let ano = anoInput.value ? parseInt(anoInput.value) : null;
  if (!ano && data_lancamento) {
    const y = new Date(data_lancamento).getFullYear();
    if (!Number.isNaN(y)) ano = y;
  }
  const streaming = streamingInput.value.trim() || null;
  const franquia = franquiaInput.value.trim() || null;
  const status = statusSelect.value;
  const avaliacao = sanitizeRating(avaliacaoInput.value);
  const imagem_url = imagemUrlInput.value.trim() || null;
  const sinopse = sinopseInput.value.trim() || null;
  const numero_temporadas = numTemporadasInput.value
    ? parseInt(numTemporadasInput.value)
    : null;
  const numero_episodios = numEpisodiosInput.value
    ? parseInt(numEpisodiosInput.value)
    : null;
  const tmdb_id = tmdbIdInput.value ? parseInt(tmdbIdInput.value) : null;

  const payload = {
    nome,
    diretor,
    genero,
    data_lancamento,
    ano,
    streaming,
    tipo,
    franquia,
    status,
    avaliacao,
    imagem_url,
    sinopse,
    numero_temporadas,
    numero_episodios,
    tmdb_id,
  };

  let error;
  if (midiaEmEdicao) {
    const { error: err } = await db
      .from("midias")
      .update(payload)
      .eq("id", midiaEmEdicao.id);
    error = err;
  } else {
    const { error: err } = await db.from("midias").insert(payload);
    error = err;
  }

  if (error) {
    console.error(error);
    showMessage("Erro ao salvar mídia.", "error");
    return;
  }

  showMessage("Mídia salva com sucesso.", "success");
  sairModoEdicaoMidia();
  await carregarMidias();
}

async function excluirMidia(id) {
  if (!confirm("Tem certeza que deseja excluir esta mídia?")) return;
  const { error } = await db.from("midias").delete().eq("id", id);
  if (error) {
    console.error(error);
    showMessage("Erro ao excluir mídia.", "error");
    return;
  }
  showMessage("Mídia excluída.", "success");
  await carregarMidias();
}

function renderizarTabelaGerir() {
  tabelaGerirMidiasBody.innerHTML = "";
  if (!todasMidias.length) return;

  todasMidias.forEach((m) => {
    const tr = document.createElement("tr");

    const tdPoster = document.createElement("td");
    if (m.imagem_url) {
      const img = document.createElement("img");
      img.src = m.imagem_url;
      img.alt = m.nome || "";
      tdPoster.appendChild(img);
    } else {
      tdPoster.textContent = "-";
    }

    const tdNome = document.createElement("td");
    tdNome.textContent = m.nome || "";

    const tdTipo = document.createElement("td");
    tdTipo.textContent = m.tipo === "SERIE" ? "Série" : "Filme";

    const tdStreaming = document.createElement("td");
    tdStreaming.textContent = m.streaming || "-";

    const tdStatus = document.createElement("td");
    tdStatus.textContent = statusLabel(m.status);

    const tdNota = document.createElement("td");
    tdNota.textContent =
      m.avaliacao !== null && m.avaliacao !== undefined
        ? m.avaliacao.toFixed(1)
        : "-";

    const tdAcoes = document.createElement("td");
    const btnEditar = document.createElement("button");
    btnEditar.className = "btn ghost";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => entrarModoEdicaoMidia(m));

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn danger";
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => excluirMidia(m.id));

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdPoster);
    tr.appendChild(tdNome);
    tr.appendChild(tdTipo);
    tr.appendChild(tdStreaming);
    tr.appendChild(tdStatus);
    tr.appendChild(tdNota);
    tr.appendChild(tdAcoes);

    tabelaGerirMidiasBody.appendChild(tr);
  });
}

// ==================== TMDB ====================

function buildTmdbUrl(path, params = {}) {
  const url = new URL(`https://api.themoviedb.org/3${path}`);
  const allParams = { api_key: TMDB_API_KEY, language: "pt-BR", ...params };
  Object.entries(allParams).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

async function buscarNaTmdb() {
  const q = tmdbQueryInput.value.trim();
  if (!q) {
    showMessage("Digite algo para buscar na TMDb.", "error");
    return;
  }
  if (!TMDB_API_KEY || !TMDB_BEARER_TOKEN) {
    showMessage("Configure a API key e o token da TMDb.", "error");
    return;
  }

  tmdbResultadosDiv.innerHTML = "Buscando...";

  try {
    const url = buildTmdbUrl("/search/multi", {
      query: q,
      include_adult: false,
      page: 1,
    });

    const resp = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    });

    if (!resp.ok) throw new Error("Erro na requisição para a TMDb.");

    const json = await resp.json();
    const results = (json && json.results) || [];

    if (!results.length) {
      tmdbResultadosDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }

    tmdbResultadosDiv.innerHTML = "";
    results
      .filter((r) => r.media_type === "movie" || r.media_type === "tv")
      .forEach((item) => {
        const div = document.createElement("div");
        div.className = "tmdb-item";
        const title =
          item.title || item.name || item.original_title || item.original_name;
        const yearStr =
          (item.release_date || item.first_air_date || "").slice(0, 4) || "";
        const label =
          item.media_type === "movie"
            ? `FILME${yearStr ? " • " + yearStr : ""}`
            : `SÉRIE${yearStr ? " • " + yearStr : ""}`;

        const left = document.createElement("span");
        left.textContent = title || "(sem título)";
        const right = document.createElement("span");
        right.textContent = label;
        right.style.color = "#6b7280";
        right.style.fontSize = "0.8rem";

        div.appendChild(left);
        div.appendChild(right);

        div.addEventListener("click", () => selecionarTmdbResultado(item));

        tmdbResultadosDiv.appendChild(div);
      });
  } catch (err) {
    console.error(err);
    showMessage(err.message || "Erro ao buscar na TMDb.", "error");
    tmdbResultadosDiv.innerHTML = "";
  }
}

async function selecionarTmdbResultado(item) {
  try {
    const isMovie = item.media_type === "movie";
    const tipo = isMovie ? "FILME" : "SERIE";

    const detailUrl = buildTmdbUrl(
      `/${isMovie ? "movie" : "tv"}/${item.id}`,
      { append_to_response: "credits" }
    );

    const resp = await fetch(detailUrl, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    });

    if (!resp.ok) {
      throw new Error("Erro ao obter detalhes da TMDb.");
    }

    const det = await resp.json();

    tipoSelect.value = tipo;

    const titulo = det.title || det.name || item.title || item.name || "";
    nomeInput.value = titulo;

    sinopseInput.value = det.overview || "";

    const dataLanc = det.release_date || det.first_air_date || "";
    dataLancInput.value = dataLanc || "";
    if (dataLanc) {
      const y = new Date(dataLanc).getFullYear();
      if (!Number.isNaN(y)) anoInput.value = y;
    } else {
      anoInput.value = "";
    }

    if (Array.isArray(det.genres) && det.genres.length) {
      generoInput.value = det.genres.map((g) => g.name).join(" / ");
    }

    let diretores = "";
    if (isMovie && det.credits && Array.isArray(det.credits.crew)) {
      const dirs = det.credits.crew.filter((p) => p.job === "Director");
      if (dirs.length) diretores = dirs.map((d) => d.name).join(", ");
    } else if (!isMovie && Array.isArray(det.created_by) && det.created_by.length) {
      diretores = det.created_by.map((c) => c.name).join(", ");
    }
    diretorInput.value = diretores || diretorInput.value;

    if (det.poster_path) {
      imagemUrlInput.value = TMDB_IMG_BASE + det.poster_path;
    }

    if (isMovie && det.belongs_to_collection && det.belongs_to_collection.name) {
      franquiaInput.value = det.belongs_to_collection.name;
    }

    if (!isMovie) {
      numTemporadasInput.value =
        det.number_of_seasons !== undefined && det.number_of_seasons !== null
          ? det.number_of_seasons
          : "";
      numEpisodiosInput.value =
        det.number_of_episodes !== undefined && det.number_of_episodes !== null
          ? det.number_of_episodes
          : "";
    } else {
      numTemporadasInput.value = "";
      numEpisodiosInput.value = "";
    }

    tmdbIdInput.value = det.id || item.id || "";

    avaliacaoInput.value = "";
    midiaRatingStars.textContent = "☆☆☆☆☆";

    showMessage("Dados preenchidos a partir da TMDb. Confira e salve.", "success");
    tmdbResultadosDiv.innerHTML = "";
  } catch (err) {
    console.error(err);
    showMessage(err.message || "Erro ao preencher dados da TMDb.", "error");
  }
}

// ==================== IMPORT/EXPORT MIDIAS ====================

function baixarArquivo(nomeArquivo, conteudo) {
  const blob = new Blob([conteudo], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportarMidiasJSON() {
  const exportData = todasMidias.map((m) => ({
    nome: m.nome || null,
    diretor: m.diretor || null,
    genero: m.genero || null,
    data_lancamento: m.data_lancamento || null,
    ano: m.ano || null,
    streaming: m.streaming || null,
    tipo: m.tipo || null,
    status: m.status || null,
    avaliacao:
      m.avaliacao !== null && m.avaliacao !== undefined
        ? sanitizeRating(m.avaliacao)
        : null,
    imagem_url: m.imagem_url || null,
    franquia: m.franquia || null,
    sinopse: m.sinopse || null,
    numero_temporadas:
      m.numero_temporadas !== null && m.numero_temporadas !== undefined
        ? m.numero_temporadas
        : null,
    numero_episodios:
      m.numero_episodios !== null && m.numero_episodios !== undefined
        ? m.numero_episodios
        : null,
    tmdb_id:
      m.tmdb_id !== null && m.tmdb_id !== undefined ? m.tmdb_id : null,
  }));

  baixarArquivo("midias_export.json", JSON.stringify(exportData, null, 2));
}

function exportarModeloMidiasJSON() {
  const modelo = [
    {
      nome: "Matrix",
      diretor: "Lana Wachowski, Lilly Wachowski",
      genero: "Ação/Ficção científica",
      data_lancamento: "1999-03-31",
      ano: 1999,
      streaming: "Max",
      tipo: "FILME",
      status: "ASSISTIDOS",
      avaliacao: 4.5,
      imagem_url: "https://exemplo.com/poster_matrix.jpg",
      franquia: "Matrix",
      sinopse: "Um hacker descobre a verdade sobre a realidade em que vive.",
      numero_temporadas: null,
      numero_episodios: null,
      tmdb_id: 603,
    },
    {
      nome: "Lost",
      diretor: "J. J. Abrams, Damon Lindelof",
      genero: "Drama/Mistério",
      data_lancamento: "2004-09-22",
      ano: 2004,
      streaming: "Disney+",
      tipo: "SERIE",
      status: "ASSISTIDOS",
      avaliacao: 4.5,
      imagem_url: "https://exemplo.com/poster_lost.jpg",
      franquia: "Lost",
      sinopse: "Sobreviventes de um desastre aéreo em uma ilha misteriosa.",
      numero_temporadas: 6,
      numero_episodios: 121,
      tmdb_id: 4607,
    },
  ];

  baixarArquivo("modelo_midias.json", JSON.stringify(modelo, null, 2));
}

async function importarMidiasJSON() {
  const file = inputImportMidias.files?.[0];
  if (!file) {
    showMessage("Selecione um arquivo JSON para importar.", "error");
    return;
  }

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) {
      showMessage("JSON inválido. Deve ser um array de objetos.", "error");
      return;
    }

    const toInsert = [];

    for (const item of data) {
      const nome = item.nome && String(item.nome).trim();
      if (!nome) continue;

      const tipo = item.tipo === "SERIE" ? "SERIE" : "FILME";

      let ano =
        item.ano !== undefined && item.ano !== null && item.ano !== ""
          ? parseInt(item.ano)
          : null;
      let data_lancamento =
        item.data_lancamento && String(item.data_lancamento).trim()
          ? String(item.data_lancamento).trim()
          : null;

      if (!ano && data_lancamento) {
        const y = new Date(data_lancamento).getFullYear();
        if (!Number.isNaN(y)) ano = y;
      }

      const diretor =
        item.diretor && String(item.diretor).trim()
          ? String(item.diretor).trim()
          : null;
      const genero =
        item.genero && String(item.genero).trim()
          ? String(item.genero).trim()
          : null;
      const streaming =
        item.streaming && String(item.streaming).trim()
          ? String(item.streaming).trim()
          : null;
      const status = item.status || "ASSISTINDO";
      const avaliacao =
        item.avaliacao !== undefined && item.avaliacao !== null
          ? sanitizeRating(item.avaliacao)
          : null;
      const imagem_url =
        item.imagem_url && String(item.imagem_url).trim()
          ? String(item.imagem_url).trim()
          : null;
      const franquia =
        item.franquia && String(item.franquia).trim()
          ? String(item.franquia).trim()
          : null;
      const sinopse =
        item.sinopse && String(item.sinopse).trim()
          ? String(item.sinopse).trim()
          : null;
      const numero_temporadas =
        item.numero_temporadas !== null &&
        item.numero_temporadas !== undefined &&
        item.numero_temporadas !== ""
          ? parseInt(item.numero_temporadas)
          : null;
      const numero_episodios =
        item.numero_episodios !== null &&
        item.numero_episodios !== undefined &&
        item.numero_episodios !== ""
          ? parseInt(item.numero_episodios)
          : null;
      const tmdb_id =
        item.tmdb_id !== null &&
        item.tmdb_id !== undefined &&
        item.tmdb_id !== ""
          ? parseInt(item.tmdb_id)
          : null;

      toInsert.push({
        nome,
        diretor,
        genero,
        data_lancamento,
        ano,
        streaming,
        tipo,
        status,
        avaliacao,
        imagem_url,
        franquia,
        sinopse,
        numero_temporadas,
        numero_episodios,
        tmdb_id,
      });
    }

    if (!toInsert.length) {
      showMessage("Nenhuma mídia válida encontrada no JSON.", "error");
      return;
    }

    const { error } = await db.from("midias").insert(toInsert);
    if (error) {
      console.error(error);
      showMessage("Erro ao importar mídias.", "error");
      return;
    }

    showMessage("Mídias importadas com sucesso.", "success");
    inputImportMidias.value = "";
    await carregarMidias();
  } catch (err) {
    console.error(err);
    showMessage("Erro ao ler o arquivo JSON.", "error");
  }
}

// ==================== EPISÓDIOS ====================

async function abrirGuiaEpisodios(midia) {
  midiaSelecionadaParaEpisodios = midia;
  episodiosTitulo.textContent = `${midia.nome} – Guia de episódios`;
  episodiosSubtitulo.textContent =
    midia.sinopse ||
    `Controle de episódios da série. ${midia.numero_temporadas || ""}${
      midia.numero_temporadas ? " temporada(s)." : ""
    }`;

  await carregarEpisodiosDaMidia(midia.id);
  mostrarEpisodiosView();
}

async function carregarEpisodiosDaMidia(midiaId) {
  const { data, error } = await db
    .from("episodios")
    .select("*")
    .eq("midia_id", midiaId)
    .order("temporada", { ascending: true })
    .order("numero", { ascending: true });

  if (error) {
    console.error(error);
    showMessage("Erro ao carregar episódios.", "error");
    return;
  }

  episodiosDaMidiaAtual = data || [];
  atualizarFiltrosEpisodios();
  renderizarEpisodios();
}

function atualizarFiltrosEpisodios() {
  const temps = new Set();
  episodiosDaMidiaAtual.forEach((e) => temps.add(e.temporada));
  const atual = filtroEpisodioTemporada.value;
  filtroEpisodioTemporada.innerHTML = `<option value="">Todas</option>`;
  Array.from(temps)
    .sort((a, b) => a - b)
    .forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = `Temporada ${t}`;
      filtroEpisodioTemporada.appendChild(opt);
    });
  if (atual && [...filtroEpisodioTemporada.options].some((o) => o.value === atual)) {
    filtroEpisodioTemporada.value = atual;
  }
}

function renderizarEpisodios() {
  const midia = midiaSelecionadaParaEpisodios;
  if (!midia) return;

  const tempFiltro = filtroEpisodioTemporada.value
    ? parseInt(filtroEpisodioTemporada.value)
    : null;
  const statusFiltro = filtroEpisodioStatus.value || null;

  let lista = [...episodiosDaMidiaAtual];

  if (tempFiltro) {
    lista = lista.filter((e) => e.temporada === tempFiltro);
  }
  if (statusFiltro) {
    lista = lista.filter((e) => e.status === statusFiltro);
  }

  const totalBanco = episodiosDaMidiaAtual.length;
  const assistidosTotal = episodiosDaMidiaAtual.filter(
    (e) => e.status === "ASSISTIDOS"
  ).length;
  const perc =
    totalBanco > 0 ? Math.round((assistidosTotal / totalBanco) * 100) : 0;

  const totalTemporadas =
    midia.numero_temporadas !== null && midia.numero_temporadas !== undefined
      ? midia.numero_temporadas
      : new Set(episodiosDaMidiaAtual.map((e) => e.temporada)).size || 0;

  const totalEpisodios =
    midia.numero_episodios !== null && midia.numero_episodios !== undefined
      ? midia.numero_episodios
      : totalBanco;

  episodiosResumo.innerHTML = `Temporadas: <strong>${totalTemporadas}</strong> • Episódios cadastrados: <strong>${totalBanco}</strong> • Total previsto: <strong>${totalEpisodios}</strong> • Progresso: <strong>${assistidosTotal}/${totalBanco} (${perc}%)</strong>`;

  const porTemporada = new Map();
  lista.forEach((e) => {
    if (!porTemporada.has(e.temporada)) {
      porTemporada.set(e.temporada, []);
    }
    porTemporada.get(e.temporada).push(e);
  });

  episodiosContainer.innerHTML = "";
  if (!porTemporada.size) {
    const p = document.createElement("p");
    p.textContent = "Nenhum episódio cadastrado ainda.";
    p.style.fontSize = "0.9rem";
    p.style.color = "#6b7280";
    episodiosContainer.appendChild(p);
    return;
  }

  const temporadasOrdenadas = [...porTemporada.keys()].sort((a, b) => a - b);

  temporadasOrdenadas.forEach((t) => {
    const eps = porTemporada.get(t);

    const block = document.createElement("div");
    block.className = "temporada-block";

    const header = document.createElement("div");
    header.className = "temporada-header";

    const left = document.createElement("div");
    left.innerHTML = `<div class="temporada-title">Temporada ${t}</div>`;

    const episodiosTempTotal = eps.length;
    const epsAssistidos = eps.filter((e) => e.status === "ASSISTIDOS").length;
    const percTemp =
      episodiosTempTotal > 0
        ? Math.round((epsAssistidos / episodiosTempTotal) * 100)
        : 0;

    const right = document.createElement("div");
    right.className = "temporada-sub";
    right.textContent = `${epsAssistidos}/${episodiosTempTotal} episódios assistidos (${percTemp}%)`;

    header.appendChild(left);
    header.appendChild(right);

    const columns = document.createElement("div");
    columns.className = "temporada-columns";

    const colNao = document.createElement("div");
    const colAssis = document.createElement("div");
    const colDone = document.createElement("div");

    const titleNao = document.createElement("div");
    titleNao.className = "temporada-column-title";
    titleNao.textContent = "Ainda não comecei";

    const titleAssis = document.createElement("div");
    titleAssis.className = "temporada-column-title";
    titleAssis.textContent = "Assistindo";

    const titleDone = document.createElement("div");
    titleDone.className = "temporada-column-title";
    titleDone.textContent = "Assistidos";

    colNao.appendChild(titleNao);
    colAssis.appendChild(titleAssis);
    colDone.appendChild(titleDone);

    eps.forEach((e) => {
      const card = document.createElement("div");
      card.className = "episodio-card";

      const headerEp = document.createElement("div");
      headerEp.className = "episodio-header";

      const leftEp = document.createElement("div");
      const code = document.createElement("span");
      code.className = "episodio-code";
      code.textContent = toEpisodeCode(e.temporada, e.numero);

      const titleEp = document.createElement("div");
      titleEp.className = "episodio-title";
      titleEp.textContent = e.titulo || "(sem título)";

      leftEp.appendChild(titleEp);
      leftEp.appendChild(code);

      const rightEp = document.createElement("div");
      rightEp.className = "episodio-stars";
      rightEp.textContent = renderStars(e.avaliacao);

      headerEp.appendChild(leftEp);
      headerEp.appendChild(rightEp);

      const resumo = document.createElement("div");
      resumo.className = "episodio-resumo";
      if (e.resumo) {
        resumo.textContent =
          e.resumo.length > 120 ? e.resumo.slice(0, 117) + "..." : e.resumo;
      }

      const footerEp = document.createElement("div");
      footerEp.className = "episodio-footer";

      const statusSpan = document.createElement("span");
      statusSpan.className = "episodio-status";
      statusSpan.textContent = statusLabel(e.status);

      const actions = document.createElement("div");
      actions.className = "episodio-actions";

      const btnEdit = document.createElement("button");
      btnEdit.className = "btn ghost";
      btnEdit.textContent = "Editar";
      btnEdit.addEventListener("click", () => {
        abrirModalEpisodio(e);
      });

      actions.appendChild(btnEdit);

      footerEp.appendChild(statusSpan);
      footerEp.appendChild(actions);

      card.appendChild(headerEp);
      if (e.resumo) card.appendChild(resumo);
      card.appendChild(footerEp);

      if (e.status === "AINDA_NAO_COMECEI") {
        colNao.appendChild(card);
      } else if (e.status === "ASSISTINDO") {
        colAssis.appendChild(card);
      } else if (e.status === "ASSISTIDOS") {
        colDone.appendChild(card);
      } else {
        colNao.appendChild(card);
      }
    });

    columns.appendChild(colNao);
    columns.appendChild(colAssis);
    columns.appendChild(colDone);

    block.appendChild(header);
    block.appendChild(columns);

    episodiosContainer.appendChild(block);
  });
}

function abrirModalEpisodio(ep) {
  episodioEmEdicao = ep || null;
  if (ep) {
    episodioModalTitulo.textContent = "Editar episódio";
    episodioTemporadaInput.value = ep.temporada;
    episodioNumeroInput.value = ep.numero;
    episodioTituloInput.value = ep.titulo || "";
    episodioResumoInput.value = ep.resumo || "";
    episodioStatusSelect.value = ep.status || "AINDA_NAO_COMECEI";
    episodioAvaliacaoInput.value =
      ep.avaliacao !== null && ep.avaliacao !== undefined
        ? ep.avaliacao
        : "";
    episodioRatingStars.textContent = renderStars(episodioAvaliacaoInput.value);
  } else {
    episodioModalTitulo.textContent = "Novo episódio";
    episodioTemporadaInput.value = "";
    episodioNumeroInput.value = "";
    episodioTituloInput.value = "";
    episodioResumoInput.value = "";
    episodioStatusSelect.value = "AINDA_NAO_COMECEI";
    episodioAvaliacaoInput.value = "";
    episodioRatingStars.textContent = "☆☆☆☆☆";
  }
  episodioModalBackdrop.classList.remove("hidden");
}

function fecharModalEpisodio() {
  episodioEmEdicao = null;
  episodioModalBackdrop.classList.add("hidden");
}

async function salvarEpisodio() {
  if (!midiaSelecionadaParaEpisodios) return;
  const midiaId = midiaSelecionadaParaEpisodios.id;

  const temporada = parseInt(episodioTemporadaInput.value);
  const numero = parseInt(episodioNumeroInput.value);
  const titulo = episodioTituloInput.value.trim() || null;
  const resumo = episodioResumoInput.value.trim() || null;
  const status = episodioStatusSelect.value || "AINDA_NAO_COMECEI";
  const avaliacao = sanitizeRating(episodioAvaliacaoInput.value);

  if (!temporada || !numero) {
    showMessage("Informe temporada e número do episódio.", "error");
    return;
  }

  const payload = {
    midia_id: midiaId,
    temporada,
    numero,
    titulo,
    resumo,
    status,
    avaliacao,
  };

  let error;
  if (episodioEmEdicao) {
    const { error: err } = await db
      .from("episodios")
      .update(payload)
      .eq("id", episodioEmEdicao.id);
    error = err;
  } else {
    const { error: err } = await db.from("episodios").insert(payload);
    error = err;
  }

  if (error) {
    console.error(error);
    showMessage("Erro ao salvar episódio.", "error");
    return;
  }

  showMessage("Episódio salvo com sucesso.", "success");
  fecharModalEpisodio();
  await carregarEpisodiosDaMidia(midiaId);
}

async function exportarEpisodiosJSON() {
  if (!midiaSelecionadaParaEpisodios) return;
  const exportData = episodiosDaMidiaAtual.map((e) => ({
    temporada: e.temporada,
    numero: e.numero,
    titulo: e.titulo || null,
    resumo: e.resumo || null,
    status: e.status || "AINDA_NAO_COMECEI",
    avaliacao:
      e.avaliacao !== null && e.avaliacao !== undefined
        ? sanitizeRating(e.avaliacao)
        : null,
  }));

  const nomeArquivo = `episodios_${midiaSelecionadaParaEpisodios.nome
    .toLowerCase()
    .replace(/\s+/g, "_")}.json`;
  baixarArquivo(nomeArquivo, JSON.stringify(exportData, null, 2));
}

async function importarEpisodiosJSON() {
  if (!midiaSelecionadaParaEpisodios) {
    showMessage("Selecione uma série primeiro.", "error");
    return;
  }

  const midiaId = midiaSelecionadaParaEpisodios.id;
  const file = inputImportEpisodios.files?.[0];
  if (!file) {
    showMessage("Selecione um arquivo JSON de episódios.", "error");
    return;
  }

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) {
      showMessage("JSON inválido. Deve ser um array de episódios.", "error");
      return;
    }

    const toInsert = [];
    for (const item of data) {
      const temporada = parseInt(item.temporada);
      const numero = parseInt(item.numero);
      if (!temporada || !numero) continue;
      const titulo =
        item.titulo && String(item.titulo).trim()
          ? String(item.titulo).trim()
          : null;
      const resumo =
        item.resumo && String(item.resumo).trim()
          ? String(item.resumo).trim()
          : null;
      const status = item.status || "AINDA_NAO_COMECEI";
      const avaliacao =
        item.avaliacao !== undefined && item.avaliacao !== null
          ? sanitizeRating(item.avaliacao)
          : null;

      toInsert.push({
        midia_id: midiaId,
        temporada,
        numero,
        titulo,
        resumo,
        status,
        avaliacao,
      });
    }

    if (!toInsert.length) {
      showMessage("Nenhum episódio válido no JSON.", "error");
      return;
    }

    const { error } = await db.from("episodios").insert(toInsert);
    if (error) {
      console.error(error);
      showMessage("Erro ao importar episódios.", "error");
      return;
    }

    showMessage("Episódios importados com sucesso.", "success");
    inputImportEpisodios.value = "";
    await carregarEpisodiosDaMidia(midiaId);
  } catch (err) {
    console.error(err);
    showMessage("Erro ao ler o JSON de episódios.", "error");
  }
}

// ==================== EVENTOS ====================

function initEvents() {
  // Navegação
  btnIrPrincipal.addEventListener("click", () => mostrarPrincipal());
  btnVoltarPrincipal.addEventListener("click", () => mostrarPrincipal());
  btnVoltarPrincipalDeEpisodios.addEventListener("click", () =>
    mostrarPrincipal()
  );
  btnIrGerir.addEventListener("click", () => {
    mostrarGerirView();
  });

  // Tabs status
  tabsStatus.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabsStatus.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      statusFiltroAba = tab.dataset.status || "";
      aplicarFiltrosEAtualizar();
    });
  });

  // Filtros principais
  [
    filtroBuscaNome,
    filtroNotaMin,
    filtroStreaming,
    filtroAno,
    filtroGenero,
    filtroDiretor,
    filtroFranquia,
    filtroTipo,
  ].forEach((el) => {
    el.addEventListener("input", () => {
      filtroFranquiaSelecionada = null;
      aplicarFiltrosEAtualizar();
    });
  });

  // Subtabs franquias
  subtabsFranquia.forEach((sub) => {
    sub.addEventListener("click", () => {
      subtabsFranquia.forEach((s) => s.classList.remove("active"));
      sub.classList.add("active");
      renderizarFranquias();
    });
  });

  // Form midia
  formMidia.addEventListener("submit", salvarMidia);
  btnCancelarEdicaoMidia.addEventListener("click", sairModoEdicaoMidia);

  // Atualizar ano ao mudar data
  dataLancInput.addEventListener("change", () => {
    if (!dataLancInput.value) return;
    const y = new Date(dataLancInput.value).getFullYear();
    if (!Number.isNaN(y)) anoInput.value = y;
  });

  // TMDb
  btnTmdbBuscar.addEventListener("click", buscarNaTmdb);
  tmdbQueryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buscarNaTmdb();
    }
  });

  // Import/Export midias
  btnExportMidias.addEventListener("click", exportarMidiasJSON);
  btnExportModeloMidias.addEventListener("click", exportarModeloMidiasJSON);
  btnImportMidias.addEventListener("click", importarMidiasJSON);

  // Episódios
  filtroEpisodioTemporada.addEventListener("change", renderizarEpisodios);
  filtroEpisodioStatus.addEventListener("change", renderizarEpisodios);

  btnNovoEpisodio.addEventListener("click", () => abrirModalEpisodio(null));
  btnCancelarEpisodio.addEventListener("click", () => fecharModalEpisodio());
  btnSalvarEpisodio.addEventListener("click", salvarEpisodio);

  btnExportEpisodios.addEventListener("click", exportarEpisodiosJSON);
  inputImportEpisodios.addEventListener("change", importarEpisodiosJSON);

  // Rating interativo
  initInteractiveRating(midiaRatingStars, avaliacaoInput);
  initInteractiveRating(episodioRatingStars, episodioAvaliacaoInput);
}

// ==================== INIT ====================

async function init() {
  initEvents();
  await carregarMidias();
}

init();
