// Portfolio JavaScript - Youcef Kouaouci
// Navigation et interactions avec injection dynamique des données

import dataPortfolio from './data.js';
import translations from './translations.js';

class Portfolio {
    constructor() {
        this.data = dataPortfolio;
        this.translations = translations;
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        this.init();
        this.injectData();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupProjectFilters();
        this.setupThemeToggle();
        this.setupLanguageToggle();
        this.updateLanguage();
    }

    init() {
        // Configuration initiale
        this.mobileMenuOpen = false;
        this.activeFilters = new Set(['all']);
        this.activeTechFilters = new Set();
        
        // Éléments DOM
        this.burgerMenu = document.getElementById('burger-menu');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.projectsGrid = document.getElementById('projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.contactForm = document.getElementById('contact-form');
        this.themeToggle = document.getElementById('theme-toggle');
        
        // Language elements
        this.languageToggle = document.getElementById('language-toggle');
        this.langOptions = document.querySelectorAll('.lang-option');
        
        // Initialiser le thème
        this.initTheme();
    }

    // Gestion du thème sombre/clair
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setupThemeToggle() {
        this.themeToggle?.addEventListener('click', () => {
            const currentTheme = document.body.dataset.theme;
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.body.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        
        // Mettre à jour les méta-couleurs pour les navigateurs mobiles
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#ffffff';
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === 'dark' ? '#0f172a' : '#ffffff';
            document.head.appendChild(meta);
        }
    }

    // Gestion du système de langues
    setupLanguageToggle() {
        this.langOptions?.forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Mettre à jour l'état visuel des boutons de langue
        this.langOptions.forEach(option => {
            if (option.dataset.lang === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Réinjecter les données dans la nouvelle langue
        this.updateLanguage();
        this.injectData();
    }

    updateLanguage() {
        // Traduire tous les éléments avec data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Traduire les placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.dataset.translatePlaceholder;
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Mettre à jour le titre de la page
        const currentData = this.getCurrentLanguageData();
        document.getElementById('page-title').textContent = 
            `${currentData.identité.nom} - ${currentData.identité.titre}`;
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    getCurrentLanguageData() {
        return this.data.languages[this.currentLanguage];
    }

    // Injection dynamique des données personnelles
    injectData() {
        this.injectIdentity();
        this.injectServices();
        this.injectProjects();
        this.injectRoadmap();
        this.injectTechStack();
        this.injectSocialLinks();
        this.setupDynamicFilters();
    }

    injectIdentity() {
        const currentData = this.getCurrentLanguageData();
        const identity = currentData.identité;
        
        // Titre de la page
        document.getElementById('page-title').textContent = `${identity.nom} - ${identity.titre}`;
        
        // Header
        const initials = this.getInitials(identity.nom);
        document.getElementById('header-initials').textContent = initials;
        document.getElementById('header-name').textContent = identity.nom;
        document.getElementById('header-title').textContent = identity.titre;
        
        // Hero section
        document.getElementById('hero-initials').textContent = initials;
        document.getElementById('hero-name').textContent = identity.nom;
        document.getElementById('hero-title').textContent = identity.titre;
        document.getElementById('hero-bio').textContent = identity.bio_courte;
        
        // About section
        document.getElementById('about-bio').textContent = identity.bio_longue;
        document.getElementById('about-location').textContent = identity.ville;
        
        // CV Link
        document.getElementById('cv-link').href = identity.cv_url;
        
        // Footer copyright
        document.getElementById('footer-copyright').innerHTML = 
            `© 2024 ${identity.nom}. Tous droits réservés. Conçu avec passion ❤️`;
        
        // Injection des compétences techniques
        this.injectSkills();
    }

    getInitials(fullName) {
        return fullName.split(' ')
            .map(name => name.charAt(0).toUpperCase())
            .join('');
    }

    injectSkills() {
        const skillsContainer = document.getElementById('skills-container');
        const skills = this.data.compétences_techniques;
        
        skillsContainer.innerHTML = skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
    }

    injectServices() {
        const currentData = this.getCurrentLanguageData();
        const servicesGrid = document.getElementById('services-grid');
        const services = currentData.services;
        
        const serviceIcons = {
            'Développement Web Fullstack': '🌐', 'Fullstack Web Development': '🌐',
            'Design UI/UX': '🎨', 'UI/UX Design': '🎨',
            'Modélisation 3D & graphisme': '🏗️', '3D Modeling & Graphics': '🏗️',
            'Recherche en architecture durable': '🔬', 'Sustainable Architecture Research': '🔬'
        };

        const serviceDescriptions = this.translations[this.currentLanguage].services.descriptions;

        servicesGrid.innerHTML = services.map(service => `
            <div class="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform group">
                <div class="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-emerald rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                    <span class="text-3xl text-white">${serviceIcons[service] || '⚡'}</span>
                </div>
                <h3 class="font-montserrat font-semibold text-xl text-primary mb-4">${service}</h3>
                <p class="font-roboto text-secondary text-sm leading-relaxed">
                    ${serviceDescriptions[service] || 'Service professionnel de qualité.'}
                </p>
            </div>
        `).join('');
    }

    injectProjects() {
        const currentData = this.getCurrentLanguageData();
        const projects = currentData.projets;
        
        // Images par défaut pour les projets
        const projectImages = {
            'Simulateur énergétique bâtiment': 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400',
            'Building Energy Simulator': 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400',
            'Outil d\'aide à la décision BTP': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            'Construction Decision Support Tool': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            'Maquette Oasis Bondy': 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
            'Bondy Oasis Model': 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400'
        };

        this.projects = projects.map(project => ({
            ...project,
            image: projectImages[project.titre] || 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
            categories: [project.type],
            technologies: project.stack.map(tech => tech.toLowerCase()),
            link: '#'
        }));

        this.renderProjects();
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        
        this.projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });

        // Réappliquer les filtres après rendu
        this.applyFilters();
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card opacity-0';
        card.dataset.categories = project.categories.join(',');
        card.dataset.technologies = project.technologies.join(',');
        
        // Animation décalée pour l'apparition
        setTimeout(() => {
            card.classList.remove('opacity-0');
            card.classList.add('animate-slide-up');
        }, index * 150);

        card.innerHTML = `
            <div class="relative overflow-hidden rounded-xl mb-4">
                <img src="${project.image}" alt="${project.titre}" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 right-4">
                        <span class="glass-button-primary px-4 py-2 rounded-lg text-white text-sm font-medium inline-block" data-translate="projects.filters.${project.type}">
                            ${this.getTranslation(`projects.filters.${project.type}`) || project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
            <h3 class="font-montserrat font-semibold text-lg text-primary mb-2">${project.titre}</h3>
            <p class="font-roboto text-secondary text-sm mb-4 leading-relaxed">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.stack.map(tech => `<span class="skill-tag text-xs">${tech}</span>`).join('')}
            </div>
            <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-primary-blue/10 text-primary-blue rounded text-xs font-medium">${this.getTranslation(`projects.filters.${project.type}`) || project.type}</span>
            </div>
        `;

        return card;
    }

    injectRoadmap() {
        const currentData = this.getCurrentLanguageData();
        const roadmapContainer = document.getElementById('roadmap-container');
        const parcours = currentData.parcours;
        
        roadmapContainer.innerHTML = parcours.map((etape, index) => `
            <div class="roadmap-item" data-year="${etape.période.split(' - ')[0]}">
                <div class="glass-card p-6 rounded-xl">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-montserrat font-semibold text-xl text-primary">${etape.intitulé}</h3>
                        <span class="text-sm font-roboto text-primary-blue font-medium">${etape.période}</span>
                    </div>
                    <p class="font-roboto text-secondary">${etape.lieu}</p>
                </div>
            </div>
        `).join('');
    }

    injectTechStack() {
        const techStackGrid = document.getElementById('tech-stack-grid');
        const technologies = this.data.compétences_techniques;
        
        const techIcons = {
            'HTML': '🌐',
            'CSS': '🎨',
            'Tailwind': '💨',
            'JavaScript': '⚡',
            'PHP': '🐘',
            'Symfony': '🎼',
            'Node.js': '🟢',
            'MongoDB': '🍃',
            'MySQL': '🗄️',
            'Git': '📝',
            'Figma': '🎯',
            'Revit': '🏗️',
            'DesignBuilder': '🏢'
        };

        techStackGrid.innerHTML = technologies.map(tech => `
            <div class="tech-item" data-tech="${tech.toLowerCase()}">
                <div class="glass-card p-6 rounded-xl text-center hover:scale-110 transition-transform">
                    <div class="text-4xl mb-3">${techIcons[tech] || '⚙️'}</div>
                    <span class="font-roboto font-medium text-primary">${tech}</span>
                </div>
            </div>
        `).join('');
    }

    injectSocialLinks() {
        const currentData = this.getCurrentLanguageData();
        const socialLinksContainer = document.getElementById('social-links');
        const identity = currentData.identité;
        
        const socialLinks = [
            { url: `mailto:${identity.email}`, icon: '📧', label: 'Email' },
            { url: identity.linkedin, icon: '💼', label: 'LinkedIn' },
            { url: identity.github, icon: '🐱', label: 'GitHub' },
            { url: identity.cv_url, icon: '📄', label: 'CV' }
        ];

        socialLinksContainer.innerHTML = socialLinks.map(link => `
            <a href="${link.url}" class="social-link" title="${link.label}" ${link.url.startsWith('http') ? 'target="_blank"' : ''}>
                <span class="text-2xl">${link.icon}</span>
            </a>
        `).join('');
    }

    setupDynamicFilters() {
        // Générer les filtres technologiques basés sur les projets
        const allTechs = new Set();
        this.projects.forEach(project => {
            project.stack.forEach(tech => allTechs.add(tech.toLowerCase()));
        });

        const techFiltersContainer = document.getElementById('tech-filters');
        techFiltersContainer.innerHTML = Array.from(allTechs).map(tech => 
            `<span class="tech-filter" data-tech="${tech}">${tech}</span>`
        ).join('');

        // Réattacher les event listeners pour les nouveaux filtres
        this.techFilters = document.querySelectorAll('.tech-filter');
        this.techFilters.forEach(filter => {
            filter.addEventListener('click', (e) => this.handleTechFilterClick(e));
        });
    }

    setupEventListeners() {
        // Menu burger
        this.burgerMenu?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Navigation smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Filtres de projets
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // Formulaire de contact
        this.contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));

        // Language toggle
        this.setupLanguageToggle();

        // Fermeture du menu mobile en cliquant sur un lien
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.mobileMenuOpen) {
            this.mobileMenu.classList.remove('hidden');
            this.animateBurgerToX();
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        this.mobileMenuOpen = false;
        this.mobileMenu.classList.add('hidden');
        this.animateBurgerToHamburger();
    }

    animateBurgerToX() {
        const spans = this.burgerMenu.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }

    animateBurgerToHamburger() {
        const spans = this.burgerMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajustement pour le header fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec animation au scroll
        document.querySelectorAll('.glass-card, .roadmap-item, .tech-item').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setupProjectFilters() {
        // Les projets sont maintenant injectés dynamiquement
    }

    handleFilterClick(e) {
        const filter = e.target.dataset.filter;
        
        // Gérer le filtre "all"
        if (filter === 'all') {
            this.activeFilters.clear();
            this.activeFilters.add('all');
        } else {
            this.activeFilters.delete('all');
            if (this.activeFilters.has(filter)) {
                this.activeFilters.delete(filter);
            } else {
                this.activeFilters.add(filter);
            }
            
            // Si aucun filtre actif, remettre "all"
            if (this.activeFilters.size === 0) {
                this.activeFilters.add('all');
            }
        }

        this.updateFilterButtons();
        this.applyFilters();
    }

    handleTechFilterClick(e) {
        const tech = e.target.dataset.tech;
        
        if (this.activeTechFilters.has(tech)) {
            this.activeTechFilters.delete(tech);
        } else {
            this.activeTechFilters.add(tech);
        }

        this.updateTechFilterButtons();
        this.applyFilters();
    }

    updateFilterButtons() {
        this.filterButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            if (this.activeFilters.has(filter)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateTechFilterButtons() {
        this.techFilters.forEach(filter => {
            const tech = filter.dataset.tech;
            if (this.activeTechFilters.has(tech)) {
                filter.classList.add('active');
            } else {
                filter.classList.remove('active');
            }
        });
    }

    applyFilters() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const categories = card.dataset.categories.split(',');
            const technologies = card.dataset.technologies.split(',');
            
            let showCard = false;

            // Vérifier les filtres de catégorie
            if (this.activeFilters.has('all')) {
                showCard = true;
            } else {
                showCard = categories.some(cat => this.activeFilters.has(cat));
            }

            // Vérifier les filtres technologiques
            if (showCard && this.activeTechFilters.size > 0) {
                showCard = technologies.some(tech => this.activeTechFilters.has(tech));
            }

            // Appliquer l'affichage
            if (showCard) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    handleContactSubmit(e) {
        e.preventDefault();
        
        // Simulation d'envoi de formulaire
        const translations = this.translations[this.currentLanguage];
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = translations.contact.form.sending;
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = translations.contact.form.sent;
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                e.target.reset();
            }, 2000);
        }, 1500);
    }
}

// Initialisation du portfolio
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Gestion du scroll pour le header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('backdrop-blur-lg', 'bg-white/30');
    } else {
        header.classList.remove('backdrop-blur-lg', 'bg-white/30');
    }
});