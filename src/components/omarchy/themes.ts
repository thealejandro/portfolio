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

/** Grupos para filtrar la galería global. */
export const SHOT_GROUPS = [
	{ id: 'desktop', label: 'Escritorio', kinds: ['desktop'] },
	{ id: 'island', label: 'Isla', kinds: ['island', 'island-bottom'] },
	{ id: 'launcher', label: 'Lanzador', kinds: ['launcher'] },
	{ id: 'notification', label: 'Notificación', kinds: ['notification'] },
	{ id: 'bar', label: 'Barra', kinds: ['bar-opaque', 'bar-glassy', 'bar-clear'] },
] as const satisfies readonly { id: string; label: string; kinds: readonly ShotKind[] }[];

export type ShotGroup = (typeof SHOT_GROUPS)[number]['id'];

export const groupOf = (kind: ShotKind): ShotGroup =>
	SHOT_GROUPS.find((g) => (g.kinds as readonly ShotKind[]).includes(kind))!.id;

export const BAR_KINDS = ['bar-opaque', 'bar-glassy', 'bar-clear'] as const;
export const isBar = (kind: ShotKind) => (BAR_KINDS as readonly string[]).includes(kind);

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

/** Fondos de pantalla: src/assets/omarchy/<slug>/fondos/<n>-<nombre>.webp */
const wallFiles = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/omarchy/*/fondos/*.{png,jpg,jpeg,webp}',
	{ eager: true },
);
export interface Wall {
	label: string;
	alt: string;
	img: ImageMetadata;
}
const wallsOf = (slug: string, name: string): Wall[] =>
	Object.entries(wallFiles)
		.filter(([path]) => path.includes(`/omarchy/${slug}/fondos/`))
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([path, mod]) => {
			const raw = path.match(/\/(?:\d+-)?([^/]+)\.\w+$/)![1].replace(/-/g, ' ');
			const nice = raw.charAt(0).toUpperCase() + raw.slice(1);
			return { label: `Fondo «${nice}»`, alt: `Fondo de pantalla «${nice}» del tema ${name}`, img: mod.default };
		});

/** Lo mínimo que necesita una miniatura del visor. */
export type Media = Pick<Shot, 'label' | 'alt' | 'img'>;

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
		walls: wallsOf(t.slug, t.name),
		cover: shots[0] as Shot | undefined,
		borderCss: borderCss(t.border),
	};
}

export type Theme = ReturnType<typeof build>;
export const themes: Theme[] = data.map(build);

export const shotOf = (t: Theme, kind: ShotKind) => t.shots.find((s) => s.kind === kind);

/** Nombre compartido de View Transition para la captura principal de un tema. */
export const vtName = (slug: string) => `shot-${slug}`;
