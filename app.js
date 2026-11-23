(() => {
  const S = window.SITE;
  const M = "media/";
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const WIDE = new Set(["ai/ai-01", "ai/ai-02", "ai/ai-05", "ai/ai-08", "hiraa/hiraa-01"]);
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- تواصل ---------- */
  const wa = `https://wa.me/${S.contact.whatsapp}`;
  $("#heroWa").href = wa;
  $("#contactLinks").innerHTML = `
    <a class="c-link main" href="${wa}" target="_blank" rel="noopener"><small>WhatsApp</small><b>واتساب</b></a>
    <a class="c-link" href="mailto:${S.contact.email}"><small>Email</small><b>${esc(S.contact.email)}</b></a>
    <a class="c-link" href="tel:+${S.contact.whatsapp}"><small>Phone</small><b>${esc(S.contact.phone)}</b></a>`;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- الأرقام ---------- */
  const nVideos = S.sections.reduce((a, s) => a + s.videos.length, 0);
  const nCerts = S.featuredCerts.length + S.certs.length;
  $("#stats").innerHTML = [
    [nVideos, "فيديو منشور"],
    [S.sections.length + 1, "أقسام أعمال"],
    [S.identities.length, "هويات بصرية"],
    [nCerts, "شهادة ودورة"],
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join("");

  /* ---------- مشغل الفيديو ---------- */
  const player = $("#player"), video = $("#video");
  let vList = [], vIdx = 0;
  function openVideo(list, i) {
    vList = list; vIdx = i; showVideo();
    openModal(player);
  }
  function showVideo() {
    const v = vList[vIdx];
    $("#playerTitle").textContent = v.title;
    video.poster = M + v.src + ".jpg";
    video.src = M + v.src + ".mp4";
    video.play().catch(() => {});
  }
  $("#vPrev").onclick = () => { vIdx = (vIdx - 1 + vList.length) % vList.length; showVideo(); };
  $("#vNext").onclick = () => { vIdx = (vIdx + 1) % vList.length; showVideo(); };

  /* ---------- عارض الصور ---------- */
  const viewer = $("#viewer"), vImg = $("#viewerImg");
  let iList = [], iIdx = 0, iTitle = "";
  function openImages(list, i, title) {
    iList = list; iIdx = i; iTitle = title; showImage();
    openModal(viewer);
  }
  function showImage() {
    const it = iList[iIdx];
    vImg.src = M + it.src + ".jpg";
    vImg.alt = it.title || iTitle;
    $("#viewerTitle").textContent = it.title || iTitle;
    $("#viewerCount").textContent = iList.length > 1 ? `${iIdx + 1} / ${iList.length}` : "";
    $("#iPrev").style.visibility = $("#iNext").style.visibility = iList.length > 1 ? "visible" : "hidden";
    // حمّل الصورة التالية مسبقًا
    if (iList.length > 1) new Image().src = M + iList[(iIdx + 1) % iList.length].src + ".jpg";
  }
  $("#iPrev").onclick = () => { iIdx = (iIdx - 1 + iList.length) % iList.length; showImage(); };
  $("#iNext").onclick = () => { iIdx = (iIdx + 1) % iList.length; showImage(); };

  /* ---------- فتح وإغلاق النوافذ ---------- */
  let lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.hidden = false;
    document.body.style.overflow = "hidden";
    $(".close", m).focus();
  }
  function closeModal(m) {
    m.hidden = true;
    document.body.style.overflow = "";
    if (m === player) { video.pause(); video.removeAttribute("src"); video.load(); }
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll("[data-close]").forEach((b) => b.onclick = () => closeModal(b.closest(".modal")));
  [player, viewer].forEach((m) => m.addEventListener("click", (e) => { if (e.target === m || e.target.classList.contains("stage")) closeModal(m); }));
  document.addEventListener("keydown", (e) => {
    const m = !player.hidden ? player : !viewer.hidden ? viewer : null;
    if (!m) return;
    if (e.key === "Escape") closeModal(m);
    // الاتجاه عربي: السهم الأيسر = التالي
    if (e.key === "ArrowLeft") (m === player ? $("#vNext") : $("#iNext")).click();
    if (e.key === "ArrowRight") (m === player ? $("#vPrev") : $("#iPrev")).click();
  });

  /* ---------- أقسام الفيديو ---------- */
  const chips = $("#chips"), wrap = $("#sections");
  S.sections.forEach((sec) => {
    chips.append(el("a", "", `${esc(sec.short || sec.title)} <small>${sec.videos.length}</small>`));
    chips.lastChild.href = "#" + sec.id;

    const s = el("section", "work-sec");
    s.id = sec.id;
    s.innerHTML = `
      <header class="work-head reveal">
        <div><p class="en">${esc(sec.en)}</p><h3>${esc(sec.title)}</h3><p class="desc">${esc(sec.desc)}</p></div>
        <span class="count">${pad(sec.videos.length)} مقاطع</span>
      </header>`;
    const grid = el("div", "v-grid");
    sec.videos.forEach((v, i) => {
      const b = el("button", "v-card reveal" + (WIDE.has(v.src) ? " wide" : ""));
      b.type = "button";
      b.setAttribute("aria-label", "تشغيل: " + v.title);
      b.innerHTML = `
        <div class="v-media"><img src="${M + v.src}.jpg" alt="" loading="lazy" decoding="async"></div>
        <span class="v-idx">${pad(i + 1)}</span>
        <span class="v-dur">${v.dur}</span>
        <span class="play" aria-hidden="true"></span>
        <div class="v-info"><p>${esc(v.title)}</p></div>`;
      b.onclick = () => openVideo(sec.videos, i);
      if (finePointer) addPreview(b, v);
      grid.append(b);
    });
    s.append(grid);
    if (sec.note) {
      const n = el("button", "note-card reveal");
      n.type = "button";
      n.innerHTML = `<img src="${M + sec.note.img}-thumb.jpg" alt="" loading="lazy"><div><p>${esc(sec.note.label)}</p><span>اضغط لعرض الشهادة</span></div>`;
      n.onclick = () => openImages([{ src: sec.note.img, title: sec.note.label }], 0);
      s.append(n);
    }
    wrap.append(s);
  });
  chips.append(el("a", "", `هويات بصرية <small>${S.identities.length}</small>`));
  chips.lastChild.href = "#identity";

  // معاينة صامتة عند مرور الماوس (كمبيوتر فقط)
  function addPreview(card, v) {
    let vid = null, t = null;
    card.addEventListener("mouseenter", () => {
      t = setTimeout(() => {
        if (!vid) {
          vid = document.createElement("video");
          vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = "none";
          vid.src = M + v.src + ".mp4";
          $(".v-media", card).append(vid);
        }
        vid.play().then(() => card.classList.add("previewing")).catch(() => {});
      }, 250);
    });
    card.addEventListener("mouseleave", () => {
      clearTimeout(t);
      card.classList.remove("previewing");
      if (vid) vid.pause();
    });
  }

  /* ---------- الهويات ---------- */
  $("#idCount").textContent = pad(S.identities.length) + " هويات";
  const idGrid = $("#idGrid");
  S.identities.forEach((id) => {
    const pages = id.images
      ? id.images.map((src, i) => ({ src, title: `${id.title} · ${i + 1}` }))
      : Array.from({ length: id.pages }, (_, i) => ({ src: id.prefix + pad(i + 1), title: `${id.title} · صفحة ${i + 1}` }));
    const card = el("article", "id-card reveal");
    card.innerHTML = `
      <button type="button" class="id-cover" aria-label="تصفح هوية ${esc(id.title)}" style="border:0;padding:0;cursor:pointer"><img src="${M + pages[0].src}.jpg" alt="" loading="lazy"></button>
      <div class="id-body">
        <p class="en">${esc(id.en)}</p>
        <h4>${esc(id.title)}</h4>
        <p>${esc(id.desc)}</p>
        <div class="id-meta"><span>${pages.length} ${pages.length > 2 ? "صفحة" : "تصاميم"}</span>${id.pdf ? `<a href="${M + id.pdf}" target="_blank" rel="noopener">تحميل PDF</a>` : ""}</div>
      </div>`;
    $(".id-cover", card).onclick = () => openImages(pages, 0, id.title);
    idGrid.append(card);
  });

  /* ---------- الشهادات ---------- */
  const allCerts = [...S.featuredCerts, ...S.certs].map((c) => ({ src: c.img, title: c.title }));
  const feat = $("#featured");
  S.featuredCerts.forEach((c, i) => {
    const b = el("button", "f-card reveal");
    b.type = "button";
    b.innerHTML = `
      <span class="badge">${i === 0 ? "الرخصة المهنية" : "الشهادة الجامعية"}</span>
      <div class="f-img"><img src="${M + c.img}-thumb.jpg" alt="" loading="lazy"></div>
      <div class="f-body"><h4>${esc(c.title)}</h4><p>${esc(c.by)}</p><p class="detail">${esc(c.detail)}</p></div>`;
    b.onclick = () => openImages(allCerts, i);
    feat.append(b);
  });
  const cg = $("#certGrid");
  S.certs.forEach((c, i) => {
    const b = el("button", "c-card reveal");
    b.type = "button";
    b.innerHTML = `<div class="c-img"><img src="${M + c.img}-thumb.jpg" alt="" loading="lazy" decoding="async"></div><div class="c-body"><h4>${esc(c.title)}</h4><p>${esc(c.by)}</p></div>`;
    b.onclick = () => openImages(allCerts, S.featuredCerts.length + i);
    cg.append(b);
  });

  /* ---------- القائمة في الجوال ---------- */
  const btn = $("#menuBtn"), nav = $("#nav");
  btn.onclick = () => { const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); };
  nav.querySelectorAll("a").forEach((a) => a.onclick = () => { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); });

  /* ---------- ظهور تدريجي + تحديد القسم الحالي ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((r) => io.observe(r));

  const chipLinks = [...chips.querySelectorAll("a")];
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    chipLinks.forEach((a) => {
      const on = a.getAttribute("href") === "#" + e.target.id;
      a.classList.toggle("on", on);
      if (on && chips.scrollWidth > chips.clientWidth) {
        const r = a.getBoundingClientRect(), c = chips.getBoundingClientRect();
        chips.scrollBy({ left: (r.left + r.width / 2) - (c.left + c.width / 2), behavior: "smooth" });
      }
    });
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll(".work-sec").forEach((s) => spy.observe(s));
})();
