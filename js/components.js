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
