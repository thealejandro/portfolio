// Vídeos del sitio (en public/omarchy). Para añadir uno basta con otra entrada.
export interface Video {
	id: string;
	label: string;
	alt: string;
	poster: string;
	width: number;
	height: number;
	/** `media` elige la fuente según la pantalla (la primera que encaje). */
	sources: { src: string; type: string; media?: string }[];
	/** Tema al que pertenece, para el filtro de la galería. */
	theme?: string;
}

/** Vídeo promocional de los temas (v2): 720p en pantallas pequeñas y 1440p en el resto. Crédito de la música en GalleryTeaser. */
export const PROMO: Video = {
	id: 'promo',
	label: 'Temas para Omarchy · vídeo',
	alt: 'Vídeo promocional de los temas para Omarchy: los once temas, la isla y la instalación',
	poster: '/omarchy/omarchy-promo-v2-poster.webp',
	width: 2560,
	height: 1440,
	sources: [
		{ src: '/omarchy/omarchy-promo-v2-720p.mp4', type: 'video/mp4', media: '(max-width: 1024px)' },
		{ src: '/omarchy/omarchy-promo-v2-1440p.mp4', type: 'video/mp4' },
	],
};

export const ISLAND_DEMO: Video = {
	id: 'island-demo',
	label: 'omarchy-island · demo',
	alt: 'Demo de omarchy-island: vistazo, volumen y apertura desde el reloj',
	poster: '/omarchy/island-demo-poster.webp',
	width: 600,
	height: 338,
	sources: [
		{ src: '/omarchy/island-demo.webm', type: 'video/webm' },
		{ src: '/omarchy/island-demo.mp4', type: 'video/mp4' },
	],
};

export const VIDEOS: Video[] = [PROMO, ISLAND_DEMO];
