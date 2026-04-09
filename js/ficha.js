/**
 * Ficha de Número - Lógica de carga dinámica
 * Fuente de verdad: data/publicacion.json y data/articulos.json
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Obtenemos el número de la publicación de la URL o por defecto el 01
    const params = new URLSearchParams(window.location.search);
    const issueNumber = params.get('numero') || '01';

    try {
        const [pubResponse, artResponse] = await Promise.all([
            fetch('./data/publicacion.json'),
            fetch('./data/articulos.json')
        ]);

        const pubData = await pubResponse.json();
        const artData = await artResponse.json();

        renderFicha(pubData, issueNumber);
        renderArticulos(artData, issueNumber);
    } catch (error) {
        console.error('Error cargando los datos de la publicación:', error);
    }
});

function renderFicha(data, number) {
    const issue = data.ejemplares.find(e => e.numero == parseInt(number));
    if (!issue) return;

    // Actualización de Metadatos (Ejemplo de mapeo futuro)
    // const title = document.querySelector('.ficha-title');
    // if (title) title.textContent = `REFRACTOR ${number.toString().padStart(2, '0')}`;
    
    // const subtitle = document.querySelector('.ficha-subtitle');
    // if (subtitle) {
    //     subtitle.textContent = `${issue.fecha_publicacion} • ${issue.precio} • Tirada: ${issue.tirada}`;
    // }
}

function renderArticulos(allArticles, issueNumber) {
    const articles = allArticles.filter(a => a.numero == issueNumber);
    
    // Aquí iría la lógica para agrupar por páginas y generar los <app-accordion>
    // y los <article class="pub-article"> dinámicamente.
}
