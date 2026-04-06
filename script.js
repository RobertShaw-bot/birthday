const gifts = [
  {
    name: '礼物 1 · 夏日碎花小裙裙~',
    desc: '给你准备了几条不同的小裙子，希望你一眼就能挑中那条最让你心动的浪漫。',
    images: [
      'images/碎花裙1.jpg',
      'images/碎花裙2.jpg',
      'images/碎花群3.jpg',
      'images/碎花裙4.jpg'
    ]
  },
  {
    name: '礼物 2 · 漂亮小项链~',
    desc: '有了喜欢的小裙子，当然也要配上一点亮晶晶的小心思，把温柔和偏爱一起戴上。',
    image: 'images/项链.jpg'
  },
  {
    name: '礼物 3 · 高速粒子吹风机~',
    desc: '希望它能帮你把头发吹得柔顺又蓬松，也把每天的小疲惫轻轻吹走一点。',
    image: 'images/吹风机.jpg'
  },
  {
    name: '礼物 4 · 软乎乎小狗抱枕~',
    desc: '想送你一个软软的小家伙，陪你睡觉、发呆、休息，把可爱和安心都抱个满怀。',
    image: 'images/小狗.jpg'
  },
  {
    name: '礼物 5 · 甜甜的费列罗巧克力~',
    desc: '甜甜的巧克力当然要送给甜甜的你，希望你拆开它的时候，心情也跟着一起变甜。',
    image: 'images/费列罗.jpg'
  },
  {
    name: '礼物 6 · 淡雪草莓~',
    desc: '想把草莓的清甜、柔软和一点点小浪漫都打包起来，认真送给最喜欢的你。',
    image: 'images/淡雪草莓.jpg'
  },
  {
    name: '礼物 7 · 花知晓 · 蝴蝶云肩胭脂雪腮红~',
    desc: '想把少女感、浪漫感和我的偏爱一起打包送给你，愿你每一天都漂亮、心动又开心。',
    images: [
      'images/腮红1.jpg',
      'images/腮红2.jpg',
      'images/腮红3.jpg',
      'images/腮红4.jpg',
      'images/腮红5.jpg',
    ]
  },
  {
    name: '礼物 8 · 软乎乎腰靠~',
    desc: '希望它在你学习、休息或者发呆的时候，都能稳稳托住你的舒服和小幸福。',
    image: "images/腰靠/jpg"
  }
];

const svgNS = 'http://www.w3.org/2000/svg';
const cakeSvg = document.getElementById('cakeSvg');
const giftCard = document.getElementById('giftCard');
const giftIndex = document.getElementById('giftIndex');
const giftName = document.getElementById('giftName');
const giftDesc = document.getElementById('giftDesc');
const giftImage = document.getElementById('giftImage');
const hintText = document.getElementById('hintText');
const closeBtn = document.getElementById('closeBtn');
const resetBtn = document.getElementById('resetBtn');
const prevImageBtn = document.getElementById('prevImageBtn');
const nextImageBtn = document.getElementById('nextImageBtn');
const carouselFooter = document.getElementById('carouselFooter');
const imageCounter = document.getElementById('imageCounter');
const imageDots = document.getElementById('imageDots');

let openedCount = 0;
let currentGiftImages = [];
let currentImageIndex = 0;

function initCake() {
  cakeSvg.innerHTML = '';
  const cx = 200;
  const cy = 200;
  const outerR = 170;
  const innerR = 66;
  const startOffset = -90;
  const sliceColors = [
    ['#fff6fa', '#ffd7e4'],
    ['#fff7f1', '#ffd8c5'],
    ['#fff8fb', '#ffd9ee'],
    ['#fff7ef', '#ffd8dd'],
    ['#fffaf3', '#ffe3b8'],
    ['#fef6ff', '#ebd7ff'],
    ['#f7fbff', '#dbeeff'],
    ['#fff7fa', '#ffc9dd']
  ];

  gifts.forEach((gift, index) => {
    const startDeg = startOffset + index * 45;
    const endDeg = startDeg + 45;
    const middleDeg = startDeg + 22.5;

    const group = document.createElementNS(svgNS, 'g');
    group.setAttribute('class', 'cake-slice-group');
    group.setAttribute('data-index', index);
    group.setAttribute('tabindex', '0');
    group.setAttribute('role', 'button');
    group.setAttribute('aria-label', `打开第 ${index + 1} 份礼物`);

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('class', 'slice-shape');
    path.setAttribute('d', ringSectorPath(cx, cy, innerR, outerR, startDeg, endDeg));
    path.setAttribute('fill', `url(#grad-${index})`);

    const grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', `grad-${index}`);
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '100%');
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', sliceColors[index][0]);
    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', sliceColors[index][1]);
    grad.append(stop1, stop2);

    const defs = document.createElementNS(svgNS, 'defs');
    defs.appendChild(grad);

    const topCream = document.createElementNS(svgNS, 'path');
    topCream.setAttribute('d', ringSectorPath(cx, cy, 126, 155, startDeg + 3, endDeg - 3));
    topCream.setAttribute('fill', 'rgba(255,255,255,0.72)');

    const middleCream = document.createElementNS(svgNS, 'path');
    middleCream.setAttribute('d', ringSectorPath(cx, cy, 92, 120, startDeg + 3, endDeg - 3));
    middleCream.setAttribute('fill', 'rgba(255, 145, 180, 0.68)');

    const dividerA = document.createElementNS(svgNS, 'line');
    const p1 = polar(cx, cy, innerR, startDeg);
    const p2 = polar(cx, cy, outerR, startDeg);
    dividerA.setAttribute('x1', p1.x); dividerA.setAttribute('y1', p1.y);
    dividerA.setAttribute('x2', p2.x); dividerA.setAttribute('y2', p2.y);
    dividerA.setAttribute('class', 'slice-divider');

    const numPos = polar(cx, cy, 124, middleDeg);
    const number = document.createElementNS(svgNS, 'text');
    number.setAttribute('x', numPos.x);
    number.setAttribute('y', numPos.y);
    number.setAttribute('class', 'slice-number');
    number.textContent = String(index + 1);

    const cherryPos = polar(cx, cy, 146, middleDeg);
    const cherry = document.createElementNS(svgNS, 'circle');
    cherry.setAttribute('class', 'slice-cherry');
    cherry.setAttribute('cx', cherryPos.x);
    cherry.setAttribute('cy', cherryPos.y);
    cherry.setAttribute('r', '8');
    cherry.setAttribute('fill', '#ff5b8b');
    cherry.setAttribute('stroke', 'rgba(255,255,255,0.85)');
    cherry.setAttribute('stroke-width', '2');

    group.append(defs, path, topCream, middleCream, dividerA, cherry, number);
    group.addEventListener('click', () => openGift(group, index, middleDeg));
    group.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGift(group, index, middleDeg);
      }
    });
    cakeSvg.appendChild(group);
  });

  const lastDivider = document.createElementNS(svgNS, 'line');
  const startDeg = startOffset + 360;
  const a = polar(cx, cy, innerR, startDeg);
  const b = polar(cx, cy, outerR, startDeg);
  lastDivider.setAttribute('x1', a.x); lastDivider.setAttribute('y1', a.y);
  lastDivider.setAttribute('x2', b.x); lastDivider.setAttribute('y2', b.y);
  lastDivider.setAttribute('class', 'slice-divider');
  cakeSvg.appendChild(lastDivider);
}

