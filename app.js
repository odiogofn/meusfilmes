/* =========================
   VERSÃO COMPLETA (v12)
   ========================= */
console.log("APP VERSION:", "v12-full");

/* ===== SUPABASE ===== */
const SUPABASE_URL = "https://koytoiwfvwzjvgcqhlal.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtveXRvaXdmdnd6anZnY3FobGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDExNzAsImV4cCI6MjA3OTcxNzE3MH0.mrMRUGJFqzOBjj7M4giHcWr5qsqUn_0woVMFikDxrjM";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ===== TMDb ===== */
const TMDB_API_KEY = "34d1febeb2c306bd928d270c1990c076";
const TMDB_BEARER = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGQxZmViZWIyYzMwNmJkOTI4ZDI3MGMxOTkwYzA3NiIsIm5iZiI6MTc2NDU0NzczNC43MDIwMDAxLCJzdWIiOiI2OTJjZGM5Njg1ZTg0OGEwYjAyNmVhZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Htppj_TDovsK4-xrjzwZrBduPQJZSy9HErIjkvm8DgY";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

/* =========================
   ELEMENTOS
   ========================= */
const el = (id) => document.getElementById(id);

const grid = el("grid");
const countInfo = el("countInfo");
const highlights = el("highlights");

const managePanel = el("managePanel");
const btnManage = el("btnManage");
const btnBack = el("btnBack");
const btnNew = el("btnNew");
const btnReload = el("btnReload");

const tabs = [...document.querySelectorAll(".tab")];

const fSearch = el("fSearch");
const fMinRating = el("fMinRating");
const fTipo = el("fTipo");
const fStreaming = el("fStreaming");
const fAno = el("fAno");
const fGenero = el("fGenero");
const fDiretor = el("fDiretor");
const fFranquia = el("fFranquia");
const btnClearFilters = el("btnClearFilters");

const topBest = el("topBest");
const topWorst = el("topWorst");
const topLast = el("topLast");

const franchisesMovies = el("franchisesMovies");
const franchisesSeries = el("franchisesSeries");

/* Manage form */
const formManage = el("formManage");
const mId = el("mId");
const mNome = el("mNome");
const mTipo = el("mTipo");
const mStatus = el("mStatus");
const mReleaseDate = el("mReleaseDate");
const mAno = el("mAno");
const mStreaming = el("mStreaming");
const mGenero = el("mGenero");
const mDiretor = el("mDiretor");
const mFranquia = el("mFranquia");
const mImagemUrl = el("mImagemUrl");
const mLink = el("mLink");
const mLinks = el("mLinks");
const mAvaliacao = el("mAvaliacao");
const starsMidia = el("starsMidia");
const mSinopse = el("mSinopse");
const mPosterPreview = el("mPosterPreview");

const mTmdbId = el("mTmdbId");
const mImdbId = el("mImdbId");
const mCastData = el("mCastData");
const mNetworks = el("mNetworks");
const mKeywords = el("mKeywords");

const btnDeleteManage = el("btnDeleteManage");
const btnResetManage = el("btnResetManage");

const manageGrid = el("manageGrid");
const btnExportMidias = el("btnExportMidias");
const btnModelMidias = el("btnModelMidias");
const fileImportMidias = el("fileImportMidias");

/* TMDb */
const tmdbType = el("tmdbType");
const tmdbQuery = el("tmdbQuery");
const btnTmdbSearch = el("btnTmdbSearch");
const btnTmdbClear = el("btnTmdbClear");
const tmdbResults = el("tmdbResults");

/* Modal */
const modalBackdrop = el("modalBackdrop");
const btnCloseModal = el("btnCloseModal");
const btnEdit = el("btnEdit");
const btnSave = el("btnSave");
const btnDelete = el("btnDelete");

const dTitle = el("dTitle");
const dSub = el("dSub");
const dPoster = el("dPoster");
const dTipo = el("dTipo");
const dStatus = el("dStatus");
const dAno = el("dAno");
const dStreaming = el("dStreaming");
const dGenero = el("dGenero");
const dDiretor = el("dDiretor");
const dFranquia = el("dFranquia");
const dNote = el("dNote");
const dStars = el("dStars");
const dSinopse = el("dSinopse");
const dLinks = el("dLinks");

/* Episódios no modal */
const epsBox = el("epsBox");
const epsGrouped = el("epsGrouped");
const btnAddEp = el("btnAddEp");
const btnExportEps = el("btnExportEps");
const btnModelEps = el("btnModelEps");
const fileImportEps = el("fileImportEps");

const epForm = el("epForm");
const epFormTitle = el("epFormTitle");
const btnCancelEp = el("btnCancelEp");
const formEp = el("formEp");
const epId = el("epId");
const epSeason = el("epSeason");
const epNumber = el("epNumber");
const epTitle = el("epTitle");
const epResumo = el("epResumo");
const epStatus = el("epStatus");
const epRating = el("epRating");
const starsEp = el("starsEp");

/* Toast */
const toast = el("toast");

/* =========================
   STATE
   ========================= */
let midias = [];
let episodios = [];
let tabStatus = "ASSISTINDO";
let currentMidia = null;
let modalMode = "view"; // view | edit
let franchiseFilter = ""; // click na franquia do destaque

/* =========================
   HELPERS
   ========================= */
