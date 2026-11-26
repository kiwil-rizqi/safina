/**
 * Custom Crisp Vector SVG Illustrations for Misi: Uang Pintar!
 */
const Illustrations = {
  rafi(size = 130) {
    return `
      <svg viewBox="0 0 140 150" width="${size}" height="${size}" aria-label="Rafi">
        <circle cx="70" cy="75" r="62" fill="#e6f3ff"/>
        <!-- Backpack straps -->
        <rect x="40" y="96" width="60" height="40" rx="16" fill="#4f8ef7"/>
        <rect x="52" y="98" width="36" height="38" rx="10" fill="#ffffff"/>
        <path d="M56 98 L56 135 M84 98 L84 135" stroke="#2f66c8" stroke-width="6" stroke-linecap="round"/>
        <!-- Neck & Head -->
        <rect x="62" y="84" width="16" height="16" rx="6" fill="#fbd2b4"/>
        <circle cx="70" cy="60" r="30" fill="#fbd2b4"/>
        <!-- Hair -->
        <path d="M39 58 C38 30, 102 28, 101 58 C95 45, 80 42, 70 46 C58 42, 46 47, 39 58 Z" fill="#4e342e"/>
        <path d="M52 34 Q70 22 86 35" fill="#4e342e"/>
        <!-- Eyes & Smile -->
        <circle cx="58" cy="62" r="4" fill="#2c2c2c"/>
        <circle cx="82" cy="62" r="4" fill="#2c2c2c"/>
        <circle cx="59.5" cy="60.5" r="1.4" fill="#fff"/>
        <circle cx="83.5" cy="60.5" r="1.4" fill="#fff"/>
        <circle cx="50" cy="69" r="4.5" fill="#ff9aa2" opacity="0.55"/>
        <circle cx="90" cy="69" r="4.5" fill="#ff9aa2" opacity="0.55"/>
        <path d="M62 72 Q70 79 78 72" fill="none" stroke="#8d493a" stroke-width="3" stroke-linecap="round"/>
        <!-- Coin in hand -->
        <circle cx="108" cy="108" r="13" fill="#ffd147" stroke="#d99b00" stroke-width="2.5"/>
        <text x="108" y="113" text-anchor="middle" font-size="11" font-weight="bold" fill="#9e6500">Rp</text>
      </svg>`;
  },

  alya(size = 130) {
    return `
      <svg viewBox="0 0 140 150" width="${size}" height="${size}" aria-label="Alya">
        <circle cx="70" cy="75" r="62" fill="#fff0f4"/>
        <!-- Hijab & Body -->
        <path d="M34 72 C34 30, 106 30, 106 72 L110 132 C95 140, 45 140, 30 132 Z" fill="#ff8fab"/>
        <path d="M40 100 Q70 116 100 100 L104 134 Q70 142 36 134 Z" fill="#fb6f92"/>
        <!-- Face -->
        <circle cx="70" cy="64" r="26" fill="#fde0c8"/>
        <!-- Hijab Inner Rim -->
        <path d="M44 64 C44 40, 96 40, 96 64 C96 48, 84 43, 70 43 C56 43, 44 48, 44 64 Z" fill="#ffc2d1"/>
        <!-- Eyes & Smile -->
        <circle cx="59" cy="65" r="3.8" fill="#2c2c2c"/>
        <circle cx="81" cy="65" r="3.8" fill="#2c2c2c"/>
        <circle cx="60.3" cy="63.6" r="1.3" fill="#fff"/>
        <circle cx="82.3" cy="63.6" r="1.3" fill="#fff"/>
        <circle cx="52" cy="72" r="4" fill="#ff8fa3" opacity="0.5"/>
        <circle cx="88" cy="72" r="4" fill="#ff8fa3" opacity="0.5"/>
        <path d="M63 75 Q70 81 77 75" fill="none" stroke="#8d493a" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Little Book -->
        <rect x="46" y="106" width="48" height="28" rx="6" fill="#74b9ff" stroke="#2f80ed" stroke-width="2"/>
        <line x1="70" y1="106" x2="70" y2="134" stroke="#ffffff" stroke-width="2.5"/>
      </svg>`;
  },

  coverScene() {
    return `
      <svg viewBox="0 0 320 200" width="290" height="182" aria-label="Rafi, Alya, dan Celengan">
        <!-- Floating Coins -->
        <circle cx="48" cy="36" r="16" fill="#ffd147" stroke="#d99b00" stroke-width="3"/>
        <text x="48" y="41" text-anchor="middle" font-size="12" font-weight="bold" fill="#855200">Rp</text>
        <circle cx="272" cy="40" r="15" fill="#ffd147" stroke="#d99b00" stroke-width="3"/>
        <text x="272" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#855200">★</text>
        <circle cx="160" cy="24" r="13" fill="#ffe082" stroke="#d99b00" stroke-width="2.5"/>

        <!-- Rafi Left -->
        <g transform="translate(14, 34) scale(0.86)">
          <rect x="40" y="96" width="60" height="44" rx="16" fill="#4f8ef7"/>
          <rect x="52" y="98" width="36" height="40" rx="10" fill="#ffffff"/>
          <circle cx="70" cy="60" r="30" fill="#fbd2b4"/>
          <path d="M39 58 C38 30, 102 28, 101 58 C95 45, 80 42, 70 46 C58 42, 46 47, 39 58 Z" fill="#4e342e"/>
          <circle cx="58" cy="62" r="4" fill="#2c2c2c"/>
          <circle cx="82" cy="62" r="4" fill="#2c2c2c"/>
          <path d="M62 72 Q70 79 78 72" fill="none" stroke="#8d493a" stroke-width="3" stroke-linecap="round"/>
        </g>

        <!-- Alya Right -->
        <g transform="translate(182, 34) scale(0.86)">
          <path d="M34 72 C34 30, 106 30, 106 72 L110 136 C95 144, 45 144, 30 136 Z" fill="#ff8fab"/>
          <circle cx="70" cy="64" r="26" fill="#fde0c8"/>
          <circle cx="59" cy="65" r="3.8" fill="#2c2c2c"/>
          <circle cx="81" cy="65" r="3.8" fill="#2c2c2c"/>
          <path d="M63 75 Q70 81 77 75" fill="none" stroke="#8d493a" stroke-width="2.8" stroke-linecap="round"/>
        </g>

        <!-- Piggy Bank Center -->
        <g transform="translate(106, 98)">
          <ellipse cx="54" cy="48" rx="44" ry="34" fill="#ffb3c6" stroke="#fb6f92" stroke-width="3"/>
          <ellipse cx="22" cy="48" rx="12" ry="15" fill="#ff8fab" stroke="#fb6f92" stroke-width="2.5"/>
          <circle cx="18" cy="45" r="2.3" fill="#9e2a4a"/>
          <circle cx="25" cy="45" r="2.3" fill="#9e2a4a"/>
          <circle cx="38" cy="36" r="4" fill="#2c2c2c"/>
          <circle cx="39.2" cy="34.8" r="1.3" fill="#fff"/>
          <!-- Ears & Slot -->
          <path d="M40 18 L48 5 L60 17 Z" fill="#ff8fab" stroke="#fb6f92" stroke-width="2.5"/>
          <rect x="48" y="18" width="22" height="5" rx="2.5" fill="#9e2a4a"/>
          <!-- Legs -->
          <rect x="28" y="74" width="12" height="14" rx="5" fill="#ff8fab"/>
          <rect x="68" y="74" width="12" height="14" rx="5" fill="#ff8fab"/>
        </g>
      </svg>`;
  },

  walletCoins() {
    return `
      <svg viewBox="0 0 220 140" width="200" height="125" aria-label="Dompet dan Uang">
        <!-- Banknotes -->
        <rect x="46" y="18" width="110" height="54" rx="8" fill="#52b788" stroke="#2d6a4f" stroke-width="2.5" transform="rotate(-8 100 45)"/>
        <rect x="64" y="22" width="110" height="54" rx="8" fill="#74c69d" stroke="#2d6a4f" stroke-width="2.5" transform="rotate(6 110 45)"/>
        <!-- Wallet -->
        <rect x="36" y="48" width="136" height="78" rx="14" fill="#b07d4f" stroke="#7f5539" stroke-width="3"/>
        <rect x="128" y="72" width="48" height="28" rx="8" fill="#9c6644" stroke="#7f5539" stroke-width="2.5"/>
        <circle cx="144" cy="86" r="5" fill="#ffd147"/>
        <!-- Coins -->
        <circle cx="186" cy="40" r="16" fill="#ffd147" stroke="#d99b00" stroke-width="2.5"/>
        <text x="186" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#855200">Rp</text>
        <circle cx="195" cy="106" r="14" fill="#ffe082" stroke="#d99b00" stroke-width="2.5"/>
      </svg>`;
  },

  moneyJar(fillPercent = 45) {
    const clamped = Math.max(10, Math.min(90, fillPercent));
    const coinRows = Math.ceil(clamped / 25);
    let coins = '';
    for (let r = 0; r < coinRows; r++) {
      const y = 114 - r * 16;
      coins += `<circle cx="52" cy="${y}" r="10" fill="#ffd147" stroke="#d99b00" stroke-width="2"/>`;
      coins += `<circle cx="72" cy="${y - 3}" r="10" fill="#ffe082" stroke="#d99b00" stroke-width="2"/>`;
      coins += `<circle cx="90" cy="${y}" r="10" fill="#ffd147" stroke="#d99b00" stroke-width="2"/>`;
    }
    return `
      <svg viewBox="0 0 140 150" width="128" height="136" aria-label="Toples Tabungan">
        <rect x="42" y="14" width="56" height="14" rx="6" fill="#d99b00" stroke="#9e6500" stroke-width="2.5"/>
        <rect x="30" y="28" width="80" height="106" rx="20" fill="#e8f7ff" stroke="#74b9ff" stroke-width="3"/>
        ${coins}
        <rect x="38" y="64" width="64" height="24" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <text x="70" y="80" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="11" font-weight="bold" fill="#1f4e8c">TABUNGAN</text>
      </svg>`;
  },

  targetBoard() {
    return `
      <svg viewBox="0 0 140 140" width="120" height="120" aria-label="Target Tabungan">
        <circle cx="70" cy="70" r="54" fill="#ff6b6b" stroke="#c92a2a" stroke-width="3"/>
        <circle cx="70" cy="70" r="38" fill="#ffffff"/>
        <circle cx="70" cy="70" r="23" fill="#ff6b6b"/>
        <circle cx="70" cy="70" r="10" fill="#ffd147"/>
        <line x1="70" y1="70" x2="122" y2="20" stroke="#2f80ed" stroke-width="4" stroke-linecap="round"/>
        <polygon points="122,20 110,20 122,32" fill="#2f80ed"/>
      </svg>`;
  },

  giftShare() {
    return `
      <svg viewBox="0 0 160 130" width="150" height="122" aria-label="Berbagi Hadiah">
        <rect x="36" y="48" width="88" height="66" rx="10" fill="#ff8fab" stroke="#e6396b" stroke-width="3"/>
        <rect x="30" y="34" width="100" height="20" rx="7" fill="#ffb3c6" stroke="#e6396b" stroke-width="3"/>
        <rect x="72" y="34" width="16" height="80" fill="#ffd147"/>
        <path d="M80 34 C64 12, 46 24, 66 34 Z" fill="#ffd147" stroke="#d99b00" stroke-width="2"/>
        <path d="M80 34 C96 12, 114 24, 94 34 Z" fill="#ffd147" stroke="#d99b00" stroke-width="2"/>
        <text x="20" y="32" font-size="18" fill="#ff6b8b">♥</text>
        <text x="132" y="28" font-size="16" fill="#ffd147">★</text>
      </svg>`;
  },

  trophy() {
    return `
      <svg viewBox="0 0 140 140" width="120" height="120" aria-label="Piala Kuis">
        <path d="M36 28 H104 V60 C104 82, 88 94, 70 94 C52 94, 36 82, 36 60 Z" fill="#ffd147" stroke="#d99b00" stroke-width="3"/>
        <path d="M36 36 H22 C16 36, 16 62, 36 62" fill="none" stroke="#d99b00" stroke-width="4"/>
        <path d="M104 36 H118 C124 36, 124 62, 104 62" fill="none" stroke="#d99b00" stroke-width="4"/>
        <rect x="63" y="94" width="14" height="20" fill="#d99b00"/>
        <rect x="44" y="114" width="52" height="14" rx="6" fill="#9e6500"/>
        <text x="70" y="66" text-anchor="middle" font-size="24" fill="#fff">★</text>
      </svg>`;
  },

  medal() {
    return `
      <svg viewBox="0 0 100 100" width="76" height="76" aria-label="Medali Sertifikat">
        <polygon points="32,56 22,94 42,84 50,96 50,56" fill="#ef4444"/>
        <polygon points="68,56 78,94 58,84 50,96 50,56" fill="#dc2626"/>
        <circle cx="50" cy="40" r="28" fill="#ffd147" stroke="#d97706" stroke-width="4"/>
        <circle cx="50" cy="40" r="20" fill="#ffe082"/>
        <text x="50" y="47" text-anchor="middle" font-size="22" fill="#b45309">★</text>
      </svg>`;
  }
};
