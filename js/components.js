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
        this.innerHTML = `
        <header class="navbar">
            <div class="nav-container">
                <a href="./index.html" class="logo">
                    <img src="./images/Logo.svg" alt="El Archivo Blindado Logo" class="logo-img">
                </a>
                <nav class="nav-links">
                    <a href="#" class="active">REFRACTOR</a>
                    <span class="dot">•</span>
                    <a href="#">FIRMAS</a>
                    <span class="dot">•</span>
                    <a href="#">ARTEFACTOS</a>
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
                <a href="#" class="active">REFRACTOR</a>
                <a href="#">FIRMAS</a>
                <a href="#">ARTEFACTOS</a>
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

        menuBtn.addEventListener('click', () => {
            const isOpen = this.classList.toggle('is-menu-open');
            menuImg.src = isOpen ? './images/ico_close.svg' : './images/ico_menu.svg';
            
            // Prevent scrolling when menu is open
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
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
                        <a href="#">REFRACTOR</a>
                        <span class="dot">•</span>
                        <a href="#">FIRMAS</a>
                        <span class="dot">•</span>
                        <a href="#">ARTEFACTOS</a>
                        <span class="dot">•</span>
                        <a href="#">EL ARCHIVO BLINDADO</a>
                    </nav>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container text-left footer-bottom-content">
                    <span>El Archivo Blindado 2026</span>
                    <span class="footer-sep">&nbsp;|&nbsp;</span>
                    <a href="#">Contacto</a>
                    <span class="footer-sep">&nbsp;|&nbsp;</span>
                    <a href="#">Creative commons</a>
                    <span class="footer-sep">&nbsp;|&nbsp;</span>
                    <a href="#">Lorem ipsum</a>
                </div>
            </div>
        </footer>
        `;
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
                        <span>${articles} artículos</span>
                    </div>
                </div>
            </a>
        `;
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
                    ${author ? `<cite>${author}</cite>` : ''}
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
        const title = this.getAttribute('title') || '';
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
        this.canvas = null;
        this.ctx = null;
        this.renderTask = null;
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="pdf-modal-overlay" id="pdfModal">
                
                <button id="top_close_pdf" class="pdf-top-close-btn" aria-label="Cerrar visor">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <button id="prev" class="pdf-nav-btn pdf-nav-left" aria-label="Anterior">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button id="next" class="pdf-nav-btn pdf-nav-right" aria-label="Siguiente">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                <div class="pdf-canvas-container" id="canvasContainer">
                    <canvas id="pdf_canvas"></canvas>
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
                    


                    <button id="zoom_in" class="pdf-icon-btn priority-item" aria-label="Acercar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button>
                    <button id="zoom_out" class="pdf-icon-btn priority-item" aria-label="Alejar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button>
                    
                    <button id="fullscreen_pdf" class="pdf-icon-btn priority-item" aria-label="Pantalla completa">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                    </button>
                    
                    <button id="share_pdf" class="pdf-icon-btn priority-item" aria-label="Compartir">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    </button>
                    
                    <button id="print_pdf" class="pdf-icon-btn priority-item" aria-label="Imprimir">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    </button>

                    <button id="download_pdf" class="pdf-icon-btn priority-item" aria-label="Descargar PDF">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                    
                    <button id="overflow_pdf_btn" class="pdf-icon-btn pdf-overflow-btn" aria-label="Más opciones" style="display: none;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"></circle><circle cx="19" cy="12" r="1.5"></circle><circle cx="5" cy="12" r="1.5"></circle></svg>
                    </button>
                    <div class="pdf-xtra-tools" id="pdfXtraTools"></div>
                    
                    <button id="close_pdf" class="pdf-icon-btn close-btn" aria-label="Cerrar visor">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                </div>
            </div>
        `;

        this.modal = this.querySelector('#pdfModal');
        this.canvas = this.querySelector('#pdf_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasContainer = this.querySelector('#canvasContainer');
        this.errorContainer = this.querySelector('#pdfError');
        
        this._keyHandler = (e) => {
            if (!this.modal.classList.contains('is-open')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowRight') this.onNextPage();
            if (e.key === 'ArrowLeft') this.onPrevPage();
        };
        // --- Drag / Panning logic ---
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;
        this.canvasContainer.style.cursor = 'grab';

        this.canvasContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            this.canvasContainer.style.cursor = 'grabbing';
            startX = e.pageX - this.canvasContainer.offsetLeft;
            startY = e.pageY - this.canvasContainer.offsetTop;
            scrollLeft = this.canvasContainer.scrollLeft;
            scrollTop = this.canvasContainer.scrollTop;
        });
        this.canvasContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            this.canvasContainer.style.cursor = 'grab';
        });
        this.canvasContainer.addEventListener('mouseup', () => {
            isDragging = false;
            this.canvasContainer.style.cursor = 'grab';
        });
        this.canvasContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.canvasContainer.offsetLeft;
            const y = e.pageY - this.canvasContainer.offsetTop;
            this.canvasContainer.scrollLeft = scrollLeft - (x - startX);
            this.canvasContainer.scrollTop = scrollTop - (y - startY);
        });
        // ----------------------------

        
        this.querySelector('#prev').addEventListener('click', () => this.onPrevPage());
        this.querySelector('#next').addEventListener('click', () => this.onNextPage());
        this.querySelector('#zoom_in').addEventListener('click', () => this.onZoomIn());
        this.querySelector('#zoom_out').addEventListener('click', () => this.onZoomOut());
        this.querySelector('#fullscreen_pdf').addEventListener('click', () => this.toggleFullscreen());
        this.querySelector('#share_pdf').addEventListener('click', () => this.onShare());
        this.querySelector('#print_pdf').addEventListener('click', () => this.onPrint());
        this.querySelector('#download_pdf').addEventListener('click', () => this.onDownload());
        this.querySelector('#close_pdf').addEventListener('click', () => this.close());
        this.querySelector('#top_close_pdf').addEventListener('click', () => this.close());
        
        // Overflow menu toggle
        this.xtraToolsMenu = this.querySelector('#pdfXtraTools');
        this.overflowBtn = this.querySelector('#overflow_pdf_btn');
        this.overflowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.xtraToolsMenu.classList.toggle('is-open');
        });
        
        // Cierra el menu si clicas en cualquier lugar que no sea el menu o boton
        this.modal.addEventListener('click', (e) => {
            if (!this.xtraToolsMenu.contains(e.target) && !this.overflowBtn.contains(e.target)) {
                this.xtraToolsMenu.classList.remove('is-open');
            }
        });
        
        // --- Dynamic Toolbar Resize Logic ---
        this.adjustToolbar = () => {
             if (!this.modal.classList.contains('is-open')) return;
             
             // Reset scale on major resize (orientation change)
             this.initialScaleCalculated = false;
             if (this.pdfDoc) this.queueRenderPage(this.pageNum);

             const toolbar = this.querySelector('.pdf-floating-toolbar');
             // Mover todos los items del cajón a la barra primero para calcular el ancho real
             while(this.xtraToolsMenu.children.length > 0) {
                 toolbar.insertBefore(this.xtraToolsMenu.firstElementChild, this.overflowBtn);
             }
             
             this.overflowBtn.style.display = 'none';
             this.xtraToolsMenu.classList.remove('is-open');
             
             const safeW = window.innerWidth - 32; 
             
             // Escanear priority-items de atras hacia adelante si no caben
             let cand = this.overflowBtn.previousElementSibling;
             while(cand && cand.classList.contains('priority-item') && toolbar.offsetWidth > safeW) {
                 this.xtraToolsMenu.prepend(cand);
                 cand = this.overflowBtn.previousElementSibling;
             }

             // Solo mostrar el botón de puntos si realmente hay algo dentro del menú
             if (this.xtraToolsMenu.children.length > 0) {
                 this.overflowBtn.style.display = 'inline-flex';
             }
        };
        
        window.addEventListener('resize', this.adjustToolbar);

        // --- Touch Support for Panning ---
        this.canvasContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.pageX - this.canvasContainer.offsetLeft;
            startY = touch.pageY - this.canvasContainer.offsetTop;
            scrollLeft = this.canvasContainer.scrollLeft;
            scrollTop = this.canvasContainer.scrollTop;
        }, { passive: false });

        this.canvasContainer.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const touch = e.touches[0];
            const x = touch.pageX - this.canvasContainer.offsetLeft;
            const y = touch.pageY - this.canvasContainer.offsetTop;
            const walkX = x - startX;
            const walkY = y - startY;
            this.canvasContainer.scrollLeft = scrollLeft - walkX;
            this.canvasContainer.scrollTop = scrollTop - walkY;
            e.preventDefault();
        }, { passive: false });

        this.canvasContainer.addEventListener('touchend', () => {
            isDragging = false;
        });

        // --- Wheel Zoom Support ---
        this.canvasContainer.addEventListener('wheel', (e) => {
            // Solo actuar si el modal está abierto
            if (!this.modal.classList.contains('is-open')) return;
            
            e.preventDefault();
            if (e.deltaY < 0) {
                this.onZoomIn();
            } else {
                this.onZoomOut();
            }
        }, { passive: false });
    }

    disconnectedCallback() {
        if (this.adjustToolbar) {
            window.removeEventListener('resize', this.adjustToolbar);
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.modal.requestFullscreen().catch((err) => {
                console.error('Error intentando entrar en pantalla completa:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    onShare() {
        if (navigator.share) {
            navigator.share({
                title: 'Archivo Blindado PDF',
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback: copiar url al portapapeles
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Enlace copiado al portapapeles'))
                .catch(() => alert('El dispositivo no soporta compartir nativo'));
        }
    }

    onPrint() {
        if (!this.currentPdfUrl) return;
        
        let iframe = document.getElementById('pdf-print-iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'pdf-print-iframe';
            iframe.style.position = 'absolute';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);
        }
        iframe.src = this.currentPdfUrl;
        
        iframe.onload = function() {
            setTimeout(() => {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            }, 500); // Dar un poco de tiempo a que renderice si es directamente un PDF
        };
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

    open(url) {
        this.currentPdfUrl = url;
        this.modal.classList.add('is-open');
        this.errorContainer.style.display = 'none';
        this.canvas.style.display = 'block';
        this.initialScaleCalculated = false; // Forzar recalibrado al abrir

        window.addEventListener('keydown', this._keyHandler);

        this.lockedScrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.lockedScrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden'; 
        
        if (typeof pdfjsLib === 'undefined') {
            console.error('PDF.js no está cargado correctamente');
            return;
        }

        // Configuración oficial del worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = './js/vendor/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((pdfDoc_) => {
            this.pdfDoc = pdfDoc_;
            this.querySelector('#page_count').textContent = this.pdfDoc.numPages;
            this.pageNum = 1;
            this.initialScaleCalculated = false;
            this.renderPage(this.pageNum);
            setTimeout(() => this.adjustToolbar(), 50); // Validar ancho de botonera
        }).catch((error) => {
            console.error('Error cargando el PDF:', error);
            this.errorContainer.style.display = 'block';
            this.canvas.style.display = 'none';
        });
    }

    close() {
        this.modal.classList.remove('is-open');
        window.removeEventListener('keydown', this._keyHandler);

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo({
            top: this.lockedScrollY,
            behavior: 'instant'
        });
    }

    renderPage(num) {
        this.pageRendering = true;
        
        this.pdfDoc.getPage(num).then((page) => {
            // Calcular escalado inicial para móviles y tablets
            if (!this.initialScaleCalculated) {
                const unscaledViewport = page.getViewport({scale: 1.0});
                // Intentamos capturar el width, si es 0 (layout aún no propagado), usamos window
                let safeWidth = this.canvasContainer.clientWidth - 40; 
                if (!safeWidth || safeWidth <= 0) {
                    safeWidth = window.innerWidth - 40;
                }
                
                if (safeWidth > 0 && safeWidth < unscaledViewport.width) {
                     this.scale = safeWidth / unscaledViewport.width;
                } else {
                     this.scale = 1.0;
                }
                this.initialScaleCalculated = true;
            }

            // Cancelar tarea previa si existe
            if (this.renderTask) {
                this.renderTask.cancel();
            }

            const viewport = page.getViewport({scale: this.scale});
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: this.ctx,
                viewport: viewport
            };
            this.renderTask = page.render(renderContext);

            this.renderTask.promise.then(() => {
                this.pageRendering = false;
                this.renderTask = null;
                if (this.pageNumPending !== null) {
                    this.renderPage(this.pageNumPending);
                    this.pageNumPending = null;
                }
            }).catch(err => {
                if (err.name === 'RenderingCancelledException') return;
                console.error(err);
            });
        });

        this.querySelector('#page_num').textContent = num;
    }

    queueRenderPage(num) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num);
        }
    }

    onPrevPage() {
        if (this.pageNum <= 1) return;
        this.pageNum--;
        this.queueRenderPage(this.pageNum);
    }

    onNextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) return;
        this.pageNum++;
        this.queueRenderPage(this.pageNum);
    }

    onZoomIn() {
        this.scale += 0.2;
        this.queueRenderPage(this.pageNum);
    }

    onZoomOut() {
        if (this.scale <= 0.4) return;
        this.scale -= 0.2;
        this.queueRenderPage(this.pageNum);
    }
}

customElements.define('pdf-viewer', PdfViewer);
