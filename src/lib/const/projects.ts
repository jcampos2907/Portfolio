const projects = [
    {
        id: "jenkins",
        title: "Jenkins CI/CD Pipelines",
        description: "Implemented Jenkins pipelines for continuous integration and continuous deployment, automating build, test, and deployment processes.",
        description_long: "Developed and maintained Jenkins CI/CD pipelines to streamline software development workflows. Automated the build, testing, and deployment stages to ensure rapid and reliable delivery of applications. Integrated various tools and plugins to enhance pipeline functionality and monitoring. Set up Jenkins utilizing Vault for secure credential management and GitOps practices for version-controlled pipeline configurations. This set up maintains most of the services I develop constantly including this website.",
        labels: ["CI/CD", "Development Pipelines"],
        git_link: "https://github.com/jcampos2907/homelab"
    },
    {
        id: "event-management-platform",
        title: "Event Management Platform",
        description: "Laravel backend + React.js frontend with SSO, OpenAPI types, vector search & DevOps automation on Kubernetes.",
        description_long: "Developed a comprehensive event management platform featuring a Laravel backend and React.js frontend. Integrated Single Sign-On (SSO) for seamless user authentication, utilized OpenAPI for type-safe API interactions, implemented vector search for enhanced data retrieval, and automated DevOps processes on Kubernetes for scalable deployment.",
        labels: ["Laravel", "React.js", "Kubernetes", "PostgresQL", "Docker"],
        url: "https://doceventos.famcr.org",
        git_link: "https://github.com/jcampos2907/eventos-docs"
    },
    {
        id: "ux-research-choice-overload",
        title: "UX Research – Choice Overload",
        description: "Applied cognitive psychology to analyze sequential vs. simultaneous decision-making in mobile UI.",
        description_long: "Conducted in-depth UX research focusing on the cognitive aspects of choice overload in mobile user interfaces. Analyzed user behavior and decision-making processes to optimize UI design for better user experience. This project is currently ongoing, and cannot be shared publicly as it is going through peer review for academic publication.",
        labels: ["UX Research", "Cognitive Psychology", "Mobile UI", "User Behavior Analysis"],
        url: "",
        git_link: null
    },
    {
        id: "homelab-infrastructure",
        title: "Homelab Infrastructure",
        description: "Full Kubernetes cluster with CNPG, Longhorn, Traefik, Grafana, Vault, Loki, and GitOps deployments.",
        description_long: "Deployed and managed a comprehensive homelab infrastructure utilizing Kubernetes to orchestrate containerized applications. Implemented Cloud Native PostgreSQL (CNPG) for robust database management, Longhorn for distributed block storage, and Traefik as a dynamic reverse proxy and load balancer. Set up Grafana for real-time monitoring and visualization of system metrics, and HashiCorp Vault for secure secret management. Integrated Loki for efficient log aggregation and analysis. Employed GitOps principles utilizing ArgoCD to automate deployments and maintain configuration as code, ensuring consistency and reliability across the infrastructure.",
        labels: ["Kubernetes", "CNPG", "Longhorn", "Traefik", "Grafana", "Vault", "Loki", "GitOps"],
        git_link: "https://github.com/jcampos2907/homelab",

    },
    {
        id: "data-viz-dashboard",
        title: "Data Visualization Project — Comparing SDG Indicators",
        description: "Applied cognitive psychology to analyze sequential vs. simultaneous decision-making in mobile UI.",
        description_long: "The dashboard explores how these metrics relate across different countries.  All datasets are sourced directly from official open-data platforms. From a technical standpoint, this is a custom dashboard built in vanilla React, bundled and served with Vite.  The interface was designed to support specific UX/UI decisions made during the research and concept development phase of the team—of which I was a member.",
        labels: ["UX Research", "Cognitive Psychology", "Mobile UI", "User Behavior Analysis"],
        url: "https://dashboardd9.famcr.org",
        git_link: "https://github.com/jcampos2907/dashboardd9"
    }
];

export default projects;