// Energetic BESTIE animation for Hiba: stars + cats + words + hearts + hugs
// Paste into https://editor.p5js.org/ (sketch.js) and press Play

const NAME = "HIBA";
const SUB = "BESTIE ENERGY!!!";
const POP_WORDS = [
  "SLAY!!",
  "ICONIC!!",
  "CUTIE!!",
  "GORGEOUS!!",
  "OMG!!!",
  "BESTIE!!",
  "HUGS!!!",
  "LOVE U!!!",
  "MEOW!!",
  "STAR!!!",
];

let stars = [];
let pops = [];
let hearts = [];
let cats = [];
let shake = 0;

function setup() {
  createCanvas(720, 720);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  // Starfield
  for (let i = 0; i < 220; i++) stars.push(makeStar());

  // Cat stickers in background corners
  cats = [
    { x: 105, y: 120, s: 1.0, ph: random(TWO_PI) },
    { x: width - 115, y: 120, s: 0.95, ph: random(TWO_PI) },
    { x: 115, y: height - 120, s: 0.95, ph: random(TWO_PI) },
    { x: width - 120, y: height - 120, s: 1.0, ph: random(TWO_PI) },
  ];
}

function draw() {
  // energetic wavy gradient background
  drawWavyGradient();

  // stars behind everything
  updateStars();
  drawStars();

  // subtle screen shake when we "pop"
  push();
  translate(random(-shake, shake), random(-shake, shake));
  shake *= 0.88;

  // cat stickers behind text
  drawCats();

  // main bouncing name
  let bounce = 28 * sin(frameCount * 0.14);
  let wob = 10 * sin(frameCount * 0.07);

  // glow behind title
  drawGlow(width / 2, height / 2 - 60 + bounce, 520);

  // title shadow
  fill(0, 0, 0, 90);
  textSize(110);
  textStyle(BOLD);
  text(`${NAME}!!!`, width / 2 + 4, height / 2 - 60 + bounce + 4);

  // title
  shimmerTitle(`${NAME}!!!`, width / 2, height / 2 - 60 + bounce);

  // subtitle
  fill(255, 245);
  textSize(28);
  textStyle(BOLD);
  text(SUB, width / 2, height / 2 + 35 + wob);

  // instruction-ish cute line
  fill(255, 220);
  textSize(20);
  textStyle(NORMAL);
  text("tap / click for MORE chaos ✨", width / 2, height - 45);

  // spawn pops / hearts automatically
  if (frameCount % 12 === 0) spawnPop();
  if (frameCount % 3 === 0) spawnHearts(2);

  // update and draw everything
  updateHearts();
  drawHearts();

  updatePops();
  drawPops();

  pop();
}

// ---------- INTERACTION: click = burst ----------
function mousePressed() {
  shake = 10;
  for (let i = 0; i < 7; i++) spawnPop(true);
  spawnHearts(18);
  spawnHugs();
}

// ---------- BACKGROUND ----------
function drawWavyGradient() {
  // Pink -> purple with wave motion
  for (let y = 0; y < height; y++) {
    let c1 = color(255, 120, 200);
    let c2 = color(155, 80, 255);
    let t = y / height;
    let wave =
      0.1 * sin(frameCount * 0.02 + y * 0.03) +
      0.06 * sin(frameCount * 0.016 + y * 0.015);
    let tt = constrain(t + wave, 0, 1);
    stroke(lerpColor(c1, c2, tt));
    line(0, y, width, y);
  }
  noStroke();

  // soft vignette
  for (let i = 0; i < 10; i++) {
    fill(0, 0, 0, 10);
    rect(width / 2, height / 2, width - i * 40, height - i * 40, 40);
  }
}

function makeStar() {
  return {
    x: random(width),
    y: random(height),
    r: random(1.5, 3.5),
    tw: random(TWO_PI),
    sp: random(0.02, 0.06),
    drift: random(0.2, 0.8),
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
    // tiny cross sparkle sometimes
    if (a > 190) {
      stroke(255, 255, 255, 120);
      line(s.x - 5, s.y, s.x + 5, s.y);
      line(s.x, s.y - 5, s.x, s.y + 5);
      noStroke();
    }
  }
}

