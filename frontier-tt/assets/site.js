/* 공용 헤더·푸터와 각 페이지 화면을 그립니다. 보통은 건드리지 않아도 됩니다. */
(function () {
  const S = window.SEASON, NEWS = window.NEWS || [];
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, "0");
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const page = document.body.dataset.page || "home";

  /* ── 메뉴 목록 (순서 = 메뉴 순서) ── */
  const MENU = [
    {id:"news",   href:"news.html",   label:"뉴스"},
    {id:"season", href:"season.html", label:"시즌"},
    {id:"format", href:"format.html", label:"경기 방식"},
    {id:"stages", href:"stages.html", label:"무대"},
    {id:"pot",    href:"pot.html",    label:"프론티어 팟"},
    {id:"fia",    href:"fia.html",    label:"H-FIA"}
  ];

  /* ── 헤더 ── */
  const links = MENU.map(m =>
    `<a href="${m.href}"${m.id === page ? ' class="on" aria-current="page"' : ""}>${m.label}</a>`).join("");
  const headerEl = $("site-header");
  if (headerEl) headerEl.outerHTML = `
  <header class="top" id="siteTop">
    <div class="wrap">
      <a href="index.html" class="logo">FRONTIER <b>TT</b></a>
      <nav class="nav" id="nav" aria-label="주 메뉴">
        <div class="drawer-head">
          <a href="index.html" class="logo" style="padding:0;border:0;font-size:18px">FRONTIER <b>TT</b></a>
          <button class="burger" id="closeNav" aria-label="메뉴 닫기" style="margin:0">✕</button>
        </div>
        <a href="index.html" class="home-m${page === "home" ? " on" : ""}">홈</a>
        ${links}
        <a href="#" class="live-m">● 8K VR 중계 보기</a>
      </nav>
      <a href="#" class="live"><i></i>8K VR 중계</a>
      <button class="burger" id="burger" aria-label="메뉴 열기" aria-expanded="false" aria-controls="nav">☰</button>
      <div class="scrim" id="scrim"></div>
    </div>
  </header>`;

  /* ── 이전/다음 페이지 + 푸터 ── */
  const idx = MENU.findIndex(m => m.id === page);
  const pagerEl = $("pager");
  if (pagerEl && idx > -1) {
    const prev = idx > 0 ? MENU[idx - 1] : {href:"index.html", label:"홈"};
    const next = MENU[idx + 1];
    pagerEl.outerHTML = `<div class="wrap"><div class="pager">
      <a href="${prev.href}"><small>이전</small>${prev.label}</a>
      ${next ? `<a href="${next.href}" style="text-align:right"><small>다음</small>${next.label}</a>` : "<span></span>"}
    </div></div>`;
  }
  const footerEl = $("site-footer");
  if (footerEl) footerEl.outerHTML = `
  <footer>
    <div class="wrap">
      <a href="index.html" class="logo">FRONTIER <b>TT</b></a>
      <div class="links">${MENU.map(m => `<a href="${m.href}">${m.label}</a>`).join("")}</div>
      <div class="legal">© HYPER-FRONTIER INTERNATIONAL ASSOCIATION<br>
        본 사이트는 창작 세계관을 위한 가상의 공식 사이트이며, 등장하는 단체·인물·사건은 실제와 관련이 없습니다.</div>
    </div>
  </footer>`;

  /* ── 히어로 (홈) ── */
  const nextIdx = S.rounds.findIndex(r => r.status === "next");
  const nextR = S.rounds[nextIdx];
  if ($("heroStage") && nextR && S.stages[nextR.stage]) {
    const st = S.stages[nextR.stage];
    $("heroRound").textContent = `라운드 ${pad(nextIdx + 1)} / ${pad(S.rounds.length)}`;
    $("heroStage").textContent = st.name;
    $("heroSub").textContent = `${st.type} ${st.km}km 단판 스프린트. ${st.desc}`;
    $("heroKm").textContent = `${st.km} km`;
  }
  if ($("cd-d")) {
    const target = new Date(S.nextRaceStart).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (isNaN(target) || diff <= 0) {
        ["d","h","m","s"].forEach(k => $("cd-" + k).textContent = "00");
        $("countNote").textContent = "레이스 진행 중이거나 종료되었습니다";
        return;
      }
      const s = Math.floor(diff / 1000);
      $("cd-d").textContent = pad(Math.floor(s / 86400));
      $("cd-h").textContent = pad(Math.floor(s % 86400 / 3600));
      $("cd-m").textContent = pad(Math.floor(s % 3600 / 60));
      $("cd-s").textContent = pad(s % 60);
      setTimeout(tick, 1000);
    };
    tick();
  }

  /* ── 뉴스 ── */
  if ($("newsCards")) $("newsCards").innerHTML = NEWS.slice(0, 3).map(n =>
    `<a href="${esc(n.url)}"><span class="cat">${esc(n.cat)}</span><h3>${esc(n.title)}</h3><time>${esc(n.date)}</time></a>`).join("");
  if ($("newsList")) $("newsList").innerHTML = NEWS.map(n =>
    `<a href="${esc(n.url)}"><div class="meta"><span class="cat">${esc(n.cat)}</span><time>${esc(n.date)}</time></div>
     <div><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p></div></a>`).join("");

  /* ── 시즌 스트립 (홈) ── */
  if ($("strip")) $("strip").innerHTML = S.rounds.map((r, i) => {
    const st = S.stages[r.stage];
    const name = r.status === "wait" ? "추첨 대기" : (st ? st.name : "미정");
    return `<div class="${r.status}"><span class="r">R${pad(i + 1)}</span><span class="n">${esc(name)}</span></div>`;
  }).join("");

  /* ── 캘린더 ── */
  const TAG = {done:["완료","done"], next:["다음 라운드","next"], wait:["추첨 대기","wait"], final:["파이널","final"]};
  if ($("seasonTitle")) $("seasonTitle").textContent = S.label;
  if ($("calBody")) $("calBody").innerHTML = S.rounds.map((r, i) => {
    const st = S.stages[r.stage];
    const [label, cls] = TAG[r.status] || ["", ""];
    const stageCell = st
      ? `<b>${esc(st.name)}</b><span>${esc(st.type)} ${st.km}km</span>`
      : `<b style="color:var(--muted)">미정</b><span>직전 라운드 우승자가 추첨</span>`;
    return `<tr class="${r.status === "next" ? "is-next" : ""}">
      <td class="num">R${pad(i + 1)}</td>
      <td class="stage">${stageCell}</td>
      <td><span class="tag ${cls}">${label}</span></td>
      <td class="win">${r.winner ? esc(r.winner) : "<span style='color:var(--muted)'>—</span>"}</td>
    </tr>`;
  }).join("");

  /* ── 순위 (data-limit="3"이면 상위 3팀만) ── */
  const sb = $("standBody");
  if (sb) {
    const lim = parseInt(sb.dataset.limit) || S.standings.length;
    sb.innerHTML = S.standings.slice(0, lim).map((t, i) => `<tr>
      <td class="num">${i + 1}</td>
      <td class="pair-cell"><b style="color:var(--white)">${esc(t.team)}</b><br>
        <span class="r">${esc(t.rider)}</span> / <span class="o">${esc(t.operator)}</span></td>
      <td class="pts">${t.pts}</td></tr>`).join("");
  }

  /* ── 무대 ── */
  if ($("stageGrid")) $("stageGrid").innerHTML = Object.values(S.stages).map(st => `
    <article class="${st.final ? "fin" : ""}">
      <div class="km">${st.km}<small>km</small></div>
      <h3>${esc(st.name)}</h3>
      <div class="ty">${esc(st.type)}</div>
      <p>${esc(st.desc)}</p>
    </article>`).join("");

  /* ── 사이드바 ── */
  const siteTop = $("siteTop"), burger = $("burger");
  if (siteTop && burger) {
    const setMenu = open => {
      siteTop.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => setMenu(true));
    $("closeNav").addEventListener("click", () => setMenu(false));
    $("scrim").addEventListener("click", () => setMenu(false));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", () => { if (innerWidth > 980) setMenu(false); });
  }
})();
