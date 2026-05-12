class AppHeader extends HTMLElement {
    connectedCallback() {
        this.render();
        
        const scrollHandler = () => {
            if (window.scrollY > 20) {
                this.classList.add('scrolled');
            } else {
                this.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', scrollHandler);
    }

    render() {
        const path = window.location.pathname;
        const page = path.split("/").pop() || 'index.html';
        
        const isActive = (p) => page === p ? 'active' : '';

        this.innerHTML = `
        <header class="navbar">
            <div class="nav-container">
                <a href="./index.html" class="logo">
                    <img src="./images/Logo.svg" alt="El Archivo Blindado Logo" class="logo-img">
                </a>
                <nav class="nav-links">
                    <a href="./index.html" class="${isActive('index.html')}">REFRACTOR</a>
                    <span class="dot">•</span>
                    <a href="./firmas.html" class="${isActive('firmas.html')}">FIRMAS</a>
                    <span class="dot">•</span>
                    <a href="./artefactos.html" class="${isActive('artefactos.html')}">ARTEFACTOS</a>
                    <span class="dot">•</span>
                    <a href="#">EL ARCHIVO BLINDADO</a>
                </nav>
                <button class="menu-btn">
                    <img src="./images/ico_menu.svg" alt="Menú" class="menu-img">
                </button>
            </div>
        </header>
        <div class="tablet-menu-overlay"></div>
        <div class="tablet-menu-bg">
            <nav class="tablet-nav-content">
                <img src="./images/Ilustration_navigation.svg" class="tablet-nav-illu" alt="">
                <a href="./index.html" class="${isActive('index.html')}">REFRACTOR</a>
                <a href="./firmas.html" class="${isActive('firmas.html')}">FIRMAS</a>
                <a href="./artefactos.html" class="${isActive('artefactos.html')}">ARTEFACTOS</a>
                <a href="#">EL ARCHIVO BLINDADO</a>
            </nav>
        </div>
        <img src="./images/Masking Tape_01_tablet.png" alt="" class="tape-01">
        <img src="./images/Masking Tape_02_tablet.png" alt="" class="tape-02">
        <img src="./images/Movil_Masking Tape - 02.png" alt="" class="tape-02-mobile">
        <img src="./images/Masking Tape_03_tablet.png" alt="" class="tape-03">
        `;

        const menuBtn = this.querySelector('.menu-btn');
        const menuImg = this.querySelector('.menu-img');

        const scrollBlocker = (e) => {
            e.preventDefault();
        };

        menuBtn.addEventListener('click', () => {
            const isOpen = this.classList.toggle('is-menu-open');
            menuImg.src = isOpen ? './images/ico_close.svg' : './images/ico_menu.svg';
            
            // Prevent scrolling when menu is open without breaking position: sticky in Safari
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                window.addEventListener('touchmove', scrollBlocker, { passive: false });
                window.addEventListener('wheel', scrollBlocker, { passive: false });
            } else {
                document.body.style.overflow = '';
                window.removeEventListener('touchmove', scrollBlocker);
                window.removeEventListener('wheel', scrollBlocker);
            }
        });
    }
}

class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <div class="footer-banner">
                <img src="./images/Image_Footer 1.png" alt="" class="footer-banner-img">
            </div><div class="footer-red-strip">
                <div class="container footer-strip-content">
                    <a href="./index.html" class="logo footer-logo">
                        <img src="./images/Logo_neg.svg" alt="El Archivo Blindado Logo" class="logo-img footer-logo-img">
                    </a>
                    <nav class="nav-links">
                        <a href="./index.html">REFRACTOR</a>
                        <span class="dot">•</span>
                        <a href="./firmas.html">FIRMAS</a>
                        <span class="dot">•</span>
                        <a href="./artefactos.html">ARTEFACTOS</a>
                        <span class="dot">•</span>
                        <a href="#">EL ARCHIVO BLINDADO</a>
                    </nav>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container text-left footer-bottom-content">
                    <span>El Archivo Blindado 2026</span>
                    <span class="footer-sep">&nbsp;|&nbsp;</span>
                    <a href="mailto:elarchivoblindado@gmail.com" class="footer-contact">Contacto</a>
                    <span class="footer-sep">&nbsp;|&nbsp;</span>
                    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" target="_blank">CC BY-NC-SA 4.0</a>
                </div>
            </div>
        </footer>
        `;

        const contactLink = this.querySelector('.footer-contact');
        if (contactLink) {
            contactLink.addEventListener('click', (e) => {
                const email = 'elarchivoblindado@gmail.com';
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = contactLink.textContent;
                    contactLink.textContent = '¡Email copiado!';
                    contactLink.classList.add('is-copied');
                    
                    setTimeout(() => {
                        contactLink.textContent = originalText;
                        contactLink.classList.remove('is-copied');
                    }, 2000);
                });
            });
        }

        const logoLink = this.querySelector('.footer-logo');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                const path = window.location.pathname;
                const isHome = path.endsWith('index.html') || path === '/' || path.endsWith('/');
                if (isHome) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }
}

class PublicationCard extends HTMLElement {
    connectedCallback() {
        const link = this.getAttribute('link') || '#';
        const image = this.getAttribute('image') || './images/Placeholder Refractor.jpg';
        const number = this.getAttribute('number') || '00';
        const date = this.getAttribute('date') || '—';
        const articles = this.getAttribute('articles') || '0';
        const datetime = this.getAttribute('datetime') || '';

        this.innerHTML = `
            <a href="${link}" class="pub-card">
                <div class="pub-cover-wrapper">
                    <img src="${image}" alt="Portada Edición ${number}" class="pub-cover" loading="lazy">
                    <img src="./images/Onmouse.svg" alt="" class="pub-hover-icon" loading="lazy">
                </div>
                <div class="pub-info">
                    <h2 class="pub-issue">${number}</h2>
                    <div class="pub-meta">
                        <time datetime="${datetime}">${date}</time>
                        <span>${articles} ${parseInt(articles) === 1 ? 'artículo' : 'artículos'}</span>
                    </div>
                </div>
            </a>
        `;
    }
}

class ArtefactCard extends HTMLElement {
    connectedCallback() {
        const image = this.getAttribute('image') || './images/Placeholder Refractor.jpg';
        const category = this.getAttribute('category') || 'Categoría';
        const description = this.getAttribute('description') || 'Descripción breve...';
        const pdfUrl = this.getAttribute('pdf-url') || './pdf/Artefactos_Refractor/Orsini.pdf';

        this.innerHTML = `
            <div class="pub-card artefact-card-link" style="cursor: pointer;">
                <div class="pub-cover-wrapper">
                    <img src="${image}" alt="${category}" class="pub-cover" loading="lazy">
                    <img src="./images/Onmouse_3.svg" alt="" class="pub-hover-icon" loading="lazy">
                </div>
                <div class="pub-info">
                    <h2 class="art-category">${category}</h2>
                    <p class="art-description">${description}</p>
                </div>
            </div>
        `;

        this.addEventListener('click', () => {
            const viewer = document.querySelector('pdf-viewer');
            if (viewer) {
                viewer.open(pdfUrl);
            }
        });
    }
}

class DownloadDropdown extends HTMLElement {
    static get observedAttributes() {
        return ['pdf-url', 'pdf-size', 'pdf-text-size'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const text = this.getAttribute('text') || 'Descargar Refractor';
        const btnClass = this.getAttribute('btn-class') || 'btn-download';
        const pdfUrl = this.getAttribute('pdf-url') || '#';
        const pdfSize = this.getAttribute('pdf-size') || '2.94 MB';
        const pdfTextSize = this.getAttribute('pdf-text-size') || '156 KB';

        this.innerHTML = `
        <div class="download-wrapper" id="downloadWrapper">
            <button class="${btnClass}" id="downloadBtn">
                ${text}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div class="dropdown-menu">
                <a href="${pdfUrl}" class="dropdown-item" download>
                    <img src="./images/ico_image.svg" class="item-icon" alt="">
                    <span class="item-text">Imágenes en PDF (${pdfSize})</span>
                </a>
                <a href="#" class="dropdown-item" id="downloadTextPdf">
                    <img src="./images/ico_text.svg" class="item-icon" alt="">
                    <span class="item-text">Texto en PDF (${pdfTextSize})</span>
                </a>
            </div>
        </div>
        `;

        const btn = this.querySelector('#downloadBtn');
        const wrapper = this.querySelector('#downloadWrapper');
        
        if (btn && wrapper) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                wrapper.classList.toggle('is-open');
            });

            document.addEventListener('click', () => {
                wrapper.classList.remove('is-open');
            });

            // Handle Text PDF Generation
            const textPdfLink = this.querySelector('#downloadTextPdf');
            if (textPdfLink) {
                textPdfLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.generateTextPdf();
                });
            }
        }
    }

    async generateTextPdf() {
        const urlParams = new URLSearchParams(window.location.search);
        const pubId = urlParams.get('id'); // Ej: N_Refractor_01
        if (!pubId) return;

        const numMatch = pubId.match(/\d+$/);
        const numStr = numMatch ? numMatch[0] : null;
        if (!numStr) return;

        try {
            // 1. Fetch articles data
            const response = await fetch('./data/articulos.json');
            const allArticles = await response.json();
            const articles = allArticles.filter(a => a.numero === numStr);

            if (articles.length === 0) {
                alert('No se encontraron artículos para este número.');
                return;
            }

            const title = document.getElementById('fichaTitle')?.textContent || `Refractor ${numStr}`;

            // Function to parse basic markdown
            const parseMD = (text) => {
                if (!text) return '';
                // Asterisks to italic
                let parsed = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
                // Double newline to paragraphs
                parsed = '<p>' + parsed.replace(/\n\n/g, '</p><p>') + '</p>';
                // Single newline to br
                parsed = parsed.replace(/\n/g, '<br>');
                return parsed;
            };

            // 2. Build HTML Content for the Print Window
            const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>${title} - Artículos</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: 'Times New Roman', Times, serif; 
            color: black; 
            background: white; 
            margin: 0; 
            padding: 0; 
            line-height: 1.6; 
        }
        .cover { 
            height: 100vh; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center; 
            text-align: center; 
            page-break-after: always; 
        }
        .cover h1 { 
            color: #e63946 !important; 
            font-family: 'Playfair Display', serif; 
            font-size: 60pt; 
            font-weight: 900; 
            text-transform: uppercase; 
            margin: 0; 
            line-height: 1; 
            /* Force exact colors in print */
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
        }
        .cover p { 
            font-family: sans-serif; 
            font-size: 14pt; 
            letter-spacing: 4px; 
            color: #666; 
            margin-top: 20px; 
        }
        .article { 
            page-break-inside: avoid; 
            margin-bottom: 50px; 
            padding-top: 20px;
        }
        .art-header { 
            border-bottom: 2px solid black; 
            margin-bottom: 15px; 
            padding-bottom: 5px; 
        }
        .art-title { 
            font-family: 'Playfair Display', serif; 
            font-size: 22pt; 
            font-weight: 900; 
            text-transform: uppercase; 
            color: black; 
            margin: 0; 
            line-height: 1.1;
        }
        .art-subtitle { 
            font-family: sans-serif; 
            font-size: 11pt; 
            font-weight: bold; 
            color: #444; 
            margin-top: 5px; 
        }
        .art-content { 
            font-size: 12pt; 
            text-align: justify; 
        }
        .art-content p {
            margin: 0 0 1em 0;
        }
        @media print {
            @page { 
                margin: 25mm; /* Safe margins for standard A4 */
            }
            body { 
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact; 
            }
        }
    </style>
</head>
<body>
    <div class="cover">
        <h1>${title}</h1>
        <p>ARCHIVO BLINDADO</p>
    </div>
    
    ${articles.map(art => `
        <div class="article">
            <div class="art-header">
                <h2 class="art-title">${art.titulo}</h2>
                <div class="art-subtitle">${art.autor}${art.lugar_fecha_publicacion ? ' &bull; ' + art.lugar_fecha_publicacion : ''}</div>
            </div>
            <div class="art-content">
                ${parseMD(art.contenido)}
            </div>
        </div>
    `).join('')}

    <script>
        // Wait for fonts to load before printing
        window.onload = () => {
            setTimeout(() => {
                window.print();
                // Opcional: cerrar la ventana tras imprimir
                // setTimeout(() => window.close(), 1000); 
            }, 500); // Give the browser a moment to render
        };
    </script>
</body>
</html>
            `;

            // 3. Open Native Print Window
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            const printWindow = window.open(url, '_blank');
            if (!printWindow) {
                alert('Por favor, permite las ventanas emergentes en tu navegador para generar el PDF.');
            }

        } catch (error) {
            console.error('Error al preparar el PDF:', error);
            alert('Hubo un error al generar el PDF.');
        }
    }
}

