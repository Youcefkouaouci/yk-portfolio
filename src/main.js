// Portfolio JavaScript - Youcef Kouaouci
// Navigation et interactions avec injection dynamique des données

import dataPortfolio from "./data.js";
import translations from "./translations.js";

class Portfolio {
  constructor() {
    this.data = dataPortfolio;
    this.translations = translations;
    this.currentLanguage = localStorage.getItem("language") || "fr";
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
    this.activeFilters = new Set(["all"]);
    this.activeTechFilters = new Set();

    // Éléments DOM
    this.burgerMenu = document.getElementById("burger-menu");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.projectsGrid = document.getElementById("projects-grid");
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.contactForm = document.getElementById("contact-form");
    this.themeToggle = document.getElementById("theme-toggle");

    // Language elements
    this.languageToggle = document.getElementById("language-toggle");
    this.langOptions = document.querySelectorAll(".lang-option");

    // Initialiser le thème
    this.initTheme();
  }

  // Gestion du thème sombre/clair
  initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme);
  }

  setupThemeToggle() {
    this.themeToggle?.addEventListener("click", () => {
      const currentTheme = document.body.dataset.theme;
      const newTheme = currentTheme === "light" ? "dark" : "light";
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    // Mettre à jour les méta-couleurs pour les navigateurs mobiles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === "dark" ? "#0f172a" : "#ffffff";
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = theme === "dark" ? "#0f172a" : "#ffffff";
      document.head.appendChild(meta);
    }
  }

  // Gestion du système de langues
  setupLanguageToggle() {
    this.langOptions?.forEach((option) => {
      option.addEventListener("click", (e) => {
        const lang = e.target.dataset.lang;
        this.switchLanguage(lang);
      });
    });
  }

  switchLanguage(lang) {
    if (lang === this.currentLanguage) return;

    this.currentLanguage = lang;
    localStorage.setItem("language", lang);

    // Mettre à jour l'état visuel des boutons de langue
    this.langOptions.forEach((option) => {
      if (option.dataset.lang === lang) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });

    // Réinjecter les données dans la nouvelle langue
    this.updateLanguage();
    this.injectData();
  }

  updateLanguage() {
    // Traduire tous les éléments avec data-translate
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.dataset.translate;
      const translation = this.getTranslation(key);
      if (translation) {
        element.textContent = translation;
      }
    });

    // Traduire les placeholders
    document
      .querySelectorAll("[data-translate-placeholder]")
      .forEach((element) => {
        const key = element.dataset.translatePlaceholder;
        const translation = this.getTranslation(key);
        if (translation) {
          element.placeholder = translation;
        }
      });

    // Mettre à jour le titre de la page
    const currentData = this.getCurrentLanguageData();
    document.getElementById(
      "page-title"
    ).textContent = `${currentData.identité.nom} - ${currentData.identité.titre}`;
  }

  getTranslation(key) {
    const keys = key.split(".");
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
    document.getElementById(
      "page-title"
    ).textContent = `${identity.nom} - ${identity.titre}`;

    // Header - Photo ou Initiales
    const headerPhoto = document.getElementById("header-photo");
    const headerInitials = document.getElementById("header-initials");
    const headerAvatar = document.getElementById("header-avatar");

    if (identity.photo_url && headerPhoto) {
      headerPhoto.src = identity.photo_url;
      headerPhoto.alt = identity.nom;
      headerPhoto.style.display = "block";
      if (headerInitials) {
        headerInitials.style.display = "none";
      }
      // Gérer l'erreur de chargement de l'image
      headerPhoto.onerror = () => {
        headerPhoto.style.display = "none";
        if (headerInitials) {
          headerInitials.textContent = this.getInitials(identity.nom);
          headerInitials.style.display = "flex";
          headerInitials.classList.remove("hidden");
        }
      };
    } else if (headerInitials) {
      const initials = this.getInitials(identity.nom);
      headerInitials.textContent = initials;
      if (headerPhoto) headerPhoto.style.display = "none";
      headerInitials.style.display = "flex";
      headerInitials.classList.remove("hidden");
    }

    document.getElementById("header-name").textContent = identity.nom;
    document.getElementById("header-title").textContent = identity.titre;

    // Hero section - Photo ou Initiales
    const heroPhoto = document.getElementById("hero-photo");
    const heroInitials = document.getElementById("hero-initials");

    if (identity.photo_url && heroPhoto) {
      heroPhoto.src = identity.photo_url;
      heroPhoto.alt = identity.nom;
      heroPhoto.style.display = "block";
      if (heroInitials) {
        heroInitials.style.display = "none";
      }
      // Gérer l'erreur de chargement de l'image
      heroPhoto.onerror = () => {
        heroPhoto.style.display = "none";
        if (heroInitials) {
          heroInitials.textContent = this.getInitials(identity.nom);
          heroInitials.style.display = "flex";
          heroInitials.classList.remove("hidden");
        }
      };
    } else if (heroInitials) {
      const initials = this.getInitials(identity.nom);
      heroInitials.textContent = initials;
      if (heroPhoto) heroPhoto.style.display = "none";
      heroInitials.style.display = "flex";
      heroInitials.classList.remove("hidden");
    }

    document.getElementById("hero-name").textContent = identity.nom;
    document.getElementById("hero-title").textContent = identity.titre;
    document.getElementById("hero-bio").textContent = identity.bio_courte;

    // About section
    document.getElementById("about-bio").textContent = identity.bio_longue;
    document.getElementById("about-location").textContent = identity.ville;

    // CV Link
    const cvLink = document.getElementById("cv-link");
    if (cvLink) {
      cvLink.href = identity.cv_url;
    }

    // Footer copyright
    const footerCopyright = document.getElementById("footer-copyright");
    if (footerCopyright) {
      footerCopyright.innerHTML = `© ${new Date().getFullYear()} ${
        identity.nom
      }. Tous droits réservés. Conçu avec passion ❤️`;
    }

    // Injection des compétences techniques
    this.injectSkills();
  }

  getInitials(fullName) {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("");
  }

  injectSkills() {
    const skillsContainer = document.getElementById("skills-container");
    const skills = this.data.compétences_techniques;

    if (skillsContainer) {
      skillsContainer.innerHTML = skills
        .map((skill) => `<span class="skill-tag">${skill}</span>`)
        .join("");
    }
  }

  injectServices() {
    const currentData = this.getCurrentLanguageData();
    const servicesGrid = document.getElementById("services-grid");
    const services = currentData.services;

    if (!servicesGrid) return;

    const serviceIcons = {
      "Développement Web Fullstack (HTML/CSS/JS, PHP, Symfony)": "🌐",
      "Fullstack Web Development (HTML/CSS/JS, PHP, Symfony)": "🌐",
      "Développement Frontend (Angular, VueJs)": "⚛️",
      "Frontend Development (Angular, VueJs)": "⚛️",
      "Gestion de bases de données (MySQL, SQL)": "🗄️",
      "Database Management (MySQL, SQL)": "🗄️",
      "Architecture & Conception de projets": "🏗️",
      "Architecture & Project Design": "🏗️",
      "Modélisation 3D (3Ds Max, Revit)": "🎨",
      "3D Modeling (3Ds Max, Revit)": "🎨",
    };

    const serviceDescriptions = {
      "Développement Web Fullstack (HTML/CSS/JS, PHP, Symfony)":
        "Applications web complètes avec technologies modernes front-end et back-end.",
      "Fullstack Web Development (HTML/CSS/JS, PHP, Symfony)":
        "Complete web applications with modern front-end and back-end technologies.",
      "Développement Frontend (Angular, VueJs)":
        "Interfaces utilisateur dynamiques et réactives avec frameworks JavaScript.",
      "Frontend Development (Angular, VueJs)":
        "Dynamic and responsive user interfaces with JavaScript frameworks.",
      "Gestion de bases de données (MySQL, SQL)":
        "Conception, modélisation et optimisation de bases de données relationnelles.",
      "Database Management (MySQL, SQL)":
        "Design, modeling and optimization of relational databases.",
      "Architecture & Conception de projets":
        "Vision globale et conception technique de projets complexes.",
      "Architecture & Project Design":
        "Global vision and technical design of complex projects.",
      "Modélisation 3D (3Ds Max, Revit)":
        "Création de modèles 3D et visualisations architecturales.",
      "3D Modeling (3Ds Max, Revit)":
        "Creation of 3D models and architectural visualizations.",
    };

    servicesGrid.innerHTML = services
      .map(
        (service) => `
            <div class="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform group">
                <div class="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-emerald rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                    <span class="text-3xl">${
                      serviceIcons[service] || "⚡"
                    }</span>
                </div>
                <h3 class="font-montserrat font-semibold text-xl text-primary mb-4">${service}</h3>
                <p class="font-roboto text-secondary text-sm leading-relaxed">
                    ${
                      serviceDescriptions[service] ||
                      "Service professionnel de qualité."
                    }
                </p>
            </div>
        `
      )
      .join("");
  }

  injectProjects() {
    const currentData = this.getCurrentLanguageData();
    const projects = currentData.projets;

    // Images par défaut pour les projets
    const projectImages = {
      "Application Web Co-Living":
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Co-Living Web Application":
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Portfolio Personnel":
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Personal Portfolio":
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Sites Web Statiques":
        "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Static Websites":
        "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Stage Développeur Web chez InnovQube":
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Web Developer Internship at InnovQube":
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    };

    this.projects = projects.map((project) => ({
      ...project,
      image:
        projectImages[project.titre] ||
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      categories: [project.type],
      technologies: project.stack.map((tech) => tech.toLowerCase()),
      link: project.lien || "#",
    }));

    this.renderProjects();
  }

  renderProjects() {
    const projectsGrid = document.getElementById("projects-grid");
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    this.projects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project, index);
      projectsGrid.appendChild(projectCard);
    });

    // Réappliquer les filtres après rendu
    this.applyFilters();
  }

  createProjectCard(project, index) {
    const card = document.createElement("div");
    card.className = "project-card opacity-0";
    card.dataset.categories = project.categories.join(",");
    card.dataset.technologies = project.technologies.join(",");

    // Animation décalée pour l'apparition
    setTimeout(() => {
      card.classList.remove("opacity-0");
      card.classList.add("animate-slide-up");
    }, index * 150);

    const linkTarget = project.link.startsWith("http")
      ? 'target="_blank" rel="noopener noreferrer"'
      : "";

    card.innerHTML = `
            <div class="relative overflow-hidden rounded-xl mb-4">
                <img src="${project.image}" alt="${
      project.titre
    }" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 right-4">
                        <span class="glass-button-primary px-4 py-2 rounded-lg text-white text-sm font-medium inline-block">
                            ${
                              this.getTranslation(
                                `projects.filters.${project.type}`
                              ) ||
                              project.type.charAt(0).toUpperCase() +
                                project.type.slice(1)
                            }
                        </span>
                    </div>
                </div>
            </div>
            <h3 class="font-montserrat font-semibold text-lg text-primary mb-2">${
              project.titre
            }</h3>
            <p class="font-roboto text-secondary text-sm mb-4 leading-relaxed">${
              project.description
            }</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.stack
                  .map(
                    (tech) => `<span class="skill-tag text-xs">${tech}</span>`
                  )
                  .join("")}
            </div>
            <div class="flex items-center justify-between">
                <span class="px-2 py-1 bg-primary-blue/10 text-primary-blue rounded text-xs font-medium">
                    ${
                      this.getTranslation(`projects.filters.${project.type}`) ||
                      project.type
                    }
                </span>
                ${
                  project.link !== "#"
                    ? `
                    <a href="${project.link}" ${linkTarget} class="text-primary-blue hover:text-primary-emerald transition-colors text-sm font-medium">
                        Voir le projet →
                    </a>
                `
                    : ""
                }
            </div>
        `;

    return card;
  }

  injectRoadmap() {
    const currentData = this.getCurrentLanguageData();
    const roadmapContainer = document.getElementById("roadmap-container");
    const parcours = currentData.parcours;

    if (!roadmapContainer) return;

    roadmapContainer.innerHTML = parcours
      .map(
        (etape, index) => `
            <div class="roadmap-item" data-year="${
              etape.période.split(" - ")[0]
            }">
                <div class="glass-card p-6 rounded-xl">
                    <div class="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 class="font-montserrat font-semibold text-xl text-primary">${
                          etape.intitulé
                        }</h3>
                        <span class="text-sm font-roboto text-primary-blue font-medium">${
                          etape.période
                        }</span>
                    </div>
                    <p class="font-roboto text-primary font-medium mb-2">${
                      etape.lieu
                    }</p>
                    ${
                      etape.description
                        ? `<p class="font-roboto text-secondary text-sm">${etape.description}</p>`
                        : ""
                    }
                </div>
            </div>
        `
      )
      .join("");
  }

  injectTechStack() {
    const techStackGrid = document.getElementById("tech-stack-grid");
    const technologies = this.data.compétences_techniques;

    if (!techStackGrid) return;

    // Icônes officielles avec Font Awesome et Simple Icons
    const techIcons = {
      Java: '<i class="fab fa-java text-red-600"></i>',
      PHP: '<i class="fab fa-php text-indigo-600"></i>',
      JavaScript: '<i class="fab fa-js text-yellow-400"></i>',
      "C# .NET": '<i class="si si-dotnet text-purple-600"></i>',
      Angular: '<i class="fab fa-angular text-red-600"></i>',
      VueJs: '<i class="fab fa-vuejs text-green-500"></i>',
      Laravel: '<i class="fab fa-laravel text-red-500"></i>',
      Symfony: '<i class="fab fa-symfony text-black dark:text-white"></i>',
      Git: '<i class="fab fa-git-alt text-orange-600"></i>',
      GitLab: '<i class="fab fa-gitlab text-orange-600"></i>',
      GitHub: '<i class="fab fa-github text-gray-900 dark:text-white"></i>',
      MySQL: '<i class="si si-mysql text-blue-600"></i>',
      SQL: '<i class="fas fa-database text-blue-700"></i>',
      MERISE: '<i class="fas fa-sitemap text-purple-600"></i>',
      HTML: '<i class="fab fa-html5 text-orange-600"></i>',
      CSS: '<i class="fab fa-css3-alt text-blue-600"></i>',
      SASS: '<i class="fab fa-sass text-pink-500"></i>',
      Linux: '<i class="fab fa-linux text-gray-900 dark:text-white"></i>',
      VsCode: '<i class="si si-visualstudiocode text-blue-500"></i>',
      PhpStorm: '<i class="si si-phpstorm text-purple-600"></i>',
      IntelliJ: '<i class="si si-intellijidea text-black dark:text-white"></i>',
      Figma: '<i class="fab fa-figma text-purple-600"></i>',
      "3Ds Max": '<i class="fas fa-cube text-teal-600"></i>',
    };

    techStackGrid.innerHTML = technologies
      .map(
        (tech) => `
            <div class="tech-item" data-tech="${tech.toLowerCase()}">
                <div class="glass-card p-6 rounded-xl text-center hover:scale-110 transition-transform cursor-pointer">
                    <div class="text-5xl mb-3 transition-transform hover:scale-125">
                        ${
                          techIcons[tech] ||
                          '<i class="fas fa-code text-gray-600"></i>'
                        }
                    </div>
                    <span class="font-roboto font-medium text-primary text-sm">${tech}</span>
                </div>
            </div>
        `
      )
      .join("");
  }

  injectSocialLinks() {
    const currentData = this.getCurrentLanguageData();
    const socialLinksContainer = document.getElementById("social-links");
    const identity = currentData.identité;

    if (!socialLinksContainer) return;

    const socialLinks = [
      {
        url: `mailto:${identity.email}`,
        icon: '<i class="fas fa-envelope"></i>',
        label: "Email",
        color: "text-red-500 hover:text-red-600",
      },
      {
        url: `tel:${identity.telephone}`,
        icon: '<i class="fas fa-phone"></i>',
        label: "Téléphone",
        color: "text-green-500 hover:text-green-600",
      },
      {
        url: identity.linkedin,
        icon: '<i class="fab fa-linkedin"></i>',
        label: "LinkedIn",
        color: "text-blue-600 hover:text-blue-700",
      },
      {
        url: identity.github,
        icon: '<i class="fab fa-github"></i>',
        label: "GitHub",
        color:
          "text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-300",
      },
      {
        url: `https://${identity.website}`,
        icon: '<i class="fas fa-globe"></i>',
        label: "Website",
        color: "text-teal-500 hover:text-teal-600",
      },
    ];

    socialLinksContainer.innerHTML = socialLinks
      .map(
        (link) => `
            <a href="${link.url}" 
               class="social-link group relative" 
               title="${link.label}" 
               ${
                 link.url.startsWith("http")
                   ? 'target="_blank" rel="noopener noreferrer"'
                   : ""
               }>
                <span class="text-3xl ${
                  link.color
                } transition-all duration-300 group-hover:scale-125">
                    ${link.icon}
                </span>
                <span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${link.label}
                </span>
            </a>
        `
      )
      .join("");
  }

  setupDynamicFilters() {
    // Générer les filtres technologiques basés sur les projets
    const allTechs = new Set();
    this.projects.forEach((project) => {
      project.stack.forEach((tech) => allTechs.add(tech.toLowerCase()));
    });

    const techFiltersContainer = document.getElementById("tech-filters");
    if (!techFiltersContainer) return;

    techFiltersContainer.innerHTML = Array.from(allTechs)
      .map(
        (tech) => `<span class="tech-filter" data-tech="${tech}">${tech}</span>`
      )
      .join("");

    // Réattacher les event listeners pour les nouveaux filtres
    this.techFilters = document.querySelectorAll(".tech-filter");
    this.techFilters.forEach((filter) => {
      filter.addEventListener("click", (e) => this.handleTechFilterClick(e));
    });
  }

  setupEventListeners() {
    // Menu burger
    this.burgerMenu?.addEventListener("click", () => this.toggleMobileMenu());

    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => this.handleSmoothScroll(e));
    });

    // Filtres de projets
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFilterClick(e));
    });

    // Formulaire de contact
    this.contactForm?.addEventListener("submit", (e) =>
      this.handleContactSubmit(e)
    );

    // Language toggle
    this.setupLanguageToggle();

    // Fermeture du menu mobile en cliquant sur un lien
    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu());
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (this.mobileMenuOpen) {
      this.mobileMenu.classList.remove("hidden");
      this.animateBurgerToX();
    } else {
      this.closeMobileMenu();
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    if (this.mobileMenu) {
      this.mobileMenu.classList.add("hidden");
    }
    this.animateBurgerToHamburger();
  }

  animateBurgerToX() {
    if (!this.burgerMenu) return;
    const spans = this.burgerMenu.querySelectorAll("span");
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  }

  animateBurgerToHamburger() {
    if (!this.burgerMenu) return;
    const spans = this.burgerMenu.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }

  handleSmoothScroll(e) {
    const href = e.target.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80; // Ajustement pour le header fixe
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec animation au scroll
    document
      .querySelectorAll(".glass-card, .roadmap-item, .tech-item")
      .forEach((el) => {
        el.classList.add("animate-on-scroll");
        observer.observe(el);
      });
  }

  setupProjectFilters() {
    // Les projets sont maintenant injectés dynamiquement
  }

  handleFilterClick(e) {
    const filter = e.target.dataset.filter;

    // Gérer le filtre "all"
    if (filter === "all") {
      this.activeFilters.clear();
      this.activeFilters.add("all");
    } else {
      this.activeFilters.delete("all");
      if (this.activeFilters.has(filter)) {
        this.activeFilters.delete(filter);
      } else {
        this.activeFilters.add(filter);
      }

      // Si aucun filtre actif, remettre "all"
      if (this.activeFilters.size === 0) {
        this.activeFilters.add("all");
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
    this.filterButtons.forEach((btn) => {
      const filter = btn.dataset.filter;
      if (this.activeFilters.has(filter)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  updateTechFilterButtons() {
    if (!this.techFilters) return;
    this.techFilters.forEach((filter) => {
      const tech = filter.dataset.tech;
      if (this.activeTechFilters.has(tech)) {
        filter.classList.add("active");
      } else {
        filter.classList.remove("active");
      }
    });
  }

  applyFilters() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const categories = card.dataset.categories.split(",");
      const technologies = card.dataset.technologies.split(",");

      let showCard = false;

      // Vérifier les filtres de catégorie
      if (this.activeFilters.has("all")) {
        showCard = true;
      } else {
        showCard = categories.some((cat) => this.activeFilters.has(cat));
      }

      // Vérifier les filtres technologiques
      if (showCard && this.activeTechFilters.size > 0) {
        showCard = technologies.some((tech) =>
          this.activeTechFilters.has(tech)
        );
      }

      // Appliquer l'affichage
      if (showCard) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
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
document.addEventListener("DOMContentLoaded", () => {
  new Portfolio();
});

// Gestion du scroll pour le header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add("backdrop-blur-lg", "bg-white/30");
    } else {
      header.classList.remove("backdrop-blur-lg", "bg-white/30");
    }
  }
});
