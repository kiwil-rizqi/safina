/**
 * Lightweight Web Audio API Sound Effects (No external assets needed)
 */
const SoundFX = (() => {
  let ctx = null;
  let enabled = true;

  function getCtx() {
    if (!enabled) return null;
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.12, delay = 0) {
    const audio = getCtx();
    if (!audio) return;
    const now = audio.currentTime + delay;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  return {
    isEnabled: () => enabled,
    toggle() {
      enabled = !enabled;
      return enabled;
    },
    flip() {
      const audio = getCtx();
      if (!audio) return;
      // Soft paper swish using filtered noise
      const bufferSize = audio.sampleRate * 0.14;
      const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = audio.createBufferSource();
      noise.buffer = buffer;
      const filter = audio.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, audio.currentTime);
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0.08, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.14);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audio.destination);
      noise.start();
    },
    coin() {
      playTone(1318.5, 0.1, 'sine', 0.12, 0);
      playTone(1760, 0.22, 'sine', 0.12, 0.08);
    },
    pop() {
      playTone(520, 0.08, 'triangle', 0.1, 0);
    },
    success() {
      playTone(523.25, 0.12, 'triangle', 0.12, 0);
      playTone(659.25, 0.12, 'triangle', 0.12, 0.1);
      playTone(783.99, 0.24, 'triangle', 0.14, 0.2);
    },
    error() {
      playTone(260, 0.14, 'sawtooth', 0.07, 0);
      playTone(210, 0.18, 'sawtooth', 0.07, 0.12);
    }
  };
})();
