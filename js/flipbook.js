/**
 * 3D HTML5 Flipbook Engine — Misi: Uang Pintar!
 * Supports Desktop 2-page Spread & Mobile Single-page View,
 * Keyboard navigation, Touch Swipe, Progress Bar, and Table of Contents.
 */
(() => {
  // 18 Pages (9 Leaves: Front + Back each)
  const PAGES = [
    {
      num: 1,
      title: 'Sampul',
      isCover: true,
      html: () => `
        <div class="page-inner" style="justify-content:space-between; padding-top:8px;">
          <div>
            <h1 class="cover-title-main">MISI:<br/>UANG PINTAR!</h1>
            <div style="text-align:center; margin-top:8px;">
              <span class="cover-title-sub">Petualangan Mengelola Uang Sejak Dini</span>
            </div>
          </div>
          <div class="illus-wrap">${Illustrations.coverScene()}</div>
          <div style="display:flex; flex-direction:column; gap:8px; align-items:center;">
            <button class="cta-btn" data-goto="1">📖 Buka Buku</button>
            <div class="cover-footer-strip">Belajar • Bermain • Menabung • Merencanakan</div>
          </div>
        </div>
      `
    },
    {
      num: 2,
      title: 'Kata Pengantar',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Kata Pengantar</h2>
          <div class="story-box">
            <p><strong>Halo, teman-teman!</strong></p>
            <p style="margin-top:6px;">
              Buku ini dibuat untuk membantu kamu belajar mengelola uang dengan cara yang menyenangkan.
              Yuk, kita mulai petualangan seru ini <strong>bersama</strong>!
            </p>
            <p style="margin-top:6px;">Selamat membaca dan bermain!</p>
          </div>
          <div class="illus-wrap">${Illustrations.alya(135)}</div>
          <div style="text-align:center;">
            <span class="pill-note" style="display:inline-block;">Penulis ❤️</span>
          </div>
        </div>
      `
    },
    {
      num: 3,
      title: 'Kenalan dengan Tokoh Kita!',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Kenalan dengan Tokoh Kita!</h2>
          <div class="two-col">
            <div class="info-card clickable" data-char="rafi">
              ${Illustrations.rafi(105)}
              <div style="font-family:var(--font-display); font-weight:700; color:#1f4e8c; font-size:1.05rem;">Rafi</div>
              <p style="font-size:0.8rem; color:var(--ink-muted); margin-top:3px;">Anak yang penasaran dan suka belajar.</p>
            </div>
            <div class="info-card clickable" data-char="alya">
              ${Illustrations.alya(105)}
              <div style="font-family:var(--font-display); font-weight:700; color:#b02a4a; font-size:1.05rem;">Alya</div>
              <p style="font-size:0.8rem; color:var(--ink-muted); margin-top:3px;">Anak yang baik hati dan suka menabung.</p>
            </div>
          </div>
          <div class="feedback-banner info" id="char-greeting">
            👆 Klik tokoh Rafi atau Alya untuk menyapa mereka! (+1 ⭐)
          </div>
        </div>
      `
    },
    {
      num: 4,
      title: 'Apa itu Uang?',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Apa itu Uang?</h2>
          <div class="story-box">
            Uang adalah <strong>alat tukar</strong> yang digunakan untuk membeli barang atau jasa yang kita butuhkan.
          </div>
          <div class="illus-wrap">${Illustrations.walletCoins()}</div>
          <div style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap;">
            <button class="cta-btn small blue" data-money-type="koin">🪙 Koin</button>
            <button class="cta-btn small green" data-money-type="kertas">💵 Kertas</button>
            <button class="cta-btn small" data-money-type="elektronik">📱 Elektronik</button>
          </div>
          <div class="pill-note" id="money-type-info">
            Uang bisa berupa koin, uang kertas, atau uang elektronik, lho! Klik tombol di atas.
          </div>
        </div>
      `
    },
    {
      num: 5,
      title: 'Dari Mana Uang Berasal?',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Dari Mana Uang Berasal?</h2>
          <p class="page-subtitle">Uang bisa kita dapatkan dari beberapa cara (klik kartunya!):</p>
          <div class="two-col">
            <div class="info-card clickable" data-source="ortu">👨‍👩‍👧<br/><strong>Orang Tua</strong></div>
            <div class="info-card clickable" data-source="kerja">💼<br/><strong>Bekerja</strong></div>
            <div class="info-card clickable" data-source="usaha">🏪<br/><strong>Berwirausaha</strong></div>
            <div class="info-card clickable" data-source="hadiah">🎁<br/><strong>Hadiah</strong></div>
          </div>
          <div class="feedback-banner info" id="source-info">
            Pilih salah satu sumber uang di atas untuk melihat penjelasannya!
          </div>
        </div>
      `
    },
    {
      num: 6,
      title: 'Kebutuhan vs Keinginan',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Kebutuhan vs Keinginan</h2>
          <div class="two-col">
            <div class="info-card">
              <span class="badge-green">Kebutuhan</span>
              <p style="font-size:0.8rem;">Hal yang <strong>harus</strong> kita miliki untuk hidup.</p>
              <p style="font-size:0.76rem; color:var(--ink-muted); margin-top:4px;">Contoh: Makan, Minum, Sekolah</p>
            </div>
            <div class="info-card">
              <span class="badge-pink">Keinginan</span>
              <p style="font-size:0.8rem;">Hal yang kita <strong>inginkan</strong>, tapi tidak wajib.</p>
              <p style="font-size:0.76rem; color:var(--ink-muted); margin-top:4px;">Contoh: Mainan, Snack Mahal</p>
            </div>
          </div>
          <div class="game-box">
            <div style="font-weight:800; font-size:0.84rem; text-align:center;">
              Tebak Cepat: <span id="nw-item" style="color:#1f4e8c;"></span>
            </div>
            <div style="display:flex; gap:8px; justify-content:center;">
              <button class="cta-btn small green" data-nw="need">✅ Kebutuhan</button>
              <button class="cta-btn small" data-nw="want">🎀 Keinginan</button>
            </div>
            <div class="feedback-banner info" id="nw-feedback">Kelompokkan dengan tepat untuk dapat +2 ⭐!</div>
          </div>
        </div>
      `
    },
    {
      num: 7,
      title: 'Mengenal Uang Jajan',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Mengenal Uang Jajan</h2>
          <div class="story-box">
            <strong>Uang jajan</strong> adalah uang yang kita dapatkan untuk kebutuhan sehari-hari di luar kebutuhan utama.
          </div>
          <div class="illus-wrap">${Illustrations.alya(145)}</div>
          <div class="pill-note">
            💡 Gunakan dengan bijak, ya! Sisihkan sebagian sebelum habis dibelanjakan.
          </div>
        </div>
      `
    },
    {
      num: 8,
      title: 'Belajar Menabung',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Belajar Menabung</h2>
          <ul class="tips-list">
            <li>✅ Sisihkan uang sedikit demi sedikit</li>
            <li>✅ Gunakan celengan atau rekening</li>
            <li>✅ Tentukan tujuan menabung</li>
          </ul>
          <div style="display:flex; align-items:center; justify-content:space-around; gap:8px; flex:1;">
            <div id="jar-svg-wrap">${Illustrations.moneyJar(30)}</div>
            <div style="display:flex; flex-direction:column; gap:8px; align-items:center;">
              <div class="budget-bar">Isi: <span id="jar-total">Rp6.000</span></div>
              <button class="cta-btn small" id="btn-add-coin">🪙 +Rp2.000</button>
              <span style="font-size:0.74rem; color:var(--ink-muted); font-weight:700;">Penuhkan Rp20.000 (+2 ⭐)</span>
            </div>
          </div>
        </div>
      `
    },
    {
      num: 9,
      title: 'Membuat Target Tabungan',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Membuat Target Tabungan</h2>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="flex:1; font-size:0.84rem; font-weight:700;">
              Tentukan tujuanmu, misalnya:
              <ul style="margin-left:16px; margin-top:4px; line-height:1.5;">
                <li>📘 Membeli buku</li>
                <li>🧸 Mainan impian</li>
                <li>🏖️ Liburan bersama keluarga</li>
              </ul>
            </div>
            <div>${Illustrations.targetBoard()}</div>
          </div>
          <div class="game-box">
            <div style="font-weight:800; font-size:0.82rem; color:#1f4e8c;">🧮 Kalkulator Target Tabungan</div>
            <div class="two-col">
              <select id="calc-goal" style="padding:6px; border-radius:8px; border:2px solid #dce9fa; font-weight:700; font-size:0.8rem;">
                <option value="30000">Buku (Rp30.000)</option>
                <option value="75000">Mainan (Rp75.000)</option>
                <option value="150000">Liburan (Rp150.000)</option>
              </select>
              <select id="calc-daily" style="padding:6px; border-radius:8px; border:2px solid #dce9fa; font-weight:700; font-size:0.8rem;">
                <option value="2000">Rp2.000 / hari</option>
                <option value="5000" selected>Rp5.000 / hari</option>
                <option value="10000">Rp10.000 / hari</option>
              </select>
            </div>
            <div class="feedback-banner info" id="calc-result"></div>
          </div>
        </div>
      `
    },
    {
      num: 10,
      title: 'Mengenal Berbagi',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Mengenal Berbagi</h2>
          <div class="story-box">
            Selain menabung, kita juga harus belajar <strong>berbagi</strong>, ya! Berbagi membuat kita lebih peduli dan mendatangkan kebahagiaan.
          </div>
          <div class="illus-wrap">${Illustrations.giftShare()}</div>
          <div class="pill-note">
            💖 Sedikit berbagi dari uang jajanmu bisa sangat berarti bagi teman yang membutuhkan!
          </div>
        </div>
      `
    },
    {
      num: 11,
      title: 'Permainan: Toko Mini',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Permainan: Toko Mini</h2>
          <div class="game-box" id="toko-stage"></div>
        </div>
      `
    },
    {
      num: 12,
      title: 'Tantangan Memilih Barang',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Tantangan Memilih Barang</h2>
          <p class="page-subtitle">Kamu hanya punya <strong>Rp50.000</strong>. Pikirkan baik-baik, barang mana yang paling penting?</p>
          <div class="game-box">
            <div class="budget-bar"><span>💰 Sisa Uang:</span><span id="ch50-rem">Rp50.000</span></div>
            <div class="shop-grid" id="ch50-grid"></div>
            <button class="cta-btn small green" id="ch50-check">✅ Cek Pilihan</button>
            <div class="feedback-banner info" id="ch50-fb">Pilih barang yang sesuai kebutuhan!</div>
          </div>
        </div>
      `
    },
    {
      num: 13,
      title: 'Game: Atur Uangmu!',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Game: Atur Uangmu!</h2>
          <p class="page-subtitle">Atur uangmu dengan tepat untuk membeli kebutuhan & menabung!</p>
          <div class="game-box">
            <div class="budget-bar"><span>💳 Anggaran: Rp100.000</span><span>Sisa: <strong id="g100-rem">Rp100.000</strong></span></div>
            <div class="shop-grid" id="g100-grid" style="grid-template-columns: repeat(3, 1fr);"></div>
            <button class="cta-btn small" id="g100-finish">🛒 Selesai Belanja</button>
            <div class="feedback-banner info" id="g100-fb">Pilih kombinasi terbaik (Kebutuhan + Tabung/Berbagi)!</div>
          </div>
        </div>
      `
    },
    {
      num: 14,
      title: 'Kuis Seru!',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Kuis Seru!</h2>
          <div class="game-box" id="quiz-stage"></div>
        </div>
      `
    },
    {
      num: 15,
      title: 'Misi 7 Hari Menabung',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Misi 7 Hari Menabung</h2>
          <p class="page-subtitle">Tantangan spesial! Catat tabunganmu selama 7 hari berturut-turut:</p>
          <div class="mission-grid" id="mission-days-grid"></div>
          <div class="feedback-banner info" id="mission-summary">Progres: 0 / 7 hari tercapai!</div>
        </div>
      `
    },
    {
      num: 16,
      title: 'Selamat! Kamu Hebat!',
      html: () => `
        <div class="page-inner">
          <h2 class="page-title">Selamat! Kamu Hebat!</h2>
          <div class="story-box" style="text-align:center;">
            Sekarang kamu sudah tahu cara mengelola uang dengan bijak. Terus belajar, menabung, dan berbagi, ya!
          </div>
          <div class="illus-wrap" style="gap:10px;">
            ${Illustrations.rafi(110)}
            ${Illustrations.alya(110)}
          </div>
          <div class="pill-note">🌟 Jadilah Anak Hebat yang Cerdas Mengelola Uang!</div>
        </div>
      `
    },
    {
      num: 17,
      title: 'Sertifikat Pencapaian',
      html: () => `
        <div class="page-inner">
          <div class="cert-frame">
            ${Illustrations.medal()}
            <h2 class="page-title" style="color:#b45309;">Sertifikat Pencapaian</h2>
            <p style="font-size:0.82rem; font-weight:700;">Diberikan kepada:</p>
            <input type="text" id="cert-name-input" class="cert-input" placeholder="Ketik Namamu di Sini..." maxlength="32" />
            <p style="font-size:0.78rem; color:var(--ink-muted);">
              Karena telah berhasil menyelesaikan misi belajar mengelola uang sejak dini dengan koleksi <strong id="cert-stars-count">0</strong> ⭐!
            </p>
            <div class="cert-ribbon">Hebat Sekali!</div>
            <button class="cta-btn small blue no-print" id="btn-print-cert">🖨️ Cetak Sertifikat</button>
          </div>
        </div>
      `
    },
    {
      num: 18,
      title: 'Sampul Belakang',
      isBack: true,
      html: () => `
        <div class="page-inner" style="justify-content:center; align-items:center; text-align:center; gap:14px;">
          <h2 class="page-title">Terima Kasih Sudah Membaca!</h2>
          <p class="page-subtitle">
            Buku Digital Interaktif HTML5<br/>
            <strong>Misi: Uang Pintar!</strong>
          </p>
          <div class="story-box" style="width:100%;">
            <strong>Fitur Interaktif yang Tersedia:</strong><br/>
            📖 Halaman 3D Bisa Dibalik • 🏪 Mini Game Toko Mini<br/>
            💰 Tantangan Anggaran • 🏆 Kuis Interaktif • 🎓 Sertifikat Digital
          </div>
          <button class="cta-btn" data-goto="0">🔄 Baca Dari Awal</button>
        </div>
      `
    }
  ];

  const bookEl = document.getElementById('book');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const homeBtn = document.getElementById('btn-home');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');
  const pageIndicator = document.getElementById('page-indicator');
  const progressTrack = document.getElementById('progress-track');
  const tocModal = document.getElementById('toc-modal');
  const tocGrid = document.getElementById('toc-grid');

  let currentLeaf = 0; // Desktop: leaf index 0..9 (9 leaves = 18 pages)
  let currentMobilePage = 0; // Mobile: page index 0..17
  const totalLeaves = Math.ceil(PAGES.length / 2);

  function isMobile() {
    return window.innerWidth <= 820;
  }

  function buildBook() {
    bookEl.innerHTML = '';
    for (let i = 0; i < totalLeaves; i++) {
      const frontPage = PAGES[i * 2];
      const backPage = PAGES[i * 2 + 1];

      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.dataset.leaf = i;

      // Front Face (odd page: 1, 3, 5...)
      const front = document.createElement('div');
      front.className = `page-face page-front ${frontPage.isCover ? 'cover-face' : ''}`;
      front.innerHTML = `
        ${frontPage.html()}
        <span class="page-num-badge">${frontPage.num}</span>
        <div class="page-corner-hit" title="Halaman berikutnya" data-action="next"></div>
      `;

      // Back Face (even page: 2, 4, 6...)
      const back = document.createElement('div');
      back.className = `page-face page-back ${backPage && backPage.isBack ? 'cover-face' : ''}`;
      if (backPage) {
        back.innerHTML = `
          ${backPage.html()}
          <span class="page-num-badge">${backPage.num}</span>
          <div class="page-corner-hit" title="Halaman sebelumnya" data-action="prev"></div>
        `;
      }

      leaf.appendChild(front);
      leaf.appendChild(back);
      bookEl.appendChild(leaf);
    }

    // Build TOC
    tocGrid.innerHTML = PAGES.map((p, idx) => `
      <button class="toc-item" data-goto="${idx}">
        <span class="toc-num">${p.num}</span>
        <span class="toc-label">${p.title}</span>
      </button>
    `).join('');

    // Bind goto buttons inside pages & TOC
    document.querySelectorAll('[data-goto]').forEach((btn) => {
      btn.addEventListener('click', () => {
        goToPage(Number(btn.dataset.goto));
        tocModal.hidden = true;
      });
    });

    // Bind page corner clicks
    bookEl.querySelectorAll('[data-action="next"]').forEach((el) => {
      el.addEventListener('click', next);
    });
    bookEl.querySelectorAll('[data-action="prev"]').forEach((el) => {
      el.addEventListener('click', prev);
    });
  }

  function updateView() {
    const leaves = Array.from(bookEl.querySelectorAll('.leaf'));

    if (isMobile()) {
      // Single-page view on mobile
      bookEl.classList.remove('is-cover', 'is-back');
      leaves.forEach((leaf, i) => {
        const front = leaf.querySelector('.page-front');
        const back = leaf.querySelector('.page-back');
        const frontIdx = i * 2;
        const backIdx = i * 2 + 1;

        leaf.classList.remove('flipped');
        leaf.style.transform = 'none';
        leaf.style.zIndex = (frontIdx === currentMobilePage || backIdx === currentMobilePage) ? 10 : 1;

        front.style.display = frontIdx === currentMobilePage ? 'flex' : 'none';
        if (back) {
          back.style.transform = 'none';
          back.style.display = backIdx === currentMobilePage ? 'flex' : 'none';
        }
      });

      const pct = ((currentMobilePage + 1) / PAGES.length) * 100;
      progressFill.style.width = `${pct}%`;
      progressLabel.textContent = `${currentMobilePage + 1} / ${PAGES.length}`;
      pageIndicator.textContent = PAGES[currentMobilePage].title;
      prevBtn.disabled = currentMobilePage === 0;
      nextBtn.disabled = currentMobilePage === PAGES.length - 1;
      return;
    }

    // Desktop 3D Spread View
    leaves.forEach((leaf, i) => {
      const front = leaf.querySelector('.page-front');
      const back = leaf.querySelector('.page-back');
      front.style.display = 'flex';
      if (back) {
        back.style.display = 'flex';
        back.style.transform = 'rotateY(180deg)';
      }
      leaf.style.transform = '';

      if (i < currentLeaf) {
        leaf.classList.add('flipped');
        leaf.style.zIndex = i + 1;
      } else {
        leaf.classList.remove('flipped');
        leaf.style.zIndex = totalLeaves - i;
      }
    });

    bookEl.classList.toggle('is-cover', currentLeaf === 0);
    bookEl.classList.toggle('is-back', currentLeaf === totalLeaves);

    if (currentLeaf === 0) {
      pageIndicator.textContent = 'Sampul (Hal. 1)';
      progressLabel.textContent = `1 / ${PAGES.length}`;
      progressFill.style.width = `${(1 / PAGES.length) * 100}%`;
    } else if (currentLeaf === totalLeaves) {
      pageIndicator.textContent = 'Sampul Belakang (Hal. 18)';
      progressLabel.textContent = `${PAGES.length} / ${PAGES.length}`;
      progressFill.style.width = '100%';
    } else {
      const leftNum = currentLeaf * 2;
      const rightNum = leftNum + 1;
      pageIndicator.textContent = `Hal. ${leftNum} – ${rightNum}`;
      progressLabel.textContent = `${rightNum} / ${PAGES.length}`;
      progressFill.style.width = `${(rightNum / PAGES.length) * 100}%`;
    }

    prevBtn.disabled = currentLeaf === 0;
    nextBtn.disabled = currentLeaf === totalLeaves;
  }

  function next() {
    if (isMobile()) {
      if (currentMobilePage < PAGES.length - 1) {
        currentMobilePage++;
        SoundFX.flip();
        updateView();
      }
    } else {
      if (currentLeaf < totalLeaves) {
        currentLeaf++;
        SoundFX.flip();
        updateView();
      }
    }
  }

  function prev() {
    if (isMobile()) {
      if (currentMobilePage > 0) {
        currentMobilePage--;
        SoundFX.flip();
        updateView();
      }
    } else {
      if (currentLeaf > 0) {
        currentLeaf--;
        SoundFX.flip();
        updateView();
      }
    }
  }

  function goToPage(pageIdx) {
    const clamped = Math.max(0, Math.min(PAGES.length - 1, pageIdx));
    SoundFX.flip();
    if (isMobile()) {
      currentMobilePage = clamped;
    } else {
      currentLeaf = clamped === 0 ? 0 : Math.ceil(clamped / 2);
      currentMobilePage = clamped;
    }
    updateView();
  }

  // Event Listeners
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  homeBtn.addEventListener('click', () => goToPage(0));

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') tocModal.hidden = true;
  });

  // Touch Swipe Support
  let touchStartX = 0;
  bookEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  bookEl.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 48) {
      if (diff < 0) next();
      else prev();
    }
  }, { passive: true });

  // Progress Track Click
  progressTrack.addEventListener('click', (e) => {
    const rect = progressTrack.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const targetPage = Math.round(ratio * (PAGES.length - 1));
    goToPage(targetPage);
  });

  // Modals & Toolbar Controls
  document.getElementById('btn-toc').addEventListener('click', () => {
    SoundFX.pop();
    tocModal.hidden = false;
  });
  document.getElementById('close-toc').addEventListener('click', () => {
    tocModal.hidden = true;
  });
  tocModal.addEventListener('click', (e) => {
    if (e.target === tocModal) tocModal.hidden = true;
  });

  const soundBtn = document.getElementById('btn-sound');
  const soundIcon = document.getElementById('sound-icon');
  soundBtn.addEventListener('click', () => {
    const on = SoundFX.toggle();
    soundIcon.textContent = on ? '🔊' : '🔇';
    if (on) SoundFX.pop();
  });

  document.getElementById('btn-fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  window.addEventListener('resize', updateView);

  // Initialize Everything
  buildBook();
  GameHub.initAll();
  updateView();
})();
