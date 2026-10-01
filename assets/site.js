/* 공용 헤더·푸터와 각 페이지 화면을 그립니다. 보통은 건드리지 않아도 됩니다. */
(function () {
  const S = window.SEASON, TEAMS = window.TEAMS || [], POT = window.POT || {}, NEWS = window.NEWS || [];
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, "0");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = n => Number(n).toLocaleString("ko-KR", {maximumFractionDigits: 1});
  const money = n => fmt(n) + (POT.unit || "");
  const page = document.body.dataset.page || "home";
  const TM = Object.fromEntries(TEAMS.map(t => [t.id, t]));
  const tName = id => (TM[id] ? TM[id].name : "-");
  const tLabel = id => `<span class="tn">${TM[id] ? `<span class="tdot" style="--tc:${TM[id].color}"></span>` : ""}${esc(tName(id))}</span>`;
  const stOf = r => S.stages[r.stage];

  /* ── 메뉴 (순서 = 메뉴 순서) ── */
  const MENU = [
    {id:"news",      href:"news.html",      label:"뉴스"},
    {id:"intro",     href:"intro.html",     label:"소개"},
    {id:"teams",     href:"teams.html",     label:"팀"},
    {id:"season",    href:"season.html",    label:"시즌"},
    {id:"standings", href:"standings.html", label:"순위"},
    {id:"stages",    href:"stages.html",    label:"무대"},
    {id:"pot",       href:"pot.html",       label:"프론티어 팟"},
    {id:"fia",       href:"fia.html",       label:"H-FIA"}
  ];

  /* ── 순위 계산 (라운드의 finish/dnf에서 자동) ── */
  const rows = TEAMS.map(t => ({team: t, pts: 0, wins: 0, fin: 0, dnf: 0, pos: []}));
  const rowOf = Object.fromEntries(rows.map(r => [r.team.id, r]));
  S.rounds.forEach((r, ri) => {
    (r.finish || []).forEach((id, i) => {
      const row = rowOf[id]; if (!row) return;
      row.pts += (S.points[i] || 0); row.fin++; if (i === 0) row.wins++; row.pos[ri] = i + 1;
    });
    (r.dnf || []).forEach(id => { const row = rowOf[id]; if (row) { row.dnf++; row.pos[ri] = "DNF"; } });
  });
  const ranked = rows.slice().sort((a, b) => b.pts - a.pts || b.wins - a.wins || b.fin - a.fin);
  const rankOf = id => ranked.findIndex(r => r.team.id === id) + 1;

  /* ── 헤더 ── */
  const links = MENU.map(m => `<a href="${m.href}"${m.id === page ? ' class="on" aria-current="page"' : ""}>${m.label}</a>`).join("");
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
  const CT = window.CONTACT || {};
  const helpUrl = CT.x ? "https://x.com/" + String(CT.x).replace(/^@/, "") : "";
  const footerEl = $("site-footer");
  if (footerEl) footerEl.outerHTML = `
  <footer>
    <div class="wrap">
      <a href="index.html" class="logo">FRONTIER <b>TT</b></a>
      <div class="links">${MENU.map(m => `<a href="${m.href}">${m.label}</a>`).join("")}</div>
      <div class="legal">
        <span>© HYPER-FRONTIER INTERNATIONAL ASSOCIATION<br>
        본 사이트는 창작 세계관을 위한 가상의 공식 사이트이며, 등장하는 단체·인물·사건은 실제와 관련이 없습니다.</span>
        ${helpUrl ? `<a class="help" href="${helpUrl}" target="_blank" rel="noopener">고객센터</a>` : ""}
      </div>
    </div>
  </footer>`;

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
    window.addEventListener("resize", () => { if (innerWidth > 1100) setMenu(false); });
  }

  /* ── 히어로 (홈) ── */
  const nextIdx = S.rounds.findIndex(r => r.status === "next");
  const nextR = S.rounds[nextIdx];
  if ($("heroStage") && nextR && stOf(nextR)) {
    const st = stOf(nextR);
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

  /* ── 뉴스: 홈 카드 + 펼침 목록 ── */
  if ($("newsCards")) $("newsCards").innerHTML = NEWS.slice(0, 3).map((n, i) =>
    `<a href="news.html#n${i}"><span class="cat">${esc(n.cat)}</span><h3>${esc(n.title)}</h3><time>${esc(n.date)}</time></a>`).join("");
  if ($("newsList")) {
    $("newsList").innerHTML = NEWS.map((n, i) => {
      const body = n.html ? n.html : (n.body || []).map(p => `<p>${esc(p)}</p>`).join("");
      const link = n.link ? `<a class="btn" href="${esc(n.link.url)}" target="_blank" rel="noopener">${esc(n.link.label || "원문 보기")}</a>` : "";
      return `<div class="acc-item" id="n${i}">
        <button class="acc-btn" aria-expanded="false" aria-controls="np${i}">
          <span class="m"><span class="cat">${esc(n.cat)}</span><time>${esc(n.date)}</time></span>
          <span class="acc-title">${esc(n.title)}</span>
          <span class="acc-chev" aria-hidden="true"></span>
        </button>
        <div class="acc-panel" id="np${i}" role="region"><div class="acc-inner"><div class="acc-body">${body}${link}</div></div></div>
      </div>`;
    }).join("");
    const setOpen = (item, open) => { item.classList.toggle("open", open); item.querySelector(".acc-btn").setAttribute("aria-expanded", open); };
    $("newsList").addEventListener("click", e => {
      const btn = e.target.closest(".acc-btn"); if (!btn) return;
      const item = btn.parentElement, willOpen = !item.classList.contains("open");
      setOpen(item, willOpen);
      try { history.replaceState(null, "", willOpen ? "#" + item.id : location.pathname + location.search); } catch (_) {}
    });
    const fromHash = () => {
      const m = location.hash.match(/^#n(\d+)$/), item = m && $("n" + m[1]);
      if (item) { setOpen(item, true); setTimeout(() => item.scrollIntoView({block: "start"}), 60); }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
  }

  /* ── 시즌 스트립 (홈) ── */
  if ($("strip")) $("strip").innerHTML = S.rounds.map((r, i) => {
    const st = stOf(r);
    const name = r.status === "wait" ? "추첨 대기" : (st ? st.name : "미정");
    return `<div class="${r.status}"><span class="r">R${pad(i + 1)}</span><span class="n">${esc(name)}</span></div>`;
  }).join("");

  /* ── 캘린더 ── */
  const TAG = {done:["완료","done"], next:["다음 라운드","next"], wait:["추첨 대기","wait"], final:["파이널","final"]};
  if ($("seasonTitle")) $("seasonTitle").textContent = S.label;
  if ($("calBody")) $("calBody").innerHTML = S.rounds.map((r, i) => {
    const st = stOf(r), [label, cls] = TAG[r.status] || ["", ""];
    const stageCell = st
      ? `<b>${esc(st.name)}</b><span>${esc(st.type)} ${st.km}km</span>`
      : `<b style="color:var(--muted)">미정</b><span>직전 라운드 우승자가 추첨</span>`;
    const win = r.finish && r.finish.length ? tLabel(r.finish[0]) : "<span style='color:var(--muted)'>—</span>";
    return `<tr class="${r.status === "next" ? "is-next" : ""}">
      <td class="num">R${pad(i + 1)}</td><td class="stage">${stageCell}</td>
      <td><span class="tag ${cls}">${label}</span></td><td class="win${r.finish && r.finish.length ? "" : " empty"}">${win}</td></tr>`;
  }).join("");

  /* ── 순위 ── */
  const pairNames = t => t.members.map(m => {
    const cls = m.role === "rider" ? "r" : "o";
    return m.soon ? `<span class="pn ${cls} soon">미공개</span>` : `<span class="pn ${cls}">${esc(m.kr || m.en)}</span>`;
  }).join('<span class="sep"> / </span>');
  const sb = $("standBody");
  if (sb) {
    const lim = parseInt(sb.dataset.limit) || ranked.length;
    const full = !sb.dataset.limit;
    sb.innerHTML = ranked.slice(0, lim).map((r, i) => `<tr>
      <td class="num">${i + 1}</td>
      <td class="pair-cell"><b>${tLabel(r.team.id)}</b><br>${pairNames(r.team)}</td>
      ${full ? `<td class="r pts">${r.wins}</td>` : ""}
      <td class="r pts">${r.pts}</td></tr>`).join("");
  }
  if ($("matrixHead")) {
    const doneIdx = S.rounds.map((r, i) => r.finish ? i : -1).filter(i => i >= 0);
    $("matrixHead").innerHTML = `<tr><th>팀</th>${doneIdx.map(i => `<th>R${pad(i + 1)}</th>`).join("")}</tr>`;
    $("matrixBody").innerHTML = ranked.map(r => `<tr><td class="pair-cell"><b style="font-size:14px">${tLabel(r.team.id)}</b></td>${
      doneIdx.map(i => {
        const p = r.pos[i];
        if (p === undefined) return `<td class="na">–</td>`;
        if (p === "DNF") return `<td class="dnf">DNF</td>`;
        return `<td class="${p <= 3 ? "p" + p : "pd"}">${p}</td>`;
      }).join("")}</tr>`).join("");
  }

  /* ── 무대 카드 + 상세 모달 ── */
  const phHtml = (img, label, no, text) =>
    `<div class="ph"><span class="no">${esc(no)}</span><span class="tx">${esc(text)}</span>${
      img ? `<img src="${esc(img)}" alt="${esc(label)}" loading="lazy" onerror="this.remove()">` : ""}</div>`;
  const stageKeys = Object.keys(S.stages);
  if ($("stageGrid")) {
    $("stageGrid").innerHTML = stageKeys.map((k, i) => {
      const st = S.stages[k];
      return `<button class="scard${st.final ? " fin" : ""}" data-k="${k}" aria-haspopup="dialog">
        ${phHtml(st.img, st.name, pad(i + 1), "NO IMAGE")}
        <span class="bd">
          <span class="km">${st.km}<small>km</small></span>
          <span class="nm">${esc(st.name)}</span>
          <span class="ty">${esc(st.type)}</span>
          <span class="ds">${esc(st.desc)}</span>
          <span class="go">자세히 보기 →</span>
        </span></button>`;
    }).join("");

    const modal = document.createElement("div");
    modal.className = "modal"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-labelledby", "mTitle");
    modal.innerHTML = `<div class="back"></div><div class="dlg"><button class="x" aria-label="닫기">✕</button><div id="mBody"></div></div>`;
    document.body.appendChild(modal);
    let lastFocus = null;
    const close = () => { modal.classList.remove("on"); document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); };
    const open = (k, trigger) => {
      const st = S.stages[k], i = stageKeys.indexOf(k);
      const hist = S.rounds.map((r, ri) => ({r, ri})).filter(x => x.r.stage === k);
      const histHtml = hist.length ? hist.map(({r, ri}) => {
        const w = r.finish && r.finish.length ? `우승 ${tLabel(r.finish[0])}` : (r.status === "next" ? "개최 예정 (다음 라운드)" : "개최 예정");
        return `<li><b>R${pad(ri + 1)}</b>${w}</li>`;
      }).join("") : `<li>아직 개최되지 않았습니다. 넥스트 드로우 추첨으로 결정됩니다.</li>`;
      $("mBody").innerHTML = `
        ${phHtml(st.img, st.name, pad(i + 1), "NO IMAGE")}
        <div class="in">
          <div class="ty">STAGE ${pad(i + 1)} · ${esc(st.type)}</div>
          <h2 class="tt" id="mTitle">${esc(st.name)}</h2>
          ${(st.long || [st.desc]).map(p => `<p>${esc(p)}</p>`).join("")}
          <dl class="facts">
            <div><dt>유형</dt><dd>${esc(st.type)}</dd></div>
            <div><dt>거리</dt><dd>${st.km} km</dd></div>
            <div><dt>핵심 변수</dt><dd>${esc(st.risk || "-")}</dd></div>
          </dl>
          <div class="hist"><h4>개최 이력</h4><ul>${histHtml}</ul></div>
        </div>`;
      lastFocus = trigger;
      modal.classList.add("on"); document.body.style.overflow = "hidden";
      modal.querySelector(".dlg").scrollTop = 0;
      modal.querySelector(".x").focus();
    };
    $("stageGrid").addEventListener("click", e => { const c = e.target.closest(".scard"); if (c) open(c.dataset.k, c); });
    modal.querySelector(".x").addEventListener("click", close);
    modal.querySelector(".back").addEventListener("click", close);
    document.addEventListener("keydown", e => {
      if (!modal.classList.contains("on")) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") { e.preventDefault(); modal.querySelector(".x").focus(); }
    });
  }

  /* ── 팀 ── */
  if ($("teamTabs")) {
    const memberCard = (m, t) => {
      const isR = m.role === "rider", role = isR ? "RIDER · 라이더" : "OPERATOR · 오퍼레이터", rc = isR ? "r" : "o";
      if (m.soon) return `<article class="mcard soon" style="--tc:${t.color}">
        <div class="pt"><span class="sn">COMING<br>SOON</span></div>
        <div class="inf"><div class="role ${rc}">${role}</div><div class="mn">공개 예정</div></div></article>`;
      const sub = [m.kr ? m.en : "", m.alt].filter(Boolean).join(" · ");
      const kv = [];
      if (m.age) kv.push(["나이", m.age + "세"]);
      if (m.sex) kv.push(["성별", m.sex]);
      if (m.nation) kv.push(["국적", m.nation]);
      return `<article class="mcard" style="--tc:${t.color}">
        <div class="pt"><span class="ini">${esc((m.en || m.kr || "?")[0])}</span>${m.img ? `<img src="${esc(m.img)}" alt="${esc(m.kr || m.en)}" loading="lazy" onerror="this.remove()">` : ""}</div>
        <div class="inf">
          <div class="role ${rc}">${role}</div>
          <div class="mn">${esc(m.kr || m.en)}</div>
          ${sub ? `<div class="ms">${esc(sub)}</div>` : ""}
          <dl class="mkv">${kv.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
        </div></article>`;
    };
    const panel = t => {
      const row = rowOf[t.id], started = row.fin + row.dnf > 0;
      return `<div class="thead" style="--tc:${t.color}">
          <div class="cn">${esc(t.field)}</div>
          <h2>${esc(t.name)}</h2>
          <div class="kr">${esc(t.kr)}${t.alt ? " " + esc(t.alt) : ""}</div>
          <blockquote class="slogan">${esc(t.slogan)}</blockquote>
          <div class="tintro">${(t.intro || []).map(p => `<p>${esc(p)}</p>`).join("")}</div>
          <div class="rec">${started
            ? `<span>순위 <b>${rankOf(t.id)}위</b></span><span>승점 <b>${row.pts}</b></span><span>우승 <b>${row.wins}회</b></span><span>완주 <b>${row.fin}회</b></span>`
            : `<span>시즌 참가 준비 중</span>`}</div>
        </div>
        <div class="members">${t.members.map(m => memberCard(m, t)).join("")}</div>`;
    };
    const tabs = $("teamTabs");
    tabs.innerHTML = TEAMS.map(t => `<button class="tab" role="tab" data-id="${t.id}" style="--tc:${t.color}" aria-selected="false"><i></i>${esc(t.name)}</button>`).join("");
    const select = (id, push) => {
      const t = TM[id] || TEAMS[0];
      tabs.querySelectorAll(".tab").forEach(b => b.setAttribute("aria-selected", b.dataset.id === t.id));
      $("teamPanel").innerHTML = panel(t);
      if (push) { try { history.replaceState(null, "", "#" + t.id); } catch (_) {} }
    };
    tabs.addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) select(b.dataset.id, true); });
    select(location.hash.slice(1));
    window.addEventListener("hashchange", () => select(location.hash.slice(1)));
  }

  /* ── 프론티어 팟 ── */
  if ($("potStats")) {
    const done = S.rounds.map((r, i) => ({r, i})).filter(x => x.r.pot);
    const total = done.reduce((a, x) => a + x.r.pot.pool, 0);
    const topMax = Math.max(...done.map(x => x.r.pot.top));
    const topRound = done.find(x => x.r.pot.top === topMax);
    const avgHit = Math.round(done.reduce((a, x) => a + x.r.pot.hit, 0) / done.length);
    const carry = POT.carry || {value: 0, note: ""};
    const rl = x => `R${pad(x.i + 1)} ${stOf(x.r) ? stOf(x.r).name : ""}`;

    $("potStats").innerHTML = `
      <div class="stat"><small>누적 베팅 총액</small><b>${money(total)}</b><span>${done.length}개 라운드 합계</span></div>
      <div class="stat"><small>역대 최대 당첨금</small><b>${money(topMax)}</b><span>${esc(rl(topRound))}</span></div>
      <div class="stat hot"><small>이번 라운드 이월 상금</small><b>${money(carry.value)}</b><span>${esc(carry.note)}</span></div>
      <div class="stat"><small>평균 메인 예측 적중률</small><b>${avgHit}%</b><span>우승 팀을 맞힌 비율</span></div>`;

    const maxPool = Math.max(...done.map(x => x.r.pot.pool), carry.value);
    $("potPool").innerHTML = done.map(x => `<div class="vb"><div class="track"><div class="bar" style="height:${x.r.pot.pool / maxPool * 100}%"><em>${fmt(x.r.pot.pool)}</em></div></div><span class="lb">R${pad(x.i + 1)}</span></div>`).join("")
      + (nextIdx >= 0 ? `<div class="vb carry"><div class="track"><div class="bar" style="height:${carry.value / maxPool * 100}%"><em>${fmt(carry.value)}</em></div></div><span class="lb">R${pad(nextIdx + 1)} 이월</span></div>` : "");

    $("potTop").innerHTML = done.map(x => `<div class="hb${x.r.pot.top === topMax ? " max" : ""}">
      <span class="l"><b>R${pad(x.i + 1)}</b>${esc(stOf(x.r) ? stOf(x.r).name : "")}</span>
      <span class="t"><span class="f" style="display:block;width:${x.r.pot.top / topMax * 100}%"></span></span>
      <span class="v">${fmt(x.r.pot.top)}</span></div>`).join("");

    $("potSurv").innerHTML = done.map(x => {
      const r = x.r, fin = (r.finish || []).length, no = (r.dnf || []).length;
      return `<div class="sv"><span class="l">R${pad(x.i + 1)}</span>
        <span class="sq">${"<i></i>".repeat(fin)}${'<i class="no"></i>'.repeat(no)}</span>
        <span class="tx">${fin}/${fin + no} 완주 · 최초 정지 ${r.firstStop ? esc(tName(r.firstStop)) : "없음"}</span></div>`;
    }).join("");

    if (nextR) $("oddsTitle").textContent = `R${pad(nextIdx + 1)} ${stOf(nextR) ? stOf(nextR).name : ""} 우승 배당`;
    const odds = POT.odds || [], inv = odds.reduce((a, o) => a + 1 / o.odds, 0);
    $("potOdds").innerHTML = odds.map(o => {
      const p = (1 / o.odds) / inv * 100;
      return `<div class="od" style="--tc:${TM[o.team] ? TM[o.team].color : "#8a95a1"}"><span class="l">${tLabel(o.team)}</span>
        <span class="t"><span class="f" style="display:block;width:${p}%"></span></span>
        <span class="v">×${o.odds.toFixed(1)}<small>${Math.round(p)}%</small></span></div>`;
    }).join("");

    $("potTable").closest(".tbl").classList.add("rcards");
    $("potTable").innerHTML = done.map(x => {
      const r = x.r, fin = (r.finish || []).length, n = fin + (r.dnf || []).length;
      return `<tr><td class="num">R${pad(x.i + 1)}</td>
        <td class="stage"><b>${esc(stOf(r).name)}</b><span>${esc(stOf(r).type)}</span></td>
        <td data-l="우승">${tLabel(r.finish[0])}</td><td data-l="최초 정지">${r.firstStop ? tLabel(r.firstStop) : "<span style='color:var(--muted)'>없음</span>"}</td>
        <td class="pts" data-l="완주">${fin}/${n}</td><td class="pts" data-l="베팅 총액">${money(r.pot.pool)}</td><td class="pts" data-l="최대 당첨금">${money(r.pot.top)}</td><td class="pts" data-l="적중률">${r.pot.hit}%</td></tr>`;
    }).join("");
  }
})();
