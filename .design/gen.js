// Generates the transit-world SVG panels (desktop + mobile) for the akshat-codex profile README.
// Usage (from repo root): node .design/gen.js .
const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2];
if (!ROOT) { console.error('usage: node gen.js <profileDir>'); process.exit(1); }
const FONT_DIR = path.join(__dirname, 'fonts');
const OUT = path.join(ROOT, 'assets');
fs.mkdirSync(OUT, { recursive: true });

// ---- world tokens -------------------------------------------------------
const C = {
  ground: '#0B1230',
  street: '#111C44',
  river: '#0E1B45',
  porcelain: '#F4F1EA',
  muted: '#AEB8D6',
  frame: 'rgba(244,241,234,0.8)',
  hair: 'rgba(244,241,234,0.22)',
  scarlet: '#E21D2D',
  cobalt: '#2F6BFF',
  amber: '#FFC20E',
  green: '#22B14C',
};

const FONTS = {
  BC: ['barlow-condensed-latin-700-normal.woff2', 'Barlow Condensed', 700],
  BSC: ['barlow-semi-condensed-latin-600-normal.woff2', 'Barlow Semi Condensed', 600],
  BM: ['barlow-latin-500-normal.woff2', 'Barlow', 500],
  B: ['barlow-latin-400-normal.woff2', 'Barlow', 400],
};
const fontCache = {};
function fontFace(key) {
  const [file, fam, w] = FONTS[key];
  if (!fontCache[key]) fontCache[key] = fs.readFileSync(path.join(FONT_DIR, file)).toString('base64');
  return `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${fontCache[key]}) format('woff2');}`;
}
const FAM = {
  BC: `font-family:'Barlow Condensed',sans-serif;font-weight:700`,
  BSC: `font-family:'Barlow Semi Condensed',sans-serif;font-weight:600`,
  BM: `font-family:'Barlow',sans-serif;font-weight:500`,
  B: `font-family:'Barlow',sans-serif;font-weight:400`,
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function T(x, y, str, { f = 'B', s = 16, fill = C.porcelain, a = 'start', ls = 0 } = {}) {
  return `<text x="${x}" y="${y}" style="${FAM[f]};font-size:${s}px;letter-spacing:${ls}px" fill="${fill}" text-anchor="${a}">${esc(str)}</text>`;
}

function svgDoc({ w, h, label, fonts, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
<title>${esc(label)}</title>
<style>${fonts.map(fontFace).join('')}
.parked{display:none}
@media (prefers-reduced-motion: reduce){.train{display:none}.parked{display:inline}}
</style>
${body}
</svg>
`;
}

const plate = (w, h) => `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="12" fill="${C.ground}" stroke="${C.frame}" stroke-width="2"/>`;
const stop = (x, y, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.porcelain}" stroke="${C.ground}" stroke-width="2"/>`;
const terminus = (x, y) => `<circle cx="${x}" cy="${y}" r="7" fill="${C.porcelain}" stroke="${C.ground}" stroke-width="2.5"/>`;
const ring = (x, y, r = 16, sw = 6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.ground}" stroke="${C.porcelain}" stroke-width="${sw}"/>`;
const line = (d, color, w = 7) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const arrow = (x, y, color) => `<path d="M${x} ${y} h18 m-7 -7 l7 7 l-7 7" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const arrowDown = (x, y, color) => `<path d="M${x} ${y} v16 m-6 -6 l6 6 l6 -6" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

function capsule(color) {
  return `<rect x="-11" y="-5" width="22" height="10" rx="5" fill="${C.porcelain}"/><rect x="-3" y="-5" width="6" height="10" fill="${color}"/>`;
}
// moving train: negative begin so it is already mid-route at load (never parked at the origin)
function train(d, color, dur, offset = 0) {
  return `<g class="train"><g>${capsule(color)}
<animateMotion path="${d}" dur="${dur}s" begin="${-offset}s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1"/></g></g>`;
}
// parked train for reduced motion
const parked = (x, y, angle, color) => `<g class="parked" transform="translate(${x} ${y}) rotate(${angle})">${capsule(color)}</g>`;

// ---- HERO MAP (shared by desktop and mobile hero) -----------------------
function heroMap() {
  const cx = 800, cy = 300;
  const red = `M520 70 H570 L${cx} ${cy}`;
  const blue = `M960 50 V140 L${cx} ${cy}`;
  const amber = `M520 ${cy} H${cx}`;
  const green = `M520 530 H570 L${cx} ${cy}`;
  const express = `M${cx} ${cy + 16} V430 L840 470 H998`;
  const streets = [
    'M486 120 H990', 'M486 210 H990', 'M486 390 H990', 'M486 470 H990', 'M486 255 H560',
    'M600 20 V540', 'M700 20 V540', 'M880 20 V540', 'M940 300 V540', 'M520 150 L560 190',
  ].map(d => `<path d="${d}" stroke="${C.street}" stroke-width="1.5" fill="none"/>`).join('');
  const river = `<path d="M486 470 C 590 452, 650 476, 740 440 S 900 392, 998 404" stroke="${C.river}" stroke-width="18" fill="none"/>`;
  const L = (x, y, s, a = 'end') => T(x, y, s, { f: 'BSC', s: 15, ls: 1.5, a });
  return `
<g opacity="0.9">${streets}${river}</g>
${line(express, C.porcelain, 5)}
${line(red, C.scarlet)}${line(blue, C.cobalt)}${line(amber, C.amber)}${line(green, C.green)}
${terminus(520, 70)}${L(520, 52, 'PYTHON', 'start')}
${stop(610, 110)}${L(596, 115, 'DJANGO')}
${stop(650, 150)}${L(636, 155, 'FASTAPI')}
${stop(690, 190)}${L(676, 195, 'NODE.JS')}
${stop(730, 230)}${L(716, 235, 'REST APIS')}
${stop(765, 265)}${L(751, 270, 'CELERY')}
${terminus(960, 50)}${L(944, 55, 'AWS')}
${stop(960, 100)}${L(944, 105, 'DOCKER')}
${stop(920, 180)}${L(904, 185, 'KUBERNETES')}
${stop(880, 220)}${L(864, 225, 'LINUX')}
${stop(840, 260)}${L(856, 265, 'GIT · CI/CD', 'start')}
${terminus(520, cy)}${L(520, cy - 16, 'POSTGRESQL', 'start')}
${stop(612, cy)}${L(612, cy + 28, 'MONGODB', 'middle')}
${stop(704, cy)}${L(704, cy + 28, 'DYNAMODB', 'middle')}
${terminus(520, 530)}${L(520, 552, 'NLP', 'start')}
${stop(620, 480)}${L(606, 485, 'MACHINE LEARNING')}
${stop(680, 420)}${L(666, 425, 'AUTOMATION')}
${stop(740, 360)}${L(726, 365, 'AI-POWERED APIS')}
${ring(cx, cy)}
${T(828, 308, 'AKSHAT-CODEX', { f: 'BC', s: 24, ls: 0.5 })}
${T(828, 330, 'all lines connect', { f: 'BM', s: 14, fill: C.muted })}
${T(852, 458, 'TO AI-LEAD-AGENT', { f: 'BSC', s: 15, ls: 1.5 })}
${train(red, C.scarlet, 6.5, 0)}${train(blue, C.cobalt, 5.5, 2.2)}${train(amber, C.amber, 5, 3.1)}${train(green, C.green, 6, 1.4)}
${train(express, C.scarlet, 4.5, 1)}
${parked(548, 70, 0, C.scarlet)}${parked(960, 76, 90, C.cobalt)}${parked(560, cy, 0, C.amber)}${parked(546, 530, 0, C.green)}${parked(930, 470, 0, C.scarlet)}`;
}
const HERO_LABEL = 'Akshat Srivastava, backend developer. A transit map of four lines: Backend (Python, Django, FastAPI, Node.js, REST APIs, Celery), Cloud (AWS, Docker, Kubernetes, Linux, Git, CI/CD), Data (PostgreSQL, MongoDB, DynamoDB) and AI (NLP, machine learning, automation, AI-powered APIs), all meeting at the akshat-codex interchange, with an express line on to ai-lead-agent.';

function hero() {
  const W = 1000, H = 560;
  const body = `${plate(W, H)}
${heroMap()}
${T(46, 170, 'AKSHAT', { f: 'BC', s: 92, ls: 0.5 })}
${T(46, 262, 'SRIVASTAVA', { f: 'BC', s: 92, ls: 0.5 })}
${T(48, 322, 'Backend developer', { f: 'BM', s: 28 })}
${T(48, 356, 'Python, cloud and AI systems', { f: 'B', s: 19, fill: C.muted })}
${T(48, 381, 'built to run on evidence, not guesses.', { f: 'B', s: 19, fill: C.muted })}
<circle cx="55" cy="436" r="5.5" fill="${C.green}"/>
${T(70, 442, 'GOOD SERVICE', { f: 'BSC', s: 15, ls: 2 })}
${T(48, 468, 'All lines running · India · UTC+05:30', { f: 'B', s: 15, fill: C.muted })}`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BSC', 'BM', 'B'], label: HERO_LABEL, body });
}

function heroMobile() {
  const W = 420;
  const s = 0.76, tx = 12 - 462 * s, ty = 340 - 30 * s;
  const H = Math.ceil(ty + 565 * s + 12);
  const body = `${plate(W, H)}
${T(22, 92, 'AKSHAT', { f: 'BC', s: 66, ls: 0.4 })}
${T(22, 160, 'SRIVASTAVA', { f: 'BC', s: 66, ls: 0.4 })}
${T(24, 204, 'Backend developer', { f: 'BM', s: 22 })}
${T(24, 232, 'Python, cloud and AI systems', { s: 16, fill: C.muted })}
${T(24, 254, 'built to run on evidence, not guesses.', { s: 16, fill: C.muted })}
<circle cx="30" cy="292" r="5" fill="${C.green}"/>
${T(44, 297, 'GOOD SERVICE', { f: 'BSC', s: 14, ls: 2 })}
${T(24, 320, 'All lines running · India · UTC+05:30', { s: 14, fill: C.muted })}
<g transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${s})">${heroMap()}</g>`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BSC', 'BM', 'B'], label: HERO_LABEL, body });
}

// ---- ROUTE: ai-lead-agent ----------------------------------------------
const ROUTE_STATIONS = [
  ['ICP INTAKE', 'plain language or', 'field by field'],
  ['DISCOVERY', 'fast · safe · hard', 'search modes'],
  ['HARD-RULE GATE', null, null],
  ['DECISION-MAKERS', 'discovery and', 'enrichment'],
  ['QUALIFY', 'LLM verdict plus', 'adversarial review'],
  ['EXPORT', 'ranked, deduped,', 'CSV · JSON · CRM'],
];
const ROUTE_LABEL = 'ai-lead-agent route: ICP intake, discovery (fast, safe, hard modes), hard-rule gate, decision-makers, LLM qualification with adversarial review, export. Candidates without evidence branch to HOLD: missing evidence stays unknown, never guessed. Click to open the repository.';
const ROUTE_FACTS = 'Bring your own keys  ·  runs end to end on clearly flagged mock data with zero keys  ·  Python  ·  Docker Compose';

function route() {
  const W = 1000, H = 460, y = 236;
  const xs = [80, 248, 416, 584, 752, 920];
  const main = `M${xs[0]} ${y} H${xs[5]}`;
  const gx = xs[2];
  const siding = `M${gx} ${y} V300 L${gx + 30} 330 H660`;
  const sidingTrain = `M${xs[0]} ${y} H${gx} V300 L${gx + 30} 330 H660`;
  const stations = ROUTE_STATIONS.map(([n, d1, d2], i) => {
    const x = xs[i];
    const mark = i === 2 ? ring(x, y, 13) : (i === 0 || i === 5 ? terminus(x, y) : stop(x, y, 6));
    return `${mark}${T(x, y - 26, n, { f: 'BSC', s: 16, ls: 1.5, a: 'middle' })}${d1 ? T(x, y + 34, d1, { s: 14, fill: C.muted, a: 'middle' }) + T(x, y + 52, d2, { s: 14, fill: C.muted, a: 'middle' }) : ''}`;
  }).join('\n');
  const body = `${plate(W, H)}
${T(46, 92, 'AI-LEAD-AGENT', { f: 'BC', s: 56, ls: 0.5 })}
${T(48, 126, 'Public ICP lead discovery and qualification, end to end.', { f: 'BM', s: 18, fill: C.muted })}
<rect x="742" y="58" width="212" height="46" rx="4" fill="${C.scarlet}"/>
${T(764, 87, 'OPEN THE REPO', { f: 'BSC', s: 16, ls: 2 })}
${arrow(912, 81, C.porcelain)}
${line(siding, C.amber, 6)}
<path d="M660 318 V342" stroke="${C.amber}" stroke-width="6" stroke-linecap="round"/>
${line(main, C.scarlet, 7)}
${stations}
${T(678, 338, 'HOLD', { f: 'BC', s: 24, fill: C.amber, ls: 1 })}
${T(678, 362, 'Missing evidence stays unknown.', { s: 15 })}
${T(678, 381, 'Never guessed, never filled in.', { s: 15, fill: C.muted })}
${train(main, C.scarlet, 7, 0)}${train(sidingTrain, C.amber, 7, 3.5)}
${parked(118, y, 0, C.scarlet)}${parked(600, 330, 0, C.amber)}
<path d="M48 410 H952" stroke="${C.hair}" stroke-width="1"/>
${T(48, 438, ROUTE_FACTS, { s: 14, fill: C.muted })}`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BSC', 'BM', 'B'], label: ROUTE_LABEL, body });
}

function routeMobile() {
  const W = 420, x = 52;
  const ys = [190, 286, 382, 532, 628, 724];
  const main = `M${x} ${ys[0]} V${ys[5]}`;
  const gy = ys[2];
  const siding = `M${x} ${gy} H${x + 20} L${x + 50} ${gy + 30} H${x + 140}`;
  const sidingTrain = `M${x} ${ys[0]} V${gy} H${x + 20} L${x + 50} ${gy + 30} H${x + 140}`;
  const stations = ROUTE_STATIONS.map(([n, d1, d2], i) => {
    const y = ys[i];
    const mark = i === 2 ? ring(x, y, 12, 5) : (i === 0 || i === 5 ? terminus(x, y) : stop(x, y, 6));
    return `${mark}${T(x + 30, y + 6, n, { f: 'BSC', s: 17, ls: 1.5 })}${d1 ? T(x + 30, y + 28, `${d1} ${d2}`, { s: 15, fill: C.muted }) : ''}`;
  }).join('\n');
  const hx = x + 140;
  const H = 880;
  const body = `${plate(W, H)}
${T(22, 72, 'AI-LEAD-AGENT', { f: 'BC', s: 46, ls: 0.4 })}
${T(24, 104, 'Public ICP lead discovery and', { f: 'BM', s: 16, fill: C.muted })}
${T(24, 126, 'qualification, end to end.', { f: 'BM', s: 16, fill: C.muted })}
${line(siding, C.amber, 6)}
<path d="M${hx} ${gy + 18} V${gy + 42}" stroke="${C.amber}" stroke-width="6" stroke-linecap="round"/>
${line(main, C.scarlet, 7)}
${stations}
${T(hx + 18, gy + 38, 'HOLD', { f: 'BC', s: 22, fill: C.amber, ls: 1 })}
${T(x + 30, gy + 76, 'Missing evidence stays unknown.', { s: 15 })}
${T(x + 30, gy + 96, 'Never guessed, never filled in.', { s: 15, fill: C.muted })}
${train(main, C.scarlet, 7, 0)}${train(sidingTrain, C.amber, 6, 3)}
${parked(x, ys[0] + 30, 90, C.scarlet)}${parked(x + 110, gy + 30, 0, C.amber)}
<rect x="22" y="772" width="${W - 44}" height="48" rx="4" fill="${C.scarlet}"/>
${T(44, 802, 'OPEN THE REPO', { f: 'BSC', s: 16, ls: 2 })}
${arrow(W - 64, 796, C.porcelain)}
${T(24, 848, 'Bring your own keys · flagged mock data with', { s: 13, fill: C.muted })}
${T(24, 866, 'zero keys · Python · Docker Compose', { s: 13, fill: C.muted })}`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BSC', 'BM', 'B'], label: ROUTE_LABEL, body });
}

// ---- NETWORK -------------------------------------------------------------
const LINES = [
  ['BACKEND', C.scarlet, C.porcelain, ['PYTHON', 'DJANGO', 'FASTAPI', 'NODE.JS', 'REST APIS', 'CELERY', 'REDIS']],
  ['CLOUD', C.cobalt, C.porcelain, ['AWS', 'DOCKER', 'KUBERNETES', 'LINUX', 'GIT', 'CI/CD']],
  ['DATA', C.amber, C.ground, ['POSTGRESQL', 'MONGODB', 'DYNAMODB', 'REDIS']],
  ['AI', C.green, C.ground, ['NLP', 'MACHINE LEARNING', 'PROCESS AUTOMATION', 'AI-POWERED APIS']],
];
const NETWORK_LABEL = 'The network. Backend line: Python, Django, FastAPI, Node.js, REST APIs, Celery, Redis. Cloud line: AWS, Docker, Kubernetes, Linux, Git, CI/CD. Data line: PostgreSQL, MongoDB, DynamoDB, Redis. AI line: NLP, machine learning, process automation, AI-powered APIs. Redis is a transfer between Backend and Data.';
// Redis appears on two lines: draw it as a transfer ring, the map's own convention
const mark = (name, x, y, end) => name === 'REDIS' ? ring(x, y, 8, 3.5) : (end ? terminus(x, y) : stop(x, y, 5.5));

function network() {
  const W = 1000, top = 168, gap = 74;
  const H = top + gap * LINES.length + 4;
  const x0 = 214, x1 = 948;
  const out = LINES.map(([name, col, ink, stops], r) => {
    const y = top + r * gap;
    const step = (x1 - x0) / (stops.length - 1);
    const marks = stops.map((s, i) => {
      const x = Math.round(x0 + i * step);
      const end = i === 0 || i === stops.length - 1;
      const a = i === 0 ? 'start' : i === stops.length - 1 ? 'end' : 'middle';
      const lx = i === 0 ? x - 6 : i === stops.length - 1 ? x + 6 : x;
      return `${mark(s, x, y, end)}${T(lx, y - 18, s, { f: 'BSC', s: 15, ls: 1.2, a })}`;
    }).join('');
    return `<rect x="48" y="${y - 17}" width="128" height="34" rx="4" fill="${col}"/>
${T(62, y + 6, name + ' LINE', { f: 'BSC', s: 15, ls: 1.5, fill: ink })}
${line(`M${x0} ${y} H${x1}`, col, 6)}${marks}`;
  }).join('\n');
  const body = `${plate(W, H)}
${T(46, 78, 'The network', { f: 'BC', s: 44, ls: 0.3 })}
${T(48, 108, 'Four lines. Every station is a tool in the kit. Rings mark transfers.', { f: 'BM', s: 18, fill: C.muted })}
${out}`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BSC', 'BM'], label: NETWORK_LABEL, body });
}

function networkMobile() {
  const W = 420, pitch = 32;
  const cols = [[LINES[0], LINES[2]], [LINES[1], LINES[3]]];
  let maxY = 0;
  const out = cols.map((list, c) => {
    const cx = c === 0 ? 22 : 216;
    let y = 150;
    return list.map(([name, col, ink, stops]) => {
      const chip = `<rect x="${cx}" y="${y}" width="160" height="30" rx="4" fill="${col}"/>${T(cx + 12, y + 21, name + ' LINE', { f: 'BSC', s: 14, ls: 1.5, fill: ink })}`;
      const lx = cx + 14, y0 = y + 52, y1 = y0 + (stops.length - 1) * pitch;
      const marks = stops.map((s, i) => {
        const sy = y0 + i * pitch;
        return `${mark(s, lx, sy, i === 0 || i === stops.length - 1)}${T(lx + 20, sy + 5, s, { f: 'BSC', s: 14, ls: 1 })}`;
      }).join('');
      const block = `${chip}${line(`M${lx} ${y0} V${y1}`, col, 6)}${marks}`;
      y = y1 + 46;
      maxY = Math.max(maxY, y);
      return block;
    }).join('');
  }).join('');
  const H = maxY + 4;
  const body = `${plate(W, H)}
${T(22, 72, 'The network', { f: 'BC', s: 40, ls: 0.3 })}
${T(24, 102, 'Four lines. Every station is a tool', { f: 'BM', s: 16, fill: C.muted })}
${T(24, 124, 'in the kit. Rings mark transfers.', { f: 'BM', s: 16, fill: C.muted })}
${out}`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BSC', 'BM'], label: NETWORK_LABEL, body });
}

// ---- STANDARDS -----------------------------------------------------------
const RULES = [
  ['Understand the system before changing it.'],
  ['Keep architecture simple and intentional.'],
  ['Build for reliability, not just functionality.', 'Build for reliability,', 'not just functionality.'],
  ['Automate repetitive work.'],
  ['Measure, debug, improve.'],
];
const STD_LABEL = 'Service standards: understand the system before changing it; keep architecture simple and intentional; build for reliability, not just functionality; automate repetitive work; measure, debug, improve.';
const tick = (x, y) => `<path d="M${x} ${y} H${x + 18}" stroke="${C.porcelain}" stroke-width="3" stroke-linecap="round"/><circle cx="${x + 18}" cy="${y}" r="4.5" fill="${C.ground}" stroke="${C.porcelain}" stroke-width="2.5"/>`;

function standards() {
  const W = 1000, H = 252;
  const cols = [RULES.slice(0, 3), RULES.slice(3)];
  const out = cols.map((list, c) => list.map(([r], i) => {
    const x = c === 0 ? 48 : 540, y = 132 + i * 38;
    return `${tick(x, y - 6)}${T(x + 36, y, r, { f: 'BM', s: 19 })}`;
  }).join('')).join('');
  const body = `${plate(W, H)}
${T(46, 78, 'Service standards', { f: 'BC', s: 44, ls: 0.3 })}
<circle cx="${W - 262}" cy="66" r="5.5" fill="${C.green}"/>
${T(W - 248, 72, 'IN FORCE ON EVERY LINE', { f: 'BSC', s: 14, ls: 2, fill: C.muted })}
${out}`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BSC', 'BM'], label: STD_LABEL, body });
}

function standardsMobile() {
  const W = 420;
  let y = 150;
  const out = RULES.map(([r, a, b]) => {
    const lines = a ? [a, b] : [r];
    const s = `${tick(24, y - 6)}${lines.map((l, i) => T(60, y + i * 24, l, { f: 'BM', s: 17 })).join('')}`;
    y += 24 * lines.length + 18;
    return s;
  }).join('');
  const H = y + 6;
  const body = `${plate(W, H)}
${T(22, 72, 'Service standards', { f: 'BC', s: 40, ls: 0.3 })}
<circle cx="29" cy="100" r="5" fill="${C.green}"/>
${T(42, 105, 'IN FORCE ON EVERY LINE', { f: 'BSC', s: 13, ls: 2, fill: C.muted })}
${out}`;
  return svgDoc({ w: W, h: H, fonts: ['BC', 'BM', 'BSC'], label: STD_LABEL, body });
}

// ---- BUTTONS / FOOTER ----------------------------------------------------
function button(label, { primary = false, w }) {
  const H = 52;
  const body = `<rect x="1" y="1" width="${w - 2}" height="${H - 2}" rx="4" fill="${primary ? C.scarlet : C.ground}" stroke="${primary ? C.scarlet : C.porcelain}" stroke-width="2"/>
${T(22, 32, label, { f: 'BSC', s: 16, ls: 2 })}
${arrow(w - 42, 26, C.porcelain)}`;
  return svgDoc({ w, h: H, fonts: ['BSC'], label, body });
}

function footer() {
  const W = 1000, H = 96;
  const cols = [C.scarlet, C.cobalt, C.amber, C.green];
  const body = `${plate(W, H)}
${cols.map((c, i) => { const y = 30 + i * 12; return line(`M40 ${y} H${816 - Math.abs(48 - y)} L816 48`, c, 6); }).join('')}
${ring(830, 48, 14)}
${T(856, 55, 'END OF LINE', { f: 'BSC', s: 15, ls: 2 })}`;
  return svgDoc({ w: W, h: H, fonts: ['BSC'], label: 'End of line', body });
}

const files = {
  'hero.svg': hero(), 'hero-m.svg': heroMobile(),
  'route-ai-lead-agent.svg': route(), 'route-ai-lead-agent-m.svg': routeMobile(),
  'network.svg': network(), 'network-m.svg': networkMobile(),
  'standards.svg': standards(), 'standards-m.svg': standardsMobile(),
  'btn-board.svg': button('BOARD AI-LEAD-AGENT', { primary: true, w: 300 }),
  'btn-repos.svg': button('ALL REPOSITORIES', { w: 252 }),
  'btn-linkedin.svg': button('LINKEDIN', { w: 170 }),
  'btn-email.svg': button('EMAIL', { w: 140 }),
  'btn-github.svg': button('GITHUB', { w: 150 }),
  'end-of-line.svg': footer(),
};
for (const [n, s] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, n), s);
  console.log(n.padEnd(30), (s.length / 1024).toFixed(1) + ' KB');
}
