// Audio Synthesizer for Fortnite Battle Royale & Crown Wins
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.4, this.ctx.currentTime);
    }
    return this.muted;
  }

  // Create White Noise buffer
  createNoiseBuffer(duration = 0.5) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // Gunfire: Pump Shotgun
  playShotgun() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    // Heavy bass thump
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.25);
    oscGain.gain.setValueAtTime(0.9, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.35);

    // Blast noise
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.3);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.3);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);
  }

  // Gunfire: SCAR Assault Rifle
  playRifle() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.12);
    oscGain.gain.setValueAtTime(0.6, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.15);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.12);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1500, t);
    filter.Q.setValueAtTime(3, t);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);
  }

  // Gunfire: Sniper Rifle
  playSniper() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.5);
    oscGain.gain.setValueAtTime(0.9, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.6);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.7);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3500, t);
    filter.frequency.exponentialRampToValueAtTime(150, t + 0.7);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.7);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);
  }

  // Gunfire: SMG
  playSMG() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);
    oscGain.gain.setValueAtTime(0.4, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Pickaxe swing & hit
  playPickaxe() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Hitmarker sound
  playHit(isShield = false, isCrit = false) {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    if (isCrit) {
      // Golden Headshot ping
      osc.frequency.setValueAtTime(1760, t); // A6
      osc.frequency.setValueAtTime(2349, t + 0.05); // D7
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
    } else if (isShield) {
      // Electric shield ting
      osc.frequency.setValueAtTime(1320, t);
      gain.gain.setValueAtTime(0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    } else {
      // Body flesh thud
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.08);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + (isCrit ? 0.22 : 0.13));
  }

  // Shield Break "Crack!"
  playShieldBreak() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    [1800, 2400, 3100].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + idx * 0.03);
      osc.frequency.exponentialRampToValueAtTime(200, t + 0.25 + idx * 0.03);
      gain.gain.setValueAtTime(0.4, t + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25 + idx * 0.03);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.03);
      osc.stop(t + 0.3 + idx * 0.03);
    });
  }

  // Building Wall sound
  playBuild() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.12);
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Chest Open / Shimmer
  playChestOpen() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.07);
      gain.gain.setValueAtTime(0.3, t + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.07 + 0.4);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + i * 0.07);
      osc.stop(t + i * 0.07 + 0.45);
    });
  }

  // Consumable Drink / Heal
  playDrink() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;
    // Chug glugs
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 + i * 80, t + i * 0.15);
      osc.frequency.exponentialRampToValueAtTime(600 + i * 100, t + i * 0.15 + 0.12);
      gain.gain.setValueAtTime(0.4, t + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.15 + 0.14);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + i * 0.15);
      osc.stop(t + i * 0.15 + 0.15);
    }
  }

  // Elimination chime
  playElimination() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;
    const notes = [659.25, 880, 1174.66]; // E5, A5, D6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);
      gain.gain.setValueAtTime(0.5, t + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.4);
    });
  }

  // Storm Alarm Klaxon
  playStormWarning() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.linearRampToValueAtTime(140, t + 0.6);
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.65);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.7);
  }

  // Battle bus horn
  playBusHorn() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;
    [220, 277.18].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 1.25);
    });
  }

  // VICTORY ROYALE CELEBRATION FANFARE!
  playVictoryRoyale() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    // Triumphant brass sequence: G4, C5, E5, G5, Hold C6
    const chordSeq = [
      { time: 0.0, freqs: [392.00, 523.25], dur: 0.25 }, // G4, C5
      { time: 0.25, freqs: [392.00, 523.25], dur: 0.18 },
      { time: 0.45, freqs: [523.25, 659.25], dur: 0.22 }, // C5, E5
      { time: 0.70, freqs: [659.25, 783.99], dur: 0.3 },  // E5, G5
      { time: 1.05, freqs: [523.25, 659.25, 1046.50], dur: 1.8 } // Triumphant C Major chord!
    ];

    chordSeq.forEach(step => {
      step.freqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t + step.time);

        gain.gain.setValueAtTime(0.35, t + step.time);
        gain.gain.exponentialRampToValueAtTime(0.01, t + step.time + step.dur);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2600, t + step.time);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t + step.time);
        osc.stop(t + step.time + step.dur + 0.05);
      });
    });
  }

  // CROWNING ACHIEVEMENT EMOTE: Angelic chorus, chime arpeggio & fanfare!
  playCrownEmote() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    // Golden Harp Arpeggio up to Heaven
    const harpNotes = [
      523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
      1318.51, 1567.98, 2093.00        // E6, G6, C7
    ];

    harpNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0.4, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.005, t + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.85);
    });

    // Celestial Choir Pad / Shimmer
    const choirOsc = this.ctx.createOscillator();
    const choirGain = this.ctx.createGain();
    choirOsc.type = 'triangle';
    choirOsc.frequency.setValueAtTime(523.25, t + 0.6);
    choirGain.gain.setValueAtTime(0.01, t + 0.6);
    choirGain.gain.linearRampToValueAtTime(0.3, t + 1.0);
    choirGain.gain.exponentialRampToValueAtTime(0.01, t + 2.5);

    choirOsc.connect(choirGain);
    choirGain.connect(this.masterGain);
    choirOsc.start(t + 0.6);
    choirOsc.stop(t + 2.6);

    // Royal Horn Blast
    setTimeout(() => {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;
      [659.25, 1046.50].forEach(f => {
        const horn = this.ctx.createOscillator();
        const hornG = this.ctx.createGain();
        horn.type = 'sawtooth';
        horn.frequency.setValueAtTime(f, now);
        hornG.gain.setValueAtTime(0.3, now);
        hornG.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
        horn.connect(hornG);
        hornG.connect(this.masterGain);
        horn.start(now);
        horn.stop(now + 1.25);
      });
    }, 600);
  }

  // V-Bucks Coin Pickup Ding
  playCoinPickup() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(987.77, t); // B5
    osc1.frequency.setValueAtTime(1318.51, t + 0.08); // E6
    osc2.frequency.setValueAtTime(1975.53, t + 0.08); // B6 harmonic

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t + 0.08);
    osc1.stop(t + 0.36);
    osc2.stop(t + 0.36);
  }

  // Item Shop Purchase Fanfare
  playItemPurchase() {
    if (this.muted) return;
    this.init();
    const t = this.ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - High C
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.09);

      gain.gain.setValueAtTime(0.35, t + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.005, t + i * 0.09 + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + i * 0.09);
      osc.stop(t + i * 0.09 + 0.55);
    });
  }
}

window.soundSystem = new SoundSystem();

