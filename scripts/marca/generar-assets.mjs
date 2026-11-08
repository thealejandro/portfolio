// Genera los recursos de marca de la web a partir de marca.cjs v3 (copia literal de ~/Streaming/marca/marca.js y
// nombre.js; si la marca cambia allí, se vuelven a copiar a mano y se ejecuta de nuevo).
//   npm run marca            → reescribe los archivos
//   npm run marca -- --check → solo comprueba que los archivos versionados coinciden con lo que saldría
// Salida determinista: se ejecuta a mano y se versiona; el build de Cloudflare no lo usa.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..', '..');
const comprobar = process.argv.includes('--check');

// marca.js y nombre.js escriben en window: se les da uno vacío antes de cargarlos.
globalThis.window = {};
const require = createRequire(import.meta.url);
require(join(aqui, 'nombre.cjs'));
const Marca = require(join(aqui, 'marca.cjs'));

const LOZA = '#f4ecdc';
const ESMALTE = '#0e0c0b';
const LENTE = '#7f98f5';

// ── Datos para el componente Marca.astro ─────────────────────────────
// Por variante: caja, montura en color (anillo hueco + disco aparte), montura mono (disco vacío) y nombre.
function capas(variante) {
	const color = Marca.svg(variante, { tam: Marca.ALTO, color: 'T', lente: 'L' });
	const mono = Marca.svg(variante, { tam: Marca.ALTO, color: 'T' });
	const paths = (s) => [...s.matchAll(/<path fill="(\w)"(?: transform="([^"]+)")? d="([^"]+)"\/>/g)];
	const pc = paths(color);
	const pm = paths(mono);
	const m = Marca.medidas(variante, Marca.ALTO);
	return {
		w: m.w,
		h: m.h,
		montura: pc[0][3],
		disco: pc[1][3],
		monturaMono: pm[0][3],
		nombre: pc[2] ? { transform: pc[2][2], d: pc[2][3] } : null,
	};
}
const datos = {
	version: Marca.VERSION,
	alto: Marca.ALTO,
	simbolo: capas('simbolo'),
	icono: capas('icono'),
	logotipo: capas('logotipo'),
};

// ── Piezas cuadradas sobre placa esmalte (MARCA.md §0.2) ─────────────
function cuadro(variante, px, aire) {
	const m = Marca.medidas(variante, Marca.ALTO);
	const u = (px - 2 * aire) / Math.max(m.w, m.h);
	const x = (px - m.w * u) / 2;
	const y = (px - m.h * u) / 2;
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 ${px} ${px}">` +
		`<rect width="${px}" height="${px}" fill="${ESMALTE}"/>` +
		`<g transform="translate(${+x.toFixed(3)} ${+y.toFixed(3)}) scale(${+u.toFixed(5)})">` +
		`<path fill="${LOZA}" d="${Marca.path(variante, 'tinta')}"/><path fill="${LENTE}" d="${Marca.path(variante, 'lente')}"/></g></svg>`
	);
}

const png = (svg) => sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();

// ── Imagen social por defecto 1200x630: retrato a la izquierda, logotipo a la derecha ──
async function ogDefault() {
	const W = 1200;
	const H = 630;
	const lado = 470;
	const margen = (H - lado) / 2;
	const tam = 40; // alto del símbolo dentro del logotipo
	const logo = Marca.svg('logotipo', { tam, color: LOZA, lente: LENTE });
	const lm = Marca.medidas('logotipo', tam);
	const lx = margen + lado + 64;
	const ly = (H - lm.h) / 2;
	const fondo =
		`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
		`<rect width="${W}" height="${H}" fill="${ESMALTE}"/>` +
		`<g transform="translate(${+lx.toFixed(2)} ${+ly.toFixed(2)})">${logo.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g></svg>`;
	const retrato = await sharp(join(raiz, 'src/assets/marca/avatar-800.png')).resize(lado, lado).toBuffer();
	return sharp(Buffer.from(fondo))
		.composite([{ input: retrato, left: margen, top: margen }])
		.png({ compressionLevel: 9, palette: true, quality: 90 })
		.toBuffer();
}

const salidas = {
	'src/components/marca/marca-datos.json': JSON.stringify(datos, null, '\t') + '\n',
	'public/icon-192.png': await png(cuadro('simbolo', 192, 24)),
	'public/icon-512.png': await png(cuadro('simbolo', 512, 64)),
	// Maskable: el símbolo dentro de la zona segura (círculo del 80 %).
	'public/icon-512-maskable.png': await png(cuadro('simbolo', 512, 112)),
	'public/og-default.png': await ogDefault(),
};

let distintos = 0;
for (const [ruta, contenido] of Object.entries(salidas)) {
	const destino = join(raiz, ruta);
	const nuevo = createHash('sha256').update(contenido).digest('hex');
	let actual = '';
	try {
		actual = createHash('sha256').update(readFileSync(destino)).digest('hex');
	} catch {}
	if (comprobar) {
		if (actual !== nuevo) {
			distintos++;
			console.log('distinto:', ruta);
		}
	} else {
		writeFileSync(destino, contenido);
		console.log(ruta, contenido.length, 'bytes');
	}
}
if (comprobar) {
	console.log(distintos ? `${distintos} archivo(s) no coinciden con marca.js` : 'Todo coincide con marca.js');
	process.exit(distintos ? 1 : 0);
}
