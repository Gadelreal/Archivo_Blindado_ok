/**
 * Ficha de Número - Lógica de carga dinámica
 * Fuente de verdad: data/publicacion.json y data/articulos.json
 */

document.addEventListener('DOMContentLoaded', async () => {
    const viewer = document.querySelector('pdf-viewer');
    const urlParams = new URLSearchParams(window.location.search);
    let targetId = urlParams.get('id');
    const issueNum = urlParams.get('numero');
    
    // Soporte para ambos parámetros para mayor robustez
    if (!targetId && issueNum) {
        const formattedNum = issueNum.toString().split('-').map(n => n.padStart(2, '0')).join('-');
        targetId = `N_Refractor_${formattedNum}`;
    }
    if (!targetId) {
        targetId = 'N_Refractor_01';
    }

    try {
        const [pubResponse, artResponse] = await Promise.all([
            fetch('./data/publicacion.json'),
            fetch('./data/articulos.json')
        ]);

        const pubData = await pubResponse.json();
        const artData = await artResponse.json();

        const ejemplar = pubData.ejemplares.find(e => e.id === targetId);
        if (!ejemplar) {
            console.error('Ejemplar no encontrado:', targetId);
            const titleEl = document.getElementById('fichaTitle');
            if (titleEl) titleEl.textContent = 'Publicación no encontrada';
            return;
        }

        const strNum = ejemplar.numero.toString().split('-').map(n => n.padStart(2, '0')).join('-');
        const thumbnailPath = `./images/Miniaturas_Refractor/N_Refractor_${strNum}.jpg`;
        const titleText = `REFRACTOR ${strNum}`;

        renderFicha(ejemplar, strNum, thumbnailPath, titleText, viewer);
        renderArticulos(artData, ejemplar, strNum, titleText, pubData, viewer);
        
    } catch (error) {
        console.error('Error cargando los datos de la publicación:', error);
        const titleEl = document.getElementById('fichaTitle');
        if (titleEl) titleEl.textContent = 'Error al cargar';
        const subtitleEl = document.getElementById('fichaSubtitle');
        if (subtitleEl) subtitleEl.textContent = 'Verifique la consola para más detalles.';
    }
});

/**
 * Renderiza la ficha técnica del número y sus metadatos
 */
function renderFicha(ejemplar, strNum, thumbnailPath, titleText, viewer) {
    // Actualización del título de la página
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = `Archivo Blindado • Refractor • Número ${ejemplar.numero}`;
    
    // Portada principal
    const mainCoverImg = document.getElementById('mainCoverImg');
    if (mainCoverImg) {
        mainCoverImg.src = thumbnailPath;
        mainCoverImg.alt = titleText;
    }
    
    // Título de la ficha
    const fichaTitle = document.getElementById('fichaTitle');
    if (fichaTitle) fichaTitle.textContent = titleText;
    
    // Subtítulo (Fecha • Precio • Tirada)
    const subtitleEl = document.getElementById('fichaSubtitle');
    if (subtitleEl) {
        const subtitleParts = [];
        if (ejemplar.fecha_publicacion) subtitleParts.push(ejemplar.fecha_publicacion);
        if (ejemplar.precio) subtitleParts.push(ejemplar.precio);
        if (ejemplar.tirada) subtitleParts.push(`Tirada: ${ejemplar.tirada}`);
        subtitleEl.textContent = subtitleParts.join(' • ');
    }
    
    // Metadatos inferiores (Páginas • Peso/Tamaño)
    const bottomMeta = document.getElementById('fichaBottomMeta');
    if (bottomMeta) {
        const metaPagesText = ejemplar.paginas_procesadas === 1 ? '1 página' : `${ejemplar.paginas_procesadas} páginas`;
        bottomMeta.textContent = `${metaPagesText} • Tamaño: ${ejemplar.tamaño}`;
    }
    
    // Atributos de los botones de descarga
    const pdfUrl = `./pdf/N_Refractor_${strNum}.pdf`;
    const pdfSize = ejemplar.peso_pdf || '2.94 MB';
    const pdfTextSize = ejemplar.peso_pdf_texto || '156 KB';
    document.querySelectorAll('download-dropdown').forEach(dd => {
        dd.setAttribute('pdf-url', pdfUrl);
        dd.setAttribute('pdf-size', pdfSize);
        dd.setAttribute('pdf-text-size', pdfTextSize);
    });

    // Minificha inferior
    const miniThumbImg = document.getElementById('miniThumbImg');
    if (miniThumbImg) {
        miniThumbImg.src = thumbnailPath;
        miniThumbImg.alt = titleText;
    }
    const miniFichaTitle = document.getElementById('miniFichaTitle');
    if (miniFichaTitle) {
        miniFichaTitle.textContent = titleText;
    }

    // Previsualizaciones de páginas independientes
    const previewContainer = document.getElementById('fichaPagesPreview');
    if (previewContainer) {
        previewContainer.innerHTML = '';
        ejemplar.lista_paginas.forEach(page => {
            const box = document.createElement('div');
            box.className = 'page-preview-box';
            box.innerHTML = `
                <span class="preview-num">${page.pagina}</span>
                <svg class="preview-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 17.5L13.875 13.875M9.16667 6.66667V11.6667M6.66667 9.16667H11.6667M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            box.addEventListener('click', () => {
                if (viewer) viewer.open(`./pdf/N_Refractor_${strNum}.pdf#page=${page.pagina}`);
            });
            previewContainer.appendChild(box);
        });
    }

    // Eventos para abrir el visor general de PDF
    const defaultPdf = `./pdf/N_Refractor_${strNum}.pdf`;

    const mainThumb = document.getElementById('mainThumbWrapper');
    if (mainThumb && viewer) {
        mainThumb.onclick = () => viewer.open(defaultPdf);
    }

    const miniThumb = document.getElementById('miniThumbWrapper');
    if (miniThumb && viewer) {
        miniThumb.onclick = () => viewer.open(defaultPdf);
    }

    const btnMainDetail = document.getElementById('btnMainDetail');
    if (btnMainDetail && viewer) {
        btnMainDetail.onclick = () => viewer.open(defaultPdf);
    }

    const btnMiniDetail = document.getElementById('btnMiniDetail');
    if (btnMiniDetail && viewer) {
        btnMiniDetail.onclick = () => viewer.open(defaultPdf);
    }
}

