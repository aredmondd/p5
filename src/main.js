import p5 from 'p5';
import { getSketchSlugs, loadSketch } from './sketch-registry.js';

const P5_LIFECYCLE_FNS = [
  'preload', 'setup', 'draw',
  'mousePressed', 'mouseReleased', 'mouseMoved', 'mouseDragged', 'mouseWheel',
  'keyPressed', 'keyReleased', 'keyTyped',
  'windowResized', 'touchStarted', 'touchMoved', 'touchEnded',
];

let currentInstance = null;
let currentStyleTag = null;

const canvasHost = document.getElementById('sketch-container');
const nav = document.getElementById('sketch-nav');

function clearGlobalSketch() {
  for (const fn of P5_LIFECYCLE_FNS) delete window[fn];
}

async function mount(slug) {
  currentInstance?.remove();
  currentStyleTag?.remove();
  clearGlobalSketch();
  canvasHost.innerHTML = '';

  const { moduleExports, css } = await loadSketch(slug);
  for (const fn of P5_LIFECYCLE_FNS) {
    if (moduleExports[fn]) window[fn] = moduleExports[fn];
  }
  if (css) {
    currentStyleTag = document.createElement('style');
    currentStyleTag.textContent = css;
    document.head.appendChild(currentStyleTag);
  }

  currentInstance = new p5(); // no function arg = global mode
  history.replaceState(null, '', `#${slug}`);
}

function buildNav() {
  const slugs = getSketchSlugs();
  slugs.forEach(slug => {
    const btn = document.createElement('button');
    btn.textContent = slug;
    btn.onclick = () => mount(slug);
    nav.appendChild(btn);
  });
  mount(location.hash.slice(1) || slugs[0]);
}

buildNav();