class AppQuote extends HTMLElement {
    async connectedCallback() {
        try {
            const response = await fetch('./data/publicacion.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const frases = data.frases || [];
            
            if (frases.length > 0) {
                const randomFrase = frases[Math.floor(Math.random() * frases.length)];
                this.render(
                    randomFrase.autor, 
                    randomFrase.texto_pre, 
                    randomFrase.texto_resaltado, 
                    randomFrase.texto_post
                );
            } else {
                this.renderFromAttributes();
            }
        } catch (error) {
            // Fallback to attributes if JSON fails
            this.renderFromAttributes();
        }
    }

    renderFromAttributes() {
        const author = this.getAttribute('author') || '';
        const text = this.getAttribute('text') || '';
        const highlight = this.getAttribute('highlight') || '';
        const textPost = this.getAttribute('text-post') || '';
        this.render(author, text, highlight, textPost);
    }

    render(author, text, highlight, textPost) {
        this.innerHTML = `
        <section class="quote-section">
            <div class="container quote-container">
                <blockquote>
                    <p>
                        ${text} 
                        ${highlight ? `<span class="highlight">${highlight}</span>` : ''} 
                        ${textPost}
                    </p>
                    ${author ? `<div class="author-tag-wrapper"><div class="author-tag">${author}</div></div>` : ''}
                </blockquote>
            </div>
        </section>
        `;
    }
}

class IssueSelector extends HTMLElement {
    connectedCallback() {
        const current = this.getAttribute('current') || '01';
        let options = '';
        for (let i = 1; i <= 8; i++) {
            const num = i.toString().padStart(2, '0');
            // In a real app, this would link to the actual page. For now, dummy links.
            options += `<a href="./ficha_numero.html" class="dropdown-item issue-item">${num}</a>`;
        }

        this.innerHTML = `
        <div class="download-wrapper issue-selector-wrapper" id="issueWrapper">
            <div class="hero-nav-selector hero-nav-item" id="issueBtn">
                <span>${current}</span>
                <img src="./images/ico_chevron-down.svg" alt="" class="hero-nav-chevron">
            </div>
            <div class="dropdown-menu issue-dropdown">
                ${options}
            </div>
        </div>
        `;

        const btn = this.querySelector('#issueBtn');
        const wrapper = this.querySelector('#issueWrapper');
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('is-open');
        });

