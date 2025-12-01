// ======= SUPABASE CONFIG =======
const SUPABASE_URL = "https://koytoiwfvwzjvgcqhlal.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtveXRvaXdmdnd6anZnY3FobGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDExNzAsImV4cCI6MjA3OTcxNzE3MH0.mrMRUGJFqzOBjj7M4giHcWr5qsqUn_0woVMFikDxrjM";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ======= TMDb CONFIG =======
const TMDB_API_KEY = "34d1febeb2c306bd928d270c1990c076";
const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGQxZmViZWIyYzMwNmJkOTI4ZDI3MGMxOTkwYzA3NiIsIm5iZiI6MTc2NDU0NzczNC43MDIwMDAxLCJzdWIiOiI2OTJjZGM5Njg1ZTg0OGEwYjAyNmVhZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Htppj_TDovsK4-xrjzwZrBduPQJZSy9HErIjkvm8DgY";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w342";

const TABLE_MIDIAS = "midias";
const TABLE_EPISODIOS = "episodios";

// Labels de status centralizadas
const STATUS_LABELS = {
  ASSISTINDO: "ASSISTINDO",
  ASSISTIDOS: "ASSISTIDOS",
  NAO_COMECEI: "AINDA NÃO COMECEI",
};

// ======= ELEMENTOS =======
const mainView = document.getElementById("main-view");
const topsPanel = document.getElementById("tops-panel");
const colecoesPanel = document.getElementById("colecoes-panel");
const colecoesList = document.getElementById("colecoes-list");
const gerirView = document.getElementById("gerir-view");
const episodiosView = document.getElementById("episodios-view");
const messageDiv = document.getElementById("message");
const loadingOverlay = document.getElementById("loading-overlay");

// Form mídia
const formMidia = document.getElementById("midia-form");
const nomeInput = document.getElementById("nome");
const diretorInput = document.getElementById("diretor");
const generoInput = document.getElementById("genero");
const dataLancInput = document.getElementById("data-lancamento");
const anoInput = document.getElementById("ano");
const streamingInput = document.getElementById("streaming");
const tipoSelect = document.getElementById("tipo");
const franquiaInput = document.getElementById("franquia");
const statusSelect = document.getElementById("status");
const avaliacaoInput = document.getElementById("avaliacao"); // hidden number
const midiaRatingStars = document.getElementById("midia-rating-stars");
const imagemUrlInput = document.getElementById("imagem-url");
const btnSalvarMidia = document.getElementById("btn-salvar");
const btnCancelarEdicaoMidia = document.getElementById("btn-cancelar-edicao");

// TMDb
const tmdbTituloInput = document.getElementById("tmdb-titulo");
const tmdbAnoInput = document.getElementById("tmdb-ano");
const btnTmdbBuscar = document.getElementById("btn-tmdb-buscar");
const tmdbResultadosDiv = document.getElementById("tmdb-resultados");

// Filtros principais
const filtroNome = document.getElementById("filtro-nome");
const filtroDiretor = document.getElementById("filtro-diretor");
const filtroNotaMin = document.getElementById("filtro-nota-min");
const filtroStreaming = document.getElementById("filtro-streaming");
const filtroAno = document.getElementById("filtro-ano");
const filtroGenero = document.getElementById("filtro-genero");
const filtroFranquia = document.getElementById("filtro-franquia");
const btnLimparFiltros = document.getElementById("btn-limpar-filtros");
const btnFiltroAssistindo = document.getElementById("btn-filtro-assistindo");

const btnGerirColecao = document.getElementById("btn-gerir-colecao");
const btnVoltarLista = document.getElementById("btn-voltar-lista");

const listaMidias = document.getElementById("lista-midias");

// Tabs
const tabCountTodos = document.getElementById("tab-count-todos");
const tabCountAss = document.getElementById("tab-count-assistindo");
const tabCountAssd = document.getElementById("tab-count-assistidos");
const tabCountNao = document.getElementById("tab-count-nao-comecei");
const tabsBar = document.getElementById("tabs-bar");

// TOP lists
const top10BestList = document.getElementById("top10-best");
const top10WorstList = document.getElementById("top10-worst");
const top10LastList = document.getElementById("top10-last");

// Import/export mídias
const midiaImportFile = document.getElementById("midia-import-file");
const btnImportMidia = document.getElementById("btn-import-midia");
const btnExportModeloMidia = document.getElementById("btn-export-modelo-midia");
const btnExportMidiasJSON = document.getElementById("btn-export-midias-json");
const btnExportMidiasCSV = document.getElementById("btn-export-midias-csv");

// Episódios
const btnVoltar = document.getElementById("btn-voltar");
const episodiosHeader = document.getElementById("episodios-header");
const episodiosTituloBar = document.getElementById("episodios-titulo-bar");
const episodiosList = document.getElementById("episodios-list");

const episodioForm = document.getElementById("episodio-form");
const epTempInput = document.getElementById("ep-temp");
const epNumInput = document.getElementById("ep-num");
const epTituloInput = document.getElementById("ep-titulo");
const epResumoInput = document.getElementById("ep-resumo");
const epStatusSelect = document.getElementById("ep-status");
const epAvalInput = document.getElementById("ep-avaliacao"); // hidden number
const epRatingStars = document.getElementById("ep-rating-stars");
const btnSalvarEp = document.getElementById("btn-salvar-episodio");
const btnCancelarEp = document.getElementById("btn-cancelar-ep");

// Filtros de episódios
const filtroEpTitulo = document.getElementById("filtro-ep-titulo");
const filtroEpStatus = document.getElementById("filtro-ep-status");

// Import/export episódios
const epImportFile = document.getElementById("ep-import-file");
const btnImportEp = document.getElementById("btn-import-ep");
const btnExportModeloEp = document.getElementById("btn-export-modelo-ep");

// ======= ESTADO =======
let todasMidias = [];
let episodiosPorMidia = {};
let midiaEmEdicao = null;
let midiaAtualEpisodios = null;
let episodioEmEdicao = null;
let abaStatus = ""; // "", "ASSISTINDO", "ASSISTIDOS", "NAO_COMECEI"

// ======= UTIL =======
function showMessage(text, type = "success", timeout = 3500) {
  if (!text) {
    messageDiv.textContent = "";
    messageDiv.className = "";
    return;
  }
  messageDiv.textContent = text;
  messageDiv.className = type === "error" ? "error" : "success";
  if (timeout) {
    setTimeout(() => {
      messageDiv.textContent = "";
      messageDiv.className = "";
    }, timeout);
  }
}

// Loading overlay
function showLoading(show) {
  loadingOverlay.style.display = show ? "flex" : "none";
}

// Status
function mapStatusToLabel(status) {
  return STATUS_LABELS[status] || status || "";
}

// Rating helpers
function sanitizeRating(raw) {
  if (raw === null || raw === undefined || raw === "") return null;
  let v = Number(raw);
  if (Number.isNaN(v)) return null;
  if (v < 0) v = 0;
  if (v > 5) v = 5;
  v = Math.round(v * 2) / 2;
  if (v === 0) return null;
  return v;
}

function renderStars(raw) {
  const v = sanitizeRating(raw);
  if (v === null) return "";
  const full = Math.floor(v);
  const half = v - full >= 0.5 ? 1 : 0;
  let s = "★".repeat(full);
  if (half) s += "½";
  const empty = 5 - full - half;
  s += "☆".repeat(empty);
  return s;
}

function formatRating(raw) {
  const v = sanitizeRating(raw);
  if (v === null) return "";
  return v % 1 === 0 ? v.toString() : v.toFixed(1);
}

