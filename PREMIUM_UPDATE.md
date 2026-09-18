# VYRA — actualización visual

Estado: refinamiento comercial publicado en Gviso el 19 de septiembre de 2026. Versión Cloudflare: 95c06eba-0d52-41fd-971d-c216ac0d50d2. HTML, CSS y JavaScript contrastados públicamente por HTTP y SHA-256 contra los archivos locales; imágenes conservadas de la publicación anterior.

## Refinamiento comercial

- Menos texto editorial y secciones repetidas; ingredientes y detalles técnicos desplegables.
- Precio, contenido y compra directa visibles desde la portada; tarjetas de producto simplificadas.
- Acceso móvil a compra después de salir de la portada, sincronizado con el carrito.
- Identidad visual y precios originales conservados; sin testimonios ni promesas comerciales inventados.
- Comprobados selección de productos, carrito y checkout simulado, anclas y consola.
- Revisados los anchos 390, 768 y 1440 px sin desbordamiento horizontal.
- Nueva capa visual en `commerce.css`. Sigue siendo una demostración sin pagos reales.

## Archivos

- `index.html`: estructura, contenido e imágenes responsive.
- `premium.css`: dirección visual y ajustes responsive, cargado después del CSS original.
- `app.js`: catálogo e interacciones específicas.
- `cart.js`: carrito de demostración accesible, sin red, pagos ni datos personales.
- `assets/`: imágenes finales WebP y variantes de 640 px.

## Imágenes y resumen del conjunto de prompts

Generación: herramienta integrada image_gen, no API externa ni librería de stock. Son representaciones fotorrealistas generadas por IA de productos ficticios, no fotografías documentales de productos fabricados.

Fotografía deportiva premium con cajas y sobres físicos, pliegues y sombras naturales. Solar Grapefruit: pomelo y pista de atletismo con luz matinal. Electric Lime: lima y entorno de ciclismo. Midnight Berry: frutos rojos y pista al anochecer. Un encuadre principal y otro cenital por sabor. Ritual: deportista vertiendo polvo de un sobre en una botella, sin ilustración CSS.

Restricciones comunes: materiales y luz físicamente creíbles; nombre y sabor legibles; sin claims nuevos, sellos de certificación, precios, texto promocional extra ni logotipos ajenos. Las imágenes de detalle conservan la identidad del envase de su referencia.

Assets finales:

- `assets/solar-hero.webp` y `assets/solar-hero-640.webp`
- `assets/lime-hero.webp` y `assets/lime-hero-640.webp`
- `assets/berry-hero.webp` y `assets/berry-hero-640.webp`
- `assets/solar-detail.webp` y `assets/solar-detail-640.webp`
- `assets/lime-detail.webp` y `assets/lime-detail-640.webp`
- `assets/berry-detail.webp` y `assets/berry-detail-640.webp`
- `assets/mix.webp` y `assets/mix-640.webp`

Exportación: WebP calidad 84 a resolución original; versión de 640 px a calidad 80. Originales preexistentes conservados. Las fotografías de producto sustituyen a las representaciones artificiales anteriores; iconos y gráficos informativos permanecen vectoriales.

## Pruebas locales

- Anchos reales 390, 768 y 1440 px, sin desbordamiento horizontal.
- Inspección visual de portada y página completa.
- Selección de producto, cantidades y checkout simulado.
- Estado vacío deshabilitado, Escape y gestión de foco.
- Sintaxis JavaScript y git diff --check correctos.
- Enlaces internos, IDs y recursos HTML locales sin referencias rotas.
- Sin avisos ni errores de consola durante los recorridos revisados.
- Movimiento reducido implementado en CSS; no se ha emulado una preferencia del sistema ni certificado conformidad WCAG completa.

Para ejecutar desde este repositorio: `python3 -m http.server 4173 --bind 127.0.0.1`. No requiere instalar dependencias.