/**
 * Renderiza los acordeones de artículos de la publicación
 */
function renderArticulos(allArticles, ejemplar, strNum, titleText, pubData, viewer) {
    const metaPagesText = ejemplar.paginas_procesadas === 1 ? '1 página' : `${ejemplar.paginas_procesadas} páginas`;

    // Encabezado de la sección de artículos
    const artsTitle = document.getElementById('artsTitle');
    if (artsTitle) artsTitle.textContent = titleText;

    const artsMeta = document.getElementById('artsMeta');
    if (artsMeta) {
        const artsText = ejemplar.articulos_extraidos === 1 ? '1 artículo' : `${ejemplar.articulos_extraidos} artículos`;
        artsMeta.textContent = `${metaPagesText} | ${artsText}`;
    }

    // Tags de autores
    const authorsContainer = document.getElementById('artsAuthors');
    if (authorsContainer) {
        authorsContainer.innerHTML = '';
        const maxVisible = 6;
        const visibleIds = ejemplar.autores_ids.slice(0, maxVisible);
        const remainingIds = ejemplar.autores_ids.slice(maxVisible);

        visibleIds.forEach(authId => {
            const authorObj = pubData.autores.find(a => a.id === authId);
            if (authorObj) {
                const tag = document.createElement('div');
                tag.className = 'author-tag';
                tag.textContent = authorObj.nombre;
                authorsContainer.appendChild(tag);
            }
        });

        if (remainingIds.length > 0) {
            const plusTag = document.createElement('div');
            plusTag.className = 'author-tag author-tag-plus';
            plusTag.innerHTML = `
                <span>+</span>
                <div class="author-tooltip">
                    ${remainingIds.map(id => {
                        const a = pubData.autores.find(obj => obj.id === id);
                        return a ? `<span>${a.nombre}</span>` : '';
                    }).join('')}
                </div>
            `;
            
            plusTag.addEventListener('click', (e) => {
                e.stopPropagation();
                plusTag.classList.toggle('is-open');
            });

            const tooltipEl = plusTag.querySelector('.author-tooltip');
            if (tooltipEl) {
                tooltipEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
            
            authorsContainer.appendChild(plusTag);

            // Cerrar tooltip al hacer clic fuera
            document.addEventListener('click', () => {
                plusTag.classList.remove('is-open');
            });
        }
    }

    // Asignar atributos a los componentes de selección de número si están disponibles
    const issueComp = document.getElementById('issueSelectorComponent');
    if (issueComp) issueComp.setAttribute('current', strNum);
    const miniIssueComp = document.getElementById('miniIssueSelectorComponent');
    if (miniIssueComp) miniIssueComp.setAttribute('current', strNum);

    // Filtrar y agrupar artículos por página
    const issueArticles = allArticles.filter(a => a.numero === strNum);
    const groups = {};
    issueArticles.forEach(art => {
        const key = `${titleText} | Página ${art.pagina}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(art);
    });

    const accordionContainer = document.getElementById('accordionContainer');
    if (accordionContainer) {
        accordionContainer.innerHTML = '';
        Object.keys(groups).forEach((key, index) => {
            const arts = groups[key];
            const accordion = document.createElement('app-accordion');
            accordion.setAttribute('header-text', key);
            if (index === 0) accordion.setAttribute('open', '');

            let articlesHtml = '';

            arts.forEach((art, i) => {
                let bodyContent = art.contenido;
                let subtitleHtml = '';
                
                // Extraer subtítulo si está marcado con asteriscos en la primera línea
                const paragraphs = bodyContent.split('\n\n').filter(p => p.trim());
                if (paragraphs.length > 0 && paragraphs[0].startsWith('*') && paragraphs[0].endsWith('*')) {
                    const subtitleText = paragraphs.shift().replace(/^\*|\*$/g, '');
                    subtitleHtml = `<h4 class="art-subtitle">${subtitleText}</h4>`;
                    bodyContent = paragraphs.join('\n\n');
                }

                const pdfUrl = `./pdf/N_Refractor_${strNum}.pdf#page=${art.pagina}`;
                const authorObj = pubData.autores.find(a => a.id === art.autor_id);
                const authorName = authorObj ? authorObj.nombre : art.autor;

                let place = '';
                let date = '';
                if (art.lugar_fecha_publicacion) {
                    const parts = art.lugar_fecha_publicacion.split(',');
                    if (parts.length > 1) {
                        place = parts[0].trim();
                        date = parts.slice(1).join(',').trim();
                    } else {
                        date = parts[0].trim();
                    }
                }

                let signatureHtml = '';
                if (art.id !== 'A_R_03_01_noche_real') {
                    if (strNum === '01' && index === 0 && i === 0 && authorName === 'Victor Nero') {
                        signatureHtml += '<p class="art-signature-intro">por los refractarios,</p>';
                    }
                    if (authorName) {
                        const nameDot = authorName.endsWith('.') ? '' : '.';
                        signatureHtml += `<p class="art-signature-name"><strong>${authorName}${nameDot}</strong></p>`;
                    }
                    if (place && date) {
                        signatureHtml += `<p class="art-signature-date">${place}. ${date}</p>`;
                    } else if (place) {
                        signatureHtml += `<p class="art-signature-date">${place}</p>`;
                    } else if (date) {
                        signatureHtml += `<p class="art-signature-date">${date}</p>`;
                    }
                }

                articlesHtml += `
                    <article class="pub-article">
                        <h3 class="art-title">${art.titulo}</h3>
                        ${subtitleHtml}
                        <div class="art-body">
                            ${bodyContent.split('\n\n').map(p => {
                                const cleanP = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                 .replace(/\*(.*?)\*/g, '<em>$1</em>');
                                return `<p class="art-paragraph">${cleanP}</p>`;
                            }).join('')}
                        </div>
                        <div class="art-signature">
                            ${signatureHtml}
                        </div>
                        <div class="art-tag-footer">
                            <div class="author-tag">Refractor ${strNum}</div>
                            ${authorName ? `<div class="author-tag">${authorName}</div>` : ''}
                            <button class="btn-text-red btn-ver-pdf" data-url="${pdfUrl}">
                                Ver artículo en PDF 
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>
                    </article>
                    ${i < arts.length - 1 ? '<div class="articles-separator"></div>' : ''}
                `;
            });

            accordion.innerHTML = articlesHtml;
            accordionContainer.appendChild(accordion);

            // Escuchar clics en los botones de "Ver artículo en PDF" dentro de este acordeón
            const btnsPdf = accordion.querySelectorAll('.btn-ver-pdf');
            btnsPdf.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (viewer) viewer.open(e.currentTarget.dataset.url);
                });
            });
        });
    }
}