// Estrelas clicáveis (0–5 com passos de 0.5)
function attachStarRating(element, input) {
  function updateView() {
    element.textContent = renderStars(input.value);
  }

  element.addEventListener("click", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const fraction = x / rect.width; // 0..1
    let rating = Math.ceil(fraction * 10) / 2; // 0.5 steps, 0..5
    if (rating < 0.5) rating = 0.5;
    if (rating > 5) rating = 5;
    input.value = rating;
    updateView();
  });

  updateView();
}

// Data de lançamento -> ano
dataLancInput.addEventListener("change", () => {
  const val = dataLancInput.value;
  if (!val) {
    anoInput.value = "";
    return;
  }
  const dt = new Date(val);
  const y = dt.getFullYear();
  if (!Number.isNaN(y)) {
    anoInput.value = y;
  }
});

// Normaliza status vindo do JSON de episódios
function mapStatusImportEp(raw) {
  if (raw === null || raw === undefined || raw === "") {
    return "NAO_COMECEI";
  }

  let s = raw.toString().trim();
  let normalized = s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  if (normalized === "ASSISTINDO") return "ASSISTINDO";
  if (normalized === "ASSISTIDOS" || normalized === "ASSISTIDO") return "ASSISTIDOS";

  if (
    normalized.includes("AINDA") &&
    normalized.includes("NAO") &&
    normalized.includes("COMECEI")
  ) {
    return "NAO_COMECEI";
  }

  if (normalized === "NAO_COMECEI") return "NAO_COMECEI";
  return "NAO_COMECEI";
}

function clearMidiaForm() {
  formMidia.reset();
  statusSelect.value = "ASSISTINDO";
  imagemUrlInput.value = "";
  avaliacaoInput.value = "";
  anoInput.value = "";
  midiaRatingStars.textContent = "";
  tmdbResultadosDiv.innerHTML = "";
}

// ======= VIEW CONTROL + TITLE =======
function setTitleMain() {
  document.title = "MediaVault – Minha coleção";
}
function setTitleGerir() {
  document.title = "MediaVault – Gerir coleção";
}
function setTitleEpisodios(midia) {
  const nome = midia?.nome || "Episódios";
  document.title = `MediaVault – Episódios de ${nome}`;
}

function mostrarMainView() {
  mainView.style.display = "block";
  topsPanel.style.display = "block";
  colecoesPanel.style.display = colecoesList.childElementCount ? "block" : "none";
  gerirView.style.display = "none";
  episodiosView.style.display = "none";
  setTitleMain();
}

function mostrarGerirView() {
  mainView.style.display = "none";
  topsPanel.style.display = "none";
  colecoesPanel.style.display = "none";
  gerirView.style.display = "block";
  episodiosView.style.display = "none";
  setTitleGerir();
}

function mostrarEpisodiosView() {
  mainView.style.display = "none";
  topsPanel.style.display = "none";
  colecoesPanel.style.display = "none";
  gerirView.style.display = "none";
  episodiosView.style.display = "block";
  if (midiaAtualEpisodios) setTitleEpisodios(midiaAtualEpisodios);
}

// ======= FILE READER =======
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Erro ao ler arquivo."));
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });
}

// ======= TMDb HELPERS =======
function buildTmdbUrl(path, params = {}) {
  const url = new URL(TMDB_BASE_URL + path);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("language", "pt-BR");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, v);
    }
  });
  return url.toString();
}

function renderTmdbResultados(lista) {
  tmdbResultadosDiv.innerHTML = "";
  if (!lista.length) {
    const div = document.createElement("div");
    div.style.fontSize = "0.8rem";
    div.style.color = "var(--text-soft)";
    div.textContent = "Nenhum resultado encontrado.";
    tmdbResultadosDiv.appendChild(div);
    return;
  }

  lista.slice(0, 8).forEach((item) => {
    const card = document.createElement("div");
    card.className = "tmdb-card";

    if (item.poster_path) {
      const img = document.createElement("img");
      img.className = "tmdb-thumb";
      img.src = TMDB_IMG_BASE + item.poster_path;
      img.alt = item.title || item.name || "";
      card.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "tmdb-card-body";

    const title = document.createElement("div");
    title.className = "tmdb-card-title";
    title.textContent = item.title || item.name || "(sem título)";
    body.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "tmdb-card-meta";

    const ano =
      item.release_date || item.first_air_date
        ? (item.release_date || item.first_air_date).slice(0, 4)
        : "—";

    const tipo =
      item.media_type === "movie"
        ? "Filme"
        : item.media_type === "tv"
        ? "Série"
        : "Outro";

    meta.textContent = `${tipo} • Ano: ${ano} • Nota TMDb: ${
      item.vote_average ? item.vote_average.toFixed(1) : "—"
    }`;
    body.appendChild(meta);

    const tipoDiv = document.createElement("div");
    tipoDiv.className = "tmdb-card-type";
    tipoDiv.textContent =
      item.media_type === "movie"
        ? "FILME"
        : item.media_type === "tv"
        ? "SÉRIE"
        : item.media_type || "";
    body.appendChild(tipoDiv);

    card.appendChild(body);

    card.addEventListener("click", () => selecionarTmdbResultado(item));

    tmdbResultadosDiv.appendChild(card);
  });
}

async function buscarTmdb() {
  try {
    const titulo = tmdbTituloInput.value.trim();
    const ano = tmdbAnoInput.value ? parseInt(tmdbAnoInput.value) : null;

    if (!TMDB_API_KEY) {
      showMessage("Configure sua TMDb API key em app.js.", "error");
      return;
    }

    if (!titulo) {
      showMessage("Digite um título para buscar na TMDb.", "error");
      return;
    }

    showMessage("Buscando na TMDb...", "success", 2000);
    btnTmdbBuscar.disabled = true;

    const url = buildTmdbUrl("/search/multi", {
      query: titulo,
      include_adult: false,
      ...(ano ? { year: ano } : {}),
    });

    const resp = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    });
    if (!resp.ok) {
      throw new Error("Erro ao consultar TMDb.");
    }
    const json = await resp.json();
    const resultados = (json.results || []).filter((r) =>
      ["movie", "tv"].includes(r.media_type)
    );

    renderTmdbResultados(resultados);
  } catch (err) {
    console.error(err);
    showMessage(err.message || "Erro ao buscar na TMDb.", "error");
  } finally {
    btnTmdbBuscar.disabled = false;
  }
}

async function selecionarTmdbResultado(item) {
  try {
    if (!TMDB_API_KEY) {
      showMessage("Configure sua TMDb API key em app.js.", "error");
      return;
    }

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
      if (dirs.length) {
        diretores = dirs.map((d) => d.name).join(", ");
      }
    } else if (!isMovie && Array.isArray(det.created_by) && det.created_by.length) {
      diretores = det.created_by.map((c) => c.name).join(", ");
    }
    diretorInput.value = diretores || diretorInput.value;

    if (det.poster_path) {
      imagemUrlInput.value = TMDB_IMG_BASE + det.poster_path;
    }

    avaliacaoInput.value = "";
    midiaRatingStars.textContent = "";

    if (isMovie && det.belongs_to_collection && det.belongs_to_collection.name) {
      franquiaInput.value = det.belongs_to_collection.name;
    }

    showMessage("Dados preenchidos a partir da TMDb. Confira e salve.", "success");
    tmdbResultadosDiv.innerHTML = "";
  } catch (err) {
    console.error(err);
    showMessage(err.message || "Erro ao preencher dados da TMDb.", "error");
  }
}

