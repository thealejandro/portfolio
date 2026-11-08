// Contenido de omarchy-island v0.5.0, resumido de README.es.md del plugin.

export interface Feature {
	id: string;
	title: string;
	text: string;
	/** Trazos de un icono de 24×24 (stroke). */
	icon: string;
}

export const ISLAND_FEATURES: Feature[] = [
	{
		id: 'borde',
		title: 'Sale de la barra, en cualquier borde',
		text: 'Se abre justo sobre el reloj, esté donde esté: arriba, abajo, a la izquierda o a la derecha. Pasa el ratón por el reloj y aparece; al alejarte se aparta.',
		icon: 'M3 6h18M7 6v3a5 5 0 0 0 10 0V6M3 18h18',
	},
	{
		id: 'reloj',
		title: 'Un clic en el reloj',
		text: 'Fija la isla abierta y la cierra con otro clic. Con clockClick ese clic puede abrir el Calendario o dejarle el reloj al calendario de Omarchy.',
		icon: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
	},
	{
		id: 'paginas',
		title: 'Inicio, Calendario, Mundo y Ajustes',
		text: 'Cuatro páginas en las pestañas de su esquina. Inicio reúne música con controles, calendario, temporizador de enfoque y un dock de toggles y acciones.',
		icon: 'M4 5h7v6H4zM13 5h7v3h-7zM13 10h7v9h-7zM4 13h7v6H4z',
	},
	{
		id: 'agenda',
		title: 'Agenda local con recordatorios',
		text: 'Eventos que se repiten cada semana, mes o año, aviso antes de cada uno y paso a omarchy reminder. Con agendaCommand trae eventos de otro calendario, como khal.',
		icon: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM8 13h3v3H8z',
	},
	{
		id: 'mundo',
		title: 'Hora mundial y pronóstico',
		text: 'Las ciudades de elsewhen con su hora, día y diferencia con la tuya, y el clima de wttr.in con pronóstico de tres días.',
		icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z',
	},
	{
		id: 'ajustes',
		title: 'Ajustes sin editar archivos',
		text: 'Interruptores, opciones y botones +/− en la propia isla. Se guardan al momento en shell.json y lo que cambies por línea de comandos aparece en vivo.',
		icon: 'M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4',
	},
	{
		id: 'osd',
		title: 'Volumen, brillo y batería',
		text: 'Opcionalmente, el OSD de Omarchy aparece en la isla como un vistazo con su barra de nivel. Avisa al conectar el cargador y con batería baja.',
		icon: 'M4 10v4h3l4 4V6L7 10H4ZM15 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11',
	},
	{
		id: 'tema',
		title: 'Toma el estilo de tu tema',
		text: 'Colores, fuente, acento y esquinas del tema, en vivo con omarchy theme set. Respeta la barra opaca o de cristal, con desenfoque detrás.',
		icon: 'M12 3a9 9 0 0 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-1-.8-1.4-.8-2.4 0-.9.7-1.6 1.6-1.6H17a4 4 0 0 0 4-4c0-4.6-4-8.4-9-8.4ZM7.5 11.5h.01M10.5 7.5h.01M15.5 8.5h.01',
	},
];

export interface Setting {
	key: string;
	values: string;
	def: string;
	desc: string;
}

/** Tabla «Ajustes» del README, tal cual. */
export const ISLAND_SETTINGS: Setting[] = [
	{ key: 'language', values: '`en`, `es`', def: 'según `LANG`', desc: 'Idioma de la isla' },
	{ key: 'defaultPage', values: '`home`, `calendar`, `world`', def: '`home`', desc: 'Página con la que se abre' },
	{ key: 'calendarFirst', values: '`true`, `false`', def: '`false`', desc: 'Calendario a la izquierda en Inicio' },
	{
		key: 'showMedia, showTimer, showDock, showWorld',
		values: '`true`, `false`',
		def: '`true`',
		desc: 'Partes de la página Inicio',
	},
	{ key: 'openWidth', values: '420–800', def: '`560`', desc: 'Ancho de la isla abierta' },
	{ key: 'blur', values: '`true`, `false`', def: '`true`', desc: 'Desenfoque detrás de la isla con la barra de cristal' },
	{
		key: 'clock',
		values: '`true`, `false`',
		def: '`true`',
		desc: 'Abrir al pasar sobre el reloj (`false`: solo la franja del borde)',
	},
	{
		key: 'clockClick',
		values: '`pin`, `calendar`, `omarchy`',
		def: '`pin`',
		desc: 'Clic en el reloj: fijar la isla, abrirla en el calendario o el calendario de Omarchy',
	},
	{
		key: 'anchor',
		values: '`clock`, `widget`, `center`',
		def: '`clock`',
		desc: 'Colgar del reloj de Omarchy, del sitio de la isla en la barra o del centro',
	},
	{ key: 'clockWidth', values: '60–400', def: '`120`', desc: 'Zona de hover si no se encuentra el reloj' },
	{ key: 'hoverOpen', values: '`true`, `false`', def: '`true`', desc: 'Abrir al pasar el puntero' },
	{ key: 'hoverDelay', values: '0–600 ms', def: '`120`', desc: 'Espera antes de abrir al pasar' },
	{ key: 'peekDuration', values: '1000–10000 ms', def: '`3500`', desc: 'Duración de un vistazo' },
	{ key: 'toggles', values: '`island`, `both`, `bar`', def: '`island`', desc: 'Dónde viven los toggles de Omarchy' },
	{ key: 'widgetIcon', values: '`true`, `false`', def: '`false`', desc: 'Un botón propio pequeño en la barra' },
	{ key: 'units', values: '`metric`, `imperial`', def: '`metric`', desc: 'Unidades del clima' },
	{ key: 'forecast', values: '`true`, `false`', def: '`true`', desc: 'Pronóstico de 3 días en Mundo' },
	{
		key: 'hour24',
		values: '`true`, `false`',
		def: 'el de elsewhen, si no el del idioma',
		desc: 'Hora mundial en 24 h',
	},
	{ key: 'cities', values: '`[{"name","zone"}]`', def: 'las de elsewhen', desc: 'Lista de ciudades propia' },
	{ key: 'weekStart', values: '1 (lun) – 7 (dom)', def: 'el del idioma', desc: 'Primer día de la semana' },
	{ key: 'reminderLead', values: '0–120 min', def: '`10`', desc: 'Aviso antes de un evento' },
	{ key: 'agendaCommand', values: 'comando', def: '`""`', desc: 'Eventos extra de otro calendario' },
	{ key: 'osd', values: '`true`, `false`', def: '`false`', desc: 'Mostrar el OSD de Omarchy en la isla' },
	{ key: 'battery', values: '`true`, `false`', def: '`true`', desc: 'Vistazos de carga y batería baja' },
];

/** Convierte `código` en <code> (las celdas solo traen texto y backticks). */
export const ticks = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
