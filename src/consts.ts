// Datos globales del sitio. Se importan desde cualquier página.
import cv from './data/cv.json';

export const SITE_TITLE = 'thealejandro';
export const SITE_DESCRIPTION =
	'José Alejandro Caal Choc — desarrollador full stack (Laravel, Livewire, Astro) y fundador de XACode. Código, Linux y charla en directo.';
export const SITE_URL = 'https://thealejandro.dev';

export const PERSONA = {
	nombre: cv.basics.name,
	alias: 'thealejandro',
	rol: 'Desarrollador full stack',
	ciudad: 'Cobán',
	region: 'Alta Verapaz',
	pais: 'Guatemala',
	email: cv.basics.email,
	empresa: { nombre: 'XACode', url: 'https://xacode.dev' },
};

export const LEMA = 'Código, Linux y charla';
export const TEMAS_DIRECTO = [
	'Código en directo',
	'Linux y macOS',
	'Proyectos y taller',
	'Redes e infraestructura',
	'Charla y noticias tech',
	'Juegos de vez en cuando',
];

export type IdRed = 'github' | 'x' | 'instagram' | 'linkedin' | 'twitch' | 'kick';
export interface Red {
	id: IdRed;
	nombre: string;
	usuario: string;
	url: string;
}

export const REDES: Red[] = [
	{ id: 'github', nombre: 'GitHub', usuario: 'thealejandro', url: 'https://github.com/thealejandro' },
	{ id: 'x', nombre: 'X', usuario: 'thealejandro__', url: 'https://x.com/thealejandro__' },
	{ id: 'instagram', nombre: 'Instagram', usuario: 'thealejandro__', url: 'https://instagram.com/thealejandro__' },
	{ id: 'linkedin', nombre: 'LinkedIn', usuario: 'thealejandro', url: 'https://linkedin.com/in/thealejandro' },
	{ id: 'twitch', nombre: 'Twitch', usuario: 'thealejandro__', url: 'https://twitch.tv/thealejandro__' },
	{ id: 'kick', nombre: 'Kick', usuario: 'thealejandro-tv', url: 'https://kick.com/thealejandro-tv' },
];
export const red = (id: IdRed) => REDES.find((r) => r.id === id)!;

export const DIRECTO = {
	horario: 'Lun · Mié · Vie — 20:00 (Guatemala, UTC-6)',
	dias: 'lunes, miércoles y viernes',
	hora: '20:00',
	zona: 'Guatemala, UTC-6',
	plataformas: [red('twitch'), red('kick')],
};

export const CREDITO_RETRATO = 'Retrato: @SC.ASTRO';
