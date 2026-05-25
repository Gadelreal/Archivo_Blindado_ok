# 🛡️ Archivo Blindado • Refractor

> **"¡Contra el óxido mental, blindaje espectral!"**

**Archivo Blindado** es un búnker digital estático, soberano y de alto impacto visual, diseñado originalmente para rescatar, preservar y difundir de forma libre el boletín anarquista histórico **Refractor (1998 - 2000)**, en primera instancia y con el objetivo de alojar otras publicaciones.

Este repositorio ha sido liberado públicamente no solo como un acto de preservación de la memoria histórica, sino también como una **plantilla web soberana y de código abierto** para que cualquier colectivo, colectivo editorial o activista pueda desplegar su propio archivo digital independiente, seguro y libre de rastreo.

---

## 💎 Características del Diseño y Filosofía Técnica

* **Privacidad Absoluta (Stateless & Cookie-free)**: Cero cookies, cero analíticas invasivas. Soberanía total de datos. Para registrar estadísticas de acceso mínimas y respetuosas con la privacidad, se utiliza de forma opcional la analítica ética, descentralizada y cookieless de GoatCounter, la cual no rastrea identidad ni perfiles de usuarios.
* **Sin Dependencias Externas (Offline-First)**: El búnker está diseñado de forma totalmente autónoma. Las fuentes, iconos, librerías JS (incluyendo el visor de PDF.js) y estilos se sirven de manera local, garantizando que el sitio funcione completamente sin conexión a internet. El script opcional de telemetría ética de GoatCounter requiere conexión, pero su bloqueo o ausencia en modo sin conexión no interfiere en absoluto con la funcionalidad del sitio.
* **Componentes Web Nativos (Vanilla Web Components)**: Modularidad sin frameworks pesados (React/Vue/Angular). Estructura pura con HTML5, CSS3 y JavaScript nativo.
* **Optimización SEO y Accesibilidad (a11y)**: Estructura semántica completa, descripciones jerárquicas con encabezados visualmente ocultos para lectores de pantalla y buscadores, y mapas de sitio (`sitemap.xml`) y `robots.txt` listos para indexación en frío.

---

## 🚀 Cómo Descargar y Ejecutar el Proyecto

Cualquier usuario puede ejecutar el archivo localmente en su máquina en cuestión de segundos:

1. **Clonar el repositorio** o descargar el archivo ZIP:
   ```bash
   git clone https://github.com/tu-usuario/nombre-repositorio.git
   cd nombre-repositorio
   ```
2. **Abrir el sitio**:
   * Simplemente haz doble clic sobre el archivo `index.html` para abrirlo directamente en tu navegador web de preferencia.
   * *Opcional:* Si deseas usar un servidor de desarrollo local rápido, puedes utilizar extensiones como *Live Server* en VS Code o ejecutar desde tu terminal:
     ```bash
     npx serve .
     ```

---

## 🛠️ Cómo Personalizar y Crear tu Propio "Archivo Blindado"

El proyecto está estructurado de manera modular para que sea extremadamente sencillo cambiar los contenidos y adaptarlo a tu propia publicación histórica.

### 1. Estructura de Carpetas Clave

* `index.html`, `archivo_blindado.html`, `firmas.html`, `artefactos.html`: Páginas HTML estáticas optimizadas.
* `styles.css`: El núcleo de diseño estético del búnker (paleta de colores, tipografías y adaptabilidad móvil).
* `data/`: La base de datos sin servidor (*Serverless Database*) en formato JSON:
  * `data/publicacion.json`: Contiene la lista de autores, ejemplares (números) y frases destacadas.
  * `data/articulos.json`: Contiene el índice de artículos completos con su respectivo contenido en texto, páginas y firmas asociadas.
* `js/components.js`: Define los componentes interactivos reutilizables (la cabecera `<app-header>`, la barra de citas `<app-quote>`, el acordeón `<app-accordion>`, etc.).
* `pdf/`: Carpeta donde se almacenan las réplicas en PDF de los boletines o revistas.
* `images/`: Recursos visuales, faviconos y gráficos del sitio.

---

### 2. Pasos para Personalizar los Contenidos

#### Paso A: Modifica la base de datos de tu publicación
Abre el archivo `data/publicacion.json` y personaliza los metadatos:
* **Autores**: Edita el listado en `"autores"` añadiendo los nombres e IDs únicos de tus colaboradores.
* **Ejemplares**: Añade los números de tu boletín o revista bajo `"ejemplares"`, definiendo el identificador único (`"id"`), número, fecha de publicación, dimensiones, y el peso de los archivos PDF.
* **Frases**: Configura las citas textuales destacadas en `"frases"` que aparecerán de manera aleatoria en la barra inferior `<app-quote>`.

#### Paso B: Añade los textos de tus artículos
Abre `data/articulos.json` y añade los artículos correspondientes de cada número:
```json
{
  "id": "ART_nombre_unico",
  "numero": "01",
  "pagina": 1,
  "titulo": "Título de tu Artículo",
  "autor_id": "AU_id_del_autor",
  "contenido": "Cuerpo del artículo en texto plano. Puedes separar párrafos con doble salto de línea (\\n\\n). Puedes usar **negrita** o *cursiva*.",
  "lugar_fecha_publicacion": "Lugar, Fecha de la edición original"
}
```

#### Paso C: Reemplaza las portadas e imágenes de los boletines
* Sube las miniaturas de tus ejemplares a la carpeta `images/Miniaturas_Refractor/` en formato `.jpg`, utilizando la nomenclatura estándar: `N_Refractor_[Número].jpg` (ejemplo: `N_Refractor_01.jpg`).
* Sube los archivos PDF correspondientes a la carpeta `pdf/`, nombrados como: `N_Refractor_[Número].pdf`.

#### Paso D: Cambiar el diseño estético y colores
Si quieres cambiar el tono de color (por ejemplo, pasar del clásico rojo/charcoal de Refractor a un tono azul, verde o dorado), solo debes ajustar las variables CSS globales al inicio de `styles.css`:
```css
:root {
  --bg-dark: #121926;      /* Fondo principal oscuro */
  --bg-white: #FFFFFF;     /* Fondo de contenidos claros */
  --red-refractor: #D32F2F; /* Color principal de acento */
  --font-base: 'Outfit', sans-serif;
}
```

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)**. 

Eres libre de:
* **Compartir**: Copiar y redistribuir el material en cualquier medio o formato.
* **Adaptar**: Mezclar, transformar y crear a partir del material.

Bajo las siguientes condiciones:
* **Atribución**: Debes dar crédito de manera adecuada y proporcionar un enlace a la licencia.
* **No Comercial**: No puedes utilizar el material para una finalidad comercial.
* **Compartir Igual**: Si remezclas o transformas el material, debes distribuir tus contribuciones bajo la misma licencia que el original.
