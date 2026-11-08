import type { ImageMetadata } from 'astro';
import data from '../../data/omarchy-themes.json';
import { themeRepo } from './commands';

/**
 * Capturas: src/assets/omarchy/<slug>/<tipo>.png (también .jpg o .webp).
 * Basta con soltar el archivo; el orden y la etiqueta salen de esta lista.
 */
export const SHOT_KINDS = [
	{ id: 'desktop', label: 'Escritorio' },
	{ id: 'island', label: 'Isla abierta' },
	{ id: 'island-bottom', label: 'Isla con barra abajo' },
	{ id: 'launcher', label: 'Lanzador' },
	{ id: 'notification', label: 'Notificación' },
	{ id: 'bar-opaque', label: 'Barra opaca' },
	{ id: 'bar-glassy', label: 'Barra cristal' },
	{ id: 'bar-clear', label: 'Barra transparente' },
] as const;

export type ShotKind = (typeof SHOT_KINDS)[number]['id'];

const files = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/omarchy/*/*.{png,jpg,jpeg,webp}',
	{ eager: true },
);

const bySlugKind = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
	const m = path.match(/\/omarchy\/([^/]+)\/([^/.]+)\.\w+$/);
	if (m) bySlugKind.set(`${m[1]}/${m[2]}`, mod.default);
}

const ALT: Record<ShotKind, (n: string) => string> = {
	desktop: (n) =>
		`Escritorio de Omarchy con el tema ${n}: terminal, btop, Neovim y el gestor de archivos`,
	island: (n) => `La isla de omarchy-island abierta con el tema ${n}`,
	'island-bottom': (n) => `La isla abierta con la barra en la parte inferior, tema ${n}`,
	launcher: (n) => `El lanzador de aplicaciones con el tema ${n}`,
	notification: (n) => `Una notificación con el tema ${n}`,
	'bar-opaque': (n) => `La barra superior opaca con el tema ${n}`,
	'bar-glassy': (n) => `La barra superior con efecto cristal, tema ${n}`,
	'bar-clear': (n) => `La barra superior transparente con el tema ${n}`,
};

export interface Shot {
	kind: ShotKind;
	label: string;
	alt: string;
	img: ImageMetadata;
}

export const PALETTE_LABELS: Record<string, string> = {
	background: 'Fondo',
	foreground: 'Texto',
	accent: 'Acento',
	muted: 'Atenuado',
	red: 'Rojo',
	green: 'Verde',
	yellow: 'Amarillo',
	blue: 'Azul',
	magenta: 'Magenta',
	cyan: 'Cian',
};

export const FAMILY_LABELS = { macos: 'macOS', windows: 'Windows', propio: 'Diseño propio' } as const;
export const MODE_LABELS = { light: 'Claro', dark: 'Oscuro' } as const;

type Raw = (typeof data)[number];

/** "rgba(ff7eb6cc) rgba(7c8cffcc) 45deg" de Hyprland a un fondo CSS. */
export function borderCss(border: string): string | null {
	const colors = [...border.matchAll(/rgba?\(([0-9a-f]{6,8})\)/gi)].map((m) => `#${m[1]}`);
	if (!colors.length) return null;
	if (colors.length === 1) return colors[0];
	const angle = border.match(/(-?\d+)deg/)?.[1] ?? '0';
	return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
}

function tagOf(t: Raw) {
	const base = t.inspiration.split(',')[0].trim();
	return base === 'original' ? 'Diseño propio' : base.replace(' / ', '/');
}

function build(t: Raw) {
	const shots: Shot[] = SHOT_KINDS.flatMap((k) => {
		const img = bySlugKind.get(`${t.slug}/${k.id}`);
		return img ? [{ kind: k.id, label: k.label, alt: ALT[k.id](t.name), img }] : [];
	});
	return {
		...t,
		family: t.family as keyof typeof FAMILY_LABELS,
		mode: t.mode as keyof typeof MODE_LABELS,
		tag: tagOf(t),
		modeLabel: MODE_LABELS[t.mode as keyof typeof MODE_LABELS],
		repo: t.repo || themeRepo(t.slug),
		palette: t.palette as Record<string, string>,
		shots,
		cover: shots[0] as Shot | undefined,
		borderCss: borderCss(t.border),
	};
}

export type Theme = ReturnType<typeof build>;
export const themes: Theme[] = data.map(build);
