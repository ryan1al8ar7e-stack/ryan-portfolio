(() => {
  const S = window.SITE;
  const M = "media/";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const WIDE = new Set(["ai/ai-01", "ai/ai-02", "ai/ai-05", "ai/ai-09", "hiraa/hiraa-01"]);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const ICON = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  };

  /* ---------- تواصل ---------- */
  const wa = `https://wa.me/${S.contact.whatsapp}`;
  $("#heroWa").href = $("#navWa").href = wa;
  $("#contactLinks").innerHTML = `
    <a class="c-link main" href="${wa}" target="_blank" rel="noopener"><small>أسرع طريقة</small><b>راسلني واتساب</b></a>
    <a class="c-link" href="mailto:${S.contact.email}"><small>الإيميل</small><b>${esc(S.contact.email)}</b></a>
    <a class="c-link" href="tel:+${S.contact.whatsapp}"><small>الجوال</small><b>${esc(S.contact.phone)}</b></a>`;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- أرقام الواجهة ---------- */
  const nVideos = S.sections.reduce((a, s) => a + s.videos.length, 0);
  const nCerts = S.featuredCerts.length + S.certs.length;
  $("#facts").innerHTML = [[nVideos, "مقطع منشور"], [S.identities.length, "هويات بصرية"], [nCerts, "شهادة ودورة"]]
    .map(([n, l]) => `<div><dt>${l}</dt><dd data-count="${n}">0</dd></div>`).join("");

  /* ---------- المهارات ---------- */
  const skills = ["موشن جرافيك", "مونتاج الفيديو", "إعلانات بالذكاء الاصطناعي", "التصوير والتغطيات", "الهوية البصرية", "كتابة المحتوى الإعلاني", "العلاقات العامة", "تنظيم الفعاليات", "التسويق الرقمي"];
  const tick = skills.map((s) => `<span>${s}</span>`).join("");
  $("#ticker").innerHTML = tick + tick;
  $("#tools").innerHTML = skills.map((s, i) => `<li class="${i < 3 ? "hot" : ""}">${s}</li>`).join("");

  /* ---------- مشغل الفيديو ---------- */
  const player = $("#player"), video = $("#video");
  let vList = [], vIdx = 0;
  function showVideo() {
    const v = vList[vIdx];
    $("#playerTitle").textContent = v.title;
    $("#playerCount").textContent = `${vIdx + 1} / ${vList.length}`;
    video.poster = M + v.src + ".jpg";
    video.src = M + v.src + ".mp4";
    video.play().catch(() => {});
  }
  $("#vPrev").onclick = () => { vIdx = (vIdx - 1 + vList.length) % vList.length; showVideo(); };
  $("#vNext").onclick = () => { vIdx = (vIdx + 1) % vList.length; showVideo(); };

  /* ---------- عارض الصور ---------- */
  const viewer = $("#viewer"), vImg = $("#viewerImg");
  let iList = [], iIdx = 0;
  function showImage() {
    const it = iList[iIdx];
    vImg.src = M + it.src + ".jpg";
    vImg.alt = it.title;
    $("#viewerTitle").textContent = it.title;
    $("#viewerCount").textContent = iList.length > 1 ? `${iIdx + 1} / ${iList.length}` : "";
    $("#iPrev").hidden = $("#iNext").hidden = iList.length < 2;
    if (iList.length > 1) new Image().src = M + iList[(iIdx + 1) % iList.length].src + ".jpg";
  }
  $("#iPrev").onclick = () => { iIdx = (iIdx - 1 + iList.length) % iList.length; showImage(); };
  $("#iNext").onclick = () => { iIdx = (iIdx + 1) % iList.length; showImage(); };

  /* ---------- فتح وإغلاق ---------- */
  let lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.hidden = false;
    requestAnimationFrame(() => m.classList.add("open"));
    document.body.style.overflow = "hidden";
    $(".close", m).focus();
  }
  function closeModal(m) {
    m.classList.remove("open");
    document.body.style.overflow = "";
    if (m === player) video.pause();
    setTimeout(() => {
      m.hidden = true;
      if (m === player) { video.removeAttribute("src"); video.load(); }
    }, reduce ? 0 : 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  const openVideo = (list, i) => { vList = list; vIdx = i; showVideo(); openModal(player); };
  const openImages = (list, i) => { iList = list; iIdx = i; showImage(); openModal(viewer); };
  $$("[data-close]").forEach((b) => b.onclick = () => closeModal(b.closest(".modal")));
  [player, viewer].forEach((m) => m.addEventListener("click", (e) => {
    if (e.target === m || e.target.classList.contains("stage") || e.target.classList.contains("modal-box")) closeModal(m);
  }));
  document.addEventListener("keydown", (e) => {
    const m = !player.hidden ? player : !viewer.hidden ? viewer : null;
    if (!m) return;
    if (e.key === "Escape") closeModal(m);
    if (e.key === "ArrowLeft") (m === player ? $("#vNext") : $("#iNext")).click();
    if (e.key === "ArrowRight") (m === player ? $("#vPrev") : $("#iPrev")).click();
    if (e.key === "Tab") { // إبقاء التركيز داخل النافذة
      const f = $$("button:not([hidden]), video", m);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- صفوف الأعمال ---------- */
  const tabs = $("#tabs"), rows = $("#rows");
  S.sections.forEach((sec) => {
    tabs.insertAdjacentHTML("beforeend", `<a href="#${sec.id}">${esc(sec.short || sec.title)} <small>${sec.videos.length}</small></a>`);
    const row = document.createElement("section");
    row.className = "row"; row.id = sec.id;
    row.setAttribute("aria-labelledby", sec.id + "-t");
    row.innerHTML = `
      <div class="row-head">
        <div class="rise">
          <h3 id="${sec.id}-t">${esc(sec.title)}</h3>
          <p>${esc(sec.desc)}</p>
          ${sec.disclaim ? `<p class="disclaim">${esc(sec.disclaim)}</p>` : ""}
        </div>
        <div class="row-ctrl">
          <button type="button" data-dir="prev" aria-label="السابق">${ICON.prev}</button>
          <button type="button" data-dir="next" aria-label="التالي">${ICON.next}</button>
        </div>
      </div>
      <div class="shelf" tabindex="-1"></div>`;
    const shelf = $(".shelf", row);
    sec.videos.forEach((v, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "card rise" + (WIDE.has(v.src) ? " wide" : "");
      b.style.setProperty("--i", Math.min(i, 5));
      b.setAttribute("aria-label", `تشغيل: ${v.title}، المدة ${v.dur}`);
      b.innerHTML = `
        <div class="card-media">
          <img src="${M + v.src}.jpg" alt="" loading="lazy" decoding="async">
          <span class="dur">${v.dur}</span>
          <span class="play" aria-hidden="true"></span>
        </div>
        <p class="card-title">${esc(v.title)}</p>`;
      b.onclick = () => openVideo(sec.videos, i);
      if (finePointer && !reduce) hoverPreview(b, v);
      shelf.append(b);
    });
    if (sec.note) {
      const n = document.createElement("button");
      n.type = "button"; n.className = "thanks rise";
      n.innerHTML = `<img src="${M + sec.note.img}-thumb.jpg" alt="" loading="lazy"><div><b>${esc(sec.note.label)}</b><span>اضغط لعرض الشهادة كاملة</span></div>`;
      n.onclick = () => openImages([{ src: sec.note.img, title: sec.note.label }], 0);
      shelf.append(n);
    }
    rows.append(row);
    shelfControls(row, shelf);
  });

  // أزرار التنقل + السحب بالماوس
  function shelfControls(row, shelf) {
    const [bPrev, bNext] = $$(".row-ctrl button", row);
    const step = () => shelf.clientWidth * 0.8;
    // في RTL: التالي = يسار = قيمة سالبة
    bNext.onclick = () => shelf.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" });
    bPrev.onclick = () => shelf.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" });
    const update = () => {
      const max = shelf.scrollWidth - shelf.clientWidth;
      const pos = Math.abs(shelf.scrollLeft);
      bPrev.disabled = pos < 4;
      bNext.disabled = pos > max - 4;
    };
    shelf.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();

    if (!finePointer) return;
    let down = false, startX = 0, startL = 0, moved = false;
    shelf.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startL = shelf.scrollLeft;
    });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; shelf.classList.add("dragging"); }
      if (moved) shelf.scrollLeft = startL - dx;
    });
    addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      if (moved) setTimeout(() => shelf.classList.remove("dragging"), 30);
    });
  }

  // معاينة صامتة عند مرور الماوس
  function hoverPreview(card, v) {
    let vid = null, t = null;
    card.addEventListener("mouseenter", () => {
      t = setTimeout(() => {
        if (!vid) {
          vid = document.createElement("video");
          Object.assign(vid, { muted: true, loop: true, playsInline: true, preload: "none" });
          vid.src = M + v.src + ".mp4";
          $(".card-media", card).insertBefore(vid, $(".dur", card));
        }
        vid.currentTime = 0;
        vid.play().then(() => card.classList.add("previewing")).catch(() => {});
      }, 280);
    });
    card.addEventListener("mouseleave", () => { clearTimeout(t); card.classList.remove("previewing"); if (vid) vid.pause(); });
  }

  /* ---------- الهويات ---------- */
  const books = $("#books");
  S.identities.forEach((id, k) => {
    const pages = id.images
      ? id.images.map((src, i) => ({ src, title: `${id.title}، تصميم ${i + 1}` }))
      : Array.from({ length: id.pages }, (_, i) => ({ src: id.prefix + pad(i + 1), title: `${id.title}، صفحة ${i + 1}` }));
    const preview = id.images ? [pages[0], pages[1], pages[0]] : [pages[0], pages[1], pages[2]];
    const b = document.createElement("article");
    b.className = "book rise";
    b.style.setProperty("--i", k);
    b.innerHTML = `
      <button type="button" class="stack" aria-label="تصفح ${esc(id.title)}">
        ${preview.map((p) => `<img src="${M + p.src}${id.images ? "" : "-sm"}.jpg" alt="" loading="lazy" decoding="async">`).join("")}
      </button>
      <p class="en">${esc(id.en)}</p>
      <h3>${esc(id.title)}</h3>
      <p class="d">${esc(id.desc)}</p>
      <div class="book-meta">
        <span>${pages.length} ${pages.length > 2 ? "صفحة" : "تصاميم"}</span>
        ${id.pdf ? `<a href="${M + id.pdf}" target="_blank" rel="noopener">حمّل الدليل PDF</a>` : `<span></span>`}
      </div>`;
    $(".stack", b).onclick = () => openImages(pages, 0);
    books.append(b);
  });

  /* ---------- المواقع ---------- */
  const siteList = $("#siteList");
  (S.sites || []).forEach((st, k) => {
    const a = document.createElement("article");
    a.className = "site rise";
    a.style.setProperty("--i", k);
    a.innerHTML = `
      <a class="site-show" href="${st.url}" target="_blank" rel="noopener" aria-label="زيارة موقع ${esc(st.title)}">
        <span class="browser"><span class="bar" aria-hidden="true"><i></i><i></i><i></i><b>${esc(st.domain)}</b></span><img src="${M + st.img}-desktop.jpg" alt="" loading="lazy" decoding="async"></span>
        <span class="phone"><img src="${M + st.img}-mobile.jpg" alt="" loading="lazy" decoding="async"></span>
      </a>
      <p class="en">${esc(st.domain)}</p>
      <h3>${esc(st.title)}</h3>
      <p class="d">${esc(st.desc)}</p>
      <a class="btn btn-ink site-cta" href="${st.url}" target="_blank" rel="noopener">زيارة الموقع</a>`;
    siteList.append(a);
  });

  /* ---------- الشهادات ---------- */
  const allCerts = [...S.featuredCerts, ...S.certs].map((c) => ({ src: c.img, title: c.title }));
  S.featuredCerts.forEach((c, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "f-card rise";
    b.style.setProperty("--i", i);
    b.innerHTML = `
      <div class="f-img"><img src="${M + c.img}-thumb.jpg" alt="" loading="lazy"></div>
      <div class="f-body">
        <span class="f-badge">${i === 0 ? "الرخصة المهنية" : "الشهادة الجامعية"}</span>
        <h3>${esc(c.title)}</h3><p>${esc(c.by)}</p><p class="detail">${esc(c.detail)}</p>
      </div>`;
    b.onclick = () => openImages(allCerts, i);
    $("#featured").append(b);
  });

  const grid = $("#certGrid");
  const cards = S.certs.map((c, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "c-card rise"; b.dataset.group = c.group;
    b.style.setProperty("--i", i % 4);
    b.innerHTML = `<div class="c-img"><img src="${M + c.img}-thumb.jpg" alt="" loading="lazy" decoding="async"></div><div class="c-body"><h3>${esc(c.title)}</h3><p>${esc(c.by)}</p></div>`;
    b.onclick = () => {
      const vis = S.certs.map((x, j) => [x, j]).filter(([, j]) => !cards[j].classList.contains("hide"));
      openImages(vis.map(([x]) => ({ src: x.img, title: x.title })), vis.findIndex(([, j]) => j === i));
    };
    grid.append(b);
    return b;
  });

  const GROUPS = [["all", "الكل"], ["google", "Google للذكاء الاصطناعي"], ["monshaat", "منشآت"], ["tamkeen", "عيادات التمكين"], ["uqu", "جامعة أم القرى"], ["other", "أخرى"]];
  const filters = $("#filters");
  GROUPS.forEach(([g, label]) => {
    const n = g === "all" ? S.certs.length : S.certs.filter((c) => c.group === g).length;
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", g === "all");
    b.innerHTML = `${label} <small>${n}</small>`;
    b.onclick = () => {
      $$("button", filters).forEach((x) => x.setAttribute("aria-selected", x === b));
      let k = 0;
      cards.forEach((c) => {
        const show = g === "all" || c.dataset.group === g;
        c.classList.toggle("hide", !show);
        c.classList.remove("pop");
        if (show) { c.style.setProperty("--i", k++); void c.offsetWidth; c.classList.add("pop", "in"); }
      });
    };
    filters.append(b);
  });

  /* ---------- القائمة في الجوال ---------- */
  const btn = $("#menuBtn"), nav = $("#nav");
  const setMenu = (o) => { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; };
  btn.onclick = () => setMenu(!nav.classList.contains("open"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- تقسيم العناوين لكلمات (حركة كلمة بكلمة) ---------- */
  $$(".split").forEach((el, n) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(" ");
  });
  $(".hero-kicker").style.setProperty("--d", "250ms");
  $(".hero-name").style.setProperty("--d", "380ms");
  $(".hero-line").style.setProperty("--d", "620ms");

  /* ---------- الظهور عند التمرير ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
  }), { rootMargin: "0px 0px -10% 0px" });
  $$(".rise, .split:not(.hero-panel .split)").forEach((el) => io.observe(el));

  /* ---------- عدّاد الأرقام ---------- */
  function countUp() {
    $$("[data-count]").forEach((el) => {
      const to = +el.dataset.count;
      if (reduce) { el.textContent = to; return; }
      const t0 = performance.now(), dur = 1400;
      const f = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    });
  }

  /* ---------- حركة الدخول الأولى ---------- */
  const start = () => {
    document.body.classList.remove("loading");
    $$(".hero-panel .split").forEach((el) => el.classList.add("in"));
    setTimeout(countUp, 900);
  };
  if (reduce) start();
  else Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(() => requestAnimationFrame(start));

  /* ---------- الهيدر + القسم الحالي + بارالاكس ---------- */
  const top = $("#top");
  const orbs = $$("[data-par]");
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      top.classList.toggle("scrolled", scrollY > 30);
      if (!reduce) orbs.forEach((o) => {
        const r = o.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        o.style.transform = `translateY(${(r.top) * +o.dataset.par}px)`;
      });
      ticking = false;
    });
  }, { passive: true });

  const navLinks = $$("#nav a[href^='#']");
  const tabLinks = $$("a", tabs);
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = "#" + e.target.id;
    navLinks.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  ["home", "about", "work", "identity", "sites", "certs", "contact"].forEach((id) => spy.observe(document.getElementById(id)));

  const rowSpy = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    tabLinks.forEach((a) => {
      const on = a.getAttribute("href") === "#" + e.target.id;
      a.classList.toggle("on", on);
      if (on && tabs.scrollWidth > tabs.clientWidth) {
        const r = a.getBoundingClientRect(), c = tabs.getBoundingClientRect();
        tabs.scrollBy({ left: (r.left + r.width / 2) - (c.left + c.width / 2), behavior: "smooth" });
      }
    });
  }), { rootMargin: "-35% 0px -60% 0px" });
  $$(".row").forEach((r) => rowSpy.observe(r));
})();