// ======= SALVAR MÍDIA =======
async function salvarMidia(e) {
  e.preventDefault();
  try {
    btnSalvarMidia.disabled = true;

    const nome = nomeInput.value.trim();
    const diretor = diretorInput.value.trim() || null;
    const genero = generoInput.value.trim() || null;
    const data_lancamento = dataLancInput.value || null;
    let ano = null;
    if (data_lancamento) {
      const dt = new Date(data_lancamento);
      const y = dt.getFullYear();
      if (!Number.isNaN(y)) ano = y;
    } else if (anoInput.value) {
      ano = parseInt(anoInput.value);
    }
    const streaming = streamingInput.value.trim() || null;
    const tipo = tipoSelect.value;
    const franquia = franquiaInput.value.trim() || null;
    const status = statusSelect.value;
    const avaliacao = sanitizeRating(avaliacaoInput.value);
    const imagem_url = imagemUrlInput.value.trim() || null;

    if (!nome || !tipo || !status) {
      showMessage("Preencha pelo menos Nome, Tipo e Status.", "error");
      return;
    }

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
    };

    if (!midiaEmEdicao) {
      const { error } = await client.from(TABLE_MIDIAS).insert(payload);
      if (error) {
        console.error(error);
        showMessage("Erro ao salvar registro.", "error");
      } else {
        showMessage("Registro salvo com sucesso!");
        clearMidiaForm();
        await carregarTudo();
      }
    } else {
      const { error } = await client
        .from(TABLE_MIDIAS)
        .update(payload)
        .eq("id", midiaEmEdicao.id);
      if (error) {
        console.error(error);
        showMessage("Erro ao atualizar registro.", "error");
      } else {
        showMessage("Registro atualizado com sucesso!");
        sairModoEdicaoMidia();
        await carregarTudo();
      }
    }
  } catch (err) {
    console.error(err);
    showMessage(err.message || "Erro ao salvar registro.", "error");
  } finally {
    btnSalvarMidia.disabled = false;
  }
}

formMidia.addEventListener("submit", salvarMidia);