function showToast(text, type="ok"){
  toast.textContent = text;
  toast.classList.remove("hidden");
  toast.style.background = (type==="err") ? "#b91c1c" : "#111827";
  clearTimeout(window.__t);
  window.__t = setTimeout(()=> toast.classList.add("hidden"), 2400);
}

function safePoster(url){
  return (url && String(url).trim()) ? url.trim() : "https://via.placeholder.com/300x450.png?text=Sem+Imagem";
}

function sanitizeRating(value){
  if(value===null || value===undefined) return null;
  let s = String(value).trim();
  if(!s) return null;
  s = s.replace(",", ".");
  let n = Number(s);
  if(!Number.isFinite(n)) return null;
  n = Math.max(0, Math.min(5, n));
  n = Math.round(n*2)/2; // meia estrela
  return n;
}

function starsString(v){
  const n = sanitizeRating(v);
  if(n===null) return "☆☆☆☆☆";
  const full = Math.floor(n);
  const half = (n - full) >= 0.5 ? 1 : 0;
  const empty = Math.max(0, 5 - full - half);
  return "★".repeat(full) + (half ? "⯨" : "") + "☆".repeat(empty);
}

function bindStars(starsEl, inputEl){
  const sync = ()=> starsEl.textContent = starsString(inputEl.value);
  starsEl.addEventListener("click", (ev)=>{
    const rect = starsEl.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    let rating = Math.round(ratio * 10) / 2;
    rating = Math.max(0, Math.min(5, rating));
    inputEl.value = String(rating).replace(".0","").replace(".", ",");
    sync();
  });
  inputEl.addEventListener("input", sync);
  sync();
}

