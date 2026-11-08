// Vídeos del sitio (en public/omarchy). Para añadir uno basta con otra entrada.
export interface Video {
	id: string;
	label: string;
	alt: string;
	poster: string;
	width: number;
	height: number;
	sources: { src: string; type: string }[];
	/** Tema al que pertenece, para el filtro de la galería. */
	theme?: string;
}

/** Vídeo promocional de los temas (720p comprimido; el original pesa ~38 MB). */
export const PROMO: Video = {
	id: 'promo',
	label: 'Temas para Omarchy · vídeo',
	alt: 'Vídeo promocional de los temas para Omarchy: los once temas, la isla y la instalación',
	poster: '/omarchy/omarchy-promo-poster.webp',
	width: 1280,
	height: 720,
	sources: [{ src: '/omarchy/omarchy-promo-720p.mp4', type: 'video/mp4' }],
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
