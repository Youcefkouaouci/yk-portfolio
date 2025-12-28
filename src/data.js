const dataPortfolio = {
  languages: {
    fr: {
      identité: {
        nom: "Youcef Kouaouci",
        titre: "Développeur Web Fullstack",
        bio_courte:
          "Ancien Architecte reconverti dans le développement informatique, je crée des outils numériques innovants.",
        bio_longue:
          "Ancien Architecte, je porte projet de reconversion vers le développement informatique afin de me spécialiser dans la création d'outils d'aide à la décision pour le secteur de construction. Actuellement en formation d'apprentissage de Développeur logiciel, je recherche une alternance (apprentissage) dès octobre 2025 pour consolider mes compétences et contribuer à des projets innovants.",
        ville: "Sainte-Foy-Lès-Lyon, 69110 | Mobilité : France métropolitaine",
        email: "youcefkouaouci@gmail.com",
        telephone: "07 44 80 21 63",
        linkedin: "https://linkedin.com/in/youcef-kouaouci",
        github: "https://github.com/youcefkouaouci",
        website: "www.youcefkouaouci.com",
        cv_url: "./cv-youcef-kouaouci.pdf.pdf",
        photo_url: "./photo-youcef.jpg.jpg",
      },
      services: [
        "Développement Web Fullstack (HTML/CSS/JS, PHP, Symfony)",
        "Développement Frontend (Angular, VueJs)",
        "Gestion de bases de données (MySQL, SQL)",
        "Architecture & Conception de projets",
        "Modélisation 3D (3Ds Max, Revit)",
      ],
      projets: [
        {
          titre: "Application Web Co-Living",
          type: "pro",
          stack: ["Angular 18", "Symfony", "MySQL"],
          description:
            "Plateforme de mise en relation pour espaces co-living. Frontend dynamique avec Angular 18, Backend : API RESTful avec Symfony (architecture modulaire). Modélisation et gestion de base de données MySQL.",
          lien: "https://github.com/youcefkouaouci/co-living-app",
        },
        {
          titre: "Portfolio Personnel",
          type: "académique",
          stack: ["HTML", "CSS", "JavaScript", "Figma"],
          description:
            "Maquettage Figma + développement site responsive (HTML/CSS/JS). Déploiement continu automatisé via intégration GitHub/Vercel.",
          lien: "https://www.youcefkouaouci.com",
        },
        {
          titre: "Sites Web Statiques",
          type: "académique",
          stack: ["HTML", "CSS", "SASS", "GitHub"],
          description:
            "Création sites web statiques (La Cuisine Lyonnaise, Blog de Voyage, CV, …) optimisés SEO en HTML, CSS, SASS et déployés sur GitHub.",
          lien: "https://github.com/youcefkouaouci",
        },
        {
          titre: "Stage Développeur Web chez InnovQube",
          type: "pro",
          stack: ["Laravel", "Livewire", "Filament", "Figma", "Leaflet"],
          description:
            "Refonte UI, intégration front/back avec composants Laravel, Livewire, Filament, selon maquettes Figma. Développement et intégration d'API pour Sync de iCal. Collaboration : Workshops mapping des données + résolution de conflits Git + Résolution bugs (Leaflet).",
          lien: "#",
        },
      ],
      parcours: [
        {
          période: "Juil. - Sept. 2025",
          intitulé: "Développeur Web (Stage)",
          lieu: "InnovQube SASU",
          description:
            "Refonte UI, intégration front/back avec Laravel, Livewire, Filament. Développement et intégration d'API pour synchronisation iCal. Résolution de bugs et workshops de mapping de données.",
        },
        {
          période: "2024 - 2025",
          intitulé: "Développeur Web et Web Mobile",
          lieu: "École Human Booster",
          description:
            "Formation complète en développement web fullstack : HTML, CSS, JavaScript, PHP, Symfony, Angular, bases de données SQL, Git, méthodes agiles.",
        },
        {
          période: "2023 - 2024",
          intitulé: "Master Recherche en Architecture",
          lieu: "ENSA, Paris La Villette",
          description:
            "Spécialisation en architecture durable, conception numérique et recherche appliquée dans le domaine de l'architecture.",
        },
        {
          période: "2021 - 2023",
          intitulé: "Architecte Chargé d'Études de Projet",
          lieu: "D.O Architecte",
          description:
            "Gestion et conception de projets avec des outils numériques, de l'esquisse à DCE, plans, perspectives et détails techniques. Collaboration avec différentes parties prenantes (MOA, ingénieurs, designers).",
        },
        {
          période: "2020 - 2021",
          intitulé: "Architecte Chargé d'Études de Projet",
          lieu: "Agence d'Architecture BEAFR",
          description:
            "Coordination et communication avec le MOA. Chargé de la conception et la modélisation 3Ds Max du projet (esquisse, avant-projet, plans d'exécution).",
        },
        {
          période: "2015 - 2020",
          intitulé: "Diplôme d'Ingénieur en Architecture",
          lieu: "Université de Batna 01 - Algérie",
          description:
            "Formation complète en architecture et ingénierie, conception de projets, modélisation 3D et gestion de projet.",
        },
      ],
    },
    en: {
      identité: {
        nom: "Youcef Kouaouci",
        titre: "Fullstack Web Developer (Junior)",
        bio_courte:
          "Former Architect turned Web Developer, I create innovative digital tools.",
        bio_longue:
          "Former Architect, I have transitioned to software development to specialize in creating decision support tools and simulation and modeling software. Currently training as a Web and Mobile Developer at Human Booster, I am seeking an apprenticeship starting October 2025 to strengthen my skills and contribute to innovative projects.",
        ville: "Sainte-Foy-Lès-Lyon, 69110",
        email: "youcefkouaouci@gmail.com",
        telephone: "07 44 80 21 63",
        linkedin: "https://linkedin.com/in/youcefkouaouci",
        github: "https://github.com/youcefkouaouci",
        website: "www.youcefkouaouci.com",
        cv_url: "/cv-youcef-kouaouci-en.pdf",
        photo_url: "/photo-youcef.jpg",
      },
      services: [
        "Fullstack Web Development (HTML/CSS/JS, PHP, Symfony)",
        "Frontend Development (Angular, VueJs)",
        "Database Management (MySQL, SQL)",
        "Architecture & Project Design",
        "3D Modeling (3Ds Max, Revit)",
      ],
      projets: [
        {
          titre: "Co-Living Web Application",
          type: "pro",
          stack: ["Angular 18", "Symfony", "MySQL"],
          description:
            "Co-living space matching platform. Dynamic frontend with Angular 18, Backend: RESTful API with Symfony (modular architecture). MySQL database modeling and management.",
          lien: "https://github.com/youcefkouaouci/co-living-app",
        },
        {
          titre: "Personal Portfolio",
          type: "académique",
          stack: ["HTML", "CSS", "JavaScript", "Figma"],
          description:
            "Figma mockup + responsive website development (HTML/CSS/JS). Automated continuous deployment via GitHub/Vercel integration.",
          lien: "https://www.youcefkouaouci.com",
        },
        {
          titre: "Static Websites",
          type: "académique",
          stack: ["HTML", "CSS", "SASS", "GitHub"],
          description:
            "Creation of static websites (La Cuisine Lyonnaise, Travel Blog, CV, etc.) SEO optimized in HTML, CSS, SASS and deployed on GitHub.",
          lien: "https://github.com/youcefkouaouci",
        },
        {
          titre: "Web Developer Internship at InnovQube",
          type: "pro",
          stack: ["Laravel", "Livewire", "Filament", "Figma", "Leaflet"],
          description:
            "UI redesign, front/back integration with Laravel, Livewire, Filament components, following Figma mockups. API development and integration for iCal Sync. Collaboration: Data mapping workshops + Git conflict resolution + Bug fixes (Leaflet).",
          lien: "#",
        },
      ],
      parcours: [
        {
          période: "Jul. - Sep. 2025",
          intitulé: "Web Developer (Internship)",
          lieu: "InnovQube SASU",
          description:
            "UI redesign, front/back integration with Laravel, Livewire, Filament. API development and integration for iCal synchronization. Bug fixing and data mapping workshops.",
        },
        {
          période: "2024 - 2025",
          intitulé: "Web and Mobile Developer",
          lieu: "Human Booster School",
          description:
            "Comprehensive fullstack web development training: HTML, CSS, JavaScript, PHP, Symfony, Angular, SQL databases, Git, agile methods.",
        },
        {
          période: "2023 - 2024",
          intitulé: "Master Research in Architecture",
          lieu: "ENSA, Paris La Villette",
          description:
            "Specialization in sustainable architecture, digital design and applied research in the field of architecture.",
        },
        {
          période: "2021 - 2023",
          intitulé: "Architect Project Manager",
          lieu: "D.O Architecte",
          description:
            "Project management and design with digital tools, from sketch to DCE, plans, perspectives and technical details. Collaboration with various stakeholders (MOA, engineers, designers).",
        },
        {
          période: "2020 - 2021",
          intitulé: "Architect Project Manager",
          lieu: "BEAFR Architecture Agency",
          description:
            "Coordination and communication with the client. In charge of design and 3Ds Max modeling of the project (sketch, preliminary project, execution plans).",
        },
        {
          période: "2015 - 2020",
          intitulé: "Engineering Degree in Architecture",
          lieu: "University of Batna 01 - Algeria",
          description:
            "Complete training in architecture and engineering, project design, 3D modeling and project management.",
        },
      ],
    },
  },

  identité: {
    nom: "Youcef Kouaouci",
    titre: "Développeur Web Fullstack (junior)",
    bio_courte:
      "Ancien Architecte reconverti dans le développement web, je crée des outils numériques innovants.",
    bio_longue:
      "Ancien Architecte, je me suis reconverti vers le développement informatique afin de me spécialiser dans la création d'outils d'aide à la décision et de logiciels de simulation et modélisation. Actuellement en formation de Développeur Web et Web Mobile chez Human Booster, je recherche une alternance (apprentissage) dès octobre 2025 pour consolider mes compétences et contribuer à des projets innovants.",
    ville: "Sainte-Foy-Lès-Lyon, 69110",
    email: "youcefkouaouci@gmail.com",
    telephone: "07 44 80 21 63",
    linkedin: "https://linkedin.com/in/youcefkouaouci",
    github: "https://github.com/youcefkouaouci",
    website: "www.youcefkouaouci.com",
    cv_url: "/cv-youcef-kouaouci.pdf",
    photo_url: "/photo-youcef.jpg",
  },

  services: [
    "Développement Web Fullstack (HTML/CSS/JS, PHP, Symfony)",
    "Développement Frontend (Angular, VueJs)",
    "Gestion de bases de données (MySQL, SQL)",
    "Architecture & Conception de projets",
    "Modélisation 3D (3Ds Max, Revit)",
  ],

  compétences_techniques: [
    "Java",
    "PHP",
    "JavaScript",
    "C# .NET",
    "Angular",
    "VueJs",
    "Laravel",
    "Symfony",
    "Git",
    "GitLab",
    "GitHub",
    "MySQL",
    "SQL",
    "MERISE",
    "HTML",
    "CSS",
    "SASS",
    "Linux",
    "VsCode",
    "PhpStorm",
    "IntelliJ",
    "Figma",
    "3Ds Max",
  ],

  projets: [
    {
      titre: "Application Web Co-Living",
      type: "pro",
      stack: ["Angular 18", "Symfony", "MySQL"],
      description:
        "Plateforme de mise en relation pour espaces co-living. Frontend dynamique avec Angular 18, Backend : API RESTful avec Symfony (architecture modulaire). Modélisation et gestion de base de données MySQL.",
      lien: "https://github.com/youcefkouaouci/co-living-app",
    },
    {
      titre: "Portfolio Personnel",
      type: "académique",
      stack: ["HTML", "CSS", "JavaScript", "Figma"],
      description:
        "Maquettage Figma + développement site responsive (HTML/CSS/JS). Déploiement continu automatisé via intégration GitHub/Vercel.",
      lien: "https://www.youcefkouaouci.com",
    },
    {
      titre: "Sites Web Statiques",
      type: "académique",
      stack: ["HTML", "CSS", "SASS", "GitHub"],
      description:
        "Création sites web statiques (La Cuisine Lyonnaise, Blog de Voyage, CV, …) optimisés SEO en HTML, CSS, SASS et déployés sur GitHub.",
      lien: "https://github.com/youcefkouaouci",
    },
    {
      titre: "Stage Développeur Web chez InnovQube",
      type: "pro",
      stack: ["Laravel", "Livewire", "Filament", "Figma", "Leaflet"],
      description:
        "Refonte UI, intégration front/back avec composants Laravel, Livewire, Filament, selon maquettes Figma. Développement et intégration d'API pour Sync de iCal. Collaboration : Workshops mapping des données + résolution de conflits Git + Résolution bugs (Leaflet).",
      lien: "#",
    },
  ],

  parcours: [
    {
      période: "Juil. - Sept. 2025",
      intitulé: "Développeur Web (Stage)",
      lieu: "InnovQube SASU",
      description:
        "Refonte UI, intégration front/back avec Laravel, Livewire, Filament. Développement et intégration d'API pour synchronisation iCal. Résolution de bugs et workshops de mapping de données.",
    },
    {
      période: "2024 - 2025",
      intitulé: "Développeur Web et Web Mobile",
      lieu: "École Human Booster",
      description:
        "Formation complète en développement web fullstack : HTML, CSS, JavaScript, PHP, Symfony, Angular, bases de données SQL, Git, méthodes agiles.",
    },
    {
      période: "2023 - 2024",
      intitulé: "Master Recherche en Architecture",
      lieu: "ENSA, Paris La Villette",
      description:
        "Spécialisation en architecture durable, conception numérique et recherche appliquée dans le domaine de l'architecture.",
    },
    {
      période: "2021 - 2023",
      intitulé: "Architecte Chargé d'Études de Projet",
      lieu: "D.O Architecte",
      description:
        "Gestion et conception de projets avec des outils numériques, de l'esquisse à DCE, plans, perspectives et détails techniques. Collaboration avec différentes parties prenantes (MOA, ingénieurs, designers).",
    },
    {
      période: "2020 - 2021",
      intitulé: "Architecte Chargé d'Études de Projet",
      lieu: "Agence d'Architecture BEAFR",
      description:
        "Coordination et communication avec le MOA. Chargé de la conception et la modélisation 3Ds Max du projet (esquisse, avant-projet, plans d'exécution).",
    },
    {
      période: "2015 - 2020",
      intitulé: "Diplôme d'Ingénieur en Architecture",
      lieu: "Université de Batna 01 - Algérie",
      description:
        "Formation complète en architecture et ingénierie, conception de projets, modélisation 3D et gestion de projet.",
    },
  ],
};

// technical skills
dataPortfolio.compétences_techniques = [
  "Java",
  "PHP",
  "JavaScript",
  "C# .NET",
  "Angular",
  "VueJs",
  "Laravel",
  "Symfony",
  "Git",
  "GitLab",
  "GitHub",
  "MySQL",
  "SQL",
  "MERISE",
  "HTML",
  "CSS",
  "SASS",
  "Linux",
  "VsCode",
  "PhpStorm",
  "IntelliJ",
  "Figma",
  "3Ds Max",
];

export default dataPortfolio;
