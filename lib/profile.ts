export const profile = {
  name: "Zalman Goldstein",
  shortName: "Zalman",
  roles: ["Software Engineer", "ML / DL Engineer", "College Lecturer"],
  tagline:
    "Building enterprise-grade systems where rigorous engineering meets applied machine learning.",
  location: "Israel",
  email: "zaalgol@gmail.com",
  phone: "+972 53-335-6237",
  linkedin: "https://www.linkedin.com/in/zalman-goldstein-675120a9",
  github: "https://github.com/zaalgol",
  summary:
    "Senior Software Engineer and ML/DL Engineer with over a decade of experience designing and shipping production systems across cybersecurity, fintech, and large-scale data platforms. I move comfortably from low-level back-end architecture to modern front-end, and from clean software design to applied machine learning — retrieval-augmented generation, real-time threat prediction, and fraud detection. Alongside engineering, I lecture on advanced software design and clean code at the Lev Academic Center.",
  highlights: [
    { value: "12+", label: "Years building software" },
    { value: "9", label: "Companies & startups" },
    { value: "6+", label: "Years lecturing CS" },
    { value: "∞", label: "Lines of clean code" },
  ],
  // Top skills grouped for the skills section
  skillGroups: [
    {
      title: "Machine Learning & AI",
      items: [
        "RAG (Retrieval-Augmented Generation)",
        "LangChain",
        "MLflow",
        "scikit-learn",
        "Keras",
        "Deep Learning",
        "MLOps",
      ],
    },
    {
      title: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "Java", "C#", "Go"],
    },
    {
      title: "Back-end & Data",
      items: [
        "Flask",
        "Spring Boot",
        "Node.js",
        "PostgreSQL / MySQL",
        "Elasticsearch / OpenSearch",
        "SQLAlchemy",
        "RabbitMQ",
      ],
    },
    {
      title: "Front-end",
      items: ["React", "Next.js", "AngularJS", "HTML5 / CSS3"],
    },
    {
      title: "Cloud & DevOps",
      items: [
        "AWS / Azure / GCP",
        "Docker & Compose / Swarm",
        "Kubernetes",
        "Jenkins / GitLab CI/CD",
        "Ansible",
      ],
    },
    {
      title: "Practices",
      items: [
        "Clean Code & Design",
        "Microservices",
        "Multi-Tenant Architecture",
        "Code Review & Mentoring",
        "Agile / End-to-end Ownership",
      ],
    },
  ],
  experience: [
    {
      company: "DealSumm",
      role: "Senior Software Engineer",
      period: "Mar 2025 — Present",
      location: "Tel Aviv District, Israel",
      current: true,
      summary:
        "Building the next generation of AI-powered deal intelligence as a senior engineer in a fast-moving team.",
      tags: ["Python", "LLM", "RAG", "Full-Stack"],
    },
    {
      company: "Lev Academic Center (JCT)",
      role: "College Lecturer",
      period: "Feb 2020 — Present",
      location: "Tel Aviv, Israel",
      current: true,
      summary:
        "Lecturer for an advanced software design course — clean code, design principles and patterns in Java — one semester each year at the Jerusalem College of Technology.",
      tags: ["Clean Code", "Software Design", "Java", "Teaching"],
    },
    {
      company: "OTORIO",
      role: "Senior Software Engineer",
      period: "Jul 2022 — Feb 2025",
      location: "Tel Aviv-Yafo, Israel",
      summary:
        "Designed and developed a multi-tenant, microservices Secure Access system with Identity Management across cloud and hybrid for large-scale data. Built and deployed an ML model for real-time prediction of cybersecurity threats and risk management. Led features, code reviews, mentoring, and CI/CD.",
      tags: [
        "Python",
        "Flask",
        "React",
        "TypeScript",
        "scikit-learn",
        "Kubernetes",
        "Elasticsearch",
      ],
    },
    {
      company: "Broadcom Inc.",
      role: "Senior Software Engineer",
      period: "Feb 2020 — Jun 2022",
      location: "Tel Aviv, Israel",
      summary:
        "Developed the Web Isolation system — a cloud-based network security gateway protecting users from web-borne threats by executing browsing remotely.",
      tags: ["Node.js", "TypeScript", "Python", "Go", "React", "AWS / GCP"],
    },
    {
      company: "PayPal (via Sqlink)",
      role: "Senior Software Engineer",
      period: "Aug 2019 — Jan 2020",
      location: "Tel Aviv, Israel",
      summary:
        "Developed a fraud detection system leveraging big data and machine/deep learning to flag fraudulent transactions in real time.",
      tags: ["Java", "Spring", "Big Data", "ML / DL", "Scala", "Keras"],
    },
    {
      company: "COTI Group",
      role: "Software Engineer",
      period: "May 2018 — Aug 2019",
      location: "Tel Aviv, Israel",
      summary:
        "Designed and developed a multiscale distributed payment system and a DAG-based cryptocurrency, with machine learning components.",
      tags: ["Java", "Spring Boot", "DAG", "Elasticsearch", "AWS"],
    },
    {
      company: "Varonis",
      role: "Software Engineer",
      period: "Jun 2017 — May 2018",
      location: "Herzliya, Israel",
      summary:
        "Built internal IT programs and data-security tooling for the enterprise data-protection platform.",
      tags: ["C#", "ASP.NET MVC", "SQL Server", "Ext JS", "Entity Framework"],
    },
    {
      company: "BDO IT Consulting Group",
      role: ".NET Developer",
      period: "Jul 2015 — Jun 2017",
      location: "Petah Tikva, Israel",
      summary:
        "Developed systems and applications for the SAP Business One environment.",
      tags: ["C#", "SAP Business One", "WCF", "Entity Framework", "SQL Server"],
    },
    {
      company: "EasyLinks",
      role: "System Software Developer",
      period: "Jan 2014 — Jun 2015",
      location: "Tel Aviv, Israel",
      summary:
        "Key developer of EasyCheck — a startup providing financial information to management systems of foreign exchange and check-cashing companies.",
      tags: ["C#", "ASP.NET MVC", "WCF", "SQL Server", "jQuery"],
    },
  ],
  education: [
    {
      school: "The Open University of Israel",
      degree: "B.Sc. — Economics & Computer Science",
      period: "2007 — 2013",
    },
    {
      school: "Coursera",
      degree: "Machine Learning, Deep Learning & MLOps",
      period: "Specializations",
    },
  ],
  certifications: [
    "Structuring Machine Learning Projects",
    "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization & Optimization",
    "Introduction to Data Science in Python",
    "Learning Kubernetes",
    "Problem Solving (Basic)",
  ],
  // Placeholder portfolio — ready to be filled with real projects later
  portfolio: [
    {
      title: "RAG Knowledge Engine",
      blurb:
        "A retrieval-augmented generation pipeline turning unstructured documents into grounded, citable answers.",
      stack: ["LangChain", "Python", "Vector DB"],
      status: "Coming soon",
    },
    {
      title: "Real-Time Threat Scoring",
      blurb:
        "Streaming ML service that scores cybersecurity risk in real time across a multi-tenant fleet.",
      stack: ["scikit-learn", "Flask", "Kubernetes"],
      status: "Coming soon",
    },
    {
      title: "Clean Architecture Toolkit",
      blurb:
        "Teaching companion and reference implementations for the advanced software design course.",
      stack: ["Java", "Design Patterns"],
      status: "Coming soon",
    },
  ],
};

export type Profile = typeof profile;
