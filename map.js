// Fortnite Island Map Generator & POI system
class IslandMap {
  constructor(width = 4000, height = 4000) {
    this.width = width;
    this.height = height;

    this.pois = [
      { name: 'TILTED TOWERS', x: 1700, y: 1900, radius: 260 },
      { name: 'PLEASANT PARK', x: 1200, y: 1100, radius: 240 },
      { name: 'RETAIL ROW', x: 2900, y: 2200, radius: 250 },
      { name: 'LOOT LAKE', x: 2000, y: 1400, radius: 230, isWater: true },
      { name: 'SALTY SPRINGS', x: 2100, y: 2600, radius: 200 },
      { name: 'FATAL FIELDS', x: 2300, y: 3200, radius: 240 },
      { name: 'LONELY LODGE', x: 3300, y: 1300, radius: 220 },
      { name: 'SHIFTY SHAFTS', x: 1300, y: 2700, radius: 210 }
    ];

    this.buildings = [];
    this.trees = [];
    this.rocks = [];
    this.chests = [];
    this.supplyDrops = [];
    this.playerWalls = []; // Built by player or bots

    this.generateWorld();
  }

  generateWorld() {
    // Generate structures for POIs
    this.pois.forEach(poi => {
      if (poi.isWater) {
        // Island house in Loot Lake
        this.buildings.push({
          x: poi.x - 60,
          y: poi.y - 60,
          w: 120,
          h: 120,
          color: '#4a5568',
          roofColor: '#2b6cb0',
          health: 1200,
          maxHealth: 1200
        });
        this.chests.push({ x: poi.x, y: poi.y, opened: false, glowAngle: 0 });
        return;
      }

      // Add 4-7 buildings per POI
      const numBldgs = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numBldgs; i++) {
        const angle = (i / numBldgs) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const dist = 70 + Math.random() * (poi.radius - 100);
        const bx = poi.x + Math.cos(angle) * dist;
        const by = poi.y + Math.sin(angle) * dist;
        const bw = 90 + Math.floor(Math.random() * 50);
        const bh = 90 + Math.floor(Math.random() * 50);

        this.buildings.push({
          x: bx - bw / 2,
          y: by - bh / 2,
          w: bw,
          h: bh,
          color: '#3d4451',
          roofColor: '#718096',
          health: 800,
          maxHealth: 800
        });

        // 1-2 Chests per building
        this.chests.push({
          x: bx + (Math.random() - 0.5) * 40,
          y: by + (Math.random() - 0.5) * 40,
          opened: false,
          glowAngle: Math.random() * Math.PI * 2
        });
      }
    });

    // Random Wilderness Buildings & Cabins
    for (let i = 0; i < 20; i++) {
      const bx = 400 + Math.random() * (this.width - 800);
      const by = 400 + Math.random() * (this.height - 800);
      const bw = 80;
      const bh = 80;
      this.buildings.push({
        x: bx,
        y: by,
        w: bw,
        h: bh,
        color: '#5c4033',
        roofColor: '#8b5a2b',
        health: 600,
        maxHealth: 600
      });
      this.chests.push({
        x: bx + bw / 2,
        y: by + bh / 2,
        opened: false,
        glowAngle: Math.random() * Math.PI * 2
      });
    }

    // Generate Trees across the island
    for (let i = 0; i < 350; i++) {
      const tx = 200 + Math.random() * (this.width - 400);
      const ty = 200 + Math.random() * (this.height - 400);
      this.trees.push({
        x: tx,
        y: ty,
        radius: 20 + Math.random() * 15,
        health: 200,
        maxHealth: 200,
        woodYield: 30
      });
    }