function normalizeUrl(u){
  const s = String(u||"").trim();
  if(!s) return "";
  if(/^https?:\/\//i.test(s)) return s;
  return "https://" + s;
}

function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function statusLabel(s){
  if(s==="ASSISTINDO") return "Assistindo";
  if(s==="ASSISTIDOS") return "Assistidos";
  return "Ainda não comecei";
}
function statusClass(s){
  if(s==="ASSISTINDO") return "st-assistindo";
  if(s==="ASSISTIDOS") return "st-assistidos";
  return "st-nao";
}

function jsonParseOrNull(text){
  const s = String(text||"").trim();
  if(!s) return null;
  try{ return JSON.parse(s); }catch{ throw new Error("JSON inválido em campos avançados"); }
}

function toJsonString(v){
  if(v===null || v===undefined) return "";
  try{ return JSON.stringify(v, null, 2); }catch{ return ""; }
}

/* =========================
   LOAD
   ========================= */
async function loadMidias(){
  const { data, error } = await db.from("midias").select("*").order("created_at",{ascending:false});
  if(error){
    console.error(error);
    showToast("Erro ao carregar mídias (veja console).", "err");
    return;
  }
  midias = data || [];
  rebuildFilterOptions();
  renderHighlights();
  renderMainGrid();
  renderManageGrid();
}

async function loadEpisodios(midiaId){
  const { data, error } = await db.from("episodios")
    .select("*")
    .eq("midia_id", midiaId)
    .order("temporada",{ascending:true})
    .order("numero",{ascending:true});

  if(error){
    console.error(error);
    showToast("Erro ao carregar episódios.", "err");
    episodios = [];
    renderEpisodes();
    return;
  }
  episodios = data || [];
  renderEpisodes();
}

/* =========================
   FILTER OPTIONS (DINÂMICO)
   ========================= */
function uniqueSorted(list){
  return [...new Set(list.filter(Boolean).map(x=>String(x).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
}

function rebuildFilterOptions(){
  const streamings = uniqueSorted(midias.map(m=>m.streaming));
  const anos = uniqueSorted(midias.map(m=>m.ano)).sort((a,b)=>Number(b)-Number(a));
  const generos = uniqueSorted(midias.map(m=>m.genero));
  const diretores = uniqueSorted(midias.map(m=>m.diretor));
  const franquias = uniqueSorted(midias.map(m=>m.franquia));

  fillSelect(fStreaming, "Streaming (todos)", streamings);
  fillSelect(fAno, "Ano (todos)", anos);
  fillSelect(fGenero, "Gênero (todos)", generos);
  fillSelect(fDiretor, "Diretor (todos)", diretores);
  fillSelect(fFranquia, "Franquia (todas)", franquias);
}

function fillSelect(selectEl, firstLabel, values){
  selectEl.innerHTML = "";
  const o0 = document.createElement("option");
  o0.value = "";
  o0.textContent = firstLabel;
  selectEl.appendChild(o0);
  values.forEach(v=>{
    const o = document.createElement("option");
    o.value = v;
    o.textContent = v;
    selectEl.appendChild(o);
  });
}

/* =========================
   MAIN FILTER + RENDER
   ========================= */
function getFilteredMain(){
  let arr = [...midias];

  // status da aba
  arr = arr.filter(m => (m.status || "ASSISTINDO") === tabStatus);

  // filtros
  const q = fSearch.value.trim().toLowerCase();
  const minR = sanitizeRating(fMinRating.value);
  const tipo = fTipo.value;
  const streaming = fStreaming.value;
  const ano = fAno.value;
  const genero = fGenero.value;
  const diretor = fDiretor.value;
  const franquia = franchiseFilter || fFranquia.value;

  if(q) arr = arr.filter(m => String(m.nome||"").toLowerCase().includes(q));
  if(minR!==null) arr = arr.filter(m => {
    const n = sanitizeRating(m.avaliacao);
    return n!==null && n >= minR;
  });

  if(tipo) arr = arr.filter(m => m.tipo === tipo);
  if(streaming) arr = arr.filter(m => (m.streaming||"") === streaming);
  if(ano) arr = arr.filter(m => String(m.ano||"") === String(ano));
  if(genero) arr = arr.filter(m => (m.genero||"") === genero);
  if(diretor) arr = arr.filter(m => (m.diretor||"") === diretor);
  if(franquia) arr = arr.filter(m => (m.franquia||"") === franquia);

  return arr;
}

function renderMainGrid(){
  const arr = getFilteredMain();
  countInfo.textContent = `${arr.length} item(ns)` + (franchiseFilter ? ` • Filtrando franquia: ${franchiseFilter}` : "");

  grid.innerHTML = "";
  if(!arr.length){
    grid.innerHTML = `<div class="panel"><div class="sub">Nada encontrado.</div></div>`;
    return;
  }

  arr.forEach(m=>{
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = ()=>openDetails(m);

    card.innerHTML = `
      <div class="poster"><img src="${safePoster(m.imagem_url)}" alt=""></div>
      <div class="content">
        <div class="topline">
          <div class="title">${escapeHtml(m.nome||"(sem nome)")}</div>
          <span class="badge">${m.tipo==="SERIE"?"Série":"Filme"}</span>
        </div>
        <div class="meta">${[m.ano, m.streaming, m.franquia].filter(Boolean).join(" • ")}</div>
        <div class="footer">
          <span class="status ${statusClass(m.status)}">${statusLabel(m.status)}</span>
          <span class="starsInline"><span class="mut">${sanitizeRating(m.avaliacao) ?? "-"}</span> ${starsString(m.avaliacao)}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* =========================
   HIGHLIGHTS (TOPs + FRANQUIAS)
   ========================= */
function renderTop(container, items){
  container.innerHTML = "";
  if(!items.length){
    container.innerHTML = `<div class="sub" style="padding:10px 12px">Sem dados.</div>`;
    return;
  }
  items.forEach(m=>{
    const div = document.createElement("div");
    div.className = "box-item";
    div.onclick = ()=>openDetails(m);
    const n = sanitizeRating(m.avaliacao);
    div.innerHTML = `
      <div class="name">${escapeHtml(m.nome||"-")}</div>
      <div class="note">${n===null? "-" : String(n)}</div>
      <div class="stars">${starsString(m.avaliacao)}</div>
    `;
    container.appendChild(div);
  });
}

function renderHighlights(){
  // TOPs só na página principal (não aparece no gerir)
  const rated = midias
    .map(m => ({ m, n: sanitizeRating(m.avaliacao) }))
    .filter(x => x.n !== null);

  const best = [...rated].sort((a,b)=> b.n - a.n).slice(0,10).map(x=>x.m);
  const worst = [...rated].sort((a,b)=> a.n - b.n).slice(0,10).map(x=>x.m);
  const last = [...midias].slice(0,10);

  renderTop(topBest, best);
  renderTop(topWorst, worst);
  renderTop(topLast, last);

  renderFranchises();
}

function renderFranchises(){
  const byFranchise = new Map();

  midias.forEach(m=>{
    const fr = String(m.franquia||"").trim();
    if(!fr) return;
    const key = fr + "::" + (m.tipo||"");
    if(!byFranchise.has(key)) byFranchise.set(key, []);
    byFranchise.get(key).push(m);
  });

  const movies = [];
  const series = [];

  for(const [key, list] of byFranchise.entries()){
    const [fr, tipo] = key.split("::");
    // pegar um poster “representativo”
    const rep = list.find(x=>x.imagem_url) || list[0];
    const item = { franquia: fr, tipo, poster: safePoster(rep?.imagem_url), count: list.length };
    if(tipo==="FILME") movies.push(item);
    else if(tipo==="SERIE") series.push(item);
  }

  movies.sort((a,b)=>a.franquia.localeCompare(b.franquia));
  series.sort((a,b)=>a.franquia.localeCompare(b.franquia));

  franchisesMovies.innerHTML = "";
  franchisesSeries.innerHTML = "";

  const renderFr = (wrap, items)=>{
    if(!items.length){
      wrap.innerHTML = `<div class="sub">Sem franquias.</div>`;
      return;
    }
    items.forEach(x=>{
      const c = document.createElement("div");
      c.className = "franchise-card";
      c.onclick = ()=>{
        franchiseFilter = x.franquia;
        fFranquia.value = "";
        renderMainGrid();
        showToast(`Filtro: ${x.franquia}`, "ok");
      };
      c.innerHTML = `
        <img src="${x.poster}" alt="">
        <div class="fname">${escapeHtml(x.franquia)} <span class="sub">(${x.count})</span></div>
      `;
      wrap.appendChild(c);
    });
  };

  renderFr(franchisesMovies, movies);
  renderFr(franchisesSeries, series);
}

/* =========================
   MANAGE (GERIR COLEÇÃO)
   ========================= */
function setManageVisible(on){
  managePanel.classList.toggle("hidden", !on);
  highlights.classList.toggle("hidden", on); // destaques só na principal
  grid.classList.toggle("hidden", on);
}

function resetManageForm(){
  mId.value = "";
  mNome.value = "";
  mTipo.value = "FILME";
  mStatus.value = "ASSISTINDO";
  mReleaseDate.value = "";
  mAno.value = "";
  mStreaming.value = "";
  mGenero.value = "";
  mDiretor.value = "";
  mFranquia.value = "";
  mImagemUrl.value = "";
  mLink.value = "";
  mLinks.value = "";
  mAvaliacao.value = "";
  mSinopse.value = "";

  mTmdbId.value = "";
  mImdbId.value = "";
  mCastData.value = "";
  mNetworks.value = "";
  mKeywords.value = "";

  mPosterPreview.src = safePoster("");
  starsMidia.textContent = "☆☆☆☆☆";
}

function fillManageForm(m){
  mId.value = m.id;
  mNome.value = m.nome || "";
  mTipo.value = m.tipo || "FILME";
  mStatus.value = m.status || "ASSISTINDO";
  mReleaseDate.value = m.data_lancamento || "";
  mAno.value = m.ano || "";
  mStreaming.value = m.streaming || "";
  mGenero.value = m.genero || "";
  mDiretor.value = m.diretor || "";
  mFranquia.value = m.franquia || "";
  mImagemUrl.value = m.imagem_url || "";
  mLink.value = m.link || "";
  mLinks.value = m.links || "";
  mAvaliacao.value = (sanitizeRating(m.avaliacao) ?? "").toString().replace(".", ",");
  mSinopse.value = m.sinopse || "";

  mTmdbId.value = (m.tmdb_id ?? "");
  mImdbId.value = (m.imdb_id ?? "");
  mCastData.value = toJsonString(m.cast_data);
  mNetworks.value = toJsonString(m.networks);
  mKeywords.value = toJsonString(m.keywords);

  mPosterPreview.src = safePoster(m.imagem_url);
  starsMidia.textContent = starsString(m.avaliacao);
}

function buildMidiaPayloadFromForm(){
  // auto ano pela data
  if(mReleaseDate.value && !mAno.value){
    mAno.value = String(mReleaseDate.value).slice(0,4);
  }

  return {
    nome: mNome.value.trim(),
    tipo: mTipo.value,
    status: mStatus.value,
    data_lancamento: mReleaseDate.value || null,
    ano: mAno.value ? Number(mAno.value) : null,
    streaming: mStreaming.value.trim() || null,
    genero: mGenero.value.trim() || null,
    diretor: mDiretor.value.trim() || null,
    franquia: mFranquia.value.trim() || null,
    imagem_url: mImagemUrl.value.trim() || null,
    link: mLink.value.trim() || null,
    links: mLinks.value.trim() || null,
    avaliacao: sanitizeRating(mAvaliacao.value),
    sinopse: mSinopse.value.trim() || null,

    tmdb_id: mTmdbId.value ? Number(mTmdbId.value) : null,
    imdb_id: mImdbId.value.trim() || null,
    cast_data: jsonParseOrNull(mCastData.value),
    networks: jsonParseOrNull(mNetworks.value),
    keywords: jsonParseOrNull(mKeywords.value),
  };
}

function renderManageGrid(){
  manageGrid.innerHTML = "";
  const arr = [...midias].slice(0, 60); // lista grande? deixa leve
  arr.forEach(m=>{
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = ()=>{
      fillManageForm(m);
      showToast("Carregado no formulário.", "ok");
    };
    card.innerHTML = `
      <div class="poster"><img src="${safePoster(m.imagem_url)}" alt=""></div>
      <div class="content">
        <div class="topline">
          <div class="title">${escapeHtml(m.nome||"(sem nome)")}</div>
          <span class="badge">${m.tipo==="SERIE"?"Série":"Filme"}</span>
        </div>
        <div class="meta">${[m.ano, m.streaming, m.franquia].filter(Boolean).join(" • ")}</div>
        <div class="footer">
          <span class="status ${statusClass(m.status)}">${statusLabel(m.status)}</span>
          <span class="starsInline"><span class="mut">${sanitizeRating(m.avaliacao) ?? "-"}</span> ${starsString(m.avaliacao)}</span>
        </div>
      </div>
    `;
    manageGrid.appendChild(card);
  });
}

/* =========================
   MODAL DETALHES
   ========================= */
function openModal(){
  modalBackdrop.classList.remove("hidden");
}
function closeModal(){
  modalBackdrop.classList.add("hidden");
  currentMidia = null;
  episodios = [];
  epsGrouped.innerHTML = "";
  epForm.classList.add("hidden");
}
btnCloseModal.onclick = closeModal;
modalBackdrop.addEventListener("click",(e)=>{ if(e.target===modalBackdrop) closeModal(); });
window.addEventListener("keydown",(e)=>{ if(e.key==="Escape" && !modalBackdrop.classList.contains("hidden")) closeModal(); });

function setModalMode(mode){
  modalMode = mode;
  btnSave.classList.toggle("hidden", mode!=="edit");
  btnEdit.classList.toggle("hidden", mode==="edit");
}

function renderLinksTo(elWrap, m){
  elWrap.innerHTML = "";
  const links = [];
  if(m.link) links.push(m.link);
  if(m.links){
    m.links.split("\n").map(s=>s.trim()).filter(Boolean).forEach(x=>links.push(x));
  }
  const uniq = [...new Set(links)];
  if(!uniq.length){
    elWrap.innerHTML = `<div class="sub">Sem links.</div>`;
    return;
  }
  uniq.forEach(u=>{
    const a = document.createElement("a");
    a.href = normalizeUrl(u);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = u;
    elWrap.appendChild(a);
  });
}

async function openDetails(m){
  currentMidia = m;
  setModalMode("view");

  dTitle.textContent = m.nome || "(sem nome)";
  dSub.textContent = `ID: ${m.id}`;
  dPoster.src = safePoster(m.imagem_url);

  dTipo.textContent = m.tipo==="SERIE" ? "Série" : "Filme";
  dStatus.textContent = statusLabel(m.status);
  dAno.textContent = m.ano ? `Ano: ${m.ano}` : "Ano: -";
  dStreaming.textContent = m.streaming ? `Streaming: ${m.streaming}` : "Streaming: -";
  dGenero.textContent = m.genero ? `Gênero: ${m.genero}` : "Gênero: -";
  dDiretor.textContent = m.diretor ? `Diretor: ${m.diretor}` : "Diretor: -";
  dFranquia.textContent = m.franquia ? `Franquia: ${m.franquia}` : "Franquia: -";

  const n = sanitizeRating(m.avaliacao);
  dNote.textContent = `Nota: ${n===null ? "-" : n}`;
  dStars.textContent = starsString(m.avaliacao);

  dSinopse.textContent = m.sinopse || "Sem sinopse.";
  renderLinksTo(dLinks, m);

  // Episódios: só séries
  if(m.tipo==="SERIE"){
    epsBox.classList.remove("hidden");
    await loadEpisodios(m.id);
  }else{
    epsBox.classList.add("hidden");
  }

  openModal();
}

/* Editar pelo modal -> abre no Gerir Coleção e salva por lá (modo profissional) */
btnEdit.onclick = ()=>{
  if(!currentMidia) return;
  setManageVisible(true);
  fillManageForm(currentMidia);
  closeModal();
  showToast("Editar pelo Gerir Coleção.", "ok");
};

btnDelete.onclick = async ()=>{
  if(!currentMidia) return;
  if(!confirm("Excluir esta mídia?")) return;
  const { error } = await db.from("midias").delete().eq("id", currentMidia.id);
  if(error){
    console.error(error);
    showToast("Erro ao excluir.", "err");
    return;
  }
  showToast("Excluído ✅", "ok");
  closeModal();
  await loadMidias();
};

/* =========================
   EPISÓDIOS
   ========================= */
function resetEpForm(){
  epId.value = "";
  epSeason.value = "";
  epNumber.value = "";
  epTitle.value = "";
  epResumo.value = "";
  epStatus.value = "AINDA_NAO_COMECEI";
  epRating.value = "";
  starsEp.textContent = "☆☆☆☆☆";
}

btnAddEp.onclick = ()=>{
  if(!currentMidia) return;
  epForm.classList.remove("hidden");
  epFormTitle.textContent = "Novo episódio";
  resetEpForm();
  epSeason.focus();
};

btnCancelEp.onclick = ()=>{
  epForm.classList.add("hidden");
};

function editEpisode(ep){
  epForm.classList.remove("hidden");
  epFormTitle.textContent = "Editar episódio";
  epId.value = ep.id;
  epSeason.value = ep.temporada;
  epNumber.value = ep.numero;
  epTitle.value = ep.titulo || "";
  epResumo.value = ep.resumo || "";
  epStatus.value = ep.status || "AINDA_NAO_COMECEI";
  epRating.value = (sanitizeRating(ep.avaliacao) ?? "").toString().replace(".", ",");
  starsEp.textContent = starsString(ep.avaliacao);
}

async function deleteEpisode(id){
  if(!confirm("Excluir episódio?")) return;
  const { error } = await db.from("episodios").delete().eq("id", id);
  if(error){
    console.error(error);
    showToast("Erro ao excluir episódio.", "err");
    return;
  }
  showToast("Episódio excluído ✅","ok");
  await loadEpisodios(currentMidia.id);
}

formEp.addEventListener("submit", async (e)=>{
  e.preventDefault();
  if(!currentMidia) return;

  const payload = {
    midia_id: currentMidia.id,
    temporada: Number(epSeason.value),
    numero: Number(epNumber.value),
    titulo: epTitle.value.trim() || null,
    resumo: epResumo.value.trim() || null,
    status: epStatus.value,
    avaliacao: sanitizeRating(epRating.value),
  };

  if(!payload.temporada || !payload.numero){
    showToast("Temporada e número são obrigatórios.", "err");
    return;
  }

  if(epId.value){
    const { error } = await db.from("episodios").update(payload).eq("id", epId.value);
    if(error){
      console.error(error);
      showToast("Erro ao atualizar episódio.", "err");
      return;
    }
    showToast("Episódio atualizado ✅","ok");
  }else{
    const { error } = await db.from("episodios").insert(payload);
    if(error){
      console.error(error);
      showToast("Erro ao salvar episódio.", "err");
      return;
    }
    showToast("Episódio salvo ✅","ok");
  }

  epForm.classList.add("hidden");
  resetEpForm();
  await loadEpisodios(currentMidia.id);
});

function groupEpisodes(){
  const map = new Map(); // season -> status -> list
  for(const ep of episodios){
    const s = ep.temporada || 0;
    if(!map.has(s)) map.set(s, new Map());
    const st = ep.status || "AINDA_NAO_COMECEI";
    const m2 = map.get(s);
    if(!m2.has(st)) m2.set(st, []);
    m2.get(st).push(ep);
  }
  const seasons = [...map.keys()].sort((a,b)=>a-b);
  return { map, seasons };
}

function renderEpisodes(){
  epsGrouped.innerHTML = "";
  if(!episodios.length){
    epsGrouped.innerHTML = `<div class="panel"><div class="sub">Nenhum episódio cadastrado.</div></div>`;
    return;
  }

  const { map, seasons } = groupEpisodes();
  const order = ["ASSISTINDO","ASSISTIDOS","AINDA_NAO_COMECEI"];

  for(const season of seasons){
    const det = document.createElement("details");
    det.className = "epBlock";
    det.open = true;

    const total = [...map.get(season).values()].reduce((acc,arr)=>acc+arr.length,0);
    const sum = document.createElement("summary");
    sum.innerHTML = `Temporada ${season} <span class="sub">(${total} episódio(s))</span>`;
    det.appendChild(sum);

    const inner = document.createElement("div");
    inner.className = "epInner";

    for(const st of order){
      const list = map.get(season).get(st) || [];
      if(!list.length) continue;

      list.sort((a,b)=>(a.numero||0)-(b.numero||0));

      const title = document.createElement("div");
      title.className = "epGroupTitle";
      title.textContent = `${statusLabel(st)} (${list.length})`;
      inner.appendChild(title);

      const table = document.createElement("table");
      table.className = "epTable";
      table.innerHTML = `
        <thead>
          <tr>
            <th style="width:90px">Ep</th>
            <th>Título / Resumo</th>
            <th style="width:140px">Nota</th>
            <th style="width:200px">Ações</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tb = table.querySelector("tbody");

      list.forEach(ep=>{
        const n = sanitizeRating(ep.avaliacao);
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><b>E${String(ep.numero||0).padStart(2,"0")}</b></td>
          <td>
            <div style="font-weight:900">${escapeHtml(ep.titulo||"-")}</div>
            <div class="sub" style="white-space:pre-wrap;margin-top:2px">${escapeHtml(ep.resumo||"")}</div>
          </td>
          <td>
            <div style="display:flex;gap:8px;align-items:center">
              <span style="font-weight:900">${n===null? "-" : n}</span>
              <span>${starsString(ep.avaliacao)}</span>
            </div>
          </td>
          <td></td>
        `;
        const td = tr.querySelector("td:last-child");
        const actions = document.createElement("div");
        actions.className = "epActions";

        const b1 = document.createElement("button");
        b1.className = "btn ghost";
        b1.textContent = "Editar";
        b1.onclick = ()=>editEpisode(ep);

        const b2 = document.createElement("button");
        b2.className = "btn danger";
        b2.textContent = "Excluir";
        b2.onclick = ()=>deleteEpisode(ep.id);

        actions.appendChild(b1);
        actions.appendChild(b2);
        td.appendChild(actions);

        tb.appendChild(tr);
      });

      inner.appendChild(table);
    }

    det.appendChild(inner);
    epsGrouped.appendChild(det);
  }
}

/* =========================
   IMPORT/EXPORT EPISÓDIOS
   ========================= */
function downloadJSON(filename, obj){
  const blob = new Blob([JSON.stringify(obj,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

btnModelEps.onclick = ()=>{
  const model = [{
    temporada: 1,
    numero: 1,
    titulo: "Episódio 1",
    resumo: "Resumo do episódio",
    status: "AINDA_NAO_COMECEI",
    avaliacao: 4.5
  }];
  downloadJSON("modelo_episodios.json", model);
};

btnExportEps.onclick = ()=>{
  if(!currentMidia) return;
  downloadJSON(`episodios_${currentMidia.nome||"serie"}.json`, episodios);
};

fileImportEps.addEventListener("change", async ()=>{
  if(!currentMidia) return;
  const file = fileImportEps.files?.[0];
  if(!file) return;

  try{
    const text = await file.text();
    const arr = JSON.parse(text);
    if(!Array.isArray(arr)) throw new Error("JSON deve ser uma lista de episódios.");

    // Dedup: temporada+numero para essa midia
    const existing = new Set(episodios.map(ep=>`${ep.temporada}-${ep.numero}`));
    const toInsert = [];

    for(const it of arr){
      const temporada = Number(it.temporada);
      const numero = Number(it.numero);
      if(!temporada || !numero) continue;
      const key = `${temporada}-${numero}`;
      if(existing.has(key)) continue;

      toInsert.push({
        midia_id: currentMidia.id,
        temporada,
        numero,
        titulo: (it.titulo||"").trim() || null,
        resumo: (it.resumo||"").trim() || null,
        status: it.status || "AINDA_NAO_COMECEI",
        avaliacao: sanitizeRating(it.avaliacao),
      });
    }

    if(!toInsert.length){
      showToast("Nenhum episódio novo para inserir.", "ok");
      return;
    }

    const { error } = await db.from("episodios").insert(toInsert);
    if(error){
      console.error(error);
      showToast("Erro ao importar episódios.", "err");
      return;
    }

    showToast(`Importados: ${toInsert.length} ✅`, "ok");
    await loadEpisodios(currentMidia.id);
  }catch(err){
    console.error(err);
    showToast("Falha ao importar JSON de episódios.", "err");
  }finally{
    fileImportEps.value = "";
  }
});

/* =========================
   IMPORT/EXPORT MÍDIAS
   ========================= */
btnModelMidias.onclick = ()=>{
  const model = [{
    nome: "Matrix",
    tipo: "FILME",
    status: "ASSISTIDOS",
    data_lancamento: "1999-03-31",
    ano: 1999,
    streaming: "Max",
    genero: "Ação/Ficção",
    diretor: "Lana Wachowski, Lilly Wachowski",
    franquia: "Matrix",
    imagem_url: "https://...",
    link: "https://...",
    links: "https://...\nhttps://...",
    avaliacao: 4.5,
    sinopse: "..."
  }];
  downloadJSON("modelo_midias.json", model);
};

btnExportMidias.onclick = ()=>{
  downloadJSON("midias_export.json", midias);
};

fileImportMidias.addEventListener("change", async ()=>{
  const file = fileImportMidias.files?.[0];
  if(!file) return;

  try{
    const text = await file.text();
    const arr = JSON.parse(text);
    if(!Array.isArray(arr)) throw new Error("JSON deve ser uma lista de mídias.");

    // Dedup por nome+tipo (simples)
    const existing = new Set(midias.map(m=>`${(m.nome||"").toLowerCase()}::${m.tipo}`));
    const toInsert = [];

    for(const it of arr){
      const nome = String(it.nome||"").trim();
      const tipo = it.tipo || "FILME";
      if(!nome) continue;

      const key = `${nome.toLowerCase()}::${tipo}`;
      if(existing.has(key)) continue;

      // auto ano por data
      let ano = it.ano ?? null;
      const dt = it.data_lancamento || null;
      if(dt && !ano) ano = Number(String(dt).slice(0,4)) || null;

      toInsert.push({
        nome,
        tipo,
        status: it.status || "ASSISTINDO",
        data_lancamento: dt,
        ano: ano ? Number(ano) : null,
        streaming: it.streaming || null,
        genero: it.genero || null,
        diretor: it.diretor || null,
        franquia: it.franquia || null,
        imagem_url: it.imagem_url || null,
        link: it.link || null,
        links: it.links || null,
        avaliacao: sanitizeRating(it.avaliacao),
        sinopse: it.sinopse || null,

        tmdb_id: it.tmdb_id || null,
        imdb_id: it.imdb_id || null,
        cast_data: it.cast_data || null,
        networks: it.networks || null,
        keywords: it.keywords || null,
      });
    }

    if(!toInsert.length){
      showToast("Nenhuma mídia nova para inserir.", "ok");
      return;
    }

    const { error } = await db.from("midias").insert(toInsert);
    if(error){
      console.error(error);
      showToast("Erro ao importar mídias.", "err");
      return;
    }

    showToast(`Importadas: ${toInsert.length} ✅`, "ok");
    await loadMidias();
  }catch(err){
    console.error(err);
    showToast("Falha ao importar JSON de mídias.", "err");
  }finally{
    fileImportMidias.value = "";
  }
});

/* =========================
   TMDb (MANAGE)
   ========================= */
async function tmdbFetch(path){
  const url = `https://api.themoviedb.org/3${path}`;
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${TMDB_BEARER}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  if(!res.ok){
    throw new Error(`TMDb ${res.status}`);
  }
  return res.json();
}

function showTmdbResults(items, type){
  tmdbResults.innerHTML = "";
  tmdbResults.classList.remove("hidden");

  if(!items.length){
    tmdbResults.innerHTML = `<div class="sub" style="padding:10px 12px">Nada encontrado.</div>`;
    return;
  }

  items.slice(0,12).forEach(item=>{
    const name = type==="movie" ? item.title : item.name;
    const date = type==="movie" ? item.release_date : item.first_air_date;
    const year = (date||"").slice(0,4) || "-";
    const poster = item.poster_path ? (TMDB_IMG + item.poster_path) : safePoster("");

    const row = document.createElement("div");
    row.className = "tmdb-item";
    row.innerHTML = `
      <div class="tmdb-thumb"><img src="${poster}" alt=""></div>
      <div style="min-width:0;flex:1">
        <div class="tmdb-name">${escapeHtml(name||"-")}</div>
        <div class="tmdb-meta">${year} • ${escapeHtml((item.overview||"").slice(0,90))}${(item.overview||"").length>90?"...":""}</div>
      </div>
      <button class="btn secondary">Usar</button>
    `;
    row.querySelector("button").onclick = async (e)=>{
      e.stopPropagation();
      await applyTmdbItem(type, item.id);
    };
    tmdbResults.appendChild(row);
  });
}

function pickTopCast(credits){
  const cast = (credits?.cast || []).slice(0, 12).map(c=>({
    id:c.id, name:c.name, character:c.character, order:c.order, profile_path:c.profile_path
  }));
  return cast;
}

function pickKeywords(type, kw){
  const arr = type==="movie" ? (kw?.keywords||[]) : (kw?.results||[]);
  return arr.slice(0, 30).map(k=>({ id:k.id, name:k.name }));
}

async function applyTmdbItem(type, id){
  try{
    showToast("Buscando TMDb...","ok");

    if(type==="movie"){
      const d = await tmdbFetch(`/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=credits,keywords,external_ids`);
      mTipo.value = "FILME";
      mTmdbId.value = d.id || "";
      mImdbId.value = d.external_ids?.imdb_id || "";
      mNome.value = d.title || mNome.value;
      mSinopse.value = d.overview || mSinopse.value;
      mReleaseDate.value = d.release_date || "";
      if(d.release_date) mAno.value = String(d.release_date).slice(0,4);
      mImagemUrl.value = d.poster_path ? (TMDB_IMG + d.poster_path) : mImagemUrl.value;
      mPosterPreview.src = safePoster(mImagemUrl.value);
      mCastData.value = toJsonString(pickTopCast(d.credits));
      mKeywords.value = toJsonString(pickKeywords("movie", d.keywords));
      showToast("Preenchido pelo TMDb ✅","ok");
      return;
    }

    const d = await tmdbFetch(`/tv/${id}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=credits,keywords,external_ids`);
    mTipo.value = "SERIE";
    mTmdbId.value = d.id || "";
    mImdbId.value = d.external_ids?.imdb_id || "";
    mNome.value = d.name || mNome.value;
    mSinopse.value = d.overview || mSinopse.value;
    mReleaseDate.value = d.first_air_date || "";
    if(d.first_air_date) mAno.value = String(d.first_air_date).slice(0,4);
    mImagemUrl.value = d.poster_path ? (TMDB_IMG + d.poster_path) : mImagemUrl.value;
    mPosterPreview.src = safePoster(mImagemUrl.value);
    mCastData.value = toJsonString(pickTopCast(d.credits));
    mKeywords.value = toJsonString(pickKeywords("tv", d.keywords));
    mNetworks.value = toJsonString(d.networks || []);
    showToast("Preenchido pelo TMDb ✅","ok");
  }catch(err){
    console.error(err);
    showToast("Erro no TMDb (veja console).","err");
  }
}

btnTmdbSearch.onclick = async ()=>{
  const q = tmdbQuery.value.trim();
  if(!q){ showToast("Digite algo para buscar.","err"); return; }
  try{
    const type = tmdbType.value;
    const data = await tmdbFetch(`/search/${type}?api_key=${TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(q)}&include_adult=false&page=1`);
    showTmdbResults(data.results||[], type);
  }catch(err){
    console.error(err);
    showToast("Falha ao buscar no TMDb.","err");
  }
};
btnTmdbClear.onclick = ()=>{
  tmdbQuery.value = "";
  tmdbResults.classList.add("hidden");
  tmdbResults.innerHTML = "";
};

/* =========================
   EVENTOS
   ========================= */
bindStars(starsMidia, mAvaliacao);
bindStars(starsEp, epRating);

btnReload.onclick = ()=>loadMidias();

btnManage.onclick = ()=>{
  setManageVisible(true);
  resetManageForm();
  renderManageGrid();
};

btnBack.onclick = ()=>{
  setManageVisible(false);
  renderHighlights();
  renderMainGrid();
};

btnNew.onclick = ()=>{
  setManageVisible(true);
  resetManageForm();
  showToast("Novo cadastro.", "ok");
};

tabs.forEach(t=>{
  t.onclick = ()=>{
    tabs.forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    tabStatus = t.dataset.tab;
    renderMainGrid();
  };
});

[fSearch,fMinRating,fTipo,fStreaming,fAno,fGenero,fDiretor,fFranquia].forEach(x=>{
  x.addEventListener("input", ()=>renderMainGrid());
  x.addEventListener("change", ()=>renderMainGrid());
});

btnClearFilters.onclick = ()=>{
  fSearch.value = "";
  fMinRating.value = "";
  fTipo.value = "";
  fStreaming.value = "";
  fAno.value = "";
  fGenero.value = "";
  fDiretor.value = "";
  fFranquia.value = "";
  franchiseFilter = "";
  renderMainGrid();
  showToast("Filtros limpos.","ok");
};

mImagemUrl.addEventListener("input", ()=>{
  mPosterPreview.src = safePoster(mImagemUrl.value);
});
mReleaseDate.addEventListener("change", ()=>{
  if(mReleaseDate.value){
    mAno.value = String(mReleaseDate.value).slice(0,4);
  }
});

btnResetManage.onclick = resetManageForm;

btnDeleteManage.onclick = async ()=>{
  if(!mId.value){
    showToast("Selecione um item para excluir.", "err");
    return;
  }
  if(!confirm("Excluir esta mídia?")) return;

  const { error } = await db.from("midias").delete().eq("id", mId.value);
  if(error){
    console.error(error);
    showToast("Erro ao excluir.", "err");
    return;
  }
  showToast("Excluído ✅","ok");
  resetManageForm();
  await loadMidias();
};

formManage.addEventListener("submit", async (e)=>{
  e.preventDefault();
  try{
    const payload = buildMidiaPayloadFromForm();
    if(!payload.nome){
      showToast("Nome é obrigatório.", "err");
      return;
    }

    if(mId.value){
      const { error } = await db.from("midias").update(payload).eq("id", mId.value);
      if(error) throw error;
      showToast("Atualizado ✅","ok");
    }else{
      const { error } = await db.from("midias").insert(payload);
      if(error) throw error;
      showToast("Salvo ✅","ok");
    }

    resetManageForm();
    await loadMidias();
  }catch(err){
    console.error(err);
    showToast("Erro ao salvar (veja console).", "err");
  }
});

/* =========================
   INIT
   ========================= */
(async ()=>{
  await loadMidias();
  resetManageForm();
  setManageVisible(false);
})();
