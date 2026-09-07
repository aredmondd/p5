import p5 from 'p5';
import { getSketchSlugs, loadSketch } from './sketch-registry.js';

let currentInstance = null;
let currentStyleTag = null;

const canvasHost = document.getElementById('sketch-container');
const nav = document.getElementById('sketch-nav');

async function mount(slug) {
  currentInstance?.remove();
  currentStyleTag?.remove();
  canvasHost.innerHTML = '';

  const { sketch, css } = await loadSketch(slug);
  if (css) {
    currentStyleTag = document.createElement('style');
    currentStyleTag.textContent = css;
    document.head.appendChild(currentStyleTag);
  }
  currentInstance = new p5(sketch, canvasHost);
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
