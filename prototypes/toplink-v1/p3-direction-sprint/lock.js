(() => {
  const data = window.TOPLINK_CONTENT;
  const params = new URLSearchParams(window.location.search);
  const surface = ["home", "service", "knowledge"].includes(params.get("surface"))
    ? params.get("surface")
    : "home";
  const app = document.querySelector("#app");
  document.documentElement.dataset.surface = surface;
  if (params.get("capture") === "1") document.documentElement.classList.add("is-capture");

  const identity = `<a class="identity" href="lock.html?surface=home#orientation" aria-label="Y Viện Toplink — về phần định hướng"><strong>Y VIỆN TOPLINK</strong><span>${data.identity.descriptor}</span></a>`;
  const header = () => `<header class="site-head">${identity}<nav aria-label="Điều hướng bản khóa C"><a href="lock.html?surface=home#journey">Định hướng</a><a href="lock.html?surface=service">Dịch vụ</a><a href="lock.html?surface=knowledge">Kiến thức</a><a href="lock.html?surface=home#trust">Giới hạn</a></nav><details class="mobile-menu"><summary>Danh mục</summary><div><a href="lock.html?surface=home#journey">Định hướng</a><a href="lock.html?surface=service">Dịch vụ</a><a href="lock.html?surface=knowledge">Kiến thức</a><a href="lock.html?surface=home#trust">Giới hạn</a></div></details></header>`;
  const footer = () => `<footer class="site-foot"><strong>Y Viện Toplink</strong><span>P3B · Direction C lock · Text identity scaffold</span></footer>`;
  const contactRelease = () => `<section class="contact-release" aria-labelledby="contact-title"><div><p class="chapter-mark">Release · bước tiếp theo</p><h2 id="contact-title">${data.contact.title}</h2><p>${data.contact.body}</p></div><div class="channel-status" aria-label="${data.contact.status}">${data.contact.channels.map((item) => `<span>${item}<small>Chờ điểm đến xác minh</small></span>`).join("")}</div></section>`;

  const home = () => `${header()}<main id="main">
    <section class="gateway gateway-home" id="orientation" aria-labelledby="home-title"><div class="gateway-frame" aria-hidden="true"><i></i><i></i><i></i></div><div class="gateway-copy"><p class="chapter-mark">Dưỡng Thân · Tỉnh Thức</p><h1 id="home-title">${data.hero.title}</h1><p class="lead">${data.hero.body}</p></div><nav class="procession-rail" aria-label="Bốn nhịp định hướng">${data.journey.map((item, i) => `<a href="#chapter-${i + 1}"><span>0${i + 1}</span><strong>${item.key}</strong></a>`).join("")}</nav></section>
    <section class="procession" id="journey" aria-label="Bốn nhịp để hiểu rõ hơn">${data.journey.map((item, i) => `<article id="chapter-${i + 1}" class="procession-stage stage-${i + 1}"><p class="chapter-mark">0${i + 1} · ${item.key}</p><h2>${item.title}</h2><p>${item.body}</p></article>`).join("")}</section>
    <section class="court service-court" aria-labelledby="service-title"><header><p class="chapter-mark">Court · khám phá</p><h2 id="service-title">${data.service.title}</h2><p>${data.service.body}</p></header><div class="obligation-ledger">${data.service.obligations.map((item) => `<p>${item}</p>`).join("")}<p class="boundary">${data.service.note}</p><a class="text-link" href="lock.html?surface=service">Đọc cấu trúc chi tiết dịch vụ</a></div></section>
    <section class="trust-threshold" id="trust" aria-labelledby="trust-title"><header><p class="chapter-mark">Threshold · bằng chứng</p><h2 id="trust-title">${data.trust.title}</h2></header><div class="trust-ledger">${data.trust.items.map((item) => `<article><h3>${item.title}</h3><p>${item.body}</p></article>`).join("")}</div></section>
    <section class="court knowledge-court" aria-labelledby="knowledge-title"><header><p class="chapter-mark">Hall · đọc và hiểu</p><h2 id="knowledge-title">${data.knowledge.title}</h2><p>${data.knowledge.body}</p><a class="text-link" href="lock.html?surface=knowledge">Đọc cấu trúc bài kiến thức</a></header><div class="knowledge-ledger">${data.knowledge.topics.map((item, i) => `<article><span>0${i + 1}</span><div><h3>${item.title}</h3><p>${item.body}</p></div></article>`).join("")}</div></section>
    <section class="evidence-gate" aria-labelledby="space-title"><div><p class="chapter-mark">Evidence · pending</p><h2 id="space-title">${data.space.title}</h2><p>${data.space.body}</p><small>${data.space.label}</small></div><div class="material-plane" role="img" aria-label="Mặt phẳng vật liệu trừu tượng, không phải không gian Toplink"></div></section>
    ${contactRelease()}</main>${footer()}`;

  const service = () => `${header()}<main id="main">
    <section class="gateway gateway-detail" aria-labelledby="service-page-title"><div class="gateway-frame" aria-hidden="true"><i></i><i></i></div><div class="gateway-copy"><p class="chapter-mark">Service detail · purpose gate</p><h1 id="service-page-title">${data.probes.service.title}</h1><p class="lead">${data.probes.service.intro}</p></div></section>
    <div class="detail-procession service-procession">${data.probes.service.steps.map((step, i) => `<section class="detail-chamber chamber-${i + 1}"><span>0${i + 1}</span><div><h2>${step[0]}</h2><p>${step[1]}</p></div></section>`).join("")}</div>
    <aside class="limit-surface" aria-labelledby="service-limit-title"><p class="chapter-mark">Limits before contact</p><h2 id="service-limit-title">Giới hạn phải được đọc rõ</h2><p>${data.service.note}</p></aside>
    <section class="related-reading" aria-labelledby="service-reading-title"><div><p class="chapter-mark">Knowledge bridge</p><h2 id="service-reading-title">Hiểu thêm trước khi quyết định</h2></div><p>Kiến thức liên quan chỉ xuất hiện khi có quan hệ ngữ nghĩa được duyệt; không phải cửa ngõ bán hàng.</p></section>
    ${contactRelease()}</main>${footer()}`;

  const knowledge = () => `${header()}<main id="main">
    <section class="gateway gateway-reading" aria-labelledby="knowledge-page-title"><div class="gateway-copy"><p class="chapter-mark">Knowledge detail · reading hall</p><h1 id="knowledge-page-title">${data.probes.knowledge.title}</h1><p class="lead">${data.probes.knowledge.intro}</p></div></section>
    <article class="reading-hall"><nav class="reading-spine" aria-label="Mục lục bài đọc">${data.probes.knowledge.steps.map((step, i) => `<a href="#reading-${i + 1}"><span>0${i + 1}</span>${step[0]}</a>`).join("")}</nav><div class="reading-body">${data.probes.knowledge.steps.map((step, i) => `<section id="reading-${i + 1}"><p class="chapter-mark">0${i + 1}</p><h2>${step[0]}</h2><p>${step[1]}</p>${i === 1 ? '<div class="evidence-note"><strong>Trạng thái bằng chứng</strong><p>Nguồn, sự thật đã duyệt và suy luận phải được tách rõ trước khi xuất bản.</p></div>' : ""}</section>`).join("")}<aside class="limit-surface compact"><h2>Điểm dừng an toàn</h2><p>${data.knowledge.body}</p></aside></div></article>
    <section class="related-reading" aria-labelledby="related-title"><div><p class="chapter-mark">Release · related reading</p><h2 id="related-title">Tiếp tục bằng nội dung liên quan</h2></div><p>Đường đọc có thể kết thúc tại đây. Liên hệ không phải điều kiện để hiểu hoặc áp dụng hướng dẫn an toàn.</p></section>
    </main>${footer()}`;

  app.innerHTML = surface === "service" ? service() : surface === "knowledge" ? knowledge() : home();
})();
