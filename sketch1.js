// Responsive LANDSCAPE bestie animation for Hiba
// Fullscreen canvas + bubble title + stars + cats + hearts + pop words + hugs

const NAME = "HIBAAA!!!";
const SUB  = "bestie chaos energy ✨";
const POP_WORDS = [
  "SLAY!!", "ICONIC!!", "CUTIE!!", "GORGEOUS!!", "OMG!!!",
  "BESTIE!!", "HUGS!!", "LOVE U!!", "MEOW!!", "STAR!!", "HAHAHA!!"
];

let stars = [];
let pops = [];
let hearts = [];
let cats = [];
let shake = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  noStroke();
  initScene();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initScene();
}

function initScene() {
  // recreate stars for new size
  stars = [];
  for (let i = 0; i < 260; i++) stars.push(makeStar());

  // cat stickers: corners
  cats = [
    { x: 110, y: 120, s: 1.0, ph: random(TWO_PI) },
    { x: width - 110, y: 120, s: 0.95, ph: random(TWO_PI) },
    { x: 110, y: height - 120, s: 0.95, ph: random(TWO_PI) },
    { x: width - 110, y: height - 120, s: 1.0, ph: random(TWO_PI) }
  ];
}

function draw() {
  drawWavyGradient();

  updateStars();
  drawStars();

  push();
  translate(random(-shake, shake), random(-shake, shake));
  shake *= 0.88;

  // background cats
  drawCats();

  // layout positions based on screen
  const cx = width / 2;
  const cy = height / 2;
  const titleY = cy - min(120, height * 0.15);
  const subY   = titleY + min(110, height * 0.18);

  // glow behind title
  drawGlow(cx, titleY, min(width, height) * 0.95);

  // bubble title
  bubbleText(NAME, cx, titleY, clamp(width * 0.12, 64, 120));

  // subtitle
  fill(255, 245);
  textSize(clamp(width * 0.035, 18, 34));
  textStyle(BOLD);
  text(SUB, cx, subY);

  // small hint
  fill(255, 220);
  textStyle(NORMAL);
  textSize(clamp(width * 0.022, 14, 22));
  text("click / tap for MORE chaos 💖", cx, height - clamp(height * 0.06, 34, 52));

  // spawns
  if (frameCount % 12 === 0) spawnPop();
  if (frameCount % 3 === 0) spawnHearts(2);

  updateHearts();
  drawHearts();

  updatePops();
  drawPops();

  pop();
}

// ---------- interaction ----------
function mousePressed() {
  shake = 10;
  for (let i = 0; i < 7; i++) spawnPop(true);
  spawnHearts(22);
  spawnHugs();
}

// ---------- background ----------
function drawWavyGradient() {
  const c1 = color(255, 120, 200);
  const c2 = color(155, 80, 255);

  for (let y = 0; y < height; y++) {
    let t = y / height;
    let wave =
      0.10 * sin(frameCount * 0.02 + y * 0.03) +
      0.06 * sin(frameCount * 0.016 + y * 0.015);
    let tt = constrain(t + wave, 0, 1);
    stroke(lerpColor(c1, c2, tt));
    line(0, y, width, y);
  }
  noStroke();

  // soft vignette
  for (let i = 0; i < 10; i++) {
    fill(0, 0, 0, 10);
    rect(width / 2, height / 2, width - i * 50, height - i * 50, 48);
  }
}

// ---------- stars ----------
function makeStar() {
  return {
    x: random(width),
    y: random(height),
    r: random(1.5, 3.5),
    tw: random(TWO_PI),
    sp: random(0.02, 0.06),
    drift: random(0.2, 0.9)
  };
}

function updateStars() {
  for (let s of stars) {
    s.tw += s.sp;
    s.y -= s.drift * 0.15;
    if (s.y < -10) {
      s.y = height + 10;
      s.x = random(width);
    }
  }
}

function drawStars() {
  for (let s of stars) {
    let a = 90 + 140 * (0.5 + 0.5 * sin(s.tw + frameCount * 0.02));
    fill(255, 255, 255, a * 0.65);
    circle(s.x, s.y, s.r);

    // cross sparkle sometimes
    if (a > 190) {
      stroke(255, 255, 255, 120);
      line(s.x - 6, s.y, s.x + 6, s.y);
      line(s.x, s.y - 6, s.x, s.y + 6);
      noStroke();
    }
  }
}

// ---------- cats ----------
function drawCats() {
  for (let c of cats) {
    let bob = 6 * sin(frameCount * 0.05 + c.ph);
    push();
    translate(c.x, c.y + bob);
    scale(c.s);
    drawCatSticker(0, 0);
    pop();
  }
}

function drawCatSticker(x, y) {
  push();
  translate(x, y);

  // shadow
  fill(0, 0, 0, 35);
  ellipse(4, 6, 150, 120);

  // face
  fill(255, 240, 248, 245);
  ellipse(0, 0, 150, 120);

  // ears
  fill(255, 230, 242, 245);
  triangle(-55, -30, -30, -75, -10, -28);
  triangle(55, -30, 30, -75, 10, -28);

  // inner ears
  fill(255, 190, 220, 180);
  triangle(-50, -33, -30, -68, -18, -32);
  triangle(50, -33, 30, -68, 18, -32);

  // eyes
  fill(60, 20, 50, 220);
  ellipse(-28, -5, 14, 18);
  ellipse(28, -5, 14, 18);

  // eye sparkles
  fill(255, 255, 255, 230);
  circle(-31, -9, 5);
  circle(25, -9, 5);

  // nose
  fill(255, 120, 170, 230);
  triangle(0, 8, -7, 1, 7, 1);

  // mouth
  stroke(170, 50, 110, 180);
  noFill();
  arc(-7, 14, 16, 12, 0, PI);
  arc(7, 14, 16, 12, 0, PI);
  noStroke();

  // whiskers
  stroke(170, 80, 140, 120);
  line(-55, 10, -20, 8);
  line(-55, 18, -20, 16);
  line(55, 10, 20, 8);
  line(55, 18, 20, 16);
  noStroke();

  // forehead heart
  fill(255, 90, 155, 220);
  textSize(22);
  text("♥", 0, -38);

  pop();
}

