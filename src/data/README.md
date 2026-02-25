# CV · José Alejandro Caal Choc

CV personal construido con [Astro](https://astro.build). Minimalista, rápido, y completamente editable desde un solo archivo JSON.

## Estructura

```
src/
├── cv.json          ← ✏️  EDITA AQUÍ tu información
├── pages/
│   └── index.astro  ← renderiza el CV
└── layouts/
    └── Layout.astro ← estilos globales y estilos de impresión
```

## Inicio rápido

```bash
npm install
npm run dev
```

Abre `http://localhost:4321` en tu navegador.

## Editar el CV

Todo el contenido está en **`src/cv.json`**. Estructura:

| Campo           | Descripción                                         |
| --------------- | --------------------------------------------------- |
| `basics`        | Nombre, título, email, teléfonos, resumen, perfiles |
| `work[]`        | Experiencia laboral. `endDate: null` = Presente     |
| `skills.tech[]` | Habilidades técnicas                                |
| `skills.soft[]` | Habilidades blandas                                 |
| `education[]`   | Formación académica                                 |
| `languages[]`   | Idiomas y nivel                                     |

## Descargar como PDF

Desde el navegador, haz clic en **"Descargar PDF"** (arriba a la derecha).  
Los estilos `@media print` están optimizados para A4.

## Deploy

### Vercel (recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Sube la carpeta dist/ a Netlify
```

### GitHub Pages
Agrega `site` y `base` en `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://thealejandro.github.io',
  base: '/cv',
});
```

## Próximos pasos (ideas)
- [ ] Agregar modo oscuro con `prefers-color-scheme`
- [ ] Panel de edición visual en `/admin`
- [ ] Sección de proyectos / portafolio
- [ ] OG image automática para compartir en redes
