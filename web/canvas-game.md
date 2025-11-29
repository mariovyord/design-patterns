# Canvas 101: Build a Tiny Game in ~80 Lines

The `<canvas>` element gives you a 2D drawing surface in the browser—perfect for quick visualizations and simple games. You draw with JavaScript using an API similar to a lightweight immediate-mode graphics library: clear the screen, draw shapes/images, repeat every frame.

---

## 1) Minimal Setup

```html
<canvas id="game" width="480" height="320"></canvas>
<script>
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d'); // 2D drawing context
</script>
```

- `width`/`height` define the *internal* resolution (logical pixels).
- Use `getContext('2d')` to access drawing commands.

---

## 2) Draw Something

```js
ctx.fillStyle = '#222';
ctx.fillRect(0, 0, canvas.width, canvas.height); // background
ctx.fillStyle = 'tomato';
ctx.fillRect(20, 20, 50, 50); // a square
```

Common calls:
- `fillRect(x, y, w, h)`, `strokeRect(...)`
- `beginPath()`, `arc(x, y, r, 0, Math.PI*2)`, `fill()`
- `fillText("Hello", x, y)`

---

## 3) Animation Loop

Use `requestAnimationFrame` for smooth, synced rendering:

```js
let last = 0;
function loop(t) {
  const dt = (t - last) / 1000; // seconds since last frame
  last = t;
  update(dt);
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
```

- `dt` (delta time) helps make motion time-based (same speed on fast/slow machines).

---

## 4) Input (Keyboard)

Track keys on `keydown`/`keyup`:

```js
const keys = new Set();
addEventListener('keydown', e => keys.add(e.key));
addEventListener('keyup',   e => keys.delete(e.key));
```

---

## 5) Collision (AABB)

Axis-Aligned Bounding Box overlap:

```js
function hit(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}
```

---

## Complete Example: “Dodge!” (Arrow Keys to Move)

Paste this into an `index.html` and open it. Avoid the falling blocks; score goes up the longer you survive.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Dodge! — tiny Canvas game</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html, body { height: 100%; margin: 0; background:#111; color:#ddd; font: 14px/1.4 system-ui, sans-serif; }
    .wrap { display:grid; place-items:center; height:100%; gap:12px; }
    canvas { background:#181818; border:1px solid #2c2c2c; image-rendering: pixelated; }
    .hint { opacity:.8 }
  </style>
</head>
<body>
  <div class="wrap">
    <canvas id="game" width="480" height="320"></canvas>
    <div class="hint">Move with ← → (or A/D). Avoid the falling blocks. Press R to restart.</div>
  </div>

  <script>
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  // --- Input ---
  const keys = new Set();
  addEventListener('keydown', e => keys.add(e.key.toLowerCase()));
  addEventListener('keyup',   e => keys.delete(e.key.toLowerCase()));

  // --- Entities ---
  const player = { x: 220, y: 280, w: 40, h: 20, speed: 200 };
  let enemies = [];
  let spawnTimer = 0;
  let score = 0;
  let alive = true;

  function spawnEnemy() {
    const w = 20 + Math.random()*40;
    const x = Math.random() * (canvas.width - w);
    const speed = 80 + Math.random()*120;
    enemies.push({ x, y: -30, w, h: 20, vy: speed });
  }

  function reset() {
    player.x = (canvas.width - player.w)/2;
    enemies = [];
    spawnTimer = 0;
    score = 0;
    alive = true;
  }

  // --- Helpers ---
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function hit(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // --- Game Loop ---
  let last = 0;
  function loop(t) {
    const dt = Math.min((t - last) / 1000, 0.05); // cap dt
    last = t;

    update(dt);
    render();

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function update(dt) {
    // restart
    if (!alive && (keys.has('r'))) reset();

    // player move
    const left  = keys.has('arrowleft') || keys.has('a');
    const right = keys.has('arrowright') || keys.has('d');
    if (left)  player.x -= player.speed * dt;
    if (right) player.x += player.speed * dt;
    player.x = clamp(player.x, 0, canvas.width - player.w);

    if (!alive) return;

    // spawn enemies
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnEnemy();
      // spawn gets faster over time
      spawnTimer = Math.max(0.15, 0.8 - score * 0.0008);
    }

    // move enemies
    enemies.forEach(e => e.y += e.vy * dt);
    enemies = enemies.filter(e => e.y < canvas.height + 40);

    // collisions
    for (const e of enemies) {
      if (hit(player, e)) { alive = false; break; }
    }

    // score increases over time
    score += dt * 100;
  }

  function render() {
    // background
    ctx.fillStyle = '#101418';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // starry backdrop
    ctx.fillStyle = '#0b2238';
    for (let i = 0; i < 40; i++) {
      const x = (i*97 % canvas.width);
      const y = (i*53 + (performance.now()/40)%canvas.height) % canvas.height;
      ctx.fillRect(x, y, 2, 2);
    }

    // player
    ctx.fillStyle = alive ? '#53e2ae' : '#888';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // enemies
    ctx.fillStyle = '#ff6b6b';
    enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));

    // UI
    ctx.fillStyle = '#e4e4e4';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText(`Score: ${Math.floor(score)}`, 12, 22);

    if (!alive) {
      ctx.font = 'bold 24px system-ui, sans-serif';
      const msg = 'Game Over — press R to restart';
      const w = ctx.measureText(msg).width;
      ctx.fillText(msg, (canvas.width - w)/2, canvas.height/2);
    }
  }
  </script>
</body>
</html>
```

---

## How It Works (Quick Recap)

- **Game state**: `player`, an array of `enemies`, a `score`, and booleans.
- **Update step**: handles input, spawns/moves enemies, checks collisions, updates `score`.
- **Render step**: clears the canvas, draws player/enemies/UI.
- **Time-based movement**: multiply velocities by `dt` for consistent speed.
- **Difficulty curve**: spawn interval shrinks as score grows.

---

## Ideas to Extend

- Add **lives** or **invincibility frames** after a hit.  
- Add **power-ups** (slow time, shield).  
- Track **high score** via `localStorage`.  
- Mobile support: add on-screen left/right buttons or tilt controls.  
- Replace rectangles with **sprites**: `const img = new Image(); img.src = '...'`; then `drawImage`.
