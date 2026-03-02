# thealejandro.dev

Portfolio personal de José Alejandro Caal Choc — Analista Programador.  
Construido con [Astro](https://astro.build) y desplegado en [Cloudflare Pages](https://pages.cloudflare.com).

## Sitio

🌐 [thealejandro.dev](https://thealejandro.dev)  
📄 [thealejandro.dev/cv](https://thealejandro.dev/cv)

## Stack

- **Framework:** Astro
- **Deploy:** Cloudflare Pages
- **Dominio:** Porkbun → Cloudflare DNS

## Estructura

```
src/
├── components/       ← Header, Footer, BaseHead
├── content/blog/     ← posts en Markdown/MDX
├── data/
│   └── cv.json       ← contenido del CV (editar aquí)
├── layouts/          ← layouts base y CV
└── pages/
    ├── index.astro   ← inicio
    └── cv/
        └── index.astro ← /cv
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Editar el CV

Todo el contenido del CV vive en `src/data/cv.json`. Edita ese archivo y el cambio se refleja automáticamente en `/cv`.

## Deploy

Cloudflare Pages detecta cada push a `main` y hace el deploy automáticamente.

- **Build command:** `npm run build`
- **Output directory:** `dist`

## Estado

🚧 Portfolio en construcción — actualmente solo disponible el CV.
