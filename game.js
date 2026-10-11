// Fortnite Battle Royale 100-Player Engine & Crown Wins System
(function() {
  'use strict';

  // Weapon Definitions
  const WEAPONS = {
    pickaxe: { name: 'Harvesting Tool', type: 'melee', rarity: 'common', damage: 20, rate: 450, icon: '⛏️' },
    scar: { name: 'SCAR Rifle', type: 'gun', rarity: 'legendary', damage: 36, headshotMult: 1.5, rate: 120, mag: 30, range: 650, spread: 0.05, speed: 24, icon: '🔫' },
    pump: { name: 'Pump Shotgun', type: 'shotgun', rarity: 'epic', damage: 18, pellets: 7, headshotMult: 2.0, rate: 850, mag: 5, range: 380, spread: 0.22, speed: 20, icon: '💥' },
    sniper: { name: 'Bolt Sniper', type: 'sniper', rarity: 'legendary', damage: 116, headshotMult: 2.5, rate: 1400, mag: 1, range: 1100, spread: 0.01, speed: 36, icon: '🎯' },
    smg: { name: 'Tactical SMG', type: 'gun', rarity: 'rare', damage: 20, headshotMult: 1.5, rate: 75, mag: 35, range: 450, spread: 0.12, speed: 22, icon: '⚡' },
    mini: { name: 'Mini Shield', type: 'heal', rarity: 'uncommon', healShield: 25, maxShield: 50, count: 3, icon: '🧪' },
    bigShield: { name: 'Big Shield Potion', type: 'heal', rarity: 'rare', healShield: 50, maxShield: 100, count: 1, icon: '⚗️' },
    medkit: { name: 'Medkit', type: 'heal', rarity: 'uncommon', healHealth: 100, maxHealth: 100, count: 1, icon: '🩹' }
  };

  // Character Skins Definitions (Named Hero Skins)
  const SKINS = {
    jonesy: {
      id: 'jonesy',
      name: 'Agent Jonesy',
      title: 'The Default O.G. Operative',
      rarity: 'common',
      price: 0,
      bodyColor: '#2b6cb0',
      vestColor: '#2d3748',
      accentColor: '#319795',
      defaultSkinColor: '#fdcb6e',
      defaultHairColor: '#f6e05e',
      defaultHairStyle: 'crewcut',
      icon: '👱'
    },
    shadowRaven: {
      id: 'shadowRaven',
      name: 'Shadow Raven',
      title: 'Master of Dark Nebulas',
      rarity: 'legendary',
      price: 1200,
      bodyColor: '#1e1035',
      vestColor: '#120a22',
      accentColor: '#9b5de5',
      defaultSkinColor: '#c4b5fd',
      defaultHairColor: '#0f0a1c',
      defaultHairStyle: 'anime',
      icon: '🥷'
    },
    cyberDrift: {
      id: 'cyberDrift',
      name: 'Cyber Drift',
      title: 'Dimensional Kitsune Warrior',
      rarity: 'legendary',
      price: 1500,
      bodyColor: '#e63946',
      vestColor: '#1d3557',
      accentColor: '#ff007f',
      defaultSkinColor: '#fdcb6e',
      defaultHairColor: '#ff007f',
      defaultHairStyle: 'anime',
      icon: '🦊'
    },
    peelyRoyale: {
      id: 'peelyRoyale',
      name: 'Peely Royale',
      title: 'Potassium Crown Champion',
      rarity: 'epic',
      price: 800,
      bodyColor: '#ffbe0b',
      vestColor: '#38b000',
      accentColor: '#fb5607',
      defaultSkinColor: '#ffd166',
      defaultHairColor: '#38b000',
      defaultHairStyle: 'curls',
      icon: '🍌'
    },
    midasTouch: {
      id: 'midasTouch',
      name: 'Midas Touch',
      title: '24K Golden Syndicate Boss',
      rarity: 'legendary',
      price: 2000,
      bodyColor: '#14213d',
      vestColor: '#000000',
      accentColor: '#ffd700',
      defaultSkinColor: '#ffd700',
      defaultHairColor: '#111111',
      defaultHairStyle: 'undercut',
      icon: '👑'
    },
    auraStrike: {
      id: 'auraStrike',
      name: 'Aura Strike',
      title: 'Gold-Chained Vault Specialist',
      rarity: 'rare',
      price: 600,
      bodyColor: '#e76f51',
      vestColor: '#f4a261',
      accentColor: '#ffe600',
      defaultSkinColor: '#e0a96d',
      defaultHairColor: '#ffe49e',
      defaultHairStyle: 'ponytail',
      icon: '✨'
    },
    galaxyKnight: {
      id: 'galaxyKnight',
      name: 'Galaxy Knight',
      title: 'Cosmic Void Sovereign',
      rarity: 'mythic',
      price: 2500,
      bodyColor: '#3a0ca3',
      vestColor: '#4361ee',
      accentColor: '#4cc9f0',
      defaultSkinColor: '#480ca8',
      defaultHairColor: '#7209b7',
      defaultHairStyle: 'anime',
      icon: '🌌'
    },
    skullStriker: {
      id: 'skullStriker',
      name: 'Skull Striker',
      title: 'Spectral Graveyard Enforcer',
      rarity: 'epic',
      price: 1000,
      bodyColor: '#1a202c',
      vestColor: '#2d3748',
      accentColor: '#00e5ff',
      defaultSkinColor: '#edf2f7',
      defaultHairColor: '#cbd5e1',
      defaultHairStyle: 'headband',
      icon: '💀'
    }
  };

  // Pickaxes Definitions
  const PICKAXES = {
    classic: {
      id: 'classic',
      name: 'Classic Harvesting Tool',
      rarity: 'common',
      icon: '⛏️',
      handleColor: '#8d5524',
      headColor: '#718096',
      accentColor: '#e2e8f0'
    },
    starWand: {
      id: 'starWand',
      name: 'Star Wand',
      rarity: 'epic',
      icon: '⭐',
      handleColor: '#ff70a6',
      headColor: '#ffd700',
      accentColor: '#00e5ff'
    },
    reaper: {
      id: 'reaper',
      name: 'Reaper Scythe',
      rarity: 'rare',
      icon: '🗡️',
      handleColor: '#1a202c',
      headColor: '#e2e8f0',
      accentColor: '#4a5568'
    },
    slurp: {
      id: 'slurp',
      name: 'Slurp Hammer',
      rarity: 'rare',
      icon: '🔨',
      handleColor: '#2b6cb0',
      headColor: '#00e5ff',
      accentColor: '#38b000'
    },
    goldenSledge: {
      id: 'goldenSledge',
      name: 'Golden Sledge',
      rarity: 'legendary',
      icon: '🪙',
      handleColor: '#b38600',
      headColor: '#ffd700',
      accentColor: '#fff500'
    },
    cyberPlasma: {
      id: 'cyberPlasma',
      name: 'Cyber Plasma Pick',
      rarity: 'mythic',
      icon: '⚡',
      handleColor: '#2a0845',
      headColor: '#ff007f',
      accentColor: '#00e5ff'
    }
  };

  // Skin Tone Options
  const SKIN_COLORS = [
    { id: 'fair', name: 'Fair Peach', hex: '#fdcb6e' },
    { id: 'sunkissed', name: 'Sun-Kissed Tan', hex: '#e0a96d' },
    { id: 'bronze', name: 'Warm Bronze', hex: '#c68642' },
    { id: 'espresso', name: 'Deep Espresso', hex: '#8d5524' },
    { id: 'slurp', name: 'Slurp Hydro', hex: '#00e5ff' },
    { id: 'midas', name: 'Midas Gold', hex: '#ffd700' },
    { id: 'alien', name: 'Alien Emerald', hex: '#00f076' },
    { id: 'obsidian', name: 'Void Obsidian', hex: '#4a4e69' }
  ];

  // Hair Style Options
  const HAIR_STYLES = [
    { id: 'crewcut', name: 'Classic Crewcut', icon: '👦' },
    { id: 'anime', name: 'Anime Spikes', icon: '⚡' },
    { id: 'ponytail', name: 'Long Ponytail', icon: '👱‍♀️' },
    { id: 'curls', name: 'Wild Curls', icon: '🧑‍🦱' },
    { id: 'undercut', name: 'Sleek Undercut', icon: '💇' },
    { id: 'headband', name: 'Tactical Band', icon: '🥷' }
  ];

  // Hair Color Options
  const HAIR_COLORS = [
    { id: 'blond', name: 'Golden Blond', hex: '#f6e05e' },
    { id: 'black', name: 'Midnight Black', hex: '#1a202c' },
    { id: 'brown', name: 'Chestnut Brown', hex: '#6c4f3d' },
    { id: 'pink', name: 'Neon Pink', hex: '#ff007f' },
    { id: 'cyan', name: 'Cyber Cyan', hex: '#00e5ff' },
    { id: 'crimson', name: 'Crimson Red', hex: '#e53e3e' },
    { id: 'purple', name: 'Galactic Purple', hex: '#9b5de5' },
    { id: 'platinum', name: 'Platinum White', hex: '#f7fafc' }
  ];

  // Bot Names Pool
  const BOT_NAMES = [
    'JonesyOG', 'PeelyBoi', 'NoobMaster69', 'SweatSiren', 'DefaultDan',
    'FishstickFan', 'BoxFighter', 'RustLord', 'BushCamper', 'CuddleLeader',
    'RavenClaw', 'DriftKing', 'BriteBomber', 'SkullTrooper', 'MidasTouch',
    'AuraSweat', 'DynamoNinja', 'SoccerSkin', 'LootGoblin', 'StormChaser',
    'RampRusher', 'OnePumpGod', 'GliderPro', 'SlurpSurfer', 'VBuckViper',
    'ZeroPoint', 'TiltedMayor', 'ChugGuzzler', 'ShieldBreaker', 'ApexPredator',
    'BushWookie', 'FloorIsLava', 'HeavySniper', 'BoogieBomber', 'LlamaHunter',
    'BattleBusBoy', 'VictorySeeker', 'CrownHolder', 'SupplySniper', 'ZoneRunner'
  ];

  class BattleRoyaleGame {
    constructor() {
      this.canvas = document.getElementById('gameCanvas');
      this.ctx = this.canvas.getContext('2d');
      this.minimapCanvas = document.getElementById('minimapCanvas');
      this.minimapCtx = this.minimapCanvas.getContext('2d');

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // Stats, Crown & Customization Persistence
      this.loadCareerStats();
      this.loadCustomization();

      // State
      this.state = 'lobby'; // 'lobby', 'bus', 'playing', 'victory', 'eliminated'
      this.island = new IslandMap(3800, 3800);

      // Camera
      this.camera = { x: 1900, y: 1900, width: this.width, height: this.height };

      // Player & Bots
      this.player = null;
      this.bots = [];
      this.projectiles = [];
      this.lootDrops = [];
      this.floatingTexts = [];
      this.particles = [];

      // Storm Circle Phases
      this.stormPhase = 0;
      this.stormTimer = 0;
      this.stormZone = { x: 1900, y: 1900, radius: 2400 };
      this.safeZone = { x: 1900, y: 1900, radius: 1400 };
      this.stormShrinking = false;

      // Inputs
      this.keys = {};
      this.mouse = { x: this.width / 2, y: this.height / 2, worldX: 1900, worldY: 1900, down: false };

      // Bus drop
      this.bus = { x: -200, y: 1900, targetX: 4200, targetY: 1900, speed: 7, progress: 0 };

      // Killfeed
      this.killfeed = [];

      this.initEvents();
      this.initCustomizerEvents();
      this.updateLobbyUI();
      this.renderAvatars();

      // Start RAF loop
      this.lastTime = performance.now();
      requestAnimationFrame(this.loop.bind(this));
    }

    loadCareerStats() {
      const saved = localStorage.getItem('fortnite_crown_stats');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.stats = {
            hasCrown: parsed.hasCrown || false,
            crownWins: parsed.crownWins || 0,
            consecutiveWins: parsed.consecutiveWins || 0,
            bestStreak: parsed.bestStreak || 0,
            totalWins: parsed.totalWins || 0,
            totalElims: parsed.totalElims || 0,
            matchesPlayed: parsed.matchesPlayed || 0
          };
          return;
        } catch(e) {}
      }
      this.stats = {
        hasCrown: false,
        crownWins: 0,
        consecutiveWins: 0,
        bestStreak: 0,
        totalWins: 0,
        totalElims: 0,
        matchesPlayed: 0
      };
    }

    saveCareerStats() {
      localStorage.setItem('fortnite_crown_stats', JSON.stringify(this.stats));
      this.updateLobbyUI();
    }

    loadCustomization() {
      const saved = localStorage.getItem('fortnite_customization');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.customization = {
            vbucks: typeof parsed.vbucks === 'number' ? parsed.vbucks : 1000,
            equippedSkin: parsed.equippedSkin || 'jonesy',
            ownedSkins: Array.isArray(parsed.ownedSkins) ? parsed.ownedSkins : ['jonesy'],
            equippedPickaxe: parsed.equippedPickaxe || 'classic',
            skinColor: parsed.skinColor || '#fdcb6e',
            hairStyle: parsed.hairStyle || 'crewcut',
            hairColor: parsed.hairColor || '#f6e05e'
          };
          return;
        } catch(e) {}
      }
      this.customization = {
        vbucks: 1000, // Starter bonus for instant testing!
        equippedSkin: 'jonesy',
        ownedSkins: ['jonesy'],
        equippedPickaxe: 'classic',
        skinColor: '#fdcb6e',
        hairStyle: 'crewcut',
        hairColor: '#f6e05e'
      };
    }

    saveCustomization() {
      localStorage.setItem('fortnite_customization', JSON.stringify(this.customization));
      this.updateLobbyUI();
      this.renderAvatars();
    }

    initEvents() {
      window.addEventListener('resize', () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.camera.width = this.width;
        this.camera.height = this.height;
      });

      window.addEventListener('keydown', (e) => {
        this.keys[e.key.toLowerCase()] = true;
        this.keys[e.code] = true;

        if (e.code === 'Space') {
          if (this.state === 'bus') {
            this.dropFromBus();
          }
        }

        // Slot keys 1-5
        if (['1', '2', '3', '4', '5'].includes(e.key)) {
          const slotIdx = parseInt(e.key) - 1;
          this.switchSlot(slotIdx);
        }

        // 'Q' - Build Wall
        if (e.key.toLowerCase() === 'q') {
          this.buildWallAction();
        }

        // 'E' - Interact / Open Chest / Pick up loot
        if (e.key.toLowerCase() === 'e') {
          this.interactAction();
        }

        // 'R' - Reload
        if (e.key.toLowerCase() === 'r') {
          this.reloadAction();
        }

        // 'B' - Crown Wins Emote!
        if (e.key.toLowerCase() === 'b') {
          this.triggerCrownEmote();
        }
      });

      window.addEventListener('keyup', (e) => {
        this.keys[e.key.toLowerCase()] = false;
        this.keys[e.code] = false;
      });

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      window.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
          this.mouse.down = true;
          if (this.state === 'bus') {
            this.dropFromBus();
          } else if (this.state === 'playing') {
            this.fireEquippedWeapon();
          }
        }
      });

      window.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
          this.mouse.down = false;
        }
      });

      // Sound mute button
      document.getElementById('mute-btn')?.addEventListener('click', () => {
        const isMuted = window.soundSystem.toggleMute();
        const icon = document.getElementById('mute-icon');
        if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
      });

      // Emote button on HUD
      document.getElementById('hud-emote-btn')?.addEventListener('click', () => {
        this.triggerCrownEmote();
      });

      // Lobby Emote test button
      document.getElementById('lobby-emote-btn')?.addEventListener('click', () => {
        this.triggerCrownEmote();
      });

      // Victory screen Emote button
      document.getElementById('victory-emote-btn')?.addEventListener('click', () => {
        this.triggerCrownEmote();
      });

      // Emote stage close button
      document.getElementById('emote-close-btn')?.addEventListener('click', () => {
        document.getElementById('emote-stage-overlay').style.display = 'none';
      });

      // Play button
      document.getElementById('play-btn')?.addEventListener('click', () => {
        window.soundSystem.init();
        this.startMatch();
      });

      // Play Again buttons
      document.getElementById('victory-play-again')?.addEventListener('click', () => {
        this.startMatch();
      });
      document.getElementById('elim-play-again')?.addEventListener('click', () => {
        this.startMatch();
      });
      document.getElementById('elim-lobby-btn')?.addEventListener('click', () => {
        this.returnToLobby();
      });
    }

    initCustomizerEvents() {
      // Main Lobby Navigation Tabs
      const tabPlay = document.getElementById('tab-btn-play');
      const tabShop = document.getElementById('tab-btn-shop');
      const tabLocker = document.getElementById('tab-btn-locker');

      const viewPlay = document.getElementById('lobby-view-play');
      const viewShop = document.getElementById('lobby-view-shop');
      const viewLocker = document.getElementById('lobby-view-locker');

      const switchLobbyTab = (activeTab, activeView) => {
        [tabPlay, tabShop, tabLocker].forEach(t => t?.classList.remove('active'));
        [viewPlay, viewShop, viewLocker].forEach(v => {
          if (v) v.style.display = 'none';
        });

        activeTab?.classList.add('active');
        if (activeView) activeView.style.display = 'flex';
      };

      tabPlay?.addEventListener('click', () => {
        switchLobbyTab(tabPlay, viewPlay);
        this.renderAvatars();
      });

      tabShop?.addEventListener('click', () => {
        switchLobbyTab(tabShop, viewShop);
        this.renderShop();
      });

      tabLocker?.addEventListener('click', () => {
        switchLobbyTab(tabLocker, viewLocker);
        this.renderLocker();
        this.renderAvatars();
      });

      // Locker Customizer Sub-tabs
      const cBtnPick = document.getElementById('c-btn-pickaxe');
      const cBtnSkin = document.getElementById('c-btn-skin-color');
      const cBtnHair = document.getElementById('c-btn-hair');

      const cPanPick = document.getElementById('c-panel-pickaxe');
      const cPanSkin = document.getElementById('c-panel-skin-color');
      const cPanHair = document.getElementById('c-panel-hair');

      const switchCustomizerPanel = (btn, panel) => {
        [cBtnPick, cBtnSkin, cBtnHair].forEach(b => b?.classList.remove('active'));
        [cPanPick, cPanSkin, cPanHair].forEach(p => p?.classList.remove('active'));
        btn?.classList.add('active');
        panel?.classList.add('active');
      };

      cBtnPick?.addEventListener('click', () => switchCustomizerPanel(cBtnPick, cPanPick));
      cBtnSkin?.addEventListener('click', () => switchCustomizerPanel(cBtnSkin, cPanSkin));
      cBtnHair?.addEventListener('click', () => switchCustomizerPanel(cBtnHair, cPanHair));
    }

    generateAvatarSVG(skinId, customization) {
      const skin = SKINS[skinId] || SKINS.jonesy;
      const skinColor = customization.skinColor || skin.defaultSkinColor || '#fdcb6e';
      const hairColor = customization.hairColor || skin.defaultHairColor || '#f6e05e';
      const hairStyle = customization.hairStyle || skin.defaultHairStyle || 'crewcut';
      const pickaxe = PICKAXES[customization.equippedPickaxe] || PICKAXES.classic;

      // Special skin headwear & details
      let headAccessories = '';
      if (skin.id === 'shadowRaven') {
        headAccessories = `
          <path d="M60 55 C60 25 140 25 140 55 C150 110 50 110 60 55 Z" fill="#120a22" stroke="#9b5de5" stroke-width="2"/>
          <circle cx="88" cy="90" r="3.5" fill="#c084fc"/>
          <circle cx="112" cy="90" r="3.5" fill="#c084fc"/>
        `;
      } else if (skin.id === 'cyberDrift') {
        headAccessories = `
          <polygon points="100,55 85,80 115,80" fill="#ffffff" stroke="#ff007f" stroke-width="2"/>
          <path d="M78 85 Q100 100 122 85" stroke="#ff007f" stroke-width="3" fill="none"/>
        `;
      } else if (skin.id === 'peelyRoyale') {
        headAccessories = `
          <path d="M85 55 Q100 20 115 55 Z" fill="#38b000"/>
          <polygon points="90,125 110,125 100,135" fill="#8338ec"/>
        `;
      } else if (skin.id === 'skullStriker') {
        headAccessories = `
          <path d="M85 90 L115 90 M92 98 L108 98" stroke="#1a202c" stroke-width="2.5"/>
          <circle cx="88" cy="85" r="3.5" fill="#00e5ff"/>
          <circle cx="112" cy="85" r="3.5" fill="#00e5ff"/>
        `;
      } else if (skin.id === 'midasTouch') {
        headAccessories = `
          <line x1="108" y1="75" x2="114" y2="98" stroke="#ffd700" stroke-width="3"/>
          <polygon points="95,122 105,122 100,155" fill="#ffd700"/>
        `;
      } else if (skin.id === 'galaxyKnight') {
        headAccessories = `
          <circle cx="88" cy="88" r="3.5" fill="#00f5d4"/>
          <circle cx="112" cy="88" r="3.5" fill="#00f5d4"/>
          <path d="M75 88 Q100 70 125 88" stroke="#4cc9f0" stroke-width="2" fill="none"/>
        `;
      } else if (skin.id === 'auraStrike') {
        headAccessories = `
          <path d="M82 125 Q100 145 118 125" stroke="#ffd700" stroke-width="3.5" fill="none"/>
        `;
      }

      // Hair Styles SVG Paths
      let hairSVG = '';
      if (hairStyle === 'crewcut') {
        hairSVG = `<path d="M68 76 C68 46 132 46 132 76 C122 62 78 62 68 76 Z" fill="${hairColor}"/>`;
      } else if (hairStyle === 'anime') {
        hairSVG = `
          <path d="M64 78 L68 50 L80 62 L95 42 L105 60 L120 45 L132 58 L136 78 Q100 60 64 78 Z" fill="${hairColor}"/>
        `;
      } else if (hairStyle === 'ponytail') {
        hairSVG = `
          <path d="M70 75 C70 48 130 48 130 75 C120 62 80 62 70 75 Z" fill="${hairColor}"/>
          <path d="M125 65 C145 65 160 90 150 115 C142 110 135 85 125 65 Z" fill="${hairColor}"/>
        `;
      } else if (hairStyle === 'curls') {
        hairSVG = `
          <circle cx="75" cy="65" r="16" fill="${hairColor}"/>
          <circle cx="100" cy="55" r="18" fill="${hairColor}"/>
          <circle cx="125" cy="65" r="16" fill="${hairColor}"/>
          <circle cx="85" cy="50" r="14" fill="${hairColor}"/>
          <circle cx="115" cy="50" r="14" fill="${hairColor}"/>
        `;
      } else if (hairStyle === 'undercut') {
        hairSVG = `
          <path d="M66 74 C75 42 125 45 136 68 C120 54 80 58 66 74 Z" fill="${hairColor}"/>
          <path d="M66 74 L68 85 L74 85 Z" fill="#111" opacity="0.3"/>
        `;
      } else if (hairStyle === 'headband') {
        hairSVG = `
          <path d="M68 68 C68 45 132 45 132 68 Z" fill="${hairColor}"/>
          <rect x="66" y="66" width="68" height="10" rx="3" fill="${skin.accentColor}"/>
        `;
      }

      const pickaxeIcon = pickaxe.icon || '⛏️';

      return `
        <svg width="220" height="260" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="auraGlow_${skin.id}" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="${skin.accentColor}" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="${skin.accentColor}" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Back Aura Glow -->
          <circle cx="100" cy="110" r="75" fill="url(#auraGlow_${skin.id})"/>

          <!-- Body / Torso -->
          <path d="M55 145 C55 128 145 128 145 145 V220 H55 V145 Z" fill="${skin.bodyColor}" stroke="#1a202c" stroke-width="4"/>
          <!-- Tactical Vest / Armor Plates -->
          <path d="M70 145 L70 210 L130 210 L130 145 Q100 155 70 145 Z" fill="${skin.vestColor}" stroke="#111" stroke-width="2.5"/>
          <!-- Vest Accent Straps -->
          <line x1="80" y1="150" x2="80" y2="205" stroke="${skin.accentColor}" stroke-width="3"/>
          <line x1="120" y1="150" x2="120" y2="205" stroke="${skin.accentColor}" stroke-width="3"/>

          <!-- Arms -->
          <rect x="42" y="145" width="16" height="50" rx="8" fill="${skin.bodyColor}" stroke="#1a202c" stroke-width="2.5"/>
          <rect x="142" y="145" width="16" height="50" rx="8" fill="${skin.bodyColor}" stroke="#1a202c" stroke-width="2.5"/>

          <!-- Hands -->
          <circle cx="50" cy="198" r="8" fill="${skinColor}"/>
          <circle cx="150" cy="198" r="8" fill="${skinColor}"/>

          <!-- Neck -->
          <rect x="88" y="115" width="24" height="20" rx="4" fill="${skinColor}"/>

          <!-- Face -->
          <circle cx="100" cy="90" r="32" fill="${skinColor}"/>

          <!-- Eyes -->
          <ellipse cx="88" cy="88" rx="3.5" ry="4.5" fill="#2d3748"/>
          <ellipse cx="112" cy="88" rx="3.5" ry="4.5" fill="#2d3748"/>
          <circle cx="89" cy="86" r="1.5" fill="#ffffff"/>
          <circle cx="113" cy="86" r="1.5" fill="#ffffff"/>
          <path d="M82 81 Q88 78 94 81" stroke="#4a5568" stroke-width="2" stroke-linecap="round"/>
          <path d="M106 81 Q112 78 118 81" stroke="#4a5568" stroke-width="2" stroke-linecap="round"/>

          <!-- Smile -->
          <path d="M94 104 Q100 110 106 104" stroke="#4a5568" stroke-width="2" stroke-linecap="round" fill="none"/>

          <!-- Hair -->
          ${hairSVG}

          <!-- Special Head Gear / Accessories -->
          ${headAccessories}

          <!-- Pickaxe Floating at side -->
          <g transform="translate(156, 150) rotate(-15)">
            <rect x="0" y="0" width="6" height="45" rx="3" fill="${pickaxe.handleColor || '#8d5524'}" stroke="#000" stroke-width="1.5"/>
            <text x="3" y="-4" font-size="24" text-anchor="middle">${pickaxeIcon}</text>
          </g>
        </svg>
      `;
    }

    renderShop() {
      const grid = document.getElementById('shop-skins-grid');
      if (!grid) return;
      grid.innerHTML = '';

      const rarityGlows = {
        common: 'rgba(142, 154, 175, 0.4)',
        uncommon: 'rgba(46, 196, 182, 0.5)',
        rare: 'rgba(0, 119, 182, 0.6)',
        epic: 'rgba(155, 93, 229, 0.6)',
        legendary: 'rgba(255, 158, 0, 0.7)',
        mythic: 'rgba(0, 245, 212, 0.7)'
      };

      const rarityColors = {
        common: '#8e9aaf',
        uncommon: '#2ec4b6',
        rare: '#0077b6',
        epic: '#9b5de5',
        legendary: '#ff9e00',
        mythic: '#00f5d4'
      };

      Object.values(SKINS).forEach(skin => {
        const isOwned = this.customization.ownedSkins.includes(skin.id);
        const isEquipped = this.customization.equippedSkin === skin.id;
        const accent = rarityColors[skin.rarity] || '#ffffff';
        const glow = rarityGlows[skin.rarity] || 'rgba(0,229,255,0.4)';

        const card = document.createElement('div');
        card.className = `shop-card ${isEquipped ? 'equipped' : ''}`;
        card.style.setProperty('--card-accent', accent);
        card.style.setProperty('--card-glow', glow);

        // Preview SVG using the skin's default look
        const previewSVG = this.generateAvatarSVG(skin.id, {
          skinColor: skin.defaultSkinColor,
          hairColor: skin.defaultHairColor,
          hairStyle: skin.defaultHairStyle,
          equippedPickaxe: this.customization.equippedPickaxe
        });

        card.innerHTML = `
          <div class="shop-card-badge">${skin.rarity.toUpperCase()}</div>
          <div class="shop-card-preview">${previewSVG}</div>
          <div class="shop-card-name">${skin.name}</div>
          <div class="shop-card-title">${skin.title}</div>
          <div class="shop-card-bottom">
            <div class="shop-card-price">
              <span class="vbucks-coin-icon mini">V</span>
              <span>${skin.price === 0 ? 'FREE' : skin.price.toLocaleString()}</span>
            </div>
            ${
              isEquipped
                ? `<button class="shop-card-btn active-equipped">EQUIPPED</button>`
                : isOwned
                ? `<button class="shop-card-btn equip">EQUIP</button>`
                : `<button class="shop-card-btn buy">BUY SKIN</button>`
            }
          </div>
        `;

        const btn = card.querySelector('button');
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isEquipped) return;
            if (isOwned) {
              this.equipSkin(skin.id);
            } else {
              this.buySkin(skin.id);
            }
          });
        }

        grid.appendChild(card);
      });
    }

    buySkin(skinId) {
      const skin = SKINS[skinId];
      if (!skin) return;

      if ((this.customization.vbucks || 0) < skin.price) {
        window.soundSystem.init();
        alert(`Need ${(skin.price - this.customization.vbucks).toLocaleString()} more V-Bucks!\n\nCollect V-Bucks coins across the island during Battle Royale to unlock ${skin.name}!`);
        return;
      }

      this.customization.vbucks -= skin.price;
      if (!this.customization.ownedSkins.includes(skinId)) {
        this.customization.ownedSkins.push(skinId);
      }
      this.equipSkin(skinId, true);
      window.soundSystem.playItemPurchase();
      this.saveCustomization();
    }

    equipSkin(skinId, isNewPurchase = false) {
      const skin = SKINS[skinId];
      if (!skin) return;

      this.customization.equippedSkin = skinId;
      if (skin.defaultSkinColor) this.customization.skinColor = skin.defaultSkinColor;
      if (skin.defaultHairColor) this.customization.hairColor = skin.defaultHairColor;
      if (skin.defaultHairStyle) this.customization.hairStyle = skin.defaultHairStyle;

      this.saveCustomization();
      this.renderShop();
      this.renderLocker();
      this.renderAvatars();
    }

    renderLocker() {
      // 1. Pickaxe Grid
      const pickaxeGrid = document.getElementById('pickaxe-grid');
      if (pickaxeGrid) {
        pickaxeGrid.innerHTML = '';
        Object.values(PICKAXES).forEach(p => {
          const card = document.createElement('div');
          card.className = `pickaxe-card ${this.customization.equippedPickaxe === p.id ? 'active' : ''}`;
          card.innerHTML = `
            <div class="pickaxe-card-icon">${p.icon}</div>
            <div class="pickaxe-card-name">${p.name}</div>
          `;
          card.addEventListener('click', () => {
            this.customization.equippedPickaxe = p.id;
            this.saveCustomization();
            this.renderLocker();
            this.renderAvatars();
          });
          pickaxeGrid.appendChild(card);
        });
      }

      // 2. Skin Tone Swatches
      const skinGrid = document.getElementById('skin-swatches-grid');
      if (skinGrid) {
        skinGrid.innerHTML = '';
        SKIN_COLORS.forEach(c => {
          const btn = document.createElement('div');
          btn.className = `color-swatch-btn ${this.customization.skinColor === c.hex ? 'active' : ''}`;
          btn.innerHTML = `
            <div class="color-swatch-circle" style="background-color: ${c.hex};"></div>
            <span class="color-swatch-label">${c.name}</span>
          `;
          btn.addEventListener('click', () => {
            this.customization.skinColor = c.hex;
            this.saveCustomization();
            this.renderLocker();
            this.renderAvatars();
          });
          skinGrid.appendChild(btn);
        });
      }

      // 3. Hair Styles Grid
      const hairStyleGrid = document.getElementById('hair-style-grid');
      if (hairStyleGrid) {
        hairStyleGrid.innerHTML = '';
        HAIR_STYLES.forEach(s => {
          const btn = document.createElement('div');
          btn.className = `hair-style-btn ${this.customization.hairStyle === s.id ? 'active' : ''}`;
          btn.innerHTML = `
            <span class="hair-style-icon">${s.icon}</span>
            <span>${s.name}</span>
          `;
          btn.addEventListener('click', () => {
            this.customization.hairStyle = s.id;
            this.saveCustomization();
            this.renderLocker();
            this.renderAvatars();
          });
          hairStyleGrid.appendChild(btn);
        });
      }

      // 4. Hair Colors Grid
      const hairColorGrid = document.getElementById('hair-color-grid');
      if (hairColorGrid) {
        hairColorGrid.innerHTML = '';
        HAIR_COLORS.forEach(c => {
          const btn = document.createElement('div');
          btn.className = `color-swatch-btn ${this.customization.hairColor === c.hex ? 'active' : ''}`;
          btn.innerHTML = `
            <div class="color-swatch-circle" style="background-color: ${c.hex};"></div>
            <span class="color-swatch-label">${c.name}</span>
          `;
          btn.addEventListener('click', () => {
            this.customization.hairColor = c.hex;
            this.saveCustomization();
            this.renderLocker();
            this.renderAvatars();
          });
          hairColorGrid.appendChild(btn);
        });
      }
    }

    renderAvatars() {
      const skin = SKINS[this.customization.equippedSkin] || SKINS.jonesy;
      const avatarSVG = this.generateAvatarSVG(skin.id, this.customization);

      // Lobby Avatar
      const lobbyAvatar = document.getElementById('hero-avatar');
      if (lobbyAvatar) lobbyAvatar.innerHTML = avatarSVG;

      // Locker Avatar
      const lockerAvatar = document.getElementById('locker-hero-avatar');
      if (lockerAvatar) lockerAvatar.innerHTML = avatarSVG;

      // Character Name & Subtitle
      const lobbyName = document.getElementById('lobby-character-name');
      if (lobbyName) lobbyName.textContent = skin.name.toUpperCase();

      const lockerName = document.getElementById('locker-equipped-name');
      if (lockerName) lockerName.textContent = skin.name.toUpperCase();

      const lockerRarity = document.getElementById('locker-rarity-tag');
      if (lockerRarity) {
        lockerRarity.textContent = skin.rarity.toUpperCase();
        lockerRarity.style.backgroundColor = {
          common: '#8e9aaf',
          uncommon: '#2ec4b6',
          rare: '#0077b6',
          epic: '#9b5de5',
          legendary: '#ff9e00',
          mythic: '#00f5d4'
        }[skin.rarity] || '#ff9e00';
      }

      // V-Bucks Header & HUD Counter
      const lobbyVBucks = document.getElementById('lobby-vbucks-amount');
      if (lobbyVBucks) lobbyVBucks.textContent = (this.customization.vbucks || 0).toLocaleString();

      const hudVBucks = document.getElementById('hud-vbucks-amount');
      if (hudVBucks) hudVBucks.textContent = (this.customization.vbucks || 0).toLocaleString();
    }

    collectVBuckDrop(drop, index) {
      this.customization.vbucks = (this.customization.vbucks || 0) + drop.amount;
      this.saveCustomization();
      window.soundSystem.playCoinPickup();
      this.addFloatingText(`+${drop.amount} V-BUCKS! 🪙`, drop.x, drop.y - 35, '#00e5ff', 1.3);

      // Sparkles
      for (let p = 0; p < 8; p++) {
        this.particles.push({
          x: drop.x,
          y: drop.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: '#00e5ff',
          size: 3.5,
          alpha: 1,
          life: 0.5
        });
      }

      this.lootDrops.splice(index, 1);
      this.updateHUD();
    }

    renderPickaxeInHand(pickaxe) {
      this.ctx.save();
      this.ctx.translate(14, 8);
      this.ctx.fillStyle = pickaxe.handleColor || '#8d5524';
      this.ctx.fillRect(0, 0, 22, 4);

      if (pickaxe.id === 'starWand') {
        this.ctx.fillStyle = '#ffd700';
        this.ctx.beginPath();
        this.ctx.arc(22, 2, 7, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = '#ff70a6';
        this.ctx.beginPath();
        this.ctx.arc(22, 2, 3, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (pickaxe.id === 'reaper') {
        this.ctx.strokeStyle = '#e2e8f0';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(20, -5, 12, 0, Math.PI * 0.7);
        this.ctx.stroke();
      } else if (pickaxe.id === 'slurp') {
        this.ctx.fillStyle = '#00e5ff';
        this.ctx.fillRect(18, -6, 10, 16);
      } else if (pickaxe.id === 'goldenSledge') {
        this.ctx.fillStyle = '#ffd700';
        this.ctx.fillRect(18, -5, 10, 14);
      } else if (pickaxe.id === 'cyberPlasma') {
        this.ctx.fillStyle = '#ff007f';
        this.ctx.fillRect(18, -8, 6, 8);
        this.ctx.fillStyle = '#00e5ff';
        this.ctx.fillRect(18, 4, 6, 8);
      } else {
        this.ctx.fillStyle = pickaxe.headColor || '#718096';
        this.ctx.fillRect(18, -6, 6, 16);
      }
      this.ctx.restore();
    }

    renderPlayerHairTopDown(hairStyle, hairColor, accentColor) {
      this.ctx.fillStyle = hairColor;
      if (hairStyle === 'crewcut') {
        this.ctx.beginPath();
        this.ctx.arc(-2, 0, 8, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (hairStyle === 'anime') {
        this.ctx.beginPath();
        this.ctx.arc(-2, 0, 9, 0, Math.PI * 2);
        this.ctx.fill();
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
          const sx = -2 + Math.cos(a) * 12;
          const sy = Math.sin(a) * 12;
          this.ctx.fillRect(sx - 2, sy - 2, 4, 4);
        }
      } else if (hairStyle === 'ponytail') {
        this.ctx.beginPath();
        this.ctx.arc(-2, 0, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(-13, 0, 5, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (hairStyle === 'curls') {
        this.ctx.beginPath();
        this.ctx.arc(-2, 0, 11, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (hairStyle === 'undercut') {
        this.ctx.beginPath();
        this.ctx.arc(-1, -2, 8, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (hairStyle === 'headband') {
        this.ctx.beginPath();
        this.ctx.arc(-2, 0, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = accentColor || '#00e5ff';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, -Math.PI / 2, Math.PI / 2);
        this.ctx.stroke();
      }
    }

    updateLobbyUI() {
      const crownVal = document.getElementById('lobby-crown-wins');
      const consecVal = document.getElementById('lobby-consec-wins');
      const totalWinsVal = document.getElementById('lobby-total-wins');
      const totalElimsVal = document.getElementById('lobby-total-elims');
      const heroCrownTag = document.getElementById('hero-crown-tag');
      const heroCrownVisual = document.getElementById('hero-crown-container');
      const lobbyCrownWinsStat = document.getElementById('lobby-crown-wins-stat');

      if (crownVal) crownVal.textContent = this.stats.crownWins;
      if (lobbyCrownWinsStat) lobbyCrownWinsStat.textContent = this.stats.crownWins;
      if (consecVal) consecVal.textContent = this.stats.consecutiveWins;
      if (totalWinsVal) totalWinsVal.textContent = this.stats.totalWins;
      if (totalElimsVal) totalElimsVal.textContent = this.stats.totalElims;

      const lobbyVBucks = document.getElementById('lobby-vbucks-amount');
      if (lobbyVBucks && this.customization) {
        lobbyVBucks.textContent = (this.customization.vbucks || 0).toLocaleString();
      }

      if (heroCrownVisual) {
        if (this.stats.hasCrown || this.stats.consecutiveWins > 0) {
          heroCrownVisual.style.display = 'flex';
          if (heroCrownTag) {
            heroCrownTag.textContent = `👑 ${this.stats.consecutiveWins > 1 ? this.stats.consecutiveWins + ' CONSECUTIVE' : 'CROWN EQUIPPED'}`;
          }
        } else {
          heroCrownVisual.style.display = 'none';
        }
      }
    }

    startMatch() {
      window.soundSystem.init();
      window.soundSystem.playBusHorn();

      this.state = 'bus';
      this.stats.matchesPlayed++;

      // Reset world state
      this.island = new IslandMap(3800, 3800);
      this.projectiles = [];
      this.lootDrops = [];
      this.floatingTexts = [];
      this.particles = [];
      this.killfeed = [];

      // Spawn initial floor loot from chests
      this.seedMapLoot();

      // 1 Human Player
      this.player = {
        id: 'player',
        name: 'YOU',
        x: 1900,
        y: 1900,
        vx: 0,
        vy: 0,
        angle: 0,
        speed: 4.8,
        health: 100,
        maxHealth: 100,
        shield: 0,
        maxShield: 100,
        wood: 150,
        hasCrown: this.stats.hasCrown,
        consecutiveWins: this.stats.consecutiveWins,
        elims: 0,
        selectedSlot: 0,
        customSkin: SKINS[this.customization.equippedSkin] || SKINS.jonesy,
        customization: { ...this.customization },
        inventory: [
          (() => {
            const pick = PICKAXES[this.customization.equippedPickaxe] || PICKAXES.classic;
            return { ...WEAPONS.pickaxe, name: pick.name, icon: pick.icon, pickaxeData: pick };
          })(),
          { ...WEAPONS.scar, currentMag: WEAPONS.scar.mag, reserve: 120 },
          { ...WEAPONS.pump, currentMag: WEAPONS.pump.mag, reserve: 25 },
          { ...WEAPONS.mini, count: 3 },
          null
        ],
        isGliding: true,
        gliderAltitude: 400,
        lastShotTime: 0,
        reloading: false,
        reloadProgress: 0
      };

      // 99 AI Bots (Total 100 Players!)
      this.bots = [];
      for (let i = 0; i < 99; i++) {
        const botName = BOT_NAMES[i % BOT_NAMES.length] + (i >= BOT_NAMES.length ? `_${i}` : '');
        // Spread bots across POIs and random spots
        const poi = this.island.pois[Math.floor(Math.random() * this.island.pois.length)];
        const spreadAngle = Math.random() * Math.PI * 2;
        const spreadDist = Math.random() * poi.radius * 1.4;
        const bx = Math.max(300, Math.min(this.island.width - 300, poi.x + Math.cos(spreadAngle) * spreadDist));
        const by = Math.max(300, Math.min(this.island.height - 300, poi.y + Math.sin(spreadAngle) * spreadDist));

        const botWeapons = [
          { ...WEAPONS.scar, currentMag: 30, reserve: 90 },
          { ...WEAPONS.pump, currentMag: 5, reserve: 20 },
          { ...WEAPONS.smg, currentMag: 35, reserve: 100 },
          { ...WEAPONS.sniper, currentMag: 1, reserve: 10 }
        ];

        this.bots.push({
          id: `bot_${i}`,
          name: botName,
          x: bx,
          y: by,
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          speed: 3.2 + Math.random() * 0.8,
          health: 100,
          shield: Math.random() > 0.4 ? 50 : 0,
          wood: 60,
          weapon: botWeapons[Math.floor(Math.random() * botWeapons.length)],
          alive: true,
          targetBot: null,
          lastShotTime: 0,
          changeDirTime: 0,
          hasCrown: false, // Player has crown if winning streak, or bot can snatch it
          lastWallBuildTime: 0
        });
      }

      // If player doesn't have crown, randomly 1 prestigious bot carries a crown into the match!
      if (!this.player.hasCrown && this.bots.length > 0) {
        this.bots[0].hasCrown = true;
      }

      // Bus route across map
      const busAngle = (Math.random() * 0.4 - 0.2);
      this.bus = {
        startX: 100,
        startY: 1900 + Math.sin(busAngle) * 800,
        endX: 3700,
        endY: 1900 - Math.sin(busAngle) * 800,
        x: 100,
        y: 1900,
        progress: 0,
        duration: 8000, // 8 seconds flight
        startTime: performance.now()
      };

      // Storm initialization
      this.stormPhase = 1;
      this.stormTimer = 45; // 45s until shrink
      this.stormZone = { x: 1900, y: 1900, radius: 2400 };
      this.safeZone = {
        x: 1400 + Math.random() * 1000,
        y: 1400 + Math.random() * 1000,
        radius: 1200
      };
      this.stormShrinking = false;

      // Hide Lobby, Show HUD
      document.getElementById('lobby-screen').style.display = 'none';
      document.getElementById('victory-screen').style.display = 'none';
      document.getElementById('eliminated-screen').style.display = 'none';
      document.getElementById('battle-bus-banner').style.display = 'block';
      document.getElementById('game-hud').style.display = 'block';

      this.updateHUD();
    }

    dropFromBus() {
      if (this.state !== 'bus') return;
      this.state = 'playing';
      document.getElementById('battle-bus-banner').style.display = 'none';

      // Drop player at bus location
      this.player.x = this.bus.x;
      this.player.y = this.bus.y;
      this.player.isGliding = true;
      this.player.gliderAltitude = 350;

      this.addFloatingText('GLIDING IN...', this.player.x, this.player.y - 40, '#00e5ff');
    }

    seedMapLoot() {
      // Scatter initial weapon pickups & chests
      const lootTypes = [WEAPONS.scar, WEAPONS.pump, WEAPONS.sniper, WEAPONS.smg, WEAPONS.mini, WEAPONS.bigShield, WEAPONS.medkit];

      // 90 random ground weapon loot drops
      for (let i = 0; i < 90; i++) {
        const item = lootTypes[Math.floor(Math.random() * lootTypes.length)];
        this.lootDrops.push({
          x: 400 + Math.random() * (this.island.width - 800),
          y: 400 + Math.random() * (this.island.height - 800),
          item: { ...item, count: item.count || 1 },
          rarity: item.rarity,
          floatOffset: Math.random() * Math.PI * 2
        });
      }

      // Scatter V-Bucks Coins across all POIs (towns, buildings, squares)
      this.island.pois.forEach(poi => {
        const count = 6;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 30 + Math.random() * (poi.radius - 40);
          this.lootDrops.push({
            x: poi.x + Math.cos(angle) * dist,
            y: poi.y + Math.sin(angle) * dist,
            isVBuck: true,
            amount: [50, 50, 100][Math.floor(Math.random() * 3)],
            rarity: 'mythic',
            floatOffset: Math.random() * Math.PI * 2
          });
        }
      });

      // Scatter 40 wilderness V-Bucks Coins across the island
      for (let i = 0; i < 40; i++) {
        this.lootDrops.push({
          x: 350 + Math.random() * (this.island.width - 700),
          y: 350 + Math.random() * (this.island.height - 700),
          isVBuck: true,
          amount: [25, 50, 50, 100][Math.floor(Math.random() * 4)],
          rarity: 'mythic',
          floatOffset: Math.random() * Math.PI * 2
        });
      }
    }

    buildWallAction() {
      if (!this.player || this.state !== 'playing' || this.player.isGliding) return;
      if (this.player.wood < 10) {
        this.addFloatingText('NO WOOD!', this.player.x, this.player.y - 30, '#ff0055');
        return;
      }

      this.player.wood -= 10;
      window.soundSystem.playBuild();

      // Build wall in front of player
      const dist = 55;
      const wx = this.player.x + Math.cos(this.player.angle) * dist;
      const wy = this.player.y + Math.sin(this.player.angle) * dist;
      const wallAngle = this.player.angle + Math.PI / 2;

      this.island.addWall(wx, wy, wallAngle, 'player');
      this.addFloatingText('-10 WOOD', this.player.x, this.player.y - 30, '#f7a072');
      this.updateHUD();
    }

    interactAction() {
      if (!this.player || this.state !== 'playing' || this.player.isGliding) return;

      // 1. Check nearby Chests
      let openedChest = false;
      this.island.chests.forEach(chest => {
        if (!chest.opened) {
          const d = Math.hypot(chest.x - this.player.x, chest.y - this.player.y);
          if (d < 70) {
            chest.opened = true;
            openedChest = true;
            window.soundSystem.playChestOpen();

            // Burst loot from chest
            this.burstChestLoot(chest.x, chest.y);
            this.addFloatingText('CHEST OPENED!', chest.x, chest.y - 30, '#ffe600');
          }
        }
      });
      if (openedChest) return;

      // 2. Check nearby Loot Drops
      for (let i = this.lootDrops.length - 1; i >= 0; i--) {
        const drop = this.lootDrops[i];
        const dist = Math.hypot(drop.x - this.player.x, drop.y - this.player.y);
        if (dist < 60) {
          // If it's a V-Bucks Coin!
          if (drop.isVBuck) {
            this.collectVBuckDrop(drop, i);
            return;
          }

          // If it's a dropped crown!
          if (drop.isCrown) {
            this.player.hasCrown = true;
            this.lootDrops.splice(i, 1);
            window.soundSystem.playCrownEmote();
            this.addFloatingText('VICTORY CROWN CLAIMED! 👑', this.player.x, this.player.y - 45, '#ffd700');
            this.addKillfeedEntry('Player', 'claimed a Victory Crown! 👑', true);
            this.updateHUD();
            return;
          }

          // Pick up item into empty slot or replace current
          const item = drop.item;
          let added = false;

          // Check if healing item can stack
          for (let s = 0; s < 5; s++) {
            if (this.player.inventory[s] && this.player.inventory[s].name === item.name && item.type === 'heal') {
              this.player.inventory[s].count = (this.player.inventory[s].count || 1) + (item.count || 1);
              added = true;
              break;
            }
          }

          if (!added) {
            // Put in first empty slot
            for (let s = 0; s < 5; s++) {
              if (!this.player.inventory[s]) {
                this.player.inventory[s] = item;
                added = true;
                break;
              }
            }
          }

          if (!added) {
            // Replace current selected slot (unless pickaxe)
            if (this.player.selectedSlot > 0) {
              const old = this.player.inventory[this.player.selectedSlot];
              this.player.inventory[this.player.selectedSlot] = item;
              // Drop old item
              if (old) {
                drop.item = old;
                drop.rarity = old.rarity;
                added = true;
              }
            }
          }

          if (added) {
            if (drop.item === item) {
              this.lootDrops.splice(i, 1);
            }
            this.addFloatingText(`+ ${item.name}`, this.player.x, this.player.y - 30, '#00e5ff');
            this.updateHUD();
            break;
          }
        }
      }
    }

    burstChestLoot(cx, cy) {
      // Wood
      this.player.wood = Math.min(999, this.player.wood + 60);

      const possibleLoot = [
        WEAPONS.scar, WEAPONS.pump, WEAPONS.sniper, WEAPONS.smg,
        WEAPONS.bigShield, WEAPONS.mini, WEAPONS.medkit
      ];

      // Drop 2 items
      for (let i = 0; i < 2; i++) {
        const item = possibleLoot[Math.floor(Math.random() * possibleLoot.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 30;
        this.lootDrops.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          item: { ...item, count: item.count || 1, currentMag: item.mag || 0, reserve: 60 },
          rarity: item.rarity,
          floatOffset: Math.random() * Math.PI * 2
        });
      }

      // Bonus V-Bucks Coin from Chest!
      this.lootDrops.push({
        x: cx + (Math.random() - 0.5) * 50,
        y: cy + (Math.random() - 0.5) * 50,
        isVBuck: true,
        amount: 100,
        rarity: 'mythic',
        floatOffset: Math.random() * Math.PI * 2
      });
    }

    switchSlot(slotIdx) {
      if (!this.player || slotIdx < 0 || slotIdx >= 5) return;
      this.player.selectedSlot = slotIdx;
      this.updateHUD();
    }

    fireEquippedWeapon() {
      if (!this.player || this.state !== 'playing' || this.player.isGliding) return;
      const equipped = this.player.inventory[this.player.selectedSlot];
      if (!equipped) return;

      const now = performance.now();

      // Melee / Pickaxe
      if (equipped.type === 'melee') {
        if (now - this.player.lastShotTime < equipped.rate) return;
        this.player.lastShotTime = now;
        window.soundSystem.playPickaxe();

        // Check if hitting tree, rock, wall, or enemy
        const reach = 55;
        const tx = this.player.x + Math.cos(this.player.angle) * reach;
        const ty = this.player.y + Math.sin(this.player.angle) * reach;

        // Hit tree
        this.island.trees.forEach(t => {
          if (t.health > 0 && Math.hypot(t.x - tx, t.y - ty) < t.radius + 15) {
            t.health -= 50;
            this.player.wood = Math.min(999, this.player.wood + 20);
            this.addFloatingText('+20 WOOD', t.x, t.y - 20, '#f7a072');
            this.createHitSparks(tx, ty, '#8b5a2b');
            this.updateHUD();
          }
        });

        // Hit bots
        this.bots.forEach(b => {
          if (b.alive && Math.hypot(b.x - tx, b.y - ty) < 32) {
            this.damageEntity(b, equipped.damage, this.player.angle, 'player', false);
          }
        });
        return;
      }

      // Healing Items
      if (equipped.type === 'heal') {
        if (equipped.healShield) {
          if (this.player.shield >= (equipped.maxShield || 100)) {
            this.addFloatingText('SHIELD FULL!', this.player.x, this.player.y - 30, '#00e5ff');
            return;
          }
          this.player.shield = Math.min(equipped.maxShield || 100, this.player.shield + equipped.healShield);
          window.soundSystem.playDrink();
          this.addFloatingText(`+${equipped.healShield} SHIELD`, this.player.x, this.player.y - 30, '#00e5ff');
        } else if (equipped.healHealth) {
          if (this.player.health >= 100) {
            this.addFloatingText('HEALTH FULL!', this.player.x, this.player.y - 30, '#00f076');
            return;
          }
          this.player.health = Math.min(100, this.player.health + equipped.healHealth);
          window.soundSystem.playDrink();
          this.addFloatingText(`+${equipped.healHealth} HEALTH`, this.player.x, this.player.y - 30, '#00f076');
        }

        equipped.count--;
        if (equipped.count <= 0) {
          this.player.inventory[this.player.selectedSlot] = null;
        }
        this.updateHUD();
        return;
      }

      // Guns
      if (now - this.player.lastShotTime < equipped.rate) return;
      if (equipped.currentMag <= 0) {
        this.reloadAction();
        return;
      }

      this.player.lastShotTime = now;
      equipped.currentMag--;
      this.updateHUD();

      // Sound
      if (equipped.type === 'shotgun') {
        window.soundSystem.playShotgun();
        // Spread pellets
        for (let i = 0; i < (equipped.pellets || 7); i++) {
          const spreadAngle = this.player.angle + (Math.random() - 0.5) * equipped.spread;
          this.spawnBullet(this.player.x, this.player.y, spreadAngle, equipped, 'player');
        }
      } else if (equipped.type === 'sniper') {
        window.soundSystem.playSniper();
        this.spawnBullet(this.player.x, this.player.y, this.player.angle, equipped, 'player');
      } else if (equipped.name.includes('SMG')) {
        window.soundSystem.playSMG();
        const spreadAngle = this.player.angle + (Math.random() - 0.5) * equipped.spread;
        this.spawnBullet(this.player.x, this.player.y, spreadAngle, equipped, 'player');
      } else {
        // Rifle
        window.soundSystem.playRifle();
        const spreadAngle = this.player.angle + (Math.random() - 0.5) * equipped.spread;
        this.spawnBullet(this.player.x, this.player.y, spreadAngle, equipped, 'player');
      }
    }

    reloadAction() {
      if (!this.player || this.state !== 'playing') return;
      const equipped = this.player.inventory[this.player.selectedSlot];
      if (!equipped || !equipped.mag) return;
      if (equipped.currentMag >= equipped.mag) return;
      if (equipped.reserve <= 0) {
        this.addFloatingText('NO AMMO!', this.player.x, this.player.y - 30, '#ff0055');
        return;
      }

      const needed = equipped.mag - equipped.currentMag;
      const take = Math.min(needed, equipped.reserve);
      equipped.currentMag += take;
      equipped.reserve -= take;
      this.addFloatingText('RELOADED', this.player.x, this.player.y - 30, '#ffffff');
      this.updateHUD();
    }

    spawnBullet(x, y, angle, weapon, ownerId) {
      const spd = weapon.speed || 24;
      this.projectiles.push({
        x: x + Math.cos(angle) * 20,
        y: y + Math.sin(angle) * 20,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        distanceTraveled: 0,
        maxRange: weapon.range || 600,
        damage: weapon.damage,
        headshotMult: weapon.headshotMult || 1.5,
        ownerId,
        weaponName: weapon.name
      });
    }

    damageEntity(target, rawDamage, angle, attackerId, isHeadshot = false) {
      const damage = Math.round(isHeadshot ? rawDamage * 2.0 : rawDamage);
      let absorbedByShield = 0;

      if (target.shield > 0) {
        absorbedByShield = Math.min(target.shield, damage);
        target.shield -= absorbedByShield;
        const fleshDmg = damage - absorbedByShield;
        target.health -= fleshDmg;
        if (target.shield <= 0 && absorbedByShield > 0) {
          if (attackerId === 'player') window.soundSystem.playShieldBreak();
        }
      } else {
        target.health -= damage;
      }

      // Audio feedback for player hits
      if (attackerId === 'player') {
        window.soundSystem.playHit(absorbedByShield > 0, isHeadshot);
      }

      // Visual Damage Numbers
      const color = isHeadshot ? '#ffe600' : (absorbedByShield > 0 ? '#00e5ff' : '#ffffff');
      this.addFloatingText(damage.toString(), target.x, target.y - 25, color, isHeadshot ? 1.4 : 1.0);

      // Check Elimination
      if (target.health <= 0) {
        target.alive = false;

        if (attackerId === 'player') {
          this.player.elims++;
          this.stats.totalElims++;
          window.soundSystem.playElimination();
          this.addKillfeedEntry('Player', `eliminated ${target.name} [${target.hasCrown ? '👑 CROWN' : ''}]`, true);
          this.addFloatingText(`ELIMINATED ${target.name}!`, target.x, target.y - 45, '#ff0055', 1.3);
        } else {
          const attacker = this.bots.find(b => b.id === attackerId);
          const attName = attacker ? attacker.name : 'The Storm';
          this.addKillfeedEntry(attName, `eliminated ${target.name}`);
        }

        // Drop Crown if target had one!
        if (target.hasCrown) {
          target.hasCrown = false;
          this.lootDrops.push({
            x: target.x,
            y: target.y,
            isCrown: true,
            item: { name: 'Victory Crown', rarity: 'mythic' },
            rarity: 'mythic',
            floatOffset: 0
          });
          this.addFloatingText('👑 VICTORY CROWN DROPPED!', target.x, target.y - 40, '#ffd700');
        }

        // Drop random loot
        this.lootDrops.push({
          x: target.x,
          y: target.y,
          item: { ...WEAPONS.mini, count: 2 },
          rarity: 'uncommon',
          floatOffset: Math.random()
        });

        // Drop V-Bucks Coin from eliminated player/bot!
        this.lootDrops.push({
          x: target.x + (Math.random() - 0.5) * 25,
          y: target.y + (Math.random() - 0.5) * 25,
          isVBuck: true,
          amount: 50,
          rarity: 'mythic',
          floatOffset: Math.random() * Math.PI * 2
        });

        this.updateHUD();
        this.checkVictoryCondition();
      }
    }

    checkVictoryCondition() {
      const remainingBots = this.bots.filter(b => b.alive).length;
      const totalAlive = remainingBots + (this.player && this.player.health > 0 ? 1 : 0);

      if (this.player && this.player.health > 0 && remainingBots === 0) {
        this.triggerVictoryRoyale();
      }
    }

    // THE ICONIC VICTORY ROYALE CELEBRATION!
    triggerVictoryRoyale() {
      if (this.state === 'victory') return;
      this.state = 'victory';

      window.soundSystem.playVictoryRoyale();

      // Consecutive Win & Victory Crown Logic (From User's Prompt!)
      const hadCrownAtStart = this.player.hasCrown;
      this.stats.totalWins++;
      this.stats.consecutiveWins++;

      if (this.stats.consecutiveWins > this.stats.bestStreak) {
        this.stats.bestStreak = this.stats.consecutiveWins;
      }

      let isCrownRoyale = false;
      // If won consecutively or holding crown, increment Crown Wins!
      if (hadCrownAtStart || this.stats.consecutiveWins >= 2) {
        this.stats.crownWins++;
        isCrownRoyale = true;
      }
      this.stats.hasCrown = true; // Player keeps crown for next match

      this.saveCareerStats();

      // Show Victory Royale Screen
      const victoryScreen = document.getElementById('victory-screen');
      const crownMsg = document.getElementById('victory-crown-msg');
      const crownSub = document.getElementById('victory-crown-sub');
      const crownBadge = document.getElementById('victory-crown-badge');
      const vElims = document.getElementById('v-stat-elims');
      const vCrownWins = document.getElementById('v-stat-crown-wins');
      const vStreak = document.getElementById('v-stat-streak');

      if (vElims) vElims.textContent = this.player.elims;
      if (vCrownWins) vCrownWins.textContent = this.stats.crownWins;
      if (vStreak) vStreak.textContent = this.stats.consecutiveWins;
      if (crownBadge) crownBadge.textContent = `👑 ${this.stats.consecutiveWins} IN A ROW`;

      if (isCrownRoyale) {
        if (crownMsg) crownMsg.textContent = '👑 CROWN ROYALE ACHIEVED! 👑';
        if (crownSub) crownSub.textContent = `Consecutive Win #${this.stats.consecutiveWins}! Crown Wins Emote updated to ${this.stats.crownWins}!`;
      } else {
        if (crownMsg) crownMsg.textContent = 'VICTORY CROWN CLAIMED!';
        if (crownSub) crownSub.textContent = 'Win your next match consecutively to earn a prestigious CROWN ROYALE!';
      }

      if (victoryScreen) {
        victoryScreen.style.display = 'flex';
      }

      // Launch fireworks / confetti particles
      this.launchVictoryConfetti();
    }

    triggerEliminated(killerName = 'An opponent') {
      if (this.state === 'eliminated' || this.state === 'victory') return;
      this.state = 'eliminated';

      // Drop crown & reset consecutive streak
      const hadCrown = this.player.hasCrown;
      this.stats.hasCrown = false;
      this.stats.consecutiveWins = 0;
      this.saveCareerStats();

      const remainingAlive = this.bots.filter(b => b.alive).length + 1;
      const elimScreen = document.getElementById('eliminated-screen');
      const elimRank = document.getElementById('elim-rank-text');
      const elimLostAlert = document.getElementById('elim-crown-lost');

      if (elimRank) elimRank.textContent = `RANK: #${remainingAlive} / 100`;
      if (elimLostAlert) {
        elimLostAlert.style.display = hadCrown ? 'block' : 'none';
      }

      if (elimScreen) {
        elimScreen.style.display = 'flex';
      }
    }

    returnToLobby() {
      this.state = 'lobby';
      document.getElementById('game-hud').style.display = 'none';
      document.getElementById('victory-screen').style.display = 'none';
      document.getElementById('eliminated-screen').style.display = 'none';
      document.getElementById('battle-bus-banner').style.display = 'none';
      document.getElementById('lobby-screen').style.display = 'flex';
      this.updateLobbyUI();
      this.renderAvatars();
    }

    // THE FAMOUS CROWNING ACHIEVEMENT EMOTE SHOW-OFF!
    triggerCrownEmote() {
      window.soundSystem.init();
      window.soundSystem.playCrownEmote();

      // Show the glowing Emote stage modal
      const overlay = document.getElementById('emote-stage-overlay');
      const holoNum = document.getElementById('emote-holo-num');
      const subTitle = document.getElementById('emote-sub-detail');

      // The number on the victory crown is the consecutive wins / crown wins!
      const displayCount = Math.max(this.stats.consecutiveWins, this.stats.crownWins);

      if (holoNum) holoNum.textContent = displayCount;
      if (subTitle) {
        subTitle.textContent = `${this.stats.consecutiveWins} Consecutive Wins • ${this.stats.crownWins} Crown Royales`;
      }

      if (overlay) {
        overlay.style.display = 'flex';
      }

      // Also trigger in-game toast banner
      const toast = document.getElementById('ingame-emote-toast');
      const toastText = document.getElementById('toast-text');
      if (toast && toastText) {
        toastText.textContent = `👑 FLEXED CROWN WINS: ${displayCount}!`;
        toast.style.display = 'flex';
        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
          toast.style.display = 'none';
        }, 4000);
      }

      // Spawn golden aura particles around player
      if (this.player) {
        for (let i = 0; i < 35; i++) {
          this.particles.push({
            x: this.player.x,
            y: this.player.y,
            vx: (Math.random() - 0.5) * 6,
            vy: -Math.random() * 6 - 2,
            color: '#ffe600',
            size: 4 + Math.random() * 5,
            alpha: 1,
            life: 1.2
          });
        }
      }
    }

    launchVictoryConfetti() {
      for (let i = 0; i < 150; i++) {
        this.particles.push({
          x: this.player.x + (Math.random() - 0.5) * 800,
          y: this.player.y - 400 + (Math.random() - 0.5) * 200,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 4 + 2,
          color: ['#ffe600', '#00e5ff', '#d946ef', '#ff0055', '#00f076'][Math.floor(Math.random() * 5)],
          size: 6 + Math.random() * 6,
          alpha: 1,
          life: 4.0
        });
      }
    }

    addKillfeedEntry(killer, message, isPlayer = false) {
      const feed = document.getElementById('killfeed-container');
      if (!feed) return;
      const item = document.createElement('div');
      item.className = `killfeed-item ${isPlayer ? 'player-kill' : ''}`;
      item.innerHTML = `<span style="color: ${isPlayer ? '#ffe600' : '#00e5ff'}">${killer}</span> <span>${message}</span>`;
      feed.appendChild(item);

      // Auto remove after 5 seconds
      setTimeout(() => {
        if (item.parentNode) item.parentNode.removeChild(item);
      }, 5500);

      // Keep max 5
      while (feed.children.length > 5) {
        feed.removeChild(feed.children[0]);
      }
    }

    addFloatingText(text, x, y, color = '#ffffff', scale = 1.0) {
      this.floatingTexts.push({
        text,
        x,
        y,
        color,
        scale,
        alpha: 1,
        life: 0.9,
        vy: -1.4
      });
    }

    createHitSparks(x, y, color) {
      for (let i = 0; i < 6; i++) {
        this.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          color,
          size: 3,
          alpha: 1,
          life: 0.4
        });
      }
    }

    // MAIN GAME LOOP
    loop(time) {
      const dt = Math.min((time - this.lastTime) / 1000, 0.1);
      this.lastTime = time;

      this.update(dt);
      this.render();

      requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
      if (this.state === 'bus') {
        this.updateBus(dt);
        return;
      }

      if (this.state === 'playing' || this.state === 'victory') {
        this.updatePlayer(dt);
        this.updateBots(dt);
        this.updateProjectiles(dt);
        this.updateStorm(dt);
        this.updateParticles(dt);
      }
    }

    updateBus(dt) {
      const elapsed = performance.now() - this.bus.startTime;
      this.bus.progress = Math.min(1, elapsed / this.bus.duration);
      this.bus.x = this.bus.startX + (this.bus.endX - this.bus.startX) * this.bus.progress;
      this.bus.y = this.bus.startY + (this.bus.endY - this.bus.startY) * this.bus.progress;

      this.camera.x = this.bus.x;
      this.camera.y = this.bus.y;

      if (this.bus.progress >= 1) {
        this.dropFromBus();
      }
    }

    updatePlayer(dt) {
      if (!this.player || this.player.health <= 0) return;

      // Handle Gliding down after bus jump
      if (this.player.isGliding) {
        this.player.gliderAltitude -= 45 * dt;
        if (this.player.gliderAltitude <= 0) {
          this.player.isGliding = false;
          this.player.gliderAltitude = 0;
          this.addFloatingText('TOUCHDOWN!', this.player.x, this.player.y - 30, '#00f076');
        }
      }

      // Movement Input (WASD / Arrows)
      let dx = 0;
      let dy = 0;
      if (this.keys['w'] || this.keys['arrowup']) dy -= 1;
      if (this.keys['s'] || this.keys['arrowdown']) dy += 1;
      if (this.keys['a'] || this.keys['arrowleft']) dx -= 1;
      if (this.keys['d'] || this.keys['arrowright']) dx += 1;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      const spd = this.player.isGliding ? this.player.speed * 1.5 : this.player.speed;
      this.player.x = Math.max(80, Math.min(this.island.width - 80, this.player.x + dx * spd * 60 * dt));
      this.player.y = Math.max(80, Math.min(this.island.height - 80, this.player.y + dy * spd * 60 * dt));

      // Mouse Aiming Angle
      const screenCenterX = this.width / 2;
      const screenCenterY = this.height / 2;
      this.player.angle = Math.atan2(this.mouse.y - screenCenterY, this.mouse.x - screenCenterX);

      // Camera follows player smoothly
      this.camera.x += (this.player.x - this.camera.x) * 0.1;
      this.camera.y += (this.player.y - this.camera.y) * 0.1;

      // Continuous fire for automatic weapons (SCAR / SMG)
      if (this.mouse.down && !this.player.isGliding) {
        const equipped = this.player.inventory[this.player.selectedSlot];
        if (equipped && (equipped.name.includes('SCAR') || equipped.name.includes('SMG'))) {
          this.fireEquippedWeapon();
        }
      }

      // Auto-collect nearby V-Bucks coins when walking near them
      for (let i = this.lootDrops.length - 1; i >= 0; i--) {
        const drop = this.lootDrops[i];
        if (drop && drop.isVBuck) {
          const dist = Math.hypot(drop.x - this.player.x, drop.y - this.player.y);
          if (dist < 48) {
            this.collectVBuckDrop(drop, i);
          }
        }
      }

      // Storm damage on player: Exactly 1 damage per second (as requested by user!)
      const distFromStormCenter = Math.hypot(this.player.x - this.stormZone.x, this.player.y - this.stormZone.y);
      if (distFromStormCenter > this.stormZone.radius) {
        const stormDps = 1; // 1 damage per second!
        this.player.health -= stormDps * dt;

        if (!this.playerStormTick) this.playerStormTick = 0;
        this.playerStormTick += dt;
        if (this.playerStormTick >= 1.0) {
          this.playerStormTick -= 1.0;
          this.addFloatingText('-1', this.player.x, this.player.y - 30, '#d946ef', 1.1);
        }

        if (this.player.health <= 0) {
          this.triggerEliminated('The Storm');
        }
        this.updateHUD();
      } else {
        this.playerStormTick = 0;
      }
    }

    updateBots(dt) {
      const now = performance.now();

      // Bot simulation tick
      this.bots.forEach(bot => {
        if (!bot.alive) return;

        // 1. Storm retreat AI
        const distFromCenter = Math.hypot(bot.x - this.stormZone.x, bot.y - this.stormZone.y);
        if (distFromCenter > this.stormZone.radius - 80) {
          // Move towards safe zone
          const angleToSafe = Math.atan2(this.safeZone.y - bot.y, this.safeZone.x - bot.x);
          bot.x += Math.cos(angleToSafe) * bot.speed * 60 * dt;
          bot.y += Math.sin(angleToSafe) * bot.speed * 60 * dt;
          bot.angle = angleToSafe;

          // Storm damage: Exactly 1 damage per second!
          if (distFromCenter > this.stormZone.radius) {
            bot.health -= 1 * dt;
            if (bot.health <= 0) {
              bot.alive = false;
              this.addKillfeedEntry('The Storm', `lost ${bot.name} in the storm`);
              this.checkVictoryCondition();
            }
          }
          return;
        }

        // 2. Combat Target Acquisition (Player or other Bots)
        let target = null;
        let minDist = 380; // Sight range

        // Check if player in sight
        if (this.player && this.player.health > 0 && !this.player.isGliding) {
          const d = Math.hypot(this.player.x - bot.x, this.player.y - bot.y);
          if (d < minDist) {
            target = this.player;
            minDist = d;
          }
        }

        // Or other bots
        if (!target) {
          for (let other of this.bots) {
            if (other.alive && other.id !== bot.id) {
              const d = Math.hypot(other.x - bot.x, other.y - bot.y);
              if (d < minDist) {
                target = other;
                minDist = d;
                break;
              }
            }
          }
        }

        // 3. Combat engagement
        if (target) {
          const aimAngle = Math.atan2(target.y - bot.y, target.x - bot.x);
          bot.angle = aimAngle;

          // Strafe / pursue
          if (minDist > 160) {
            bot.x += Math.cos(aimAngle) * bot.speed * 40 * dt;
            bot.y += Math.sin(aimAngle) * bot.speed * 40 * dt;
          } else if (minDist < 90) {
            // Back up
            bot.x -= Math.cos(aimAngle) * bot.speed * 30 * dt;
            bot.y -= Math.sin(aimAngle) * bot.speed * 30 * dt;
          }

          // Bot Wall building under fire!
          if (now - bot.lastWallBuildTime > 5000 && Math.random() < 0.05 && bot.wood >= 10) {
            bot.wood -= 10;
            bot.lastWallBuildTime = now;
            this.island.addWall(bot.x + Math.cos(aimAngle) * 45, bot.y + Math.sin(aimAngle) * 45, aimAngle + Math.PI / 2, bot.id);
          }

          // Shoot at target
          if (now - bot.lastShotTime > (bot.weapon.rate || 400) + 200) {
            bot.lastShotTime = now;
            // Bot aim has slight inaccuracy
            const spread = (Math.random() - 0.5) * 0.18;
            this.spawnBullet(bot.x, bot.y, aimAngle + spread, bot.weapon, bot.id);
          }
        } else {
          // Wander / Loot
          if (now > bot.changeDirTime) {
            bot.changeDirTime = now + 2500 + Math.random() * 3000;
            bot.angle = Math.random() * Math.PI * 2;
          }
          bot.x += Math.cos(bot.angle) * (bot.speed * 0.5) * 60 * dt;
          bot.y += Math.sin(bot.angle) * (bot.speed * 0.5) * 60 * dt;
        }

        // Clamp to island
        bot.x = Math.max(100, Math.min(this.island.width - 100, bot.x));
        bot.y = Math.max(100, Math.min(this.island.height - 100, bot.y));
      });
    }

    updateProjectiles(dt) {
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.distanceTraveled += Math.hypot(p.vx, p.vy) * 60 * dt;

        // Check Wall Collision
        let hitWall = false;
        for (let wall of this.island.playerWalls) {
          if (wall.health > 0) {
            const d = Math.hypot(wall.x - p.x, wall.y - p.y);
            if (d < wall.length / 2) {
              wall.health -= p.damage;
              hitWall = true;
              this.createHitSparks(p.x, p.y, '#b08968');
              break;
            }
          }
        }
        if (hitWall) {
          this.projectiles.splice(i, 1);
          continue;
        }

        // Check Player Hit
        if (p.ownerId !== 'player' && this.player && this.player.health > 0 && !this.player.isGliding) {
          const dist = Math.hypot(this.player.x - p.x, this.player.y - p.y);
          if (dist < 22) {
            const isHead = dist < 9;
            this.damageEntity(this.player, p.damage, Math.atan2(p.vy, p.vx), p.ownerId, isHead);
            this.updateHUD();
            this.projectiles.splice(i, 1);
            continue;
          }
        }

        // Check Bot Hits
        let hitBot = false;
        for (let bot of this.bots) {
          if (bot.alive && bot.id !== p.ownerId) {
            const dist = Math.hypot(bot.x - p.x, bot.y - p.y);
            if (dist < 22) {
              const isHead = dist < 9;
              this.damageEntity(bot, p.damage, Math.atan2(p.vy, p.vx), p.ownerId, isHead);
              hitBot = true;
              break;
            }
          }
        }

        if (hitBot || p.distanceTraveled >= p.maxRange) {
          this.projectiles.splice(i, 1);
        }
      }
    }

    updateStorm(dt) {
      if (this.stormTimer > 0) {
        this.stormTimer -= dt;
        if (this.stormTimer <= 0) {
          this.stormShrinking = true;
          window.soundSystem.playStormWarning();
        }
      }

      if (this.stormShrinking) {
        // Move & shrink storm circle toward safeZone
        const shrinkSpd = 30 * dt;
        this.stormZone.radius = Math.max(this.safeZone.radius, this.stormZone.radius - shrinkSpd);
        this.stormZone.x += (this.safeZone.x - this.stormZone.x) * 0.008;
        this.stormZone.y += (this.safeZone.y - this.stormZone.y) * 0.008;

        if (Math.abs(this.stormZone.radius - this.safeZone.radius) < 5) {
          this.stormShrinking = false;
          this.stormPhase++;
          this.stormTimer = Math.max(20, 45 - this.stormPhase * 5);

          // Calculate next smaller safe circle
          const nextRadius = Math.max(200, this.safeZone.radius * 0.6);
          const maxOffset = this.safeZone.radius - nextRadius;
          const offsetAngle = Math.random() * Math.PI * 2;
          const offsetDist = Math.random() * maxOffset * 0.7;

          this.safeZone = {
            x: this.safeZone.x + Math.cos(offsetAngle) * offsetDist,
            y: this.safeZone.y + Math.sin(offsetAngle) * offsetDist,
            radius: nextRadius
          };
        }
      }

      // Update Storm timer HUD
      const timerEl = document.getElementById('storm-timer');
      const stateEl = document.getElementById('storm-state');
      if (timerEl) {
        timerEl.textContent = this.stormShrinking ? 'SHRINKING' : `${Math.ceil(this.stormTimer)}s`;
      }
      if (stateEl) {
        stateEl.textContent = `STORM PHASE ${this.stormPhase}`;
      }
    }

    updateParticles(dt) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const pt = this.particles[i];
        pt.x += pt.vx * 60 * dt;
        pt.y += pt.vy * 60 * dt;
        pt.life -= dt;
        pt.alpha = Math.max(0, pt.life);
        if (pt.life <= 0) {
          this.particles.splice(i, 1);
        }
      }

      for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
        const ft = this.floatingTexts[i];
        ft.y += ft.vy;
        ft.life -= dt;
        ft.alpha = Math.max(0, ft.life);
        if (ft.life <= 0) {
          this.floatingTexts.splice(i, 1);
        }
      }
    }

    updateHUD() {
      if (!this.player) return;

      // Health & Shield Bars
      const hpFill = document.getElementById('hp-bar-fill');
      const hpVal = document.getElementById('hp-value');
      const shieldFill = document.getElementById('shield-bar-fill');
      const shieldVal = document.getElementById('shield-value');

      const hpPercent = Math.max(0, (this.player.health / this.player.maxHealth) * 100);
      const shieldPercent = Math.max(0, (this.player.shield / this.player.maxShield) * 100);

      if (hpFill) hpFill.style.width = `${hpPercent}%`;
      if (hpVal) hpVal.textContent = Math.max(0, Math.ceil(this.player.health));
      if (shieldFill) shieldFill.style.width = `${shieldPercent}%`;
      if (shieldVal) shieldVal.textContent = Math.max(0, Math.ceil(this.player.shield));

      // Alive Count
      const aliveCount = this.bots.filter(b => b.alive).length + (this.player.health > 0 ? 1 : 0);
      const aliveEl = document.getElementById('alive-count');
      if (aliveEl) aliveEl.textContent = aliveCount;

      // Elims
      const elimsEl = document.getElementById('elims-count');
      if (elimsEl) elimsEl.textContent = this.player.elims;

      // Materials (Wood)
      const woodEl = document.getElementById('wood-count');
      if (woodEl) woodEl.textContent = this.player.wood;

      // Crown Active Indicator
      const crownActiveEl = document.getElementById('hud-crown-active');
      const crownStreakEl = document.getElementById('hud-crown-streak');
      if (crownActiveEl) {
        if (this.player.hasCrown) {
          crownActiveEl.style.display = 'flex';
          if (crownStreakEl) crownStreakEl.textContent = `👑 STREAK: ${this.stats.consecutiveWins}`;
        } else {
          crownActiveEl.style.display = 'none';
        }
      }

      // In-game V-Bucks Counter
      const hudVBucks = document.getElementById('hud-vbucks-amount');
      if (hudVBucks && this.customization) {
        hudVBucks.textContent = (this.customization.vbucks || 0).toLocaleString();
      }

      // Inventory Slots
      for (let s = 0; s < 5; s++) {
        const slotEl = document.getElementById(`inv-slot-${s + 1}`);
        if (!slotEl) continue;

        const item = this.player.inventory[s];
        slotEl.className = 'inv-slot' + (this.player.selectedSlot === s ? ' active' : '');

        if (item) {
          slotEl.classList.add(`rarity-${item.rarity || 'common'}`);
          const iconEl = slotEl.querySelector('.inv-slot-icon');
          const ammoEl = slotEl.querySelector('.inv-slot-ammo');
          if (iconEl) iconEl.textContent = item.icon || '📦';
          if (ammoEl) {
            if (item.type === 'heal') {
              ammoEl.textContent = `x${item.count || 1}`;
            } else if (item.mag) {
              ammoEl.textContent = `${item.currentMag}/${item.reserve}`;
            } else {
              ammoEl.textContent = '';
            }
          }
        } else {
          const iconEl = slotEl.querySelector('.inv-slot-icon');
          const ammoEl = slotEl.querySelector('.inv-slot-ammo');
          if (iconEl) iconEl.textContent = '';
          if (ammoEl) ammoEl.textContent = '';
        }
      }
    }

    // RENDERING
    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      if (this.state === 'lobby') {
        // Draw ambient lobby particles in background
        return;
      }

      this.ctx.save();
      // Apply Camera Transform
      this.ctx.translate(this.width / 2 - this.camera.x, this.height / 2 - this.camera.y);

      // 1. Render Map Island
      this.island.render(this.ctx, this.camera);

      // 2. Render Storm Circle (Electric Purple Wall)
      this.renderStorm();

      // 3. Render Loot Drops
      this.renderLootDrops();

      // 4. Render Projectiles
      this.renderProjectiles();

      // 5. Render Bots
      this.renderBots();

      // 6. Render Player
      this.renderPlayer();

      // 7. Render Battle Bus (if in bus phase)
      if (this.state === 'bus') {
        this.renderBattleBus();
      }

      // 8. Render Particles & Floating Damage Numbers
      this.renderParticlesAndTexts();

      this.ctx.restore();

      // Render Overhead Radar Minimap
      if (this.state === 'playing' || this.state === 'bus' || this.state === 'victory') {
        const botCoords = this.bots.filter(b => b.alive).map(b => ({ x: b.x, y: b.y }));
        this.island.renderMinimap(
          this.minimapCtx,
          this.minimapCanvas.width,
          this.minimapCanvas.height,
          this.safeZone,
          this.stormZone,
          this.player,
          botCoords
        );
      }
    }

    renderBattleBus() {
      this.ctx.save();
      this.ctx.translate(this.bus.x, this.bus.y);

      // Balloon Hot Air
      this.ctx.fillStyle = '#0077ff';
      this.ctx.beginPath();
      this.ctx.arc(0, -70, 45, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#ffe600';
      this.ctx.lineWidth = 4;
      this.ctx.stroke();

      // Ropes
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(-30, -50);
      this.ctx.lineTo(-20, -15);
      this.ctx.moveTo(30, -50);
      this.ctx.lineTo(20, -15);
      this.ctx.stroke();

      // Blue Bus Body
      this.ctx.fillStyle = '#0055d4';
      this.ctx.fillRect(-50, -15, 100, 32);
      this.ctx.strokeStyle = '#002b66';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(-50, -15, 100, 32);

      // Windows
      this.ctx.fillStyle = '#a2c8ff';
      for (let i = -38; i <= 28; i += 22) {
        this.ctx.fillRect(i, -10, 16, 12);
      }

      // Bus Exhaust Flame
      this.ctx.fillStyle = '#ff6600';
      this.ctx.beginPath();
      this.ctx.moveTo(-50, 0);
      this.ctx.lineTo(-75 + Math.random() * 8, 3);
      this.ctx.lineTo(-50, 6);
      this.ctx.fill();

      this.ctx.restore();
    }

    renderPlayer() {
      if (!this.player || this.player.health <= 0) return;

      this.ctx.save();
      this.ctx.translate(this.player.x, this.player.y);

      // If Gliding, draw Umbrella Glider
      if (this.player.isGliding) {
        this.ctx.save();
        this.ctx.translate(0, -25);
        this.ctx.fillStyle = '#7928ca';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 36, Math.PI, 0);
        this.ctx.fill();
        this.ctx.strokeStyle = '#00e5ff';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.restore();
      }

      // Rotate character to aim angle
      this.ctx.rotate(this.player.angle);

      // Shadow
      this.ctx.fillStyle = 'rgba(0,0,0,0.35)';
      this.ctx.beginPath();
      this.ctx.arc(2, 2, 18, 0, Math.PI * 2);
      this.ctx.fill();

      const customSkin = (this.player && this.player.customSkin) || SKINS[this.customization.equippedSkin] || SKINS.jonesy;
      const skinColor = (this.player && this.player.customization && this.player.customization.skinColor) || this.customization.skinColor || customSkin.defaultSkinColor || '#fdcb6e';
      const hairColor = (this.player && this.player.customization && this.player.customization.hairColor) || this.customization.hairColor || customSkin.defaultHairColor || '#f6e05e';
      const hairStyle = (this.player && this.player.customization && this.player.customization.hairStyle) || this.customization.hairStyle || customSkin.defaultHairStyle || 'crewcut';
      const pickaxeData = PICKAXES[this.customization.equippedPickaxe] || PICKAXES.classic;

      // Hands / Arms
      this.ctx.fillStyle = skinColor;
      this.ctx.beginPath();
      this.ctx.arc(15, 12, 5, 0, Math.PI * 2); // Right hand holding weapon
      this.ctx.arc(12, -12, 5, 0, Math.PI * 2); // Left hand
      this.ctx.fill();

      // Weapon in hands
      const equipped = this.player.inventory[this.player.selectedSlot];
      if (equipped && !this.player.isGliding) {
        if (equipped.type === 'melee') {
          // Render equipped customized pickaxe
          this.renderPickaxeInHand(pickaxeData);
        } else if (equipped.type === 'heal') {
          this.ctx.fillStyle = '#00e5ff';
          this.ctx.beginPath();
          this.ctx.arc(20, 10, 7, 0, Math.PI * 2);
          this.ctx.fill();
        } else {
          // Gun barrel
          this.ctx.fillStyle = '#2d3436';
          this.ctx.fillRect(10, 8, 25, 6);
        }
      }

      // Player Body (Customized Outfit)
      this.ctx.fillStyle = customSkin.bodyColor || '#2b6cb0';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 16, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = customSkin.accentColor || '#ffffff';
      this.ctx.lineWidth = 2.5;
      this.ctx.stroke();

      // Tactical Armor / Vest
      this.ctx.fillStyle = customSkin.vestColor || '#2d3748';
      this.ctx.fillRect(-6, -9, 12, 18);

      // Head (Customized Skin Tone)
      this.ctx.fillStyle = skinColor;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
      this.ctx.fill();

      // Top-Down Hair Style & Color
      this.renderPlayerHairTopDown(hairStyle, hairColor, customSkin.accentColor);

      this.ctx.restore();

      // FLOATING GLOWING VICTORY CROWN ABOVE HEAD (If Player Holds Crown!)
      if (this.player.hasCrown) {
        this.ctx.save();
        this.ctx.translate(this.player.x, this.player.y - 34);

        // Pulsing golden aura
        const crownPulse = 1 + Math.sin(performance.now() * 0.006) * 0.15;
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.35)';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 18 * crownPulse, 0, Math.PI * 2);
        this.ctx.fill();

        // Little crown drawing
        this.ctx.fillStyle = '#ffd700';
        this.ctx.beginPath();
        this.ctx.moveTo(-12, 4);
        this.ctx.lineTo(-14, -8);
        this.ctx.lineTo(-6, -2);
        this.ctx.lineTo(0, -12); // Center crown spike
        this.ctx.lineTo(6, -2);
        this.ctx.lineTo(14, -8);
        this.ctx.lineTo(12, 4);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        // Crown Jewel Sparkles
        this.ctx.fillStyle = '#ff0055';
        this.ctx.beginPath();
        this.ctx.arc(0, -2, 2.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Floating Crown Streak Number Tag
        if (this.stats.consecutiveWins > 0) {
          this.ctx.font = '900 11px "Luckiest Guy"';
          this.ctx.fillStyle = '#ffe600';
          this.ctx.textAlign = 'center';
          this.ctx.fillText(`${this.stats.consecutiveWins}`, 0, -16);
        }

        this.ctx.restore();
      }

      // Player Name Tag & Health above head
      this.ctx.save();
      this.ctx.font = '800 12px "Outfit"';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = '#000';
      this.ctx.shadowBlur = 4;
      this.ctx.fillText('YOU', this.player.x, this.player.y - 22);

      // Mini Health/Shield bar
      const barW = 34;
      this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
      this.ctx.fillRect(this.player.x - barW / 2, this.player.y - 18, barW, 4);
      if (this.player.shield > 0) {
        this.ctx.fillStyle = '#00e5ff';
        this.ctx.fillRect(this.player.x - barW / 2, this.player.y - 18, (this.player.shield / 100) * barW, 4);
      } else {
        this.ctx.fillStyle = '#00f076';
        this.ctx.fillRect(this.player.x - barW / 2, this.player.y - 18, (this.player.health / 100) * barW, 4);
      }
      this.ctx.restore();
    }

    renderBots() {
      const viewL = this.camera.x - this.camera.width / 2 - 50;
      const viewR = this.camera.x + this.camera.width / 2 + 50;
      const viewT = this.camera.y - this.camera.height / 2 - 50;
      const viewB = this.camera.y + this.camera.height / 2 + 50;

      this.bots.forEach(bot => {
        if (!bot.alive) return;
        if (bot.x < viewL || bot.x > viewR || bot.y < viewT || bot.y > viewB) return;

        this.ctx.save();
        this.ctx.translate(bot.x, bot.y);
        this.ctx.rotate(bot.angle);

        // Bot Shadow
        this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
        this.ctx.beginPath();
        this.ctx.arc(2, 2, 17, 0, Math.PI * 2);
        this.ctx.fill();

        // Bot Arms
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.beginPath();
        this.ctx.arc(14, 11, 4.5, 0, Math.PI * 2);
        this.ctx.arc(11, -11, 4.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Bot Gun barrel
        this.ctx.fillStyle = '#1a202c';
        this.ctx.fillRect(9, 7, 20, 5);

        // Bot Body (Red/Orange/Purple hostile tints)
        this.ctx.fillStyle = '#e53e3e';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#2d3748';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Bot Head
        this.ctx.fillStyle = '#f6ad55';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 9, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();

        // If bot has a crown
        if (bot.hasCrown) {
          this.ctx.save();
          this.ctx.translate(bot.x, bot.y - 32);
          this.ctx.fillStyle = '#ffd700';
          this.ctx.beginPath();
          this.ctx.moveTo(-10, 4);
          this.ctx.lineTo(-12, -7);
          this.ctx.lineTo(-5, -2);
          this.ctx.lineTo(0, -10);
          this.ctx.lineTo(5, -2);
          this.ctx.lineTo(12, -7);
          this.ctx.lineTo(10, 4);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.restore();
        }

        // Bot Name & Mini Health Bar
        this.ctx.save();
        this.ctx.font = '600 11px "Outfit"';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#edf2f7';
        this.ctx.fillText(bot.name, bot.x, bot.y - 20);

        const bw = 30;
        this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.ctx.fillRect(bot.x - bw / 2, bot.y - 17, bw, 3.5);
        this.ctx.fillStyle = bot.shield > 0 ? '#00e5ff' : '#e53e3e';
        this.ctx.fillRect(bot.x - bw / 2, bot.y - 17, (bot.health / 100) * bw, 3.5);
        this.ctx.restore();
      });
    }

    renderLootDrops() {
      const viewL = this.camera.x - this.camera.width / 2 - 40;
      const viewR = this.camera.x + this.camera.width / 2 + 40;
      const viewT = this.camera.y - this.camera.height / 2 - 40;
      const viewB = this.camera.y + this.camera.height / 2 + 40;

      const rarityColorMap = {
        common: '#8e9aaf',
        uncommon: '#2ec4b6',
        rare: '#0077b6',
        epic: '#9b5de5',
        legendary: '#ff9e00',
        mythic: '#00f5d4'
      };

      this.lootDrops.forEach(drop => {
        if (drop.x < viewL || drop.x > viewR || drop.y < viewT || drop.y > viewB) return;

        drop.floatOffset += 0.05;
        const bob = Math.sin(drop.floatOffset) * 4;
        const rColor = rarityColorMap[drop.rarity] || '#ffffff';

        this.ctx.save();
        this.ctx.translate(drop.x, drop.y + bob);

        // Ground Rarity Beam & Glow
        const grad = this.ctx.createRadialGradient(0, 0, 2, 0, 0, 28);
        grad.addColorStop(0, rColor);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 28, 0, Math.PI * 2);
        this.ctx.fill();

        if (drop.isCrown) {
          // DROPPED GOLDEN CROWN!
          this.ctx.fillStyle = '#ffd700';
          this.ctx.beginPath();
          this.ctx.moveTo(-16, 6);
          this.ctx.lineTo(-18, -12);
          this.ctx.lineTo(-8, -3);
          this.ctx.lineTo(0, -18);
          this.ctx.lineTo(8, -3);
          this.ctx.lineTo(18, -12);
          this.ctx.lineTo(16, 6);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.strokeStyle = '#fff';
          this.ctx.lineWidth = 2;
          this.ctx.stroke();

          this.ctx.font = '800 11px "Luckiest Guy"';
          this.ctx.fillStyle = '#ffd700';
          this.ctx.textAlign = 'center';
          this.ctx.fillText('[E] VICTORY CROWN', 0, -22);
        } else if (drop.isVBuck) {
          // Radiant 3D Glowing V-Bucks Coin
          const coinPulse = 1 + Math.sin(drop.floatOffset * 2.5) * 0.12;

          // Shiny radial aura
          const cGrad = this.ctx.createRadialGradient(0, 0, 2, 0, 0, 26 * coinPulse);
          cGrad.addColorStop(0, 'rgba(0, 229, 255, 0.85)');
          cGrad.addColorStop(0.5, 'rgba(255, 230, 0, 0.45)');
          cGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          this.ctx.fillStyle = cGrad;
          this.ctx.beginPath();
          this.ctx.arc(0, 0, 26 * coinPulse, 0, Math.PI * 2);
          this.ctx.fill();

          // Outer Cyan Beveled Rim
          this.ctx.fillStyle = '#00e5ff';
          this.ctx.beginPath();
          this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.strokeStyle = '#ffffff';
          this.ctx.lineWidth = 1.5;
          this.ctx.stroke();

          // Inner Golden Coin Face
          this.ctx.fillStyle = '#ffe600';
          this.ctx.beginPath();
          this.ctx.arc(0, 0, 11, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.strokeStyle = '#b38600';
          this.ctx.lineWidth = 1;
          this.ctx.stroke();

          // Bold V Symbol
          this.ctx.font = '900 13px "Luckiest Guy"';
          this.ctx.fillStyle = '#0f172a';
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          this.ctx.fillText('V', 0, 1);

          // Name Tag on proximity
          if (this.player && Math.hypot(drop.x - this.player.x, drop.y - this.player.y) < 80) {
            this.ctx.font = '800 11px "Luckiest Guy"';
            this.ctx.fillStyle = '#00e5ff';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`+${drop.amount} V-BUCKS`, 0, -20);
          }
        } else {
          // Weapon / Item Icon
          this.ctx.font = '16px "Outfit"';
          this.ctx.textAlign = 'center';
          this.ctx.fillText(drop.item.icon || '📦', 0, 6);

          // Name Tag on proximity
          if (this.player && Math.hypot(drop.x - this.player.x, drop.y - this.player.y) < 70) {
            this.ctx.font = '800 11px "Luckiest Guy"';
            this.ctx.fillStyle = rColor;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`[E] ${drop.item.name}`, 0, -18);
          }
        }

        this.ctx.restore();
      });
    }

    renderProjectiles() {
      this.ctx.save();
      this.projectiles.forEach(p => {
        // Glowing tracer line
        this.ctx.strokeStyle = p.ownerId === 'player' ? '#ffe600' : '#ff0055';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
        this.ctx.stroke();
      });
      this.ctx.restore();
    }

    renderStorm() {
      // Draw outer storm purple barrier
      this.ctx.save();
      this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.85)';
      this.ctx.lineWidth = 8;
      this.ctx.shadowColor = '#d946ef';
      this.ctx.shadowBlur = 20;

      this.ctx.beginPath();
      this.ctx.arc(this.stormZone.x, this.stormZone.y, this.stormZone.radius, 0, Math.PI * 2);
      this.ctx.stroke();

      // Storm interior purple fog overlay
      this.ctx.fillStyle = 'rgba(121, 40, 202, 0.28)';
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.island.width, this.island.height);
      this.ctx.arc(this.stormZone.x, this.stormZone.y, this.stormZone.radius, 0, Math.PI * 2, true);
      this.ctx.fill();

      // Safe Zone white dashed line
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([12, 10]);
      this.ctx.beginPath();
      this.ctx.arc(this.safeZone.x, this.safeZone.y, this.safeZone.radius, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.restore();
    }

    renderParticlesAndTexts() {
      // Particles
      this.particles.forEach(pt => {
        this.ctx.save();
        this.ctx.globalAlpha = pt.alpha;
        this.ctx.fillStyle = pt.color;
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });

      // Floating Texts (Damage & Notifications)
      this.floatingTexts.forEach(ft => {
        this.ctx.save();
        this.ctx.globalAlpha = ft.alpha;
        this.ctx.font = `900 ${Math.round(20 * (ft.scale || 1))}px "Luckiest Guy"`;
        this.ctx.fillStyle = ft.color;
        this.ctx.shadowColor = '#000';
        this.ctx.shadowBlur = 6;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(ft.text, ft.x, ft.y);
        this.ctx.restore();
      });
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.game = new BattleRoyaleGame();
  });
})();