// ---------- bubble text ----------
function bubbleText(txt, x, y, size) {
  push();
  textStyle(BOLD);
  textSize(size);

  // thick bubble outline (multiple layers)
  let outline = max(6, size * 0.10);

  // outer outline: dark pink/purple
  fill(90, 20, 120, 220);
  for (let a = 0; a < TWO_PI; a += TWO_PI / 14) {
    text(txt, x + cos(a) * outline, y + sin(a) * outline);
  }

  // mid outline: hot pink
  fill(255, 70, 150, 220);
  for (let a = 0; a < TWO_PI; a += TWO_PI / 14) {
    text(txt, x + cos(a) * outline * 0.55, y + sin(a) * outline * 0.55);
  }

  // main fill: white
  fill(255, 255, 255, 245);
  text(txt, x, y);

  // shimmer sweep
  let sweep = (frameCount * 10) % (width + 500) - 250;
  for (let i = -18; i <= 18; i++) {
    let dx = i * 1.2;
    let dist = abs((x + dx) - sweep);
    let a = map(dist, 0, 260, 180, 0);
    a = constrain(a, 0, 180);
    fill(255, 255, 255, a);
    text(txt, x + dx * 0.55, y - 2);
  }

  pop();
}

function drawGlow(x, y, size) {
  for (let i = 0; i < 14; i++) {
    fill(255, 170, 215, 14);
    ellipse(x, y, size + i * 65);
  }
}

// ---------- pops + hugs ----------
function spawnPop(extraChaos = false) {
  let w = random(POP_WORDS);
  let isHug = (random() < 0.22) || extraChaos;

  pops.push({
    txt: isHug ? "HUGS!!" : w,
    x: random(width * 0.18, width * 0.82),
    y: random(height * 0.25, height * 0.78),
    vx: random(-1.8, 1.8),
    vy: random(-2.8, -0.7),
    a: 255,
    s: random(clamp(width * 0.03, 20, 38), clamp(width * 0.055, 30, 56)),
    rot: random(-0.2, 0.2),
    spin: random(-0.02, 0.02),
    col: random([
      color(255, 255, 255),
      color(255, 240, 120),
      color(180, 255, 255),
      color(255, 170, 220)
    ])
  });

  if (pops.length > 70) pops.splice(0, pops.length - 70);
}

function spawnHugs() {
  for (let i = 0; i < 7; i++) {
    pops.push({
      txt: "HUGS!!",
      x: width / 2 + random(-150, 150),
      y: height / 2 + random(-80, 80),
      vx: random(-2.2, 2.2),
      vy: random(-4.0, -1.5),
      a: 255,
      s: random(clamp(width * 0.04, 26, 44), clamp(width * 0.06, 34, 60)),
      rot: random(-0.2, 0.2),
      spin: random(-0.03, 0.03),
      col: color(255, 255, 255)
    });
  }
}

function updatePops() {
  for (let i = pops.length - 1; i >= 0; i--) {
    let p = pops[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.06;
    p.a -= 4.2;
    p.rot += p.spin;
    if (p.a <= 0) pops.splice(i, 1);
  }
}

function drawPops() {
  for (let p of pops) {
    push();
    translate(p.x, p.y);
    rotate(p.rot);

    // glow
    fill(255, 255, 255, p.a * 0.16);
    textSize(p.s + 10);
    textStyle(BOLD);
    text(p.txt, 2, 2);

    // main
    fill(red(p.col), green(p.col), blue(p.col), p.a);
    textSize(p.s);
    text(p.txt, 0, 0);

    pop();
  }
}

// ---------- mini hearts ----------
function spawnHearts(n) {
  for (let i = 0; i < n; i++) {
    hearts.push({
      x: width / 2 + random(-60, 60),
      y: height / 2 + random(-30, 30),
      vx: random(-3.8, 3.8),
      vy: random(-5.0, -1.0),
      a: 255,
      s: random(clamp(width * 0.018, 14, 24), clamp(width * 0.03, 18, 32)),
      wob: random(0.04, 0.09),
      ph: random(TWO_PI)
    });
  }
  if (hearts.length > 450) hearts.splice(0, hearts.length - 450);
}

function updateHearts() {
  for (let i = hearts.length - 1; i >= 0; i--) {
    let h = hearts[i];
    h.x += h.vx + 1.2 * sin(frameCount * h.wob + h.ph);
    h.y += h.vy;
    h.vy += 0.10;
    h.a -= 4.0;
    if (h.a <= 0) hearts.splice(i, 1);
  }
}

function drawHearts() {
  for (let h of hearts) {
    push();
    translate(h.x, h.y);
    textSize(h.s);

    // glow
    fill(255, 210, 235, h.a * 0.18);
    text("♥", random(-1, 1), random(-1, 1));
    text("♥", random(-1, 1), random(-1, 1));

    fill(255, 90, 155, h.a);
    text("♥", 0, 0);
    pop();
  }
}

// ---------- helpers ----------
function clamp(v, lo, hi) { return max(lo, min(hi, v)); }
