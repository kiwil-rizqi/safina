/**
 * Interactive Games, Activities, Quiz, Confetti, and Star Rewards
 */
const GameHub = (() => {
  const STORAGE_KEY = 'uang_pintar_state_v1';

  let state = {
    stars: 0,
    earnedFlags: {},
    jarAmount: 6000,
    missionDays: [false, false, false, false, false, false, false],
    certName: ''
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = { ...state, ...JSON.parse(saved) };
      }
    } catch (_) {}
    updateStarUI();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function updateStarUI() {
    const el = document.getElementById('total-stars');
    if (el) el.textContent = state.stars;
    const certStars = document.getElementById('cert-stars-count');
    if (certStars) certStars.textContent = state.stars;
  }

  function awardStars(flagKey, amount) {
    if (state.earnedFlags[flagKey]) return false;
    state.earnedFlags[flagKey] = true;
    state.stars += amount;
    saveState();
    updateStarUI();
    SoundFX.success();
    launchConfetti();
    return true;
  }

  function formatRp(num) {
    return 'Rp' + num.toLocaleString('id-ID');
  }

  /* Simple Canvas Confetti */
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ffd147', '#ff6b8b', '#4fa3ff', '#38c172', '#a78bfa'];
    const pieces = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      r: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 3 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2
    }));

    let frames = 0;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += 0.08;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        ctx.restore();
      });
      frames++;
      if (frames < 95) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(tick);
  }

  /* Init all interactive page widgets after flipbook DOM is mounted */
  function initAll() {
    loadState();
    initCharacters();
    initMoneyTypes();
    initMoneySources();
    initNeedsQuiz();
    initSavingsJar();
    initTargetCalc();
    initTokoMini();
    initChallenge50k();
    initAturUang100k();
    initMainQuiz();
    initMission7Days();
    initCertificate();
  }

  // Hal 3: Characters
  function initCharacters() {
    const msgBox = document.getElementById('char-greeting');
    document.querySelectorAll('[data-char]').forEach((card) => {
      card.addEventListener('click', () => {
        SoundFX.pop();
        const who = card.dataset.char;
        document.querySelectorAll('[data-char]').forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        if (who === 'rafi') {
          msgBox.innerHTML = '👦 <strong>Rafi:</strong> "Hai! Aku suka bertanya dan mencoba game berhitung uang. Ayo belajar bareng!"';
        } else {
          msgBox.innerHTML = '👧 <strong>Alya:</strong> "Halo! Aku selalu menyisihkan uang jajanku ke celengan. Yuk, menabung bersama!"';
        }
        awardStars('meet_chars', 1);
      });
    });
  }

  // Hal 4: Money Types
  function initMoneyTypes() {
    const info = document.getElementById('money-type-info');
    const desc = {
      koin: '🪙 <strong>Uang Koin:</strong> Terbuat dari logam, nilainya kecil seperti Rp500 atau Rp1.000. Cocok dimasukkan ke celengan!',
      kertas: '💵 <strong>Uang Kertas:</strong> Ringan dibawa di dompet, nilainya mulai dari Rp1.000 hingga Rp100.000.',
      elektronik: '📱 <strong>Uang Elektronik:</strong> Uang digital di kartu atau aplikasi HP yang dipakai dengan cara tap atau scan QR.'
    };
    document.querySelectorAll('[data-money-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        SoundFX.pop();
        document.querySelectorAll('[data-money-type]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        info.innerHTML = desc[btn.dataset.moneyType];
      });
    });
  }

  // Hal 5: Money Sources
  function initMoneySources() {
    const box = document.getElementById('source-info');
    const desc = {
      ortu: '👨‍👩‍👧 <strong>Orang Tua:</strong> Uang saku atau uang jajan yang diberikan untuk kebutuhan sekolah.',
      kerja: '💼 <strong>Bekerja:</strong> Upah atau gaji yang didapat setelah membantu atau menyelesaikan pekerjaan.',
      usaha: '🏪 <strong>Berwirausaha:</strong> Keuntungan dari berjualan barang atau jasa, misalnya jualan kue buatan sendiri!',
      hadiah: '🎁 <strong>Hadiah:</strong> Pemberian saat ulang tahun, hari raya, atau penghargaan prestasi.'
    };
    document.querySelectorAll('[data-source]').forEach((card) => {
      card.addEventListener('click', () => {
        SoundFX.pop();
        document.querySelectorAll('[data-source]').forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        box.innerHTML = desc[card.dataset.source];
      });
    });
  }

  // Hal 6: Quick Needs vs Wants check
  function initNeedsQuiz() {
    const items = [
      { name: '🍚 Makan Siang', type: 'need' },
      { name: '🎮 Game Konsol', type: 'want' },
      { name: '📚 Buku Pelajaran', type: 'need' },
      { name: '🍭 Permen Mahal', type: 'want' }
    ];
    let idx = 0;
    const label = document.getElementById('nw-item');
    const feedback = document.getElementById('nw-feedback');
    if (!label) return;

    function render() {
      label.textContent = items[idx].name;
    }

    document.querySelectorAll('[data-nw]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pick = btn.dataset.nw;
        if (pick === items[idx].type) {
          SoundFX.coin();
          feedback.className = 'feedback-banner success';
          feedback.textContent = `Benar! ${items[idx].name} adalah ${pick === 'need' ? 'Kebutuhan' : 'Keinginan'}.`;
          idx = (idx + 1) % items.length;
          if (idx === 0) awardStars('needs_check', 2);
          setTimeout(render, 650);
        } else {
          SoundFX.error();
          feedback.className = 'feedback-banner warn';
          feedback.textContent = 'Kurang tepat, coba pikirkan: apakah kita wajib memilikinya untuk hidup/sekolah?';
        }
      });
    });
    render();
  }

  // Hal 8: Savings Jar
  function initSavingsJar() {
    const jarWrap = document.getElementById('jar-svg-wrap');
    const totalEl = document.getElementById('jar-total');
    const addBtn = document.getElementById('btn-add-coin');
    if (!addBtn) return;

    function renderJar() {
      const pct = Math.min(95, Math.round((state.jarAmount / 20000) * 100));
      jarWrap.innerHTML = Illustrations.moneyJar(pct);
      totalEl.textContent = formatRp(state.jarAmount);
    }

    addBtn.addEventListener('click', () => {
      SoundFX.coin();
      state.jarAmount += 2000;
      if (state.jarAmount >= 20000) {
        awardStars('jar_full', 2);
      }
      saveState();
      renderJar();
    });
    renderJar();
  }

  // Hal 9: Target Calculator
  function initTargetCalc() {
    const goalSel = document.getElementById('calc-goal');
    const dailySel = document.getElementById('calc-daily');
    const resultEl = document.getElementById('calc-result');
    if (!goalSel || !dailySel) return;

    function calc() {
      const goal = Number(goalSel.value);
      const daily = Number(dailySel.value);
      const days = Math.ceil(goal / daily);
      resultEl.innerHTML = `Kamu perlu menabung selama <strong>${days} hari</strong> untuk mencapai ${formatRp(goal)}! 🎯`;
    }
    goalSel.addEventListener('change', () => { SoundFX.pop(); calc(); });
    dailySel.addEventListener('change', () => { SoundFX.pop(); calc(); });
    calc();
  }

  // Hal 11: Mini Game 1 — Toko Mini (3 Rounds)
  function initTokoMini() {
    const rounds = [
      {
        prompt: 'Ronde 1: Kamu haus setelah olahraga. Pilih yang paling penting!',
        options: [
          { emoji: '🧴', name: 'Air Mineral', price: 5000, correct: true, msg: 'Hebat! Air mineral menghilangkan haus dan harganya hemat.' },
          { emoji: '🍭', name: 'Permen Kapas', price: 10000, correct: false, msg: 'Permen manis justru bikin makin haus! Coba pilih yang lebih penting.' },
          { emoji: '✨', name: 'Stiker Lucu', price: 8000, correct: false, msg: 'Stiker tidak bisa diminum saat haus, ya!' }
        ]
      },
      {
        prompt: 'Ronde 2: Besok ulangan dan pensilmu patah. Mana yang harus dibeli?',
        options: [
          { emoji: '🚗', name: 'Mobil Mainan', price: 35000, correct: false, msg: 'Mainan bisa ditunda dulu, utamakan alat tulis untuk ujian.' },
          { emoji: '✏️', name: 'Pensil & Penghapus', price: 7000, correct: true, msg: 'Tepat! Kamu siap ikut ulangan besok.' },
          { emoji: '🧢', name: 'Topi Keren', price: 25000, correct: false, msg: 'Topi belum mendesak untuk ulangan besok.' }
        ]
      },
      {
        prompt: 'Ronde 3: Perut lapar saat jam istirahat. Uangmu Rp15.000!',
        options: [
          { emoji: '🍱', name: 'Nasi Bento', price: 12000, correct: true, msg: 'Mantap! Perut kenyang dan masih ada sisa Rp3.000 untuk ditabung.' },
          { emoji: '🔑', name: 'Gantungan Kunci', price: 15000, correct: false, msg: 'Gantungan kunci tidak bisa mengenyangkan perutmu.' },
          { emoji: '🎈', name: 'Balon Warna', price: 8000, correct: false, msg: 'Utamakan makanan bergizi saat lapar, ya!' }
        ]
      }
    ];

    let step = 0;
    let started = false;
    const stage = document.getElementById('toko-stage');
    if (!stage) return;

    function renderIntro() {
      stage.innerHTML = `
        <div class="story-box" style="text-align:center">
          Ayo bermain peran sebagai pembeli cerdas di Toko Mini! Ada <strong>3 misi belanja</strong> menantimu.
        </div>
        <button class="cta-btn" id="btn-start-toko">🛒 Mulai Bermain</button>
      `;
      document.getElementById('btn-start-toko').addEventListener('click', () => {
        SoundFX.pop();
        started = true;
        step = 0;
        renderRound();
      });
    }

    function renderRound() {
      const r = rounds[step];
      stage.innerHTML = `
        <div class="budget-bar"><span>🏪 Toko Mini</span><span>Ronde ${step + 1}/3</span></div>
        <div style="font-weight:800; font-size:0.86rem; text-align:center;">${r.prompt}</div>
        <div class="shop-grid">
          ${r.options.map((o, i) => `
            <button class="shop-item" data-toko-opt="${i}">
              <span class="emoji">${o.emoji}</span>
              <span class="name">${o.name}</span>
              <span class="price">${formatRp(o.price)}</span>
            </button>
          `).join('')}
        </div>
        <div id="toko-fb" class="feedback-banner info">Pilih satu barang di atas!</div>
      `;

      stage.querySelectorAll('[data-toko-opt]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const opt = r.options[Number(btn.dataset.tokoOpt)];
          const fb = document.getElementById('toko-fb');
          if (opt.correct) {
            btn.classList.add('selected');
            SoundFX.coin();
            fb.className = 'feedback-banner success';
            fb.textContent = opt.msg;
            setTimeout(() => {
              step++;
              if (step < rounds.length) {
                renderRound();
              } else {
                const isNew = awardStars('toko_mini', 3);
                stage.innerHTML = `
                  <div class="feedback-banner success">
                    🎉 <strong>Misi Toko Mini Selesai!</strong><br/>
                    Kamu berhasil memilih kebutuhan dengan bijak! ${isNew ? '(+3 ⭐)' : ''}
                  </div>
                  <button class="cta-btn small blue" id="btn-replay-toko">🔄 Main Lagi</button>
                `;
                document.getElementById('btn-replay-toko').addEventListener('click', () => {
                  step = 0;
                  renderRound();
                });
              }
            }, 950);
          } else {
            SoundFX.error();
            fb.className = 'feedback-banner error';
            fb.textContent = opt.msg;
          }
        });
      });
    }

    renderIntro();
  }

  // Hal 12: Mini Game 2 — Tantangan Memilih Barang (Rp50.000)
  function initChallenge50k() {
    const budget = 50000;
    const items = [
      { id: 'bottle', emoji: '🧴', name: 'Botol Air', price: 5000, need: true },
      { id: 'bear', emoji: '🧸', name: 'Boneka Beruang', price: 30000, need: false },
      { id: 'headphone', emoji: '🎧', name: 'Headphone', price: 40000, need: false }
    ];
    let selected = new Set();

    const grid = document.getElementById('ch50-grid');
    const remEl = document.getElementById('ch50-rem');
    const fbEl = document.getElementById('ch50-fb');
    const checkBtn = document.getElementById('ch50-check');
    if (!grid) return;

    function updateUI() {
      let spent = 0;
      items.forEach((it) => { if (selected.has(it.id)) spent += it.price; });
      const rem = budget - spent;
      remEl.textContent = formatRp(rem);
      grid.querySelectorAll('.shop-item').forEach((el) => {
        el.classList.toggle('selected', selected.has(el.dataset.id));
      });
    }

    grid.innerHTML = items.map((it) => `
      <button class="shop-item" data-id="${it.id}">
        <span class="emoji">${it.emoji}</span>
        <span class="name">${it.name}</span>
        <span class="price">${formatRp(it.price)}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.shop-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = items.find((x) => x.id === id);
        if (selected.has(id)) {
          selected.delete(id);
          SoundFX.pop();
        } else {
          let spent = 0;
          items.forEach((it) => { if (selected.has(it.id)) spent += it.price; });
          if (spent + item.price > budget) {
            SoundFX.error();
            fbEl.className = 'feedback-banner error';
            fbEl.textContent = `Uangmu tidak cukup! Total melebihi ${formatRp(budget)}.`;
            return;
          }
          selected.add(id);
          SoundFX.coin();
        }
        fbEl.className = 'feedback-banner info';
        fbEl.textContent = 'Klik "Cek Pilihan" jika sudah yakin!';
        updateUI();
      });
    });

    checkBtn.addEventListener('click', () => {
      if (selected.size === 0) {
        SoundFX.error();
        fbEl.className = 'feedback-banner warn';
        fbEl.textContent = 'Pilih minimal satu barang terlebih dahulu!';
        return;
      }
      if (selected.has('bottle') && selected.size === 1) {
        awardStars('challenge_50k', 3);
        fbEl.className = 'feedback-banner success';
        fbEl.textContent = '🌟 Cerdas! Botol Air adalah kebutuhan penting dan kamu bisa menabung Rp45.000!';
      } else if (selected.has('bottle')) {
        awardStars('challenge_50k', 2);
        fbEl.className = 'feedback-banner success';
        fbEl.textContent = 'Bagus! Kamu sudah memilih Botol Air (kebutuhan), sisanya bisa ditabung.';
      } else {
        SoundFX.warn && SoundFX.pop();
        fbEl.className = 'feedback-banner warn';
        fbEl.textContent = 'Hmm, kamu belum memilih Botol Air yang lebih dibutuhkan untuk minum sehari-hari.';
      }
    });
    updateUI();
  }

  // Hal 13: Mini Game 3 — Atur Uangmu! (Rp100.000)
  function initAturUang100k() {
    const budget = 100000;
    const items = [
      { id: 'book', emoji: '📘', name: 'Buku', price: 30000, cat: 'need' },
      { id: 'snack', emoji: '🍿', name: 'Snack', price: 10000, cat: 'want' },
      { id: 'toy', emoji: '🧸', name: 'Mainan', price: 60000, cat: 'want' },
      { id: 'save', emoji: '🐷', name: 'Tabung', price: 20000, cat: 'save' },
      { id: 'share', emoji: '🎁', name: 'Berbagi', price: 10000, cat: 'share' }
    ];
    let cart = new Set();

    const listEl = document.getElementById('g100-grid');
    const remEl = document.getElementById('g100-rem');
    const fbEl = document.getElementById('g100-fb');
    const finishBtn = document.getElementById('g100-finish');
    if (!listEl) return;

    function render() {
      let spent = 0;
      items.forEach((it) => { if (cart.has(it.id)) spent += it.price; });
      remEl.textContent = formatRp(budget - spent);
      listEl.querySelectorAll('.shop-item').forEach((el) => {
        el.classList.toggle('selected', cart.has(el.dataset.id));
      });
    }

    listEl.innerHTML = items.map((it) => `
      <button class="shop-item" data-id="${it.id}">
        <span class="emoji">${it.emoji}</span>
        <span class="name">${it.name}</span>
        <span class="price">${formatRp(it.price)}</span>
      </button>
    `).join('');

    listEl.querySelectorAll('.shop-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = items.find((x) => x.id === id);
        if (cart.has(id)) {
          cart.delete(id);
          SoundFX.pop();
        } else {
          let spent = 0;
          items.forEach((it) => { if (cart.has(it.id)) spent += it.price; });
          if (spent + item.price > budget) {
            SoundFX.error();
            fbEl.className = 'feedback-banner error';
            fbEl.textContent = 'Anggaran Rp100.000 tidak cukup jika semua dipilih! Atur prioritasmu.';
            return;
          }
          cart.add(id);
          SoundFX.coin();
        }
        render();
      });
    });

    finishBtn.addEventListener('click', () => {
      if (cart.size === 0) {
        SoundFX.error();
        fbEl.className = 'feedback-banner warn';
        fbEl.textContent = 'Pilih alokasi uangmu dulu, ya!';
        return;
      }
      const hasNeed = cart.has('book');
      const hasSaveOrShare = cart.has('save') || cart.has('share');
      if (hasNeed && hasSaveOrShare) {
        const isNew = awardStars('atur_100k', 3);
        fbEl.className = 'feedback-banner success';
        fbEl.textContent = `🎉 Luar biasa! Kamu memprioritaskan Buku (kebutuhan) sekaligus menyisihkan untuk menabung/berbagi! ${isNew ? '(+3 ⭐)' : ''}`;
      } else if (hasNeed) {
        awardStars('atur_100k', 2);
        fbEl.className = 'feedback-banner success';
        fbEl.textContent = 'Bagus! Kamu membeli Buku yang dibutuhkan. Coba sisihkan juga untuk Tabung atau Berbagi!';
      } else {
        SoundFX.pop();
        fbEl.className = 'feedback-banner warn';
        fbEl.textContent = 'Ups, jangan habiskan uang hanya untuk keinginan. Utamakan Buku dan Menabung, ya!';
      }
    });
    render();
  }

  // Hal 14: Mini Game 4 — Kuis Seru! (5 Questions)
  function initMainQuiz() {
    const questions = [
      {
        q: '1. Apa fungsi utama uang?',
        opts: ['Alat tukar untuk membeli barang/jasa', 'Hiasan dinding rumah', 'Mainan lempar-lemparan'],
        ans: 0
      },
      {
        q: '2. Manakah yang termasuk KEBUTUHAN?',
        opts: ['Mainan robot mahal', 'Makanan bergizi dan buku sekolah', 'Snack kekinian'],
        ans: 1
      },
      {
        q: '3. Apa manfaat menabung sejak dini?',
        opts: ['Uang cepat habis', 'Membantu mewujudkan impian & masa depan', 'Membuat teman iri'],
        ans: 1
      },
      {
        q: '4. Sebelum menabung untuk target, apa yang harus dilakukan?',
        opts: ['Menghitung berapa uang & lama menabung', 'Membeli semua keinginan dulu', 'Melupakan tujuan'],
        ans: 0
      },
      {
        q: '5. Selain menabung, sikap baik apa yang diajarkan di buku ini?',
        opts: ['Boros setiap hari', 'Berbagi dengan sesama', 'Menyembunyikan uang'],
        ans: 1
      }
    ];

    let qIdx = 0;
    let score = 0;
    const container = document.getElementById('quiz-stage');
    if (!container) return;

    function renderIntro() {
      container.innerHTML = `
        <div class="illus-wrap">${Illustrations.trophy()}</div>
        <p class="page-subtitle">Yuk, uji pemahamanmu setelah belajar lewat 5 pertanyaan seru!</p>
        <button class="cta-btn" id="btn-start-quiz">🏆 Mulai Kuis</button>
      `;
      document.getElementById('btn-start-quiz').addEventListener('click', () => {
        SoundFX.pop();
        qIdx = 0;
        score = 0;
        renderQuestion();
      });
    }

    function renderQuestion() {
      const curr = questions[qIdx];
      container.innerHTML = `
        <div class="budget-bar"><span>❓ Kuis Seru</span><span>Soal ${qIdx + 1}/${questions.length}</span></div>
        <div style="font-weight:800; font-size:0.9rem;">${curr.q}</div>
        <div class="quiz-options">
          ${curr.opts.map((o, i) => `<button class="quiz-opt" data-qi="${i}">${o}</button>`).join('')}
        </div>
        <div id="quiz-fb" class="feedback-banner info">Pilih jawaban yang paling tepat!</div>
      `;

      container.querySelectorAll('.quiz-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          const picked = Number(btn.dataset.qi);
          const allBtns = container.querySelectorAll('.quiz-opt');
          allBtns.forEach((b) => (b.disabled = true));
          const fb = document.getElementById('quiz-fb');

          if (picked === curr.ans) {
            btn.classList.add('correct');
            score++;
            SoundFX.coin();
            fb.className = 'feedback-banner success';
            fb.textContent = 'Benar sekali! 🎉';
          } else {
            btn.classList.add('wrong');
            allBtns[curr.ans].classList.add('correct');
            SoundFX.error();
            fb.className = 'feedback-banner error';
            fb.textContent = 'Kurang tepat, perhatikan jawaban hijau ya!';
          }

          setTimeout(() => {
            qIdx++;
            if (qIdx < questions.length) {
              renderQuestion();
            } else {
              const earned = score >= 3 ? awardStars('main_quiz', 4) : false;
              container.innerHTML = `
                <div class="illus-wrap">${Illustrations.trophy()}</div>
                <div class="feedback-banner ${score >= 3 ? 'success' : 'warn'}">
                  Skor Kamu: <strong>${score} / ${questions.length}</strong>!<br/>
                  ${score >= 3 ? `Hebat! Kamu lulus kuis! ${earned ? '(+4 ⭐)' : ''}` : 'Ayo baca lagi materinya dan coba sekali lagi!'}
                </div>
                <button class="cta-btn small blue" id="btn-retry-quiz">🔄 Ulangi Kuis</button>
              `;
              document.getElementById('btn-retry-quiz').addEventListener('click', () => {
                qIdx = 0;
                score = 0;
                renderQuestion();
              });
            }
          }, 1050);
        });
      });
    }

    renderIntro();
  }

  // Hal 15: Misi 7 Hari Menabung
  function initMission7Days() {
    const grid = document.getElementById('mission-days-grid');
    const summary = document.getElementById('mission-summary');
    if (!grid) return;

    function render() {
      const doneCount = state.missionDays.filter(Boolean).length;
      grid.innerHTML = state.missionDays.map((done, i) => `
        <button class="mission-day ${done ? 'done' : ''}" data-day="${i}">
          <span>📅 Hari ${i + 1}</span>
          <span>${done ? '✅ Sudah Menabung!' : '⬜ Klik jika sudah'}</span>
        </button>
      `).join('');
      summary.textContent = `Progres: ${doneCount} / 7 hari tercapai!`;

      grid.querySelectorAll('.mission-day').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.day);
          state.missionDays[idx] = !state.missionDays[idx];
          if (state.missionDays[idx]) SoundFX.coin();
          else SoundFX.pop();
          if (state.missionDays.every(Boolean)) {
            awardStars('mission_7', 5);
          }
          saveState();
          render();
        });
      });
    }
    render();
  }

  // Hal 17: Certificate
  function initCertificate() {
    const input = document.getElementById('cert-name-input');
    const printBtn = document.getElementById('btn-print-cert');
    if (!input) return;

    input.value = state.certName || '';
    input.addEventListener('input', () => {
      state.certName = input.value;
      saveState();
    });
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        SoundFX.success();
        window.print();
      });
    }
  }

  return { initAll };
})();
