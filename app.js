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

// Labels de status
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
const avaliacaoInput = document.getElementById("avaliacao");
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
const epAvalInput = document.getElementById("ep-avaliacao");
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
let abaStatus = "";

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

function showLoading(show) {
  loadingOverlay.style.display = show ? "flex" : "none";
}

function mapStatusToLabel(status) {
  return STATUS_LABELS[status] || status || "";
}

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

function attachStarRating(element, input) {
  function updateView() {
    element.textContent = renderStars(input.value);
  }