function openGift(group, index, middleDeg) {
  if (group.classList.contains('opened')) return;

  const distance = 26;
  const rad = middleDeg * Math.PI / 180;
  const dx = Math.cos(rad) * distance;
  const dy = Math.sin(rad) * distance;

  group.classList.add('opened');
  group.style.transform = `translate(${dx}px, ${dy}px)`;

  openedCount += 1;
  showGift(index);
  hintText.textContent = openedCount === gifts.length
    ? '8 份礼物都已经拆开啦，生日快乐，我的女孩 ❤️'
    : `已经拆开 ${openedCount} / ${gifts.length} 份礼物，继续点蛋糕吧～`;
}

function showGift(index) {
  const gift = gifts[index];
  const images = Array.isArray(gift.images) && gift.images.length ? gift.images : [gift.image];
  currentGiftImages = images;
  currentImageIndex = 0;

  giftIndex.textContent = `第 ${index + 1} 份礼物`;
  giftName.textContent = gift.name;
  giftDesc.textContent = gift.desc;
  renderCurrentImage();
  renderCarouselControls();
  giftCard.classList.remove('hidden');
}

function renderCurrentImage() {
  const src = currentGiftImages[currentImageIndex] || '';
  giftImage.src = src;
  giftImage.alt = `${giftName.textContent} - 图片 ${currentImageIndex + 1}`;
  imageCounter.textContent = `${currentImageIndex + 1} / ${currentGiftImages.length}`;

  imageDots.innerHTML = '';
  currentGiftImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${i === currentImageIndex ? 'active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `查看第 ${i + 1} 张图片`);
    dot.addEventListener('click', () => {
      currentImageIndex = i;
      renderCurrentImage();
    });
    imageDots.appendChild(dot);
  });
}

function renderCarouselControls() {
  const multiple = currentGiftImages.length > 1;
  prevImageBtn.classList.toggle('hidden', !multiple);
  nextImageBtn.classList.toggle('hidden', !multiple);
  carouselFooter.classList.toggle('hidden', !multiple);
}

function changeImage(step) {
  if (currentGiftImages.length <= 1) return;
  currentImageIndex = (currentImageIndex + step + currentGiftImages.length) % currentGiftImages.length;
  renderCurrentImage();
}

function resetAll() {
  openedCount = 0;
  currentGiftImages = [];
  currentImageIndex = 0;
  giftCard.classList.add('hidden');
  hintText.textContent = '一共有 8 份礼物，每一块蛋糕都藏着一份心意 💖';
  initCake();
}

function polar(cx, cy, r, deg) {
  const rad = deg * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function ringSectorPath(cx, cy, r1, r2, startDeg, endDeg) {
  const p1 = polar(cx, cy, r2, startDeg);
  const p2 = polar(cx, cy, r2, endDeg);
  const p3 = polar(cx, cy, r1, endDeg);
  const p4 = polar(cx, cy, r1, startDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${r2} ${r2} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${r1} ${r1} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z'
  ].join(' ');
}

function createGiftSvg(label, colors) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>
      </defs>
      <rect width="320" height="320" rx="36" fill="url(#g)"/>
      <circle cx="160" cy="120" r="52" fill="rgba(255,255,255,0.35)"/>
      <rect x="86" y="168" width="148" height="22" rx="11" fill="rgba(255,255,255,0.75)"/>
      <rect x="108" y="202" width="104" height="18" rx="9" fill="rgba(255,255,255,0.55)"/>
      <text x="160" y="274" text-anchor="middle" font-size="34" font-family="Arial, sans-serif" font-weight="700" fill="#ffffff">${label}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

closeBtn.addEventListener('click', () => giftCard.classList.add('hidden'));
resetBtn.addEventListener('click', resetAll);
prevImageBtn.addEventListener('click', () => changeImage(-1));
nextImageBtn.addEventListener('click', () => changeImage(1));

initCake();
