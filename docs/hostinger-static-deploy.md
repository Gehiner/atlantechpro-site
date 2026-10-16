# Despliegue estático en Hostinger Web Premium

El sitio se exporta como **archivos estáticos** (HTML + JS + CSS + imágenes). En producción no
se ejecuta Node.js, ni base de datos, ni ningún servicio de pago: Hostinger solo sirve archivos.

El build de Lovable (`bun run build`, Nitro/Cloudflare) **no cambia**. La exportación estática
usa una configuración aparte: `vite.config.static.ts`.

## Comandos

| Comando                  | Qué hace                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `bun install`            | Instala dependencias (solo en tu equipo/CI, nunca en el hosting).                   |
| `bun run build:static`   | Compila, prerenderiza todas las páginas y verifica la exportación en `dist/client`  |
| `bun run preview:static` | Sirve `dist/client` en <http://127.0.0.1:4173> imitando el `.htaccess`.             |
| `bun run verify:static`  | Prueba todas las URL del sitemap, assets y 404 (por defecto contra la vista previa) |

Para probar el sitio ya publicado: `bun run verify:static https://atlantechpro.com`.

## Qué carpeta se sube

Sube **el contenido** de `dist/client/` a `public_html` (no la carpeta `dist`, ni `dist/server`).
Debe verse así en `public_html`:

```
.htaccess            (archivo oculto: activa "mostrar archivos ocultos" en el Administrador de archivos)
404.html
index.html
sitemap.xml
robots.txt
favicon.png
og-image.jpg
assets/              (JS, CSS e imágenes con hash)
soluciones/index.html   productos/index.html   proyectos/index.html
nosotros/index.html     contacto/index.html    privacidad/index.html
blog/index.html
blog/<slug>/index.html  (un directorio por artículo publicado)
```

Pasos en hPanel:

1. Administrador de archivos → `public_html`. Elimina el contenido de ejemplo (p. ej. `default.php`).
2. Sube `dist/client` comprimido en ZIP y extráelo **dentro** de `public_html`, o sube el contenido.
3. Comprueba que `.htaccess` y `404.html` quedaron en la raíz de `public_html`.
4. Activa el SSL del dominio. Cuando `https://atlantechpro.com` abra bien, descomenta las
   reglas de HTTPS del `.htaccess` (están comentadas a propósito).
5. Ejecuta `bun run verify:static https://atlantechpro.com`.

## Cómo se generan las rutas

- Las rutas fijas se descubren solas. `/` y `/sitemap.xml` se declaran en `vite.config.static.ts`.
- **`/blog/$slug` no se exporta automáticamente**: cada artículo se genera porque `/blog` enlaza a él
  (`crawlLinks`). Un artículo nuevo en `src/data/blog.ts` con `draft: false` aparece en `/blog` y
  se exporta en el siguiente `build:static`.
- `scripts/postbuild-static.mjs` falla el build si alguna URL de `sitemap.xml` no tiene su HTML,
  si faltan `404.html`, `robots.txt` o `.htaccess`, o si hay `.env`/source maps en la salida.
- `sitemap.xml` se genera **en el build** (ya no hay servidor): hay que reconstruir y volver a
  subir cuando cambie el contenido.
- `404.html` se renderiza con el build y no carga JavaScript (se sirve en URL arbitrarias).

## Notas y límites

- Pensado para el dominio en la raíz de `public_html`. En una subcarpeta habría que definir
  `base`/`basepath` y reconstruir.
- El `.htaccess` se probó con **Apache 2.4**. Hostinger usa LiteSpeed (compatible con `.htaccess`),
  pero no se ha probado allí. Si `DirectorySlash Off` o la regla de URL limpias no se respetaran,
  las páginas siguen abriendo, pero con una redirección 301 a `/ruta/` (el canonical no lleva barra).
- El sitio carga Google Fonts (`fonts.googleapis.com`); la política de privacidad no lo menciona aún.
- Los datos legales de `/privacidad` marcados como pendientes siguen sin completarse.