        document.addEventListener('click', () => {
            wrapper.classList.remove('is-open');
        });
    }
}

class AppAccordion extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('header-text') || '';
        const innerContent = this.innerHTML;
        
        this.innerHTML = `
        <div class="accordion-wrapper is-open">
            <div class="accordion-trigger">
                <span class="accordion-trigger-text">${title}</span>
                <div class="accordion-icon-box">
                    <img src="./images/ico_arrow-narrow-down.svg" class="accordion-arrow" alt="">
                </div>
            </div>
            <div class="accordion-body">
                ${innerContent}
            </div>
        </div>
        `;

        const trigger = this.querySelector('.accordion-trigger');
        const wrapper = this.querySelector('.accordion-wrapper');
        
        trigger.addEventListener('click', () => {
            wrapper.classList.toggle('is-open');
        });
    }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
customElements.define('pub-card', PublicationCard);
customElements.define('artefact-card', ArtefactCard);
customElements.define('download-dropdown', DownloadDropdown);
customElements.define('issue-selector', IssueSelector);
customElements.define('app-accordion', AppAccordion);
customElements.define('app-quote', AppQuote);

class PdfViewer extends HTMLElement {
    constructor() {
        super();
        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.scale = 1.0;
        this.pagesContainer = null;
        this.renderTasks = [];
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="pdf-modal-overlay" id="pdfModal">
                
                <button id="top_close_pdf" class="pdf-top-close-btn" aria-label="Cerrar visor" data-tooltip="Cerrar visor">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <button id="prev" class="pdf-nav-btn pdf-nav-left" aria-label="Anterior" data-tooltip="Anterior">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button id="next" class="pdf-nav-btn pdf-nav-right" aria-label="Siguiente" data-tooltip="Siguiente">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                <div class="pdf-canvas-container" id="canvasContainer">
                    <div id="pdfLoading" class="pdf-loading-spinner">
                        <div class="spinner"></div>
                    </div>
                    <div id="pages_container" class="pdf-pages-container"></div>
                    <div id="pdfError" class="pdf-error-container" style="display: none;">
                        <div class="pdf-error-message">
                            Error al cargar el documento. Por favor, inténtelo de nuevo más tarde o contacte con soporte.
                        </div>
                    </div>
                </div>

                <div class="pdf-floating-toolbar">
                    <div class="pdf-page-info">
                        <span id="page_num">0</span>/<span id="page_count">0</span>
                    </div>

                    <button id="zoom_out" class="pdf-icon-btn priority-item" aria-label="Alejar" data-tooltip="Alejar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button>
                    
                    <span id="zoom_percent" class="pdf-zoom-info priority-item" data-tooltip="Zoom actual">100%</span>

                    <button id="zoom_in" class="pdf-icon-btn priority-item" aria-label="Acercar" data-tooltip="Acercar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button>

                    <button id="zoom_reset" class="pdf-icon-btn priority-item" aria-label="Restablecer zoom" data-tooltip="Restablecer zoom">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>
                    </button>
                    
                    <button id="fullscreen_pdf" class="pdf-icon-btn priority-item" aria-label="Pantalla completa" data-tooltip="Pantalla completa">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                    </button>
                    
                    <button id="share_pdf" class="pdf-icon-btn priority-item" aria-label="Compartir" data-tooltip="Compartir">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    </button>
                    
                    <button id="print_pdf" class="pdf-icon-btn priority-item" aria-label="Imprimir" data-tooltip="Imprimir">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    </button>

                    <button id="download_pdf" class="pdf-icon-btn priority-item" aria-label="Descargar PDF" data-tooltip="Descargar PDF">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                    
                    <button id="overflow_pdf_btn" class="pdf-icon-btn pdf-overflow-btn" aria-label="Más opciones" data-tooltip="Más opciones" style="display: none;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"></circle><circle cx="19" cy="12" r="1.5"></circle><circle cx="5" cy="12" r="1.5"></circle></svg>
                    </button>
                    <div class="pdf-xtra-tools" id="pdfXtraTools"></div>
                    
                    <button id="close_pdf" class="pdf-icon-btn close-btn" aria-label="Cerrar visor" data-tooltip="Cerrar visor">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            </div>
        `;

        this.modal = this.querySelector('#pdfModal');
        this.canvasContainer = this.querySelector('#canvasContainer');
        this.pagesContainer = this.querySelector('#pages_container');
        this.loadingSpinner = this.querySelector('#pdfLoading');
        this.errorContainer = this.querySelector('#pdfError');
        
        this._keyHandler = (e) => {
            if (!this.modal.classList.contains('is-open')) return;
            if (e.key === 'Escape') this.close();
        };

        // --- Drag to Scroll (Manita) ---
        let isDragging = false;
        let startX, startY;
        let scrollLeft, scrollTop;

        const startDragging = (e) => {
            // Only left click or touch
            if (e.button !== undefined && e.button !== 0) return;
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            isDragging = true;
            this.canvasContainer.style.cursor = 'grabbing';
            startX = clientX;
            startY = clientY;
            scrollLeft = this.canvasContainer.scrollLeft;
            scrollTop = this.canvasContainer.scrollTop;
        };

        const stopDragging = () => {
            isDragging = false;
            this.canvasContainer.style.cursor = 'grab';
        };

        const moveDragging = (e) => {
            if (!isDragging) return;
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const walkX = (clientX - startX); 
            const walkY = (clientY - startY);
            
            this.canvasContainer.scrollLeft = scrollLeft - walkX;
            this.canvasContainer.scrollTop = scrollTop - walkY;
        };

        this.canvasContainer.style.cursor = 'grab';
        this.canvasContainer.addEventListener('mousedown', startDragging);
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('mousemove', moveDragging);

        // --- Touch Support ---
        let initialPinchDistance = 0;
        let initialPinchScale = 1;

        this.canvasContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startDragging(e);
            } else if (e.touches.length === 2) {
                isDragging = false;
                initialPinchDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                initialPinchScale = this.scale;
            }
        }, { passive: false });

        this.canvasContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1 && isDragging) {
                moveDragging(e);
            } else if (e.touches.length === 2 && initialPinchDistance > 0) {
                e.preventDefault();
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const factor = currentDistance / initialPinchDistance;
                const newScale = Math.min(Math.max(initialPinchScale * factor, 0.4), 4.0);
                
                if (Math.abs(newScale - this.scale) > 0.05) {
                    this.scale = newScale;
                    this.renderAllPages();
                }
            }
        }, { passive: false });

        this.canvasContainer.addEventListener('touchend', () => {
            initialPinchDistance = 0;
            stopDragging();
        });

        // --- Wheel Zoom ---
        this.canvasContainer.addEventListener('wheel', (e) => {
            if (!this.modal.classList.contains('is-open')) return;
            
            // To allow vertical scroll with wheel but zoom with Ctrl (standard UX)
            // However, user said "mantener zoom con rueda".
            // If they have a scrollbar for pages, I'll keep wheel for zoom as before.
            e.preventDefault();
            if (e.deltaY < 0) this.onZoomIn();
            else this.onZoomOut();
        }, { passive: false });

        // --- Pinch to Zoom ---
        let initialDistance = null;
        let initialScale = null;
        let currentPinchScale = 1.0;

        this.canvasContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2 && this.modal.classList.contains('is-open')) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                initialDistance = Math.hypot(dx, dy);
                initialScale = this.scale;
                currentPinchScale = 1.0;
                this.pagesContainer.style.transformOrigin = 'center top';
            }
        }, { passive: false });

        this.canvasContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && initialDistance !== null && this.modal.classList.contains('is-open')) {
                e.preventDefault(); // Detiene el pinch-zoom nativo del navegador
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const currentDistance = Math.hypot(dx, dy);
                
                currentPinchScale = currentDistance / initialDistance;
                let potentialScale = initialScale * currentPinchScale;
                
                if (potentialScale > 1.5) currentPinchScale = 1.5 / initialScale;
                if (potentialScale < 0.4) currentPinchScale = 0.4 / initialScale;
                
                this.pagesContainer.style.transform = `scale(${currentPinchScale})`;
            }
        }, { passive: false });

        this.canvasContainer.addEventListener('touchend', (e) => {
            if (initialDistance !== null && e.touches.length < 2) {
                initialDistance = null;
                this.pagesContainer.style.transform = '';
                
                let newScale = initialScale * currentPinchScale;
                if (newScale > 1.5) newScale = 1.5;
                if (newScale < 0.4) newScale = 0.4;
                
                if (Math.abs(newScale - initialScale) > 0.05) {
                    this.scale = newScale;
                    this.renderAllPages();
                }
            }
        });

        this.canvasContainer.addEventListener('scroll', () => {
            if (!this.pdfDoc) return;
            const scrollPos = this.canvasContainer.scrollTop;
            const containerHeight = this.canvasContainer.clientHeight;
            const wrappers = this.pagesContainer.querySelectorAll('.pdf-page-wrapper');
            let currentPage = 1;
            wrappers.forEach((wrapper, index) => {
                const rect = wrapper.getBoundingClientRect();
                const containerRect = this.canvasContainer.getBoundingClientRect();
                if (rect.top <= containerRect.top + containerHeight / 2) {
                    currentPage = index + 1;
                }
            });
            this.pageNum = currentPage;
            this.querySelector('#page_num').textContent = this.pageNum;
        });

        this.querySelector('#prev').addEventListener('click', () => this.scrollToPage(this.pageNum - 1));
        this.querySelector('#next').addEventListener('click', () => this.scrollToPage(this.pageNum + 1));
        this.querySelector('#zoom_in').addEventListener('click', () => this.onZoomIn());
        this.querySelector('#zoom_out').addEventListener('click', () => this.onZoomOut());
        this.querySelector('#zoom_reset').addEventListener('click', () => this.onZoomReset());
        this.querySelector('#fullscreen_pdf').addEventListener('click', () => this.toggleFullscreen());
        this.querySelector('#share_pdf').addEventListener('click', () => this.onShare());
        this.querySelector('#print_pdf').addEventListener('click', () => this.onPrint());
        this.querySelector('#download_pdf').addEventListener('click', () => this.onDownload());
        this.querySelector('#close_pdf').addEventListener('click', () => this.close());
        this.querySelector('#top_close_pdf').addEventListener('click', () => this.close());
        
        this.xtraToolsMenu = this.querySelector('#pdfXtraTools');
        this.overflowBtn = this.querySelector('#overflow_pdf_btn');
        this.overflowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.xtraToolsMenu.classList.toggle('is-open');
        });
        
        this.modal.addEventListener('click', (e) => {
            if (!this.xtraToolsMenu.contains(e.target) && !this.overflowBtn.contains(e.target)) {
                this.xtraToolsMenu.classList.remove('is-open');
            }
        });
        
        this.adjustToolbar = () => {
             if (!this.modal || !this.modal.classList.contains('is-open')) return;
             const toolbar = this.querySelector('.pdf-floating-toolbar');
             if (!toolbar) return;
             toolbar.style.width = 'max-content';
             toolbar.style.maxWidth = 'none';
             if (this.xtraToolsMenu) {
                 while(this.xtraToolsMenu.children.length > 0) {
                     toolbar.insertBefore(this.xtraToolsMenu.firstElementChild, this.overflowBtn);
                 }
             }
             if (this.overflowBtn) this.overflowBtn.style.display = 'none';
             if (this.xtraToolsMenu) this.xtraToolsMenu.classList.remove('is-open');
             const safeW = this.modal.clientWidth - 48; 
             if (toolbar.offsetWidth === 0) {
                 requestAnimationFrame(() => this.adjustToolbar());
                 return;
             }
             let cand = this.overflowBtn ? this.overflowBtn.previousElementSibling : null;
             while (cand && cand.classList.contains('priority-item') && toolbar.offsetWidth > safeW) {
                 this.xtraToolsMenu.prepend(cand);
                 cand = this.overflowBtn.previousElementSibling;
             }
             if (this.xtraToolsMenu && this.xtraToolsMenu.children.length > 0) {
                 if (this.overflowBtn) this.overflowBtn.style.display = 'inline-flex';
             }
             toolbar.style.width = ''; 
             toolbar.style.maxWidth = 'calc(100% - 24px)';
        };
        
        window.addEventListener('resize', this.adjustToolbar);
    }

    disconnectedCallback() {
        if (this.adjustToolbar) {
            window.removeEventListener('resize', this.adjustToolbar);
        }
    }

    scrollToPage(num, behavior = 'smooth') {
        if (num < 1 || num > this.pdfDoc.numPages) return;
        const target = this.pagesContainer.querySelector(`[data-page-num="${num}"]`);
        if (target) {
            target.scrollIntoView({ behavior: behavior, block: 'start' });
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.modal.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
    }

    onShare() {
        if (navigator.share) {
            navigator.share({ title: 'Archivo Blindado PDF', url: window.location.href }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Enlace copiado al portapapeles'))
                .catch(() => alert('No soportado'));
        }
    }

    onPrint() {
        if (!this.currentPdfUrl) return;
        let iframe = document.getElementById('pdf-print-iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'pdf-print-iframe';
            iframe.style.position = 'absolute'; iframe.style.width = '0'; iframe.style.height = '0'; iframe.style.border = 'none';
            document.body.appendChild(iframe);
        }
        iframe.src = this.currentPdfUrl;
        iframe.onload = () => { setTimeout(() => { iframe.contentWindow.focus(); iframe.contentWindow.print(); }, 500); };
    }

    onDownload() {
        if (!this.currentPdfUrl) return;
        const a = document.createElement('a');
        a.href = this.currentPdfUrl;
        a.download = this.currentPdfUrl.split('/').pop() || 'documento.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async ensurePdfLib() {
        if (typeof pdfjsLib !== 'undefined') return;
        if (window._pdfjsLoading) return window._pdfjsLoading;
        window._pdfjsLoading = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = './js/vendor/pdf.min.js';
            script.onload = () => {
                pdfjsLib.GlobalWorkerOptions.workerSrc = './js/vendor/pdf.worker.min.js';
                resolve();
            };
            script.onerror = (err) => { window._pdfjsLoading = null; reject(err); };
            document.head.appendChild(script);
        });
        return window._pdfjsLoading;
    }

    async open(url) {
        let actualUrl = url;
        let initialPage = 1;
        if (url.includes('#page=')) {
            const parts = url.split('#page=');
            actualUrl = parts[0];
            initialPage = parseInt(parts[1], 10) || 1;
        }

        this.currentPdfUrl = actualUrl;
        this.modal.classList.add('is-open');
        this.errorContainer.style.display = 'none';
        this.pagesContainer.style.display = 'flex';
        this.initialScaleCalculated = false;

        window.addEventListener('keydown', this._keyHandler);

        this.lockedScrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.lockedScrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden'; 
        document.documentElement.style.overflow = 'hidden'; 
        
        try {
            await this.ensurePdfLib();
            const loadingTask = pdfjsLib.getDocument(actualUrl);
            const pdfDoc = await loadingTask.promise;
            this.pdfDoc = pdfDoc;
            this.querySelector('#page_count').textContent = this.pdfDoc.numPages;
            
            // Show loading initially
            if (this.loadingSpinner) this.loadingSpinner.style.display = 'flex';
            this.pagesContainer.style.opacity = '0';

            await this.renderAllPages(initialPage);
            
            this.pagesContainer.style.opacity = '1';
            if (this.loadingSpinner) this.loadingSpinner.style.display = 'none';

            this.adjustToolbar();
            setTimeout(() => this.adjustToolbar(), 150);
            setTimeout(() => this.adjustToolbar(), 350);
        } catch (error) {
            console.error('Error:', error);
            if (this.loadingSpinner) this.loadingSpinner.style.display = 'none';
            this.errorContainer.style.display = 'block';
            this.pagesContainer.style.display = 'none';
        }
    }

    async renderAllPages(initialPage = 1) {
        this.pagesContainer.innerHTML = '';
        this.renderTasks.forEach(t => t.cancel());
        this.renderTasks = [];

        // 1. Get first page to calculate scale and dimensions
        const firstPage = await this.pdfDoc.getPage(1);
        const unscaledViewport = firstPage.getViewport({scale: 1.0});
        
        if (!this.initialScaleCalculated) {
            let safeWidth = this.canvasContainer.clientWidth - 80;
            if (!safeWidth || safeWidth <= 0) safeWidth = window.innerWidth - 80;
            
            if (safeWidth > 0 && safeWidth < unscaledViewport.width) {
                this.scale = safeWidth / unscaledViewport.width;
            } else {
                this.scale = 1.0;
            }
            this.initialScaleCalculated = true;
        }

        const viewport1 = firstPage.getViewport({scale: this.scale});
        const estHeight = viewport1.height;

        // 2. Create ALL wrappers immediately with estimated height
        for (let i = 1; i <= this.pdfDoc.numPages; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'pdf-page-wrapper';
            wrapper.setAttribute('data-page-num', i);
            wrapper.style.minHeight = `${estHeight}px`;
            wrapper.style.width = `${viewport1.width}px`;
            this.pagesContainer.appendChild(wrapper);
        }

        // 3. Scroll immediately to target page (behavior 'auto' for direct jump)
        if (initialPage > 1) {
            this.scrollToPage(initialPage, 'auto');
        } else {
            this.canvasContainer.scrollTop = 0;
        }

        // 4. Start rendering loop (we don't await the whole thing if we want to show the first page fast)
        // But for consistency with current code, we await each page render
        for (let i = 1; i <= this.pdfDoc.numPages; i++) {
            const wrapper = this.pagesContainer.querySelector(`[data-page-num="${i}"]`);
            const canvas = document.createElement('canvas');
            wrapper.appendChild(canvas);

            const page = await this.pdfDoc.getPage(i);
            const viewport = page.getViewport({scale: this.scale});
            
            // Adjust wrapper height if the actual page differs from page 1
            wrapper.style.minHeight = `${viewport.height}px`;
            wrapper.style.width = `${viewport.width}px`;
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            const renderTask = page.render(renderContext);
            this.renderTasks.push(renderTask);
            
            // Optional: await renderTask.promise if you want sequential loading
            // Currently they start rendering as canvases are created
        }
        
        this.updateZoomDisplay();
    }

    close() {
        this.modal.classList.remove('is-open');
        window.removeEventListener('keydown', this._keyHandler);
        this.renderTasks.forEach(t => t.cancel());

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.scrollTo({ top: this.lockedScrollY, behavior: 'instant' });
    }

    onZoomIn() {
        if (this.scale >= 1.5) return;
        this.scale += 0.2;
        if (this.scale > 1.5) this.scale = 1.5;
        this.renderAllPages();
    }

    onZoomOut() {
        if (this.scale <= 0.4) return;
        this.scale -= 0.2;
        this.renderAllPages();
    }

    onZoomReset() {
        this.initialScaleCalculated = false;
        this.renderAllPages();
    }

    updateZoomDisplay() {
        const percent = Math.round(this.scale * 100);
        const display = this.querySelector('#zoom_percent');
        if (display) display.textContent = `${percent}%`;
    }
}

customElements.define('pdf-viewer', PdfViewer);
