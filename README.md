# SIGNED365 Evolution

Sitio informativo en español, basado en las capturas proporcionadas. HTML5, Bootstrap 5.3.3 local, CSS y JavaScript sin proceso de compilación ni dependencias de servidor.

## Desarrollo

Desde este directorio:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abrir el sitio en el navegador mediante el servidor local. Puede desplegarse en cualquier alojamiento estático con HTTPS. No requiere Java.

## Configuración para producción

WhatsApp comercial configurado: +593997367365. El dominio público y las URLs de pago quedan pendientes. En `assets/js/config.js`, las URLs temporal y futura de SIGNED365 Pro están documentadas en comentarios; `proUrl` permanece vacío por indicación del usuario. Activarlo solo cuando se solicite. No introducir secretos. Si no están configurados, los enlaces llevan a asesoría y el formulario explica que no se ha enviado la consulta. EVA es un asistente de navegación local, sin IA ni servicio externo. El formulario no guarda ni envía información hasta que la persona continúa en WhatsApp.

Sustituir la marca tipográfica provisional y la ilustración CSS por el logotipo y recursos oficiales; las capturas no proporcionan los archivos originales. Confirmar textos comerciales, prestaciones, vigencias, precio de referencia de un año e impuestos antes de publicar. El precio de dos años no se deduce del total de la captura. No se muestra un QR sin un destino oficial.

Al confirmar el dominio público, añadir URL canónica absoluta, `og:url`, imagen social oficial con URL absoluta y dimensiones, sitemap con las URLs definitivas y su referencia en robots.txt. No se incluyen dominios ficticios. El documento ya incluye título, descripción, idioma, jerarquía de encabezados, Open Graph básico y datos estructurados de organización. El posicionamiento no puede garantizarse: validar indexación en Search Console y medir Core Web Vitals en el alojamiento final.

## Interacciones y accesibilidad

Menú móvil, navegación por anclas, preguntas con `details`, selector de audiencia, modal nativo accesible de pago, modo oscuro y escala de lectura persistentes, enlace para saltar al contenido, estados ARIA, foco visible y respeto a movimiento reducido. El contador usa UTC−5 para el próximo jueves; los jueves indica que el evento es hoy, sin inventar descuentos.

## Validación realizada

Chromium con Playwright: sin desbordamiento horizontal a 1331, 768, 390 y 320 px; menú móvil, modo oscuro, tamaño y restablecimiento de lectura, selector de planes, modal y cierre por Escape, preguntas y aviso del formulario sin WhatsApp configurado. Sin errores JavaScript en ese recorrido. Sintaxis JS validada con `node --check`. Pendiente auditoría de accesibilidad con usuarios, SEO en dominio final e integración con proveedores reales.

Bootstrap conserva su encabezado de licencia MIT en `assets/vendor/bootstrap.min.css`.
