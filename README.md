# thealejandro.dev

Sitio personal de José Alejandro Caal Choc — desarrollador full stack y fundador de [XACode](https://xacode.dev).
Construido con [Astro](https://astro.build) y desplegado en Cloudflare.

## Sitio

- 🌐 [thealejandro.dev](https://thealejandro.dev) — inicio: presentación, proyectos, herramientas y contacto
- 📄 [thealejandro.dev/cv](https://thealejandro.dev/cv) — CV imprimible (botón "Descargar PDF")
- ✍️ [thealejandro.dev/blog](https://thealejandro.dev/blog) — blog (vacío por ahora; muestra un aviso hasta que haya posts)

## Stack

- **Framework:** Astro 7 + MDX + sitemap + RSS
- **Deploy:** Cloudflare Pages (sitio estático, sin adaptador)
- **Dominio:** Porkbun → Cloudflare DNS

## Estructura

```
src/
├── components/       ← Header, Footer, BaseHead, FormattedDate
├── content/blog/     ← posts en Markdown/MDX (vacío por ahora)
├── data/
│   └── cv.json       ← contenido del CV (editar aquí)
├── layouts/          ← BlogPost y LayoutCV
├── consts.ts         ← título, descripción y URL del sitio
└── pages/
    ├── index.astro   ← inicio (proyectos en el array `projects`)
    ├── blog/         ← índice y detalle de posts
    ├── cv/index.astro
    └── rss.xml.js
```

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview
```

## Cómo editar

- **CV:** todo vive en `src/data/cv.json`. `endDate: null` significa "Presente".
- **Proyectos de la portada:** el array `projects` al inicio de `src/pages/index.astro`.
- **Blog:** crea un archivo `.md` o `.mdx` en `src/content/blog/` con `title`, `description` y `pubDate` en el frontmatter (ver `src/content.config.ts`).

## Deploy

Cloudflare Pages detecta cada push a `main` y despliega automáticamente.

- **Build command:** `npm run build`
- **Output directory:** `dist`

El sitio es estático, así que no usa el adaptador `@astrojs/cloudflare` (ese adaptador, desde su
versión 13, solo sirve para Workers y cambia la carpeta de salida a `dist/client`).