function entrarModoEdicaoMidia(midia) {
  midiaEmEdicao = midia;
  nomeInput.value = midia.nome || "";
  diretorInput.value = midia.diretor || "";
  generoInput.value = midia.genero || "";
  dataLancInput.value = midia.data_lancamento || "";
  anoInput.value = midia.ano || "";
  streamingInput.value = midia.streaming || "";
  tipoSelect.value = midia.tipo || "";
  franquiaInput.value = midia.franquia || "";
  statusSelect.value = midia.status || "ASSISTINDO";
  avaliacaoInput.value =
    midia.avaliacao !== null && midia.avaliacao !== undefined ? midia.avaliacao : "";
  midiaRatingStars.textContent = renderStars(avaliacaoInput.value);
  imagemUrlInput.value = midia.imagem_url || "";
  btnSalvarMidia.innerHTML = "<span>💾</span><span>Atualizar</span>";
  btnCancelarEdicaoMidia.style.display = "inline-flex";
  mostrarGerirView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function sairModoEdicaoMidia() {
  midiaEmEdicao = null;
  btnSalvarMidia.innerHTML = "<span>💾</span><span>Salvar</span>";
  btnCancelarEdicaoMidia.style.display = "none";
  clearMidiaForm();
}

btnCancelarEdicaoMidia.addEventListener("click", sairModoEdicaoMidia);

// ======= EPISÓDIOS (CRUD) =======
async function salvarEpisodio(e) {
  e.preventDefault();
  if (!midiaAtualEpisodios) {
    showMessage("Nenhuma série selecionada.", "error");
    return;
  }
  const midia = midiaAtualEpisodios;
  const temporada = epTempInput.value ? parseInt(epTempInput.value) : null;
  const numero = epNumInput.value ? parseInt(epNumInput.value) : null;
  const titulo = epTituloInput.value.trim() || null;
  const resumo = epResumoInput.value.trim() || null;
  const status = mapStatusImportEp(epStatusSelect.value);
  const avaliacao = sanitizeRating(epAvalInput.value);

  if (!temporada || !numero || !status) {
    showMessage("Informe temporada, episódio e status.", "error");
    return;
  }

  if (!episodioEmEdicao) {
    const { error } = await client.from(TABLE_EPISODIOS).insert({
      midia_id: midia.id,
      temporada,
      numero,
      titulo,
      resumo,
      status,
      avaliacao,
    });

    if (error) {
      console.error(error);
      showMessage("Erro ao salvar episódio.", "error");
    } else {
      showMessage("Episódio salvo com sucesso!");
      sairModoEdicaoEp();
      await carregarTudo();
    }
  } else {
    const { error } = await client
      .from(TABLE_EPISODIOS)
      .update({
        temporada,
        numero,
        titulo,
        resumo,
        status,
        avaliacao,
      })
      .eq("id", episodioEmEdicao.id);

    if (error) {
      console.error(error);
      showMessage("Erro ao atualizar episódio.", "error");
    } else {
      showMessage("Episódio atualizado com sucesso!");
      sairModoEdicaoEp();
      await carregarTudo();
    }
  }
}

episodioForm.addEventListener("submit", salvarEpisodio);

function entrarModoEdicaoEp(ep) {
  episodioEmEdicao = ep;
  epTempInput.value = ep.temporada;
  epNumInput.value = ep.numero;
  epTituloInput.value = ep.titulo || "";
  epResumoInput.value = ep.resumo || "";
  epStatusSelect.value = ep.status || "ASSISTINDO";
  epAvalInput.value =
    ep.avaliacao !== null && ep.avaliacao !== undefined ? ep.avaliacao : "";
  epRatingStars.textContent = renderStars(epAvalInput.value);
  btnSalvarEp.innerHTML = "<span>💾</span><span>Salvar alterações</span>";
  btnCancelarEp.style.display = "inline-flex";
}

function sairModoEdicaoEp() {
  episodioEmEdicao = null;
  epTempInput.value = "";
  epNumInput.value = "";
  epTituloInput.value = "";
  epResumoInput.value = "";
  epAvalInput.value = "";
  epStatusSelect.value = midiaAtualEpisodios
    ? midiaAtualEpisodios.status || "ASSISTINDO"
    : "ASSISTINDO";
  epRatingStars.textContent = renderStars(epAvalInput.value);
  btnSalvarEp.innerHTML = "<span>➕</span><span>Adicionar episódio</span>";
  btnCancelarEp.style.display = "none";
}

btnCancelarEp.addEventListener("click", sairModoEdicaoEp);

async function excluirEpisodio(ep) {
  if (
    !confirm(
      `Excluir T${String(ep.temporada).padStart(2, "0")}E${String(ep.numero).padStart(
        2,
        "0"
      )}?`
    )
  )
    return;

  const { error } = await client.from(TABLE_EPISODIOS).delete().eq("id", ep.id);

  if (error) {
    console.error(error);
    showMessage("Erro ao excluir episódio.", "error");
  } else {
    showMessage("Episódio excluído.");
    if (episodioEmEdicao && episodioEmEdicao.id === ep.id) {
      sairModoEdicaoEp();
    }
    await carregarTudo();
  }
}

// ======= IMPORT/EXPORT MODELO EPISÓDIOS =======
btnExportModeloEp.addEventListener("click", () => {
  if (!midiaAtualEpisodios) {
    showMessage("Abra uma série primeiro (Ver episódios).", "error");
    return;
  }

  const modelo = [
    {
      temporada: 1,
      numero: 1,
      titulo: "Pilot",
      resumo: "O voo 815 cai na ilha.",
      status: "ASSISTIDOS",
      avaliacao: 4.5,
    },
    {
      temporada: 1,
      numero: 2,
      titulo: "Segundo episódio",
      resumo: "Continuam explorando a ilha.",
      status: "ASSISTINDO",
      avaliacao: null,
    },
  ];

  const blob = new Blob([JSON.stringify(modelo, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const nomeSafe =
    (midiaAtualEpisodios.nome || "serie").toLowerCase().replace(/[^a-z0-9]+/g, "_");
  a.download = `modelo_episodios_${nomeSafe}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// IMPORTADOR DE EPISÓDIOS
btnImportEp.addEventListener("click", async () => {
  try {
    if (!midiaAtualEpisodios) {
      showMessage("Abra uma série primeiro (Ver episódios).", "error");
      return;
    }
    const file = epImportFile.files[0];
    if (!file) {
      showMessage("Selecione um arquivo JSON para importar episódios.", "error");
      return;
    }

    const text = await readFileAsText(file);
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      showMessage("JSON inválido.", "error");
      return;
    }

    if (!Array.isArray(data)) {
      showMessage("O JSON deve ser um array de episódios.", "error");
      return;
    }

    const existentes = episodiosPorMidia[midiaAtualEpisodios.id] || [];
    const keyExistentes = new Set(
      existentes.map((e) => `${e.temporada}-${e.numero}`)
    );

    const toInsert = [];
    let ignorados = 0;

    for (const item of data) {
      const temporada = parseInt(item.temporada);
      const numero = parseInt(item.numero);
      const titulo =
        item.titulo && String(item.titulo).trim() ? String(item.titulo).trim() : null;
      const resumo =
        item.resumo && String(item.resumo).trim() ? String(item.resumo).trim() : null;

      const status = mapStatusImportEp(item.status);
      const avaliacao = sanitizeRating(item.avaliacao);

      if (!temporada || !numero) {
        ignorados++;
        continue;
      }

      const key = `${temporada}-${numero}`;
      if (keyExistentes.has(key)) {
        ignorados++;
        continue;
      }

      toInsert.push({
        midia_id: midiaAtualEpisodios.id,
        temporada,
        numero,
        titulo,
        resumo,
        status,
        avaliacao,
      });
    }

    if (!toInsert.length) {
      showMessage(
        "Nenhum episódio novo para importar (todos já existem ou foram ignorados).",
        "error"
      );
      return;
    }

    const { error } = await client.from(TABLE_EPISODIOS).insert(toInsert);
    if (error) {
      console.error(error);
      showMessage("Erro ao importar episódios.", "error");
    } else {
      const msg =
        `Importados ${toInsert.length} episódio(s)` +
        (ignorados ? `, ${ignorados} ignorado(s).` : ".");
      showMessage(msg);
      epImportFile.value = "";
      await carregarTudo();
    }
  } catch (err) {
    console.error(err);
    showMessage("Erro ao importar episódios.", "error");
  }
});

// ======= IMPORT/EXPORT MÍDIAS =======
btnExportModeloMidia.addEventListener("click", () => {
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
    },
    {
      nome: "Matrix Reloaded",
      diretor: "Lana Wachowski, Lilly Wachowski",
      genero: "Ação/Ficção científica",
      data_lancamento: "2003-05-15",
      ano: 2003,
      streaming: "Max",
      tipo: "FILME",
      status: "ASSISTIDOS",
      avaliacao: 4,
      imagem_url: "https://exemplo.com/poster_reloaded.jpg",
      franquia: "Matrix",
    },
  ];

  const blob = new Blob([JSON.stringify(modelo, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "modelo_midias.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

btnExportMidiasJSON.addEventListener("click", () => {
  if (!todasMidias.length) {
    showMessage("Não há mídias cadastradas para exportar.", "error");
    return;
  }
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
  }));

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "midias_exportadas.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// Export CSV simples
btnExportMidiasCSV.addEventListener("click", () => {
  if (!todasMidias.length) {
    showMessage("Não há mídias cadastradas para exportar.", "error");
    return;
  }

  const headers = [
    "nome",
    "diretor",
    "genero",
    "data_lancamento",
    "ano",
    "streaming",
    "tipo",
    "status",
    "avaliacao",
    "imagem_url",
    "franquia",
  ];

  const lines = [];
  lines.push(headers.join(";"));

  todasMidias.forEach((m) => {
    const row = headers.map((h) => {
      let val = m[h];
      if (h === "avaliacao") {
        val =
          m.avaliacao !== null && m.avaliacao !== undefined
            ? sanitizeRating(m.avaliacao)
            : "";
      }
      if (val === null || val === undefined) val = "";
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    });
    lines.push(row.join(";"));
  });

  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "midias_exportadas.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// IMPORTADOR DE MÍDIAS
btnImportMidia.addEventListener("click", async () => {
  try {
    const file = midiaImportFile.files[0];
    if (!file) {
      showMessage("Selecione um arquivo JSON para importar mídias.", "error");
      return;
    }

    const text = await readFileAsText(file);
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      showMessage("JSON inválido.", "error");
      return;
    }

    if (!Array.isArray(data)) {
      showMessage("O JSON deve ser um array de mídias.", "error");
      return;
    }

    const existentesKeys = new Set(
      todasMidias.map((m) =>
        `${(m.nome || "").toLowerCase()}|${m.tipo || ""}|${m.ano || ""}`
      )
    );

    const toInsert = [];
    let ignorados = 0;

    for (const item of data) {
      const nome = item.nome ? String(item.nome).trim() : "";
      if (!nome) {
        ignorados++;
        continue;
      }

      const tipoRaw = (item.tipo || "").toUpperCase();
      const tipo = tipoRaw === "FILME" || tipoRaw === "SERIE" ? tipoRaw : null;
      if (!tipo) {
        ignorados++;
        continue;
      }

      const statusRaw = (item.status || "NAO_COMECEI").toUpperCase();
      const statusValida =
        statusRaw === "ASSISTINDO" ||
        statusRaw === "ASSISTIDOS" ||
        statusRaw === "NAO_COMECEI";
      if (!statusValida) {
        ignorados++;
        continue;
      }
      const status = statusRaw;

      const diretor =
        item.diretor && String(item.diretor).trim()
          ? String(item.diretor).trim()
          : null;
      const genero =
        item.genero && String(item.genero).trim()
          ? String(item.genero).trim()
          : null;
      const data_lancamento =
        item.data_lancamento && String(item.data_lancamento).trim()
          ? String(item.data_lancamento).trim()
          : null;

      let ano = null;
      if (data_lancamento) {
        const dt = new Date(data_lancamento);
        const y = dt.getFullYear();
        if (!Number.isNaN(y)) ano = y;
      } else if (item.ano !== null && item.ano !== undefined && item.ano !== "") {
        ano = parseInt(item.ano);
      }

      const streaming =
        item.streaming && String(item.streaming).trim()
          ? String(item.streaming).trim()
          : null;
      const imagem_url =
        item.imagem_url && String(item.imagem_url).trim()
          ? String(item.imagem_url).trim()
          : null;

      const avaliacao = sanitizeRating(item.avaliacao);
      const franquia =
        item.franquia && String(item.franquia).trim()
          ? String(item.franquia).trim()
          : null;

      const key = `${nome.toLowerCase()}|${tipo}|${ano || ""}`;
      if (existentesKeys.has(key)) {
        ignorados++;
        continue;
      }

      existentesKeys.add(key);
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
      });
    }

    if (!toInsert.length) {
      showMessage(
        "Nenhuma mídia nova para importar (todas existentes ou inválidas).",
        "error"
      );
      return;
    }

    const { error } = await client.from(TABLE_MIDIAS).insert(toInsert);
    if (error) {
      console.error(error);
      showMessage("Erro ao importar mídias.", "error");
    } else {
      const msg =
        `Importadas ${toInsert.length} mídia(s)` +
        (ignorados ? `, ${ignorados} ignorada(s).` : ".");
      showMessage(msg);
      midiaImportFile.value = "";
      await carregarTudo();
    }
  } catch (err) {
    console.error(err);
    showMessage("Erro ao importar mídias.", "error");
  }
});

// ======= CARREGAR TUDO =======
async function carregarTudo() {
  showLoading(true);
  listaMidias.textContent = "Carregando...";

  const { data: midiasData, error: midiasError } = await client
    .from(TABLE_MIDIAS)
    .select("*")
    .order("created_at", { ascending: false });

  if (midiasError) {
    console.error(midiasError);
    showMessage("Erro ao carregar mídias.", "error", 6000);
    showLoading(false);
    return;
  }

  const { data: epData, error: epError } = await client
    .from(TABLE_EPISODIOS)
    .select("*")
    .order("temporada", { ascending: true })
    .order("numero", { ascending: true });

  if (epError) {
    console.error(epError);
    showMessage("Erro ao carregar episódios.", "error", 6000);
    showLoading(false);
    return;
  }

  todasMidias = midiasData || [];
  episodiosPorMidia = {};
  (epData || []).forEach((ep) => {
    if (!episodiosPorMidia[ep.midia_id]) episodiosPorMidia[ep.midia_id] = [];
    episodiosPorMidia[ep.midia_id].push(ep);
  });

  atualizarFiltros(todasMidias);
  aplicarFiltros();
  renderTopLists();
  renderColecoes();

  if (midiaAtualEpisodios) {
    const found = todasMidias.find((m) => m.id === midiaAtualEpisodios.id);
    if (found) {
      midiaAtualEpisodios = found;
      renderizarEpisodiosView();
    } else {
      midiaAtualEpisodios = null;
      mostrarMainView();
    }
  }

  showLoading(false);
}

// ======= FILTROS PRINCIPAIS =======
function atualizarFiltros(midias) {
  const setS = new Set();
  const setA = new Set();
  const setG = new Set();
  const setF = new Set();

  midias.forEach((m) => {
    if (m.streaming) setS.add(m.streaming);
    if (m.ano) setA.add(m.ano);
    if (m.genero) setG.add(m.genero);
    if (m.franquia) setF.add(m.franquia);
  });

  const curS = filtroStreaming.value;
  filtroStreaming.innerHTML = '<option value="">Todos</option>';
  Array.from(setS)
    .sort((a, b) => a.localeCompare(b))
    .forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      filtroStreaming.appendChild(opt);
    });
  if (curS) filtroStreaming.value = curS;

  const curA = filtroAno.value;
  filtroAno.innerHTML = '<option value="">Todos</option>';
  Array.from(setA)
    .sort((a, b) => a - b)
    .forEach((a) => {
      const opt = document.createElement("option");
      opt.value = a;
      opt.textContent = a;
      filtroAno.appendChild(opt);
    });
  if (curA) filtroAno.value = curA;

  const curG = filtroGenero.value;
  filtroGenero.innerHTML = '<option value="">Todos</option>';
  Array.from(setG)
    .sort((a, b) => a.localeCompare(b))
    .forEach((g) => {
      const opt = document.createElement("option");
      opt.value = g;
      opt.textContent = g;
      filtroGenero.appendChild(opt);
    });
  if (curG) filtroGenero.value = curG;

  const curF = filtroFranquia.value;
  filtroFranquia.innerHTML = '<option value="">Todas</option>';
  Array.from(setF)
    .sort((a, b) => a.localeCompare(b))
    .forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f;
      opt.textContent = f;
      filtroFranquia.appendChild(opt);
    });
  if (curF) filtroFranquia.value = curF;
}

// localStorage – salvar aba + filtro nome
function saveFiltersToStorage() {
  const data = {
    abaStatus,
    filtroNome: filtroNome.value || "",
  };
  localStorage.setItem("mediavault_state", JSON.stringify(data));
}

function loadFiltersFromStorage() {
  try {
    const raw = localStorage.getItem("mediavault_state");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.abaStatus !== undefined) {
      abaStatus = data.abaStatus;
      document.querySelectorAll(".tab-status").forEach((btn) => {
        const s = btn.dataset.status || "";
        btn.classList.toggle("tab-status-active", s === abaStatus);
      });
    }
    if (data.filtroNome !== undefined) {
      filtroNome.value = data.filtroNome;
    }
  } catch (e) {
    console.warn("Erro ao ler estado salvo:", e);
  }
}

function aplicarFiltros() {
  const nomeFiltro = filtroNome.value.trim().toLowerCase();
  const diretorFiltro = filtroDiretor.value.trim().toLowerCase();
  const notaMinFiltro = filtroNotaMin.value ? parseFloat(filtroNotaMin.value) : null;
  const streamingFiltro = filtroStreaming.value;
  const anoFiltro = filtroAno.value ? parseInt(filtroAno.value) : null;
  const generoFiltro = filtroGenero.value;
  const franquiaFiltro = filtroFranquia.value;

  const filtradas = todasMidias.filter((m) => {
    let ok = true;

    if (nomeFiltro) {
      const nome = (m.nome || "").toLowerCase();
      if (!nome.includes(nomeFiltro)) ok = false;
    }

    if (diretorFiltro) {
      const dir = (m.diretor || "").toLowerCase();
      if (!dir.includes(diretorFiltro)) ok = false;
    }

    if (notaMinFiltro !== null && !Number.isNaN(notaMinFiltro)) {
      const starsVal = sanitizeRating(m.avaliacao);
      if (starsVal === null || starsVal < notaMinFiltro) {
        ok = false;
      }
    }

    if (streamingFiltro && m.streaming !== streamingFiltro) ok = false;
    if (anoFiltro && m.ano !== anoFiltro) ok = false;
    if (generoFiltro && m.genero !== generoFiltro) ok = false;
    if (franquiaFiltro && m.franquia !== franquiaFiltro) ok = false;
    if (abaStatus && m.status !== abaStatus) ok = false;

    return ok;
  });

  renderizarListas(filtradas);
  saveFiltersToStorage();
}

[
  filtroNome,
  filtroDiretor,
  filtroNotaMin,
  filtroStreaming,
  filtroAno,
  filtroGenero,
  filtroFranquia,
].forEach((el) => {
  el.addEventListener("input", aplicarFiltros);
  el.addEventListener("change", aplicarFiltros);
});

btnLimparFiltros.addEventListener("click", () => {
  filtroNome.value = "";
  filtroDiretor.value = "";
  filtroNotaMin.value = "";
  filtroStreaming.value = "";
  filtroAno.value = "";
  filtroGenero.value = "";
  filtroFranquia.value = "";
  abaStatus = "";
  document.querySelectorAll(".tab-status").forEach((btn) => {
    btn.classList.toggle("tab-status-active", (btn.dataset.status || "") === "");
  });
  aplicarFiltros();
});

btnFiltroAssistindo.addEventListener("click", () => {
  selecionarAba("ASSISTINDO");
});

// Tabs
function selecionarAba(status) {
  abaStatus = status || "";
  document.querySelectorAll(".tab-status").forEach((btn) => {
    const s = btn.dataset.status || "";
    btn.classList.toggle("tab-status-active", s === abaStatus);
  });
  aplicarFiltros();
}

tabsBar.querySelectorAll(".tab-status").forEach((btn) => {
  btn.addEventListener("click", () => {
    const st = btn.dataset.status || "";
    selecionarAba(st);
  });
});

// ======= RENDER MÍDIAS =======
function renderizarListas(midias) {
  listaMidias.innerHTML = "";

  let cAssind = 0,
    cAssd = 0,
    cNaoC = 0;

  midias.forEach((m) => {
    if (m.status === "ASSISTINDO") cAssind++;
    else if (m.status === "ASSISTIDOS") cAssd++;
    else if (m.status === "NAO_COMECEI") cNaoC++;
  });

  tabCountTodos.textContent = midias.length ? `(${midias.length})` : "";
  tabCountAss.textContent = cAssind ? `(${cAssind})` : "";
  tabCountAssd.textContent = cAssd ? `(${cAssd})` : "";
  tabCountNao.textContent = cNaoC ? `(${cNaoC})` : "";

  midias.forEach((m) => {
    const card = criarCard(m);
    listaMidias.appendChild(card);
  });

  if (!midias.length) {
    const vazio = document.createElement("div");
    vazio.style.fontSize = "0.82rem";
    vazio.style.color = "var(--text-soft)";
    vazio.textContent = "Nenhuma mídia encontrada com os filtros atuais.";
    listaMidias.appendChild(vazio);
  }
}

async function excluirMidia(m) {
  if (!confirm(`Excluir "${m.nome}" e todos os episódios?`)) return;
  const { error } = await client.from(TABLE_MIDIAS).delete().eq("id", m.id);
  if (error) {
    console.error(error);
    showMessage("Erro ao excluir registro.", "error");
  } else {
    showMessage("Registro excluído.");
    await carregarTudo();
  }
}

function criarCard(midia) {
  const card = document.createElement("div");
  card.className = "card";

  if (midia.imagem_url) {
    const img = document.createElement("img");
    img.src = midia.imagem_url;
    img.alt = midia.nome;
    card.appendChild(img);
  }

  const content = document.createElement("div");
  content.className = "card-content";

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = midia.nome;
  content.appendChild(title);

  const badges = document.createElement("div");
  badges.className = "badges";

  const bTipo = document.createElement("span");
  bTipo.className = "badge";
  bTipo.innerHTML = `<span class="badge-dot"></span><span>${
    midia.tipo === "FILME" ? "FILME" : "SÉRIE"
  }</span>`;
  badges.appendChild(bTipo);

  if (midia.ano) {
    const bAno = document.createElement("span");
    bAno.className = "badge";
    bAno.textContent = midia.ano;
    badges.appendChild(bAno);
  }

  if (midia.streaming) {
    const bStr = document.createElement("span");
    bStr.className = "badge";
    bStr.textContent = midia.streaming;
    badges.appendChild(bStr);
  }

  if (midia.franquia) {
    const bFr = document.createElement("span");
    bFr.className = "badge";
    bFr.textContent = midia.franquia;
    badges.appendChild(bFr);
  }

  const bStatus = document.createElement("span");
  bStatus.className = "badge";
  bStatus.textContent = mapStatusToLabel(midia.status);
  badges.appendChild(bStatus);

  content.appendChild(badges);

  const metaParts = [];
  if (midia.diretor) metaParts.push(`Dir: ${midia.diretor}`);
  if (midia.genero) metaParts.push(midia.genero);
  if (midia.data_lancamento) {
    const d = new Date(midia.data_lancamento);
    if (!Number.isNaN(d.getTime())) {
      metaParts.push(
        "Lançamento: " + d.toLocaleDateString("pt-BR", { timeZone: "UTC" })
      );
    }
  }
  if (metaParts.length) {
    const meta = document.createElement("div");
    meta.className = "meta-line";
    meta.textContent = metaParts.join(" • ");
    content.appendChild(meta);
  }

  const ratingVal = sanitizeRating(midia.avaliacao);
  if (ratingVal !== null) {
    const av = document.createElement("div");
    av.className = "avaliacao-text";
    av.innerHTML = `<span class="stars-display">${renderStars(
      ratingVal
    )}</span> (${formatRating(ratingVal)}/5)`;
    content.appendChild(av);
  }

  if (midia.tipo === "SERIE") {
    const eps = episodiosPorMidia[midia.id] || [];
    const temporadasSet = new Set(eps.map((e) => e.temporada));
    const total = eps.length;
    const assistidos = eps.filter((e) => e.status === "ASSISTIDOS").length;
    const perc = total > 0 ? Math.round((assistidos / total) * 100) : 0;

    const resumoSerie = document.createElement("div");
    resumoSerie.className = "serie-resumo";
    let texto = `Temporadas: ${temporadasSet.size || 0} • Episódios: ${total}`;
    if (total > 0) {
      texto += ` • Progresso: ${assistidos}/${total} (${perc}%)`;
    }
    resumoSerie.textContent = texto;
    content.appendChild(resumoSerie);

    const naoAssistidos = eps
      .filter((ep) => ep.status !== "ASSISTIDOS")
      .sort((a, b) => {
        if (a.temporada !== b.temporada) return a.temporada - b.temporada;
        return a.numero - b.numero;
      });

    if (naoAssistidos.length > 0) {
      const proximo = naoAssistidos[0];
      const divProx = document.createElement("div");
      divProx.className = "serie-resumo";
      const codigo = `T${String(proximo.temporada).padStart(2, "0")}E${String(
        proximo.numero
      ).padStart(2, "0")}`;
      divProx.innerHTML = `<strong>Próximo:</strong> ${codigo}${
        proximo.titulo ? " – " + proximo.titulo : ""
      }`;
      content.appendChild(divProx);
    }
  }

  const statusLabelDiv = document.createElement("div");
  statusLabelDiv.className = "status-label";
  statusLabelDiv.textContent = "Status:";
  content.appendChild(statusLabelDiv);

  const statusSelectCard = document.createElement("select");
  statusSelectCard.className = "status-select";
  ["ASSISTINDO", "ASSISTIDOS", "NAO_COMECEI"].forEach((st) => {
    const op = document.createElement("option");
    op.value = st;
    op.textContent = mapStatusToLabel(st);
    if (midia.status === st) op.selected = true;
    statusSelectCard.appendChild(op);
  });
  statusSelectCard.addEventListener("change", async () => {
    const novoStatus = statusSelectCard.value;
    const { error } = await client
      .from(TABLE_MIDIAS)
      .update({ status: novoStatus })
      .eq("id", midia.id);
    if (error) {
      console.error(error);
      showMessage("Erro ao atualizar status.", "error");
    } else {
      showMessage("Status atualizado.");
      await carregarTudo();
    }
  });
  content.appendChild(statusSelectCard);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const btnEdit = document.createElement("button");
  btnEdit.type = "button";
  btnEdit.className = "btn btn-outline";
  btnEdit.innerHTML = "<span>✏️</span><span>Editar</span>";
  btnEdit.addEventListener("click", () => entrarModoEdicaoMidia(midia));
  actions.appendChild(btnEdit);

  const btnDel = document.createElement("button");
  btnDel.type = "button";
  btnDel.className = "btn btn-danger";
  btnDel.innerHTML = "<span>🗑</span><span>Excluir</span>";
  btnDel.addEventListener("click", () => excluirMidia(midia));
  actions.appendChild(btnDel);

  if (midia.tipo === "SERIE") {
    const btnEps = document.createElement("button");
    btnEps.type = "button";
    btnEps.className = "btn btn-primary";
    btnEps.innerHTML = "<span>📂</span><span>Ver episódios</span>";
    btnEps.addEventListener("click", () => abrirEpisodiosView(midia));
    actions.appendChild(btnEps);
  }

  content.appendChild(actions);
  card.appendChild(content);
  return card;
}

// ======= TOP LISTS =======
function buildTopRow(m, rank) {
  const row = document.createElement("div");
  row.className = "top10-row";

  const rankDiv = document.createElement("div");
  rankDiv.className = "top10-row-rank";
  rankDiv.textContent = `#${rank}`;
  row.appendChild(rankDiv);

  const info = document.createElement("div");
  info.className = "top10-row-info";

  const title = document.createElement("div");
  title.className = "top10-row-title";
  title.textContent = m.nome;
  info.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "top10-row-meta";
  const partes = [];
  if (m.tipo) partes.push(m.tipo === "SERIE" ? "Série" : "Filme");
  if (m.ano) partes.push(m.ano);
  if (m.streaming) partes.push(m.streaming);
  if (m.franquia) partes.push(`Franquia: ${m.franquia}`);
  meta.textContent = partes.join(" • ");
  info.appendChild(meta);

  row.appendChild(info);

  const ratingDiv = document.createElement("div");
  ratingDiv.className = "top10-row-rating";

  const ratingVal = sanitizeRating(
    m.rating !== undefined ? m.rating : m.avaliacao
  );
  if (ratingVal !== null) {
    ratingDiv.innerHTML = `<span>${renderStars(
      ratingVal
    )}</span><span>${formatRating(ratingVal)}/5</span>`;
  } else {
    ratingDiv.innerHTML = "<span>—</span>";
  }

  row.appendChild(ratingDiv);
  return row;
}

function renderTopLists() {
  if (!todasMidias.length) {
    topsPanel.style.display = "none";
    return;
  }

  top10BestList.innerHTML = "";
  top10WorstList.innerHTML = "";
  top10LastList.innerHTML = "";

  const avaliadas = (todasMidias || [])
    .map((m) => ({
      ...m,
      rating: sanitizeRating(m.avaliacao),
    }))
    .filter((m) => m.rating !== null);

  const best = [...avaliadas]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return (a.nome || "").localeCompare(b.nome || "");
    })
    .slice(0, 10);

  best.forEach((m, idx) => {
    top10BestList.appendChild(buildTopRow(m, idx + 1));
  });

  if (!best.length) {
    const vazio = document.createElement("div");
    vazio.style.fontSize = "0.8rem";
    vazio.style.color = "var(--text-soft)";
    vazio.textContent = "Nenhuma mídia avaliada ainda.";
    top10BestList.appendChild(vazio);
  }

  const worst = [...avaliadas]
    .sort((a, b) => {
      if (a.rating !== b.rating) return a.rating - b.rating;
      return (a.nome || "").localeCompare(b.nome || "");
    })
    .slice(0, 10);

  worst.forEach((m, idx) => {
    top10WorstList.appendChild(buildTopRow(m, idx + 1));
  });

  if (!worst.length) {
    const vazio = document.createElement("div");
    vazio.style.fontSize = "0.8rem";
    vazio.style.color = "var(--text-soft)";
    vazio.textContent = "Nenhuma mídia avaliada ainda.";
    top10WorstList.appendChild(vazio);
  }

  const last = [...todasMidias]
    .sort((a, b) => {
      if (a.created_at && b.created_at) {
        return b.created_at.localeCompare(a.created_at);
      }
      if (a.created_at && !b.created_at) return -1;
      if (!a.created_at && b.created_at) return 1;
      if (a.id && b.id) return b.id - a.id;
      return 0;
    })
    .slice(0, 10);

  last.forEach((m, idx) => {
    top10LastList.appendChild(buildTopRow(m, idx + 1));
  });

  if (!last.length) {
    const vazio = document.createElement("div");
    vazio.style.fontSize = "0.8rem";
    vazio.style.color = "var(--text-soft)";
    vazio.textContent = "Nenhuma mídia cadastrada ainda.";
    top10LastList.appendChild(vazio);
  }

  topsPanel.style.display = "block";
}

// ======= COLEÇÕES DE FRANQUIAS =======
function aplicarFiltroFranquia(nomeFranquia) {
  filtroFranquia.value = nomeFranquia;
  abaStatus = "";
  document.querySelectorAll(".tab-status").forEach((btn) => {
    const s = btn.dataset.status || "";
    btn.classList.toggle("tab-status-active", s === "");
  });
  aplicarFiltros();
  mostrarMainView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderColecoes() {
  colecoesList.innerHTML = "";
  const grupos = {};

  (todasMidias || []).forEach((m) => {
    if (!m.franquia) return;
    const key = m.franquia;
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(m);
  });

  const nomesFranquias = Object.keys(grupos).filter(
    (nome) => grupos[nome].length > 1
  );

  if (!nomesFranquias.length) {
    colecoesPanel.style.display = "none";
    return;
  }
  colecoesPanel.style.display = "block";

  nomesFranquias
    .sort((a, b) => a.localeCompare(b))
    .forEach((nomeFranquia) => {
      const lista = grupos[nomeFranquia];
      const card = document.createElement("div");
      card.className = "colecao-card";

      const title = document.createElement("div");
      title.className = "colecao-title";
      title.innerHTML = `<span>${nomeFranquia}</span><span style="font-size:0.75rem; color:var(--text-soft);">${lista.length} título(s)</span>`;
      card.appendChild(title);

      const anos = new Set();
      lista.forEach((m) => {
        if (m.ano) anos.add(m.ano);
      });
      const meta = document.createElement("div");
      meta.className = "colecao-meta";
      if (anos.size) {
        meta.textContent = "Anos: " + Array.from(anos).sort((a, b) => a - b).join(", ");
      } else {
        meta.textContent = "Anos: —";
      }
      card.appendChild(meta);

      const filmes = lista.filter((m) => m.tipo === "FILME");
      const series = lista.filter((m) => m.tipo === "SERIE");

      if (filmes.length) {
        const sub = document.createElement("div");
        sub.className = "colecao-subtitle";
        sub.textContent = "Filmes";
        card.appendChild(sub);

        const postersWrapper = document.createElement("div");
        postersWrapper.className = "colecao-posters";

        filmes.forEach((m) => {
          if (!m.imagem_url) return;
          const img = document.createElement("img");
          img.className = "colecao-poster-img";
          img.src = m.imagem_url;
          img.alt = m.nome;
          img.title = `${m.nome}${m.ano ? " (" + m.ano + ")" : ""}`;
          img.addEventListener("click", (e) => {
            e.stopPropagation();
            aplicarFiltroFranquia(nomeFranquia);
          });
          postersWrapper.appendChild(img);
        });

        if (postersWrapper.childElementCount) {
          card.appendChild(postersWrapper);
        }

        const listagemF = document.createElement("div");
        listagemF.className = "colecao-listagem";
        listagemF.innerHTML = filmes
          .sort((a, b) => {
            if (a.ano && b.ano && a.ano !== b.ano) return a.ano - b.ano;
            return (a.nome || "").localeCompare(b.nome || "");
          })
          .map((m) => {
            const p = [];
            p.push(m.nome);
            if (m.ano) p.push(`(${m.ano})`);
            return "• " + p.join(" ");
          })
          .join("<br>");
        card.appendChild(listagemF);
      }

      if (series.length) {
        const sub = document.createElement("div");
        sub.className = "colecao-subtitle";
        sub.textContent = "Séries";
        card.appendChild(sub);

        const postersWrapper = document.createElement("div");
        postersWrapper.className = "colecao-posters";

        series.forEach((m) => {
          if (!m.imagem_url) return;
          const img = document.createElement("img");
          img.className = "colecao-poster-img";
          img.src = m.imagem_url;
          img.alt = m.nome;
          img.title = `${m.nome}${m.ano ? " (" + m.ano + ")" : ""}`;
          img.addEventListener("click", (e) => {
            e.stopPropagation();
            aplicarFiltroFranquia(nomeFranquia);
          });
          postersWrapper.appendChild(img);
        });

        if (postersWrapper.childElementCount) {
          card.appendChild(postersWrapper);
        }

        const listagemS = document.createElement("div");
        listagemS.className = "colecao-listagem";
        listagemS.innerHTML = series
          .sort((a, b) => {
            if (a.ano && b.ano && a.ano !== b.ano) return a.ano - b.ano;
            return (a.nome || "").localeCompare(b.nome || "");
          })
          .map((m) => {
            const p = [];
            p.push(m.nome);
            if (m.ano) p.push(`(${m.ano})`);
            return "• " + p.join(" ");
          })
          .join("<br>");
        card.appendChild(listagemS);
      }

      title.addEventListener("click", () => aplicarFiltroFranquia(nomeFranquia));

      colecoesList.appendChild(card);
    });
}

// ======= EPISÓDIOS VIEW =======
function abrirEpisodiosView(midia) {
  midiaAtualEpisodios = midia;
  sairModoEdicaoEp();
  renderizarEpisodiosView();
  mostrarEpisodiosView();
}

btnVoltar.addEventListener("click", () => {
  midiaAtualEpisodios = null;
  sairModoEdicaoEp();
  mostrarMainView();
});

function filtrarEpisodiosLista(eps) {
  const texto = filtroEpTitulo.value.trim().toLowerCase();
  const st = filtroEpStatus.value;

  return eps.filter((ep) => {
    let ok = true;
    if (texto) {
      const t = (ep.titulo || "").toLowerCase();
      if (!t.includes(texto)) ok = false;
    }
    if (st && ep.status !== st) ok = false;
    return ok;
  });
}

[filtroEpTitulo, filtroEpStatus].forEach((el) => {
  el.addEventListener("input", renderizarEpisodiosView);
  el.addEventListener("change", renderizarEpisodiosView);
});

function renderizarEpisodiosView() {
  const midia = midiaAtualEpisodios;
  if (!midia) return;
  const epsOrig = episodiosPorMidia[midia.id] || [];
  const eps = filtrarEpisodiosLista(epsOrig);

  const temporadasSet = new Set(epsOrig.map((e) => e.temporada));
  const total = epsOrig.length;
  const assistidos = epsOrig.filter((e) => e.status === "ASSISTIDOS").length;
  const perc = total > 0 ? Math.round((assistidos / total) * 100) : 0;

  episodiosTituloBar.textContent = midia.nome
    ? `Episódios de ${midia.nome}`
    : "Episódios";

  episodiosHeader.innerHTML = "";
  if (midia.imagem_url) {
    const img = document.createElement("img");
    img.src = midia.imagem_url;
    img.alt = midia.nome;
    episodiosHeader.appendChild(img);
  }

  const info = document.createElement("div");
  info.className = "episodios-header-info";

  const titulo = document.createElement("div");
  titulo.className = "episodios-header-titulo";
  titulo.textContent = midia.nome;
  info.appendChild(titulo);

  const meta = document.createElement("div");
  meta.className = "episodios-meta";
  const partes = [];
  partes.push(midia.tipo === "SERIE" ? "SÉRIE" : "FILME");
  if (midia.ano) partes.push(`• ${midia.ano}`);
  if (midia.streaming) partes.push(`• ${midia.streaming}`);
  if (midia.franquia) partes.push(`• Franquia: ${midia.franquia}`);
  meta.textContent = partes.join(" ");
  info.appendChild(meta);

  const resumo = document.createElement("div");
  resumo.className = "episodios-resumo";
  resumo.innerHTML = `Temporadas: <strong>${
    temporadasSet.size || 0
  }</strong> • Episódios: <strong>${total}</strong> • Progresso: <strong>${assistidos}/${total} (${perc}%)</strong>`;
  info.appendChild(resumo);

  const starsVal = sanitizeRating(midia.avaliacao);
  if (starsVal !== null) {
    const av = document.createElement("div");
    av.className = "episodios-resumo";
    av.innerHTML = `Avaliação geral: <span class="stars-display">${renderStars(
      starsVal
    )}</span> (${formatRating(starsVal)}/5)`;
    info.appendChild(av);
  }

  episodiosHeader.appendChild(info);

  epStatusSelect.value = midia.status || "ASSISTINDO";

  episodiosList.innerHTML = "";
  if (!eps.length) {
    const vazio = document.createElement("div");
    vazio.className = "episodios-list-vazia";
    vazio.textContent =
      epsOrig.length === 0
        ? "Nenhum episódio cadastrado ainda."
        : "Nenhum episódio encontrado com os filtros atuais.";
    episodiosList.appendChild(vazio);
  } else {
    const porTemp = {};
    eps.forEach((ep) => {
      if (!porTemp[ep.temporada]) porTemp[ep.temporada] = [];
      porTemp[ep.temporada].push(ep);
    });

    const grupos = [
      { status: "ASSISTINDO", label: "Assistindo" },
      { status: "ASSISTIDOS", label: "Assistidos" },
      { status: "NAO_COMECEI", label: "Ainda não comecei" },
    ];

    Object.keys(porTemp)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((temp) => {
        const bloco = document.createElement("div");
        bloco.className = "temporada-bloco";

        const t = document.createElement("div");
        t.className = "temporada-titulo";
        t.textContent = `Temporada ${temp}`;
        bloco.appendChild(t);

        grupos.forEach((g) => {
          const epsGrupo = porTemp[temp]
            .filter((ep) => ep.status === g.status)
            .sort((a, b) => a.numero - b.numero);

          if (!epsGrupo.length) return;

          const headerStatus = document.createElement("div");
          headerStatus.className = "episodios-status-header";
          headerStatus.dataset.status = g.status; // para o CSS pintar diferente
          headerStatus.textContent = g.label;
          bloco.appendChild(headerStatus);

          epsGrupo.forEach((ep) => {
            const item = document.createElement("div");
            item.className = "episodio-item";

            const topline = document.createElement("div");
            topline.className = "episodio-topline";

            const infoEp = document.createElement("div");
            infoEp.className = "episodio-info";

            const codigo = `T${String(ep.temporada).padStart(2, "0")}E${String(
              ep.numero
            ).padStart(2, "0")}`;

            let text = `${codigo}`;
            if (ep.titulo) text += ` – ${ep.titulo}`;

            const epStarsVal = sanitizeRating(ep.avaliacao);
            if (epStarsVal !== null) {
              text += ` • Nota: ${renderStars(epStarsVal)} (${formatRating(
                epStarsVal
              )}/5)`;
            }

            infoEp.textContent = text;

            const acao = document.createElement("div");
            acao.className = "episodio-acao";

            const btnEditEp = document.createElement("button");
            btnEditEp.type = "button";
            btnEditEp.className = "btn btn-outline";
            btnEditEp.style.fontSize = "0.72rem";
            btnEditEp.innerHTML = "Editar";
            btnEditEp.addEventListener("click", () => entrarModoEdicaoEp(ep));
            acao.appendChild(btnEditEp);

            const btnDel = document.createElement("button");
            btnDel.type = "button";
            btnDel.className = "btn btn-danger";
            btnDel.style.fontSize = "0.72rem";
            btnDel.textContent = "Excluir";
            btnDel.addEventListener("click", () => excluirEpisodio(ep));
            acao.appendChild(btnDel);

            topline.appendChild(infoEp);
            topline.appendChild(acao);
            item.appendChild(topline);

            if (ep.resumo) {
              const resumoEp = document.createElement("div");
              resumoEp.className = "episodio-resumo";
              resumoEp.textContent = ep.resumo;
              item.appendChild(resumoEp);
            }

            bloco.appendChild(item);
          });
        });

        episodiosList.appendChild(bloco);
      });
  }
}

// ======= NAVEGAÇÃO ENTRE VIEWS =======
btnGerirColecao.addEventListener("click", () => {
  mostrarGerirView();
});

btnVoltarLista.addEventListener("click", () => {
  mostrarMainView();
});

// Botão de buscar na TMDb
if (btnTmdbBuscar) {
  btnTmdbBuscar.addEventListener("click", buscarTmdb);
}
if (tmdbTituloInput) {
  tmdbTituloInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buscarTmdb();
    }
  });
}

// ======= INICIALIZAÇÃO =======
attachStarRating(midiaRatingStars, avaliacaoInput);
attachStarRating(epRatingStars, epAvalInput);

loadFiltersFromStorage();
mostrarMainView();
carregarTudo();
