const modules = import.meta.glob('./sketches/*/index.js');
const styles = import.meta.glob('./sketches/*/style.css', { query: '?raw', import: 'default' });

export function getSketchSlugs() {
  return Object.keys(modules).map(p => p.split('/')[2]);
}

export async function loadSketch(slug) {
  const mod = await modules[`./sketches/${slug}/index.js`]();
  const cssPath = `./sketches/${slug}/style.css`;
  const css = styles[cssPath] ? await styles[cssPath]() : '';
  return { sketch: mod.default, css };
}