    // Generate Rocks
    for (let i = 0; i < 180; i++) {
      const rx = 200 + Math.random() * (this.width - 400);
      const ry = 200 + Math.random() * (this.height - 400);
      this.rocks.push({
        x: rx,
        y: ry,
        radius: 16 + Math.random() * 12,
        health: 300,
        maxHealth: 300
      });
    }
  }

  // Add player-built defensive wall
  addWall(x, y, angle, ownerId) {
    const wallLength = 70;
    const wallThickness = 14;
    const wall = {
      x,
      y,
      angle,
      length: wallLength,
      thickness: wallThickness,
      health: 150,
      maxHealth: 150,
      ownerId,
      createdAt: Date.now()
    };
    this.playerWalls.push(wall);
    return wall;
  }

  // Draw terrain & world structures within camera view
  render(ctx, camera) {
    const viewL = camera.x - camera.width / 2 - 100;
    const viewR = camera.x + camera.width / 2 + 100;
    const viewT = camera.y - camera.height / 2 - 100;
    const viewB = camera.y + camera.height / 2 + 100;

    // Grass Background
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(0, 0, this.width, this.height);

    // Stylized Island Coastline / Ocean border
    ctx.strokeStyle = '#1b4965';
    ctx.lineWidth = 120;
    ctx.strokeRect(60, 60, this.width - 120, this.height - 120);

    // Render Rivers & Loot Lake
    ctx.fillStyle = '#1f7a8c';
    // Loot lake circle
    const lake = this.pois.find(p => p.isWater);
    if (lake) {
      ctx.beginPath();
      ctx.arc(lake.x, lake.y, lake.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Render POI ground zones
    this.pois.forEach(poi => {
      if (poi.isWater) return;
      ctx.fillStyle = 'rgba(40, 100, 60, 0.4)';
      ctx.beginPath();
      ctx.arc(poi.x, poi.y, poi.radius, 0, Math.PI * 2);
      ctx.fill();

      // POI Name on ground (soft aesthetic)
      ctx.save();
      ctx.font = '900 32px "Luckiest Guy"';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.textAlign = 'center';
      ctx.fillText(poi.name, poi.x, poi.y);
      ctx.restore();
    });

    // Render Buildings
    this.buildings.forEach(b => {
      if (b.x + b.w < viewL || b.x > viewR || b.y + b.h < viewT || b.y > viewB) return;
      if (b.health <= 0) return;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(b.x + 8, b.y + 8, b.w, b.h);

      // Building Wall Base
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.w, b.h);

      // Roof Border & Trim
      ctx.strokeStyle = '#1a202c';
      ctx.lineWidth = 4;
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      // Inner Roof Fill
      ctx.fillStyle = b.roofColor;
      ctx.fillRect(b.x + 8, b.y + 8, b.w - 16, b.h - 16);
    });

    // Render Built Walls
    this.playerWalls.forEach(wall => {
      if (wall.health <= 0) return;
      ctx.save();
      ctx.translate(wall.x, wall.y);
      ctx.rotate(wall.angle);

      // Wall shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(-wall.length / 2 + 4, -wall.thickness / 2 + 4, wall.length, wall.thickness);

      // Wooden Wall
      ctx.fillStyle = '#b08968';
      ctx.fillRect(-wall.length / 2, -wall.thickness / 2, wall.length, wall.thickness);

      // Planks border
      ctx.strokeStyle = '#7f5539';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(-wall.length / 2, -wall.thickness / 2, wall.length, wall.thickness);

      // Health bar above damaged wall
      if (wall.health < wall.maxHealth) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(-25, -20, 50, 6);
        ctx.fillStyle = '#00f076';
        ctx.fillRect(-25, -20, (wall.health / wall.maxHealth) * 50, 6);
      }

      ctx.restore();
    });

    // Render Rocks
    this.rocks.forEach(r => {
      if (r.x + r.radius < viewL || r.x - r.radius > viewR || r.y + r.radius < viewT || r.y - r.radius > viewB) return;
      if (r.health <= 0) return;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.arc(r.x + 4, r.y + 4, r.radius, 0, Math.PI * 2);
      ctx.fill();

      // Rock body
      ctx.fillStyle = '#6c757d';
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#495057';
      ctx.lineWidth = 3;
      ctx.stroke();
    });

    // Render Chests
    this.chests.forEach(chest => {
      if (chest.x < viewL || chest.x > viewR || chest.y < viewT || chest.y > viewB) return;

      ctx.save();
      ctx.translate(chest.x, chest.y);

      if (!chest.opened) {
        // Glowing Aura
        chest.glowAngle = (chest.glowAngle + 0.04) % (Math.PI * 2);
        const pulse = 1 + Math.sin(chest.glowAngle) * 0.2;
        const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 45 * pulse);
        grad.addColorStop(0, 'rgba(255, 215, 0, 0.7)');
        grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 45 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Chest box
        ctx.fillStyle = '#b37400';
        ctx.fillRect(-14, -10, 28, 20);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.strokeRect(-14, -10, 28, 20);

        // Chest lock latch
        ctx.fillStyle = '#fff';
        ctx.fillRect(-3, -2, 6, 6);
      } else {
        // Opened chest
        ctx.fillStyle = '#664200';
        ctx.fillRect(-14, -10, 28, 20);
        ctx.strokeStyle = '#8c5900';
        ctx.lineWidth = 2;
        ctx.strokeRect(-14, -10, 28, 20);
      }
      ctx.restore();
    });

    // Render Trees
    this.trees.forEach(t => {
      if (t.x + t.radius < viewL || t.x - t.radius > viewR || t.y + t.radius < viewT || t.y - t.radius > viewB) return;
      if (t.health <= 0) return;

      // Tree shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.arc(t.x + 6, t.y + 6, t.radius, 0, Math.PI * 2);
      ctx.fill();

      // Tree canopy
      ctx.fillStyle = '#1b4332';
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner lighter leaves
      ctx.fillStyle = '#2d6a4f';
      ctx.beginPath();
      ctx.arc(t.x - 3, t.y - 3, t.radius * 0.75, 0, Math.PI * 2);
      ctx.fill();

      // Trunk center
      ctx.fillStyle = '#582f0e';
      ctx.beginPath();
      ctx.arc(t.x, t.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Draw Minimap on dedicated canvas
  renderMinimap(mCtx, mWidth, mHeight, safeZone, stormZone, player, botPositions) {
    mCtx.clearRect(0, 0, mWidth, mHeight);

    const scaleX = mWidth / this.width;
    const scaleY = mHeight / this.height;

    // Island landmass
    mCtx.fillStyle = '#2d6a4f';
    mCtx.fillRect(0, 0, mWidth, mHeight);

    // Lake
    const lake = this.pois.find(p => p.isWater);
    if (lake) {
      mCtx.fillStyle = '#1f7a8c';
      mCtx.beginPath();
      mCtx.arc(lake.x * scaleX, lake.y * scaleY, lake.radius * scaleX, 0, Math.PI * 2);
      mCtx.fill();
    }

    // POI dots
    mCtx.fillStyle = 'rgba(255,255,255,0.4)';
    this.pois.forEach(p => {
      mCtx.beginPath();
      mCtx.arc(p.x * scaleX, p.y * scaleY, 3, 0, Math.PI * 2);
      mCtx.fill();
    });

    // Storm boundary (Purple)
    if (stormZone) {
      mCtx.save();
      mCtx.strokeStyle = 'rgba(168, 85, 247, 0.9)';
      mCtx.lineWidth = 2.5;
      mCtx.fillStyle = 'rgba(121, 40, 202, 0.35)';
      mCtx.beginPath();
      // Draw outer storm
      mCtx.rect(0, 0, mWidth, mHeight);
      mCtx.arc(stormZone.x * scaleX, stormZone.y * scaleY, stormZone.radius * scaleX, 0, Math.PI * 2, true);
      mCtx.fill();
      mCtx.restore();
    }

    // Safe Zone circle (White)
    if (safeZone) {
      mCtx.strokeStyle = '#ffffff';
      mCtx.lineWidth = 1.5;
      mCtx.setLineDash([4, 3]);
      mCtx.beginPath();
      mCtx.arc(safeZone.x * scaleX, safeZone.y * scaleY, safeZone.radius * scaleX, 0, Math.PI * 2);
      mCtx.stroke();
      mCtx.setLineDash([]);
    }

    // Other Bots (Small faint markers when close)
    if (botPositions && player) {
      mCtx.fillStyle = '#ff0055';
      botPositions.forEach(bot => {
        const dx = bot.x - player.x;
        const dy = bot.y - player.y;
        if (Math.hypot(dx, dy) < 800) { // Close proximity radar
          mCtx.beginPath();
          mCtx.arc(bot.x * scaleX, bot.y * scaleY, 2, 0, Math.PI * 2);
          mCtx.fill();
        }
      });
    }

    // Player marker (Glowing Cyan arrow/dot)
    if (player) {
      const px = player.x * scaleX;
      const py = player.y * scaleY;

      mCtx.save();
      mCtx.translate(px, py);
      mCtx.rotate(player.angle);

      // Player Arrow
      mCtx.fillStyle = '#00e5ff';
      mCtx.beginPath();
      mCtx.moveTo(7, 0);
      mCtx.lineTo(-5, -4);
      mCtx.lineTo(-2, 0);
      mCtx.lineTo(-5, 4);
      mCtx.closePath();
      mCtx.fill();
      mCtx.strokeStyle = '#ffffff';
      mCtx.lineWidth = 1;
      mCtx.stroke();
      mCtx.restore();
    }
  }
}

window.IslandMap = IslandMap;