// ---------- CATS ----------
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
  // Cute sticker-style cat face
  push();
  translate(x, y);

  // sticker shadow
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

  // tiny heart on forehead
  fill(255, 90, 155, 220);
  textSize(22);
  text("♥", 0, -38);

  pop();
}

// ---------- TITLE SHIMMER ----------
function shimmerTitle(txt, x, y) {
  push();
  textSize(110);
  textStyle(BOLD);

  // base
  fill(255, 255, 255, 245);
  text(txt, x, y);

  // colored outline
  stroke(255, 90, 155, 200);
  strokeWeight(6);
  noFill();
  text(txt, x, y);
  noStroke();

  // shimmer sweep
  let sweep = ((frameCount * 10) % (width + 500)) - 250;
  for (let i = -18; i <= 18; i++) {
    let dx = i * 1.2;
    let dist = abs(x + dx - sweep);
    let a = map(dist, 0, 260, 190, 0);
    a = constrain(a, 0, 190);
    fill(255, 255, 255, a);
    text(txt, x + dx * 0.55, y - 2);
  }

  pop();
}

function drawGlow(x, y, size) {
  for (let i = 0; i < 14; i++) {
    fill(255, 170, 215, 14);
    ellipse(x, y, size + i * 55);
  }
}

// ---------- POP WORDS + HUGS ----------
function spawnPop(extraChaos = false) {
  let w = random(POP_WORDS);
  let isHug = random() < 0.22 || extraChaos;

  pops.push({
    txt: isHug ? "HUGS!!" : w,
    x: random(width * 0.2, width * 0.8),
    y: random(height * 0.25, height * 0.75),
    vx: random(-1.5, 1.5),
    vy: random(-2.5, -0.6),
    a: 255,
    s: random(22, 42),
    rot: random(-0.2, 0.2),
    spin: random(-0.02, 0.02),
    col: random([
      color(255, 255, 255),
      color(255, 240, 120),
      color(180, 255, 255),
      color(255, 170, 220),
    ]),
  });

  if (pops.length > 60) pops.splice(0, pops.length - 60);
}

function spawnHugs() {
  for (let i = 0; i < 6; i++) {
    pops.push({
      txt: "HUGS!!",
      x: width / 2 + random(-120, 120),
      y: height / 2 + random(-60, 60),
      vx: random(-2, 2),
      vy: random(-3.5, -1.2),
      a: 255,
      s: random(30, 48),
      rot: random(-0.2, 0.2),
      spin: random(-0.03, 0.03),
      col: color(255, 255, 255),
    });
  }
}

function updatePops() {
  for (let i = pops.length - 1; i >= 0; i--) {
    let p = pops[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.06; // gravity
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
    fill(255, 255, 255, p.a * 0.15);
    textSize(p.s + 10);
    text(p.txt, 2, 2);

    // main
    fill(red(p.col), green(p.col), blue(p.col), p.a);
    textSize(p.s);
    textStyle(BOLD);
    text(p.txt, 0, 0);

    pop();
  }
}

// ---------- MINI HEARTS ----------
function spawnHearts(n) {
  for (let i = 0; i < n; i++) {
    hearts.push({
      x: width / 2 + random(-40, 40),
      y: height / 2 + random(-20, 20),
      vx: random(-3.5, 3.5),
      vy: random(-4.5, -0.8),
      a: 255,
      s: random(14, 26),
      wob: random(0.04, 0.09),
      ph: random(TWO_PI),
    });
  }
  if (hearts.length > 400) hearts.splice(0, hearts.length - 400);
}

function updateHearts() {
  for (let i = hearts.length - 1; i >= 0; i--) {
    let h = hearts[i];
    h.x += h.vx + 1.2 * sin(frameCount * h.wob + h.ph);
    h.y += h.vy;
    h.vy += 0.1;
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
