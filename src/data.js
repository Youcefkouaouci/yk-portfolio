// Données personnelles - Youcef Kouaouci
const dataPortfolio = {
  // Bilingual data structure
  languages: {
    fr: {
      identité: {
        nom: "Youcef Kouaouci",
        titre: "Développeur Fullstack & Architecte reconverti",
        bio_courte: "Je développe des outils numériques inspirés de l'architecture.",
        bio_longue: "Architecte de formation, passionné de conception numérique, je me reconvertis aujourd'hui dans le développement web pour créer des outils utiles, performants et durables. Je suis actuellement en formation à Human Booster et je m'intéresse aux solutions B2B dans le secteur de la construction.",
        ville: "Sainte-Foy-lès-Lyon, France",
        email: "youcef.kouaouci@email.com",
        linkedin: "https://linkedin.com/in/youcef-kouaouci",
        github: "https://github.com/youcef-dev",
        cv_url: "https://mon-drive.com/youcef-cv.pdf"
      },
      services: [
        "Développement Web Fullstack",
        "Design UI/UX",
        "Modélisation 3D & graphisme",
        "Recherche en architecture durable"
      ],
      projets: [
        {
          titre: "Simulateur énergétique bâtiment",
          type: "académique",
          stack: ["DesignBuilder", "Revit", "Excel"],
          description: "Simulation thermique d'un bâtiment public à l'aide de DesignBuilder, intégration de stratégies passives, calcul de confort thermique."
        },
        {
          titre: "Outil d'aide à la décision BTP",
          type: "pro",
          stack: ["JavaScript", "Node.js", "MongoDB"],
          description: "Développement d'un prototype de plateforme pour les professionnels du bâtiment permettant d'optimiser les choix de matériaux."
        },
        {
          titre: "Maquette Oasis Bondy",
          type: "recherche",
          stack: ["Figma", "InDesign"],
          description: "Représentation interactive d'une cour d'école végétalisée, projet de recherche sur l'impact du verdissement dans les cours d'école à Bondy."
        }
      ],
      parcours: [
        {
          période: "2024 - 2025",
          intitulé: "Formation Développeur Web & Mobile",
          lieu: "Human Booster, Villeurbanne"
        },
        {
          période: "2023 - 2024",
          intitulé: "Recherche post-master en architecture",
          lieu: "ENSAPLV, Paris"
        },
        {
          période: "2017 - 2022",
          intitulé: "Architecte indépendant, poseur & concepteur",
          lieu: "Île-de-France / Batna"
        },
        {
          période: "2012 - 2017",
          intitulé: "Master Architecture",
          lieu: "Université de Batna 1"
        }
      ]
    },
    en: {
      identité: {
        nom: "Youcef Kouaouci",
        titre: "Fullstack Developer & Converted Architect",
        bio_courte: "I develop digital tools inspired by architecture.",
        bio_longue: "Trained as an architect, passionate about digital design, I am now converting to web development to create useful, efficient and sustainable tools. I am currently training at Human Booster and I am interested in B2B solutions in the construction sector.",
        ville: "Sainte-Foy-lès-Lyon, France",
        email: "youcef.kouaouci@email.com",
        linkedin: "https://linkedin.com/in/youcef-kouaouci",
        github: "https://github.com/youcef-dev",
        cv_url: "https://mon-drive.com/youcef-cv-en.pdf"
      },
      services: [
        "Fullstack Web Development",
        "UI/UX Design",
        "3D Modeling & Graphics",
        "Sustainable Architecture Research"
      ],
      projets: [
        {
          titre: "Building Energy Simulator",
          type: "académique",
          stack: ["DesignBuilder", "Revit", "Excel"],
          description: "Thermal simulation of a public building using DesignBuilder, integration of passive strategies, thermal comfort calculation."
        },
        {
          titre: "Construction Decision Support Tool",
          type: "pro",
          stack: ["JavaScript", "Node.js", "MongoDB"],
          description: "Development of a prototype platform for construction professionals to optimize material choices."
        },
        {
          titre: "Bondy Oasis Model",
          type: "recherche",
          stack: ["Figma", "InDesign"],
          description: "Interactive representation of a green school courtyard, research project on the impact of greening in school courtyards in Bondy."
        }
      ],
      parcours: [
        {
          période: "2024 - 2025",
          intitulé: "Web & Mobile Developer Training",
          lieu: "Human Booster, Villeurbanne"
        },
        {
          période: "2023 - 2024",
          intitulé: "Post-master research in architecture",
          lieu: "ENSAPLV, Paris"
        },
        {
          période: "2017 - 2022",
          intitulé: "Independent Architect, installer & designer",
          lieu: "Île-de-France / Batna"
        },
        {
          période: "2012 - 2017",
          intitulé: "Master in Architecture",
          lieu: "University of Batna 1"
        }
      ]
    }
  },

  // Keep original structure for backward compatibility
  "identité": {
    "nom": "Youcef Kouaouci",
    "titre": "Développeur Fullstack & Architecte reconverti",
    "bio_courte": "Je développe des outils numériques inspirés de l'architecture.",
    "bio_longue": "Architecte de formation, passionné de conception numérique, je me reconvertis aujourd'hui dans le développement web pour créer des outils utiles, performants et durables. Je suis actuellement en formation à Human Booster et je m'intéresse aux solutions B2B dans le secteur de la construction.",
    "ville": "Sainte-Foy-lès-Lyon, France",
    "email": "youcef.kouaouci@email.com",
    "linkedin": "https://linkedin.com/in/youcef-kouaouci",
    "github": "https://github.com/youcef-dev",
    "cv_url": "https://mon-drive.com/youcef-cv.pdf"
  },

  "services": [
    "Développement Web Fullstack",
    "Design UI/UX",
    "Modélisation 3D & graphisme",
    "Recherche en architecture durable"
  ],

  "compétences_techniques": [
    "HTML", "CSS", "Tailwind", "JavaScript", "PHP", "Symfony", "Node.js", "MongoDB", "MySQL", "Git", "Figma", "Revit", "DesignBuilder"
  ],

  "projets": [
    {
      "titre": "Simulateur énergétique bâtiment",
      "type": "académique",
      "stack": ["DesignBuilder", "Revit", "Excel"],
      "description": "Simulation thermique d'un bâtiment public à l'aide de DesignBuilder, intégration de stratégies passives, calcul de confort thermique."
    },
    {
      "titre": "Outil d'aide à la décision BTP",
      "type": "pro",
      "stack": ["JavaScript", "Node.js", "MongoDB"],
      "description": "Développement d'un prototype de plateforme pour les professionnels du bâtiment permettant d'optimiser les choix de matériaux."
    },
    {
      "titre": "Maquette Oasis Bondy",
      "type": "recherche",
      "stack": ["Figma", "InDesign"],
      "description": "Représentation interactive d'une cour d'école végétalisée, projet de recherche sur l'impact du verdissement dans les cours d'école à Bondy."
    }
  ],

  "parcours": [
    {
      "période": "2024 - 2025",
      "intitulé": "Formation Développeur Web & Mobile",
      "lieu": "Human Booster, Villeurbanne"
    },
    {
      "période": "2023 - 2024",
      "intitulé": "Recherche post-master en architecture",
      "lieu": "ENSAPLV, Paris"
    },
    {
      "période": "2017 - 2022",
      "intitulé": "Architecte indépendant, poseur & concepteur",
      "lieu": "Île-de-France / Batna"
    },
    {
      "période": "2012 - 2017",
      "intitulé": "Master Architecture",
      "lieu": "Université de Batna 1"
    }
  ]
};

// Shared technical skills (language independent)
dataPortfolio.compétences_techniques = [
  "HTML", "CSS", "Tailwind", "JavaScript", "PHP", "Symfony", "Node.js", "MongoDB", "MySQL", "Git", "Figma", "Revit", "DesignBuilder"
];

export default dataPortfolio;