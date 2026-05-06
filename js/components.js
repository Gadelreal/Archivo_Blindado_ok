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
                    <a href="#" class="logo footer-logo">
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
                    <img src="${image}" alt="Portada Edición ${number}" class="pub-cover">
                    <img src="./images/Onmouse.svg" alt="" class="pub-hover-icon">
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
                    <img src="${image}" alt="${category}" class="pub-cover">
                    <img src="./images/Onmouse_3.svg" alt="" class="pub-hover-icon">
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
    connectedCallback() {
        const text = this.getAttribute('text') || 'Descargar Refractor';
        const btnClass = this.getAttribute('btn-class') || 'btn-download';

        this.innerHTML = `
        <div class="download-wrapper" id="downloadWrapper">
            <button class="${btnClass}" id="downloadBtn">
                ${text}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div class="dropdown-menu">
                <a href="#" class="dropdown-item">
                    <img src="./images/ico_image.svg" class="item-icon" alt="">
                    <span class="item-text">Imágenes en PDF (24mb)</span>
                </a>
                <a href="#" class="dropdown-item">
                    <img src="./images/ico_text.svg" class="item-icon" alt="">
                    <span class="item-text">Texto en PDF (48 Kb.)</span>
                </a>
            </div>
        </div>
        `;

        const btn = this.querySelector('#downloadBtn');
        const wrapper = this.querySelector('#downloadWrapper');
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('is-open');
        });

        // Close when clicking outside
        document.addEventListener('click', () => {
            wrapper.classList.remove('is-open');
        });
    }
}

class AppQuote extends HTMLElement {
    connectedCallback() {
        const author = this.getAttribute('author') || '';
        const text = this.getAttribute('text') || '';
        const highlight = this.getAttribute('highlight') || '';
        const textPost = this.getAttribute('text-post') || '';
        
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
        this.errorContainer = this.querySelector('#pdfError');
        
        this._keyHandler = (e) => {
            if (!this.modal.classList.contains('is-open')) return;
            if (e.key === 'Escape') this.close();
        };

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

    scrollToPage(num) {
        if (num < 1 || num > this.pdfDoc.numPages) return;
        const target = this.pagesContainer.querySelector(`[data-page-num="${num}"]`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            
            await this.renderAllPages();
            
            if (initialPage > 1) {
                setTimeout(() => this.scrollToPage(initialPage), 100);
            } else {
                this.canvasContainer.scrollTop = 0;
            }

            this.adjustToolbar();
            setTimeout(() => this.adjustToolbar(), 150);
            setTimeout(() => this.adjustToolbar(), 350);
        } catch (error) {
            console.error('Error:', error);
            this.errorContainer.style.display = 'block';
            this.pagesContainer.style.display = 'none';
        }
    }

    async renderAllPages() {
        this.pagesContainer.innerHTML = '';
        this.renderTasks.forEach(t => t.cancel());
        this.renderTasks = [];

        const firstPage = await this.pdfDoc.getPage(1);
        if (!this.initialScaleCalculated) {
            const unscaledViewport = firstPage.getViewport({scale: 1.0});
            let safeWidth = this.canvasContainer.clientWidth - 80;
            if (!safeWidth || safeWidth <= 0) safeWidth = window.innerWidth - 80;
            
            if (safeWidth > 0 && safeWidth < unscaledViewport.width) {
                this.scale = safeWidth / unscaledViewport.width;
            } else {
                this.scale = 1.0;
            }
            this.initialScaleCalculated = true;
        }

        for (let i = 1; i <= this.pdfDoc.numPages; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'pdf-page-wrapper';
            wrapper.setAttribute('data-page-num', i);
            
            const canvas = document.createElement('canvas');
            wrapper.appendChild(canvas);
            this.pagesContainer.appendChild(wrapper);

            const page = await this.pdfDoc.getPage(i);
            const viewport = page.getViewport({scale: this.scale});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            const renderTask = page.render(renderContext);
            this.renderTasks.push(renderTask);
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
        if (this.scale >= 4.0) return;
        this.scale += 0.2;
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
