// Comandos de instalación. Sin dependencias de datos para poder usarse
// tanto al renderizar en el servidor como en el script del navegador.

export const GH = 'https://github.com/thealejandro';
export const THEMES_REPO = `${GH}/omarchy-themes`;
export const ISLAND_REPO = `${GH}/omarchy-island`;

export const HOOKS = ['40-theme-shape', '30-tide-colors'] as const;
export type Hook = (typeof HOOKS)[number];

export const themeRepo = (slug: string) => `${GH}/omarchy-${slug}-theme`;
export const themeInstall = (slug: string) => `omarchy theme install ${themeRepo(slug)}`;

/** Instalación del tema con los dos hooks, vía install.sh. */
export const themeWithHooks = (slug: string) =>
	`git clone ${THEMES_REPO}\nomarchy-themes/install.sh ${slug}`;

/** Según omarchy-island/README.es.md */
export const ISLAND_LINES = [
	`omarchy plugin add ${ISLAND_REPO}.git --enable`,
	'omarchy bar put thealejandro.island --after omarchy.clock',
];

/** Resto de comandos de la isla, copiados de omarchy-island/README.es.md */
export const ISLAND_VERSION = '0.6.2';
export const ISLAND_REMOVE = 'omarchy plugin remove thealejandro.island';
export const ISLAND_BIND = 'o.bind("SUPER + I", "Island", "omarchy-shell island toggle")';
export const ISLAND_SET_EXAMPLE = 'omarchy bar set thealejandro.island toggles both';
export const ISLAND_OSD = ['omarchy plugin disable omarchy.osd', 'omarchy bar set thealejandro.island osd true'];
export const ISLAND_AGENDA =
	"omarchy bar set thealejandro.island agendaCommand \"khal list --format '{start-date}\\t{start-time}\\t{title}' --day-format '' today 14d\"";
export const ISLAND_NOTIFICATIONS = [
	'omarchy-shell island notifications island',
	'omarchy-shell island notifications off',
];
export const ISLAND_JSON = '{ "id": "thealejandro.island", "language": "es", "defaultPage": "calendar" }';

export interface Selection {
	themes: string[];
	allThemes: string[];
	hooks: string[];
	island: boolean;
}

export function buildCommands({ themes, allThemes, hooks, island }: Selection): string {
	const lines: string[] = [];
	const picked = allThemes.filter((s) => themes.includes(s));
	const bothHooks = HOOKS.every((h) => hooks.includes(h));

	if (bothHooks) {
		// install.sh siempre instala los dos hooks; los temas van como argumentos.
		const arg =
			picked.length === allThemes.length ? ' all' : picked.length ? ` ${picked.join(' ')}` : '';
		lines.push(`git clone ${THEMES_REPO}`, `omarchy-themes/install.sh${arg}`);
	} else {
		const oneHook = HOOKS.filter((h) => hooks.includes(h));
		if (oneHook.length) {
			lines.push(`git clone ${THEMES_REPO}`);
			for (const h of oneHook) lines.push(`omarchy hook install theme-set omarchy-themes/hooks/${h}`);
		}
		for (const s of picked) lines.push(themeInstall(s));
		// Sin temas nuevos, reaplica el actual para que el hook surta efecto (como install.sh).
		if (oneHook.length && !picked.length) lines.push('omarchy theme set "$(omarchy theme current)"');
	}

	if (island) lines.push(...ISLAND_LINES);
	return lines.join('\n');
}
