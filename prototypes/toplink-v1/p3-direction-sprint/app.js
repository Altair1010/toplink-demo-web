(() => {
  const data = window.TOPLINK_CONTENT;
  const params = new URLSearchParams(window.location.search);
  const direction = ["A", "B", "C"].includes(params.get("direction"))
    ? params.get("direction")
    : "A";
  const surface = document.body.dataset.surface;
  const app = document.querySelector("#app");

  document.documentElement.dataset.direction = direction;
  if (params.get("capture") === "1")
    document.documentElement.classList.add("is-capture");

  const escape = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const directionNames = {
    A: "A · Tĩnh Mạch",
    B: "B · Dược Liệu Học",
    C: "C · Tân Cung Đương Đại",
  };

  const compareBar = () => `
    <nav class="compare-bar" aria-label="Chọn hướng so sánh P3A">
      <span>P3A · comparison only</span>
      <div>
        ${["A", "B", "C"]
          .map(
            (item) =>
              `<a ${item === direction ? 'aria-current="page"' : ""} href="?direction=${item}">${directionNames[item]}</a>`,
          )
          .join("")}
      </div>
    </nav>
  `;

  const topNav = (modifier = "") => `
    <header class="site-head ${modifier}">
      <a class="identity" href="#orientation" aria-label="Y Viện Toplink — về phần định hướng">
        <strong>${data.identity.name}</strong>
        <span>${data.identity.descriptor}</span>
      </a>
      <nav aria-label="Điều hướng bản so sánh">
        ${data.nav.map((item) => `<a href="#${item.target}">${item.label}</a>`).join("")}
      </nav>
      <details class="mobile-menu">
        <summary>Danh mục</summary>
        <div>
          ${data.nav.map((item) => `<a href="#${item.target}">${item.label}</a>`).join("")}
        </div>
      </details>
    </header>
  `;

  const journeyList = (className = "") => `
    <ol class="journey-list ${className}">
      ${data.journey
        .map(
          (item) => `
            <li>
              <span aria-hidden="true">${item.key}</span>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;

  const obligations = () => `
    <ul class="obligation-list">
      ${data.service.obligations.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;

  const trustItems = (className = "") => `
    <div class="trust-items ${className}">
      ${data.trust.items
        .map(
          (item) => `
            <article>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;

  const knowledgeItems = (className = "") => `
    <div class="knowledge-items ${className}">
      ${data.knowledge.topics
        .map(
          (item, index) => `
            <article>
              <span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>${item.title}</h3>
                <p>${item.body}</p>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;

  const contactBlock = (modifier = "") => `
    <section class="contact-block ${modifier}" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">${data.contact.title}</h2>
        <p>${data.contact.body}</p>
      </div>
      <div class="pending-channels" aria-label="${data.contact.status}">
        ${data.contact.channels.map((item) => `<span>${item}</span>`).join("")}
        <small>${data.contact.status}</small>
      </div>
    </section>
  `;

  const renderA = () => `
    ${compareBar()}
    <div class="prototype prototype-a">
      ${topNav("head-a")}
      <main id="main">
        <section class="a-hero" id="orientation" aria-labelledby="a-title">
          <p class="a-spine">${data.identity.outcome}</p>
          <div class="a-hero-copy">
            <p class="descriptor">${data.identity.descriptor}</p>
            <h1 id="a-title">${data.hero.title}</h1>
            <p class="lede">${data.hero.body}</p>
            <a class="text-link" href="#journey">${data.hero.next}<span aria-hidden="true"> ↓</span></a>
          </div>
          <div class="a-threshold" role="img" aria-label="Vùng vật liệu trừu tượng, không phải hình ảnh cơ sở Toplink">
            <span></span>
          </div>
        </section>

        <section class="a-journey" id="journey" aria-labelledby="a-journey-title">
          <header>
            <h2 id="a-journey-title">Bốn nhịp để hiểu rõ hơn</h2>
            <p>Đây là nhịp định hướng, không phải chẩn đoán hay một lộ trình bắt buộc.</p>
          </header>
          ${journeyList("journey-a")}
        </section>

        <section class="a-service" id="services" aria-labelledby="a-service-title">
          <div class="a-service-title">
            <h2 id="a-service-title">${data.service.title}</h2>
            <p>${data.service.body}</p>
          </div>
          <div class="a-service-body">
            ${obligations()}
            <p class="boundary-note">${data.service.note}</p>
            <a class="text-link" href="probe.html?direction=A&type=service">Xem cấu trúc trang chi tiết</a>
          </div>
        </section>

        <section class="a-trust" id="trust" aria-labelledby="a-trust-title">
          <h2 id="a-trust-title">${data.trust.title}</h2>
          ${trustItems("trust-a")}
        </section>

        <section class="a-knowledge" id="knowledge" aria-labelledby="a-knowledge-title">
          <div>
            <h2 id="a-knowledge-title">${data.knowledge.title}</h2>
            <p>${data.knowledge.body}</p>
            <a class="text-link" href="probe.html?direction=A&type=knowledge">Xem cấu trúc bài kiến thức</a>
          </div>
          ${knowledgeItems("knowledge-a")}
        </section>

        <section class="a-space" aria-labelledby="a-space-title">
          <div class="a-material" role="img" aria-label="Vùng vật liệu trừu tượng, không phải không gian Toplink"></div>
          <div>
            <h2 id="a-space-title">${data.space.title}</h2>
            <p>${data.space.body}</p>
            <span>${data.space.label}</span>
          </div>
        </section>

        ${contactBlock("contact-a")}
      </main>
      <footer class="site-foot"><strong>${data.identity.name}</strong><span>P3A · ${directionNames.A}</span></footer>
    </div>
  `;

  const lensWorkbench = () => `
    <div class="b-lens-rail" role="group" aria-label="Bốn nhịp định hướng">
      ${data.journey
        .map(
          (item, index) => `
            <button type="button" data-lens="${index}" aria-pressed="${index === 0}">
              <span>${item.key}</span>
              <small>${item.title}</small>
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="b-lens-panels" aria-live="polite">
      ${data.journey
        .map(
          (item, index) => `
            <article data-lens-panel="${index}" ${index === 0 ? "" : "hidden"}>
              <span class="b-register">0${index + 1} · định hướng</span>
              <h2>${item.title}</h2>
              <p>${item.body}</p>
              <dl>
                <div><dt>Vai trò</dt><dd>Giúp người đọc hiểu trước khi quyết định.</dd></div>
                <div><dt>Giới hạn</dt><dd>Không suy luận dịch vụ từ triệu chứng.</dd></div>
              </dl>
            </article>
          `,
        )
        .join("")}
    </div>
  `;

  const renderB = () => `
    ${compareBar()}
    <div class="prototype prototype-b">
      ${topNav("head-b")}
      <main id="main">
        <section class="b-hero" id="orientation" aria-labelledby="b-title">
          <header>
            <p class="descriptor">${data.identity.descriptor}</p>
            <h1 id="b-title">${data.hero.title}</h1>
            <p class="lede">${data.hero.body}</p>
          </header>
          <div class="b-workbench" id="journey">
            ${lensWorkbench()}
          </div>
          <p class="b-method-note">Một hệ kiến thức sống: mối quan hệ được giải thích, không được ngụy trang thành bằng chứng.</p>
        </section>

        <section class="b-service" id="services" aria-labelledby="b-service-title">
          <header>
            <span class="b-register">Hồ sơ 01 · comparison scaffold</span>
            <h2 id="b-service-title">${data.service.title}</h2>
            <p>${data.service.body}</p>
          </header>
          <div class="b-service-sheet">
            ${data.service.obligations
              .map(
                (item, index) => `
                  <div><span>0${index + 1}</span><strong>${item}</strong><small>Chỉ hiển thị khi APPROVED</small></div>
                `,
              )
              .join("")}
            <p>${data.service.note}</p>
            <a class="b-link" href="probe.html?direction=B&type=service">Mở probe cấu trúc dịch vụ</a>
          </div>
        </section>

        <section class="b-trust" id="trust" aria-labelledby="b-trust-title">
          <div class="b-seal" aria-hidden="true">RÕ</div>
          <div>
            <h2 id="b-trust-title">${data.trust.title}</h2>
            ${trustItems("trust-b")}
          </div>
        </section>

        <section class="b-knowledge" id="knowledge" aria-labelledby="b-knowledge-title">
          <header>
            <h2 id="b-knowledge-title">${data.knowledge.title}</h2>
            <p>${data.knowledge.body}</p>
          </header>
          ${knowledgeItems("knowledge-b")}
          <a class="b-link" href="probe.html?direction=B&type=knowledge">Mở probe cấu trúc kiến thức</a>
        </section>

        <section class="b-space" aria-labelledby="b-space-title">
          <div class="b-material" role="img" aria-label="Mẫu vật liệu trừu tượng, không phải hình ảnh cơ sở Toplink">
            <span>${data.space.label}</span>
          </div>
          <div>
            <span class="b-register">Provenance gate</span>
            <h2 id="b-space-title">${data.space.title}</h2>
            <p>${data.space.body}</p>
          </div>
        </section>

        ${contactBlock("contact-b")}
      </main>
      <footer class="site-foot"><strong>${data.identity.name}</strong><span>P3A · ${directionNames.B}</span></footer>
    </div>
  `;

  const renderC = () => `
    ${compareBar()}
    <div class="prototype prototype-c">
      ${topNav("head-c")}
      <main id="main">
        <section class="c-hero" id="orientation" aria-labelledby="c-title">
          <div class="c-gateway" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="c-hero-copy">
            <p class="descriptor">${data.identity.descriptor}</p>
            <h1 id="c-title">${data.hero.title}</h1>
            <p class="lede">${data.hero.body}</p>
          </div>
          <nav class="c-stage-nav" aria-label="Bốn nhịp định hướng">
            ${data.journey
              .map(
                (item, index) =>
                  `<a href="#stage-${index + 1}"><span>0${index + 1}</span>${item.key}</a>`,
              )
              .join("")}
          </nav>
        </section>

        <section class="c-procession" id="journey" aria-label="Bốn nhịp để hiểu rõ hơn">
          ${data.journey
            .map(
              (item, index) => `
                <article id="stage-${index + 1}" class="c-stage c-stage-${index + 1}">
                  <span class="c-stage-key">0${index + 1} · ${item.key}</span>
                  <h2>${item.title}</h2>
                  <p>${item.body}</p>
                </article>
              `,
            )
            .join("")}
        </section>

        <section class="c-service c-court" id="services" aria-labelledby="c-service-title">
          <header>
            <span class="c-stage-key">Court · khám phá</span>
            <h2 id="c-service-title">${data.service.title}</h2>
            <p>${data.service.body}</p>
          </header>
          <div>
            ${obligations()}
            <p class="boundary-note">${data.service.note}</p>
            <a class="c-link" href="probe.html?direction=C&type=service">Đi qua cấu trúc dịch vụ</a>
          </div>
        </section>

        <section class="c-trust c-threshold-section" id="trust" aria-labelledby="c-trust-title">
          <h2 id="c-trust-title">${data.trust.title}</h2>
          ${trustItems("trust-c")}
        </section>

        <section class="c-knowledge c-court" id="knowledge" aria-labelledby="c-knowledge-title">
          <header>
            <span class="c-stage-key">Hall · đọc và hiểu</span>
            <h2 id="c-knowledge-title">${data.knowledge.title}</h2>
            <p>${data.knowledge.body}</p>
            <a class="c-link" href="probe.html?direction=C&type=knowledge">Đi qua cấu trúc kiến thức</a>
          </header>
          ${knowledgeItems("knowledge-c")}
        </section>

        <section class="c-space" aria-labelledby="c-space-title">
          <div>
            <span class="c-stage-key">Evidence threshold</span>
            <h2 id="c-space-title">${data.space.title}</h2>
            <p>${data.space.body}</p>
            <span>${data.space.label}</span>
          </div>
          <div class="c-material" role="img" aria-label="Mặt phẳng vật liệu trừu tượng, không phải không gian Toplink"></div>
        </section>

        ${contactBlock("contact-c")}
      </main>
      <footer class="site-foot"><strong>${data.identity.name}</strong><span>P3A · ${directionNames.C}</span></footer>
    </div>
  `;

  const probeSwitch = (type) => `
    <nav class="probe-switch" aria-label="Chọn probe">
      <a ${type === "service" ? 'aria-current="page"' : ""} href="probe.html?direction=${direction}&type=service">Chi tiết dịch vụ</a>
      <a ${type === "knowledge" ? 'aria-current="page"' : ""} href="probe.html?direction=${direction}&type=knowledge">Bài kiến thức</a>
      <a href="index.html?direction=${direction}">Về trang chủ</a>
    </nav>
  `;

  const renderProbeA = (probe, type) => `
    ${compareBar()}
    <div class="prototype prototype-a probe-page probe-a">
      ${topNav("head-a")}
      <main id="main" class="a-probe">
        ${probeSwitch(type)}
        <article>
          <p class="descriptor">${type === "service" ? "Service detail probe" : "Knowledge detail probe"}</p>
          <h1>${probe.title}</h1>
          <p class="lede">${probe.intro}</p>
          ${probe.steps
            .map(
              (step, index) => `
                <section>
                  <div><span>0${index + 1}</span><small>Yêu cầu nội dung</small></div>
                  <div><h2>${step[0]}</h2><p>${step[1]}</p></div>
                </section>
              `,
            )
            .join("")}
        </article>
        <aside>
          <strong>Giới hạn probe</strong>
          <p>${type === "service" ? data.service.note : data.knowledge.body}</p>
        </aside>
      </main>
    </div>
  `;

  const renderProbeB = (probe, type) => `
    ${compareBar()}
    <div class="prototype prototype-b probe-page probe-b">
      ${topNav("head-b")}
      <main id="main">
        ${probeSwitch(type)}
        <header>
          <span class="b-register">${type === "service" ? "Service evidence sheet" : "Knowledge field note"}</span>
          <h1>${probe.title}</h1>
          <p>${probe.intro}</p>
        </header>
        <div class="b-probe-grid">
          ${probe.steps
            .map(
              (step, index) => `
                <article>
                  <span>0${index + 1}</span>
                  <h2>${step[0]}</h2>
                  <p>${step[1]}</p>
                  <small>Trạng thái: cần nguồn APPROVED</small>
                </article>
              `,
            )
            .join("")}
        </div>
        <details>
          <summary>Giới hạn xuất bản</summary>
          <p>${type === "service" ? data.service.note : data.knowledge.body}</p>
        </details>
      </main>
    </div>
  `;

  const renderProbeC = (probe, type) => `
    ${compareBar()}
    <div class="prototype prototype-c probe-page probe-c">
      ${topNav("head-c")}
      <main id="main">
        ${probeSwitch(type)}
        <header class="c-probe-gate">
          <span class="c-stage-key">${type === "service" ? "Service chamber sequence" : "Knowledge reading hall"}</span>
          <h1>${probe.title}</h1>
          <p>${probe.intro}</p>
        </header>
        <div class="c-probe-chambers">
          ${probe.steps
            .map(
              (step, index) => `
                <section>
                  <span>0${index + 1}</span>
                  <div><h2>${step[0]}</h2><p>${step[1]}</p></div>
                </section>
              `,
            )
            .join("")}
        </div>
        <p class="c-probe-limit">${type === "service" ? data.service.note : data.knowledge.body}</p>
      </main>
    </div>
  `;

  if (surface === "home") {
    app.innerHTML =
      direction === "A" ? renderA() : direction === "B" ? renderB() : renderC();
  } else {
    const type = params.get("type") === "knowledge" ? "knowledge" : "service";
    const probe = data.probes[type];
    app.innerHTML =
      direction === "A"
        ? renderProbeA(probe, type)
        : direction === "B"
          ? renderProbeB(probe, type)
          : renderProbeC(probe, type);
  }

  document.title = `Toplink P3A — ${directionNames[direction]}`;

  document.querySelectorAll("[data-lens]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.lens;
      document.querySelectorAll("[data-lens]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      document.querySelectorAll("[data-lens-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.lensPanel !== target;
      });
    });
  });
})();
