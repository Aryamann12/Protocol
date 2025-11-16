// Portfolio Content Data

export const personalInfo = {
  name: "Aryamann Tomar",
  email: "aryamatomar@gmail.com",
  workEmail: "aryamann.tomar@gep.com",
  linkedin: "https://linkedin.com/in/aryamann-tomar",
  github: "https://github.com/aryamanntomar",
  tagline: "Blending data, code, and creativity — building intelligent systems by day, performing music by night.",
  rotatingWords: [
    "Vibe Coder",
    "IITian",
    "Senior AI Data Scientist",
    "Software Engineer",
    "ML Engineer",
    "Researcher",
    "Guitarist",
    "Main Vocalist"
  ]
};

export const journeyData = [
  {
    id: 1,
    year: "2019-2022",
    title: "IIT Gandhinagar – B.Tech Electrical Engineering",
    dates: "July 2019 – Dec 2022",
    location: "Delhi",
    description: [
      "Graduated early with CGPA 8.08/10",
      "2× Dean's List Awardee - Recognized for academic excellence",
      "Built strong foundations in electronics, computing, and AI",
      "Developed advanced problem-solving and analytical skills",
      "Completed coursework in signal processing, control systems, and machine learning"
    ],
    tags: ["Electrical Engineering", "Early Graduation", "2× Dean's List Awardee"],
    icon: "graduation-cap",
    image: null
  },
  {
    id: 2,
    year: "2022",
    title: "Semusi Technologies – Software Engineering Intern",
    dates: "May 2022 – July 2022",
    location: "Remote",
    description: [
      "Integrated Apache DataSketches into PostgreSQL for high-speed analytics",
      "Built NodeJS + TypeScript REST APIs for unified user data aggregation",
      "Analyzed 23M bank customer records using PySpark, GMM, KNN, and BERT embeddings",
      "Delivered production-ready data infrastructure improvements"
    ],
    tags: ["PostgreSQL", "NodeJS", "PySpark", "NLP", "BERT"],
    icon: "briefcase",
    image: "/images/appice-logo.png"
  },
  {
    id: 3,
    year: "2023",
    title: "IIIT Hyderabad – Research Associate (Precog Lab)",
    dates: "Jan 2023 – July 2023",
    location: "Hyderabad",
    description: [
      "AI for Legal Citation: Built BERT-based models to assist judges in referencing past judgments",
      "Conducted survival analysis (Cox Regression) on COVID-19 online community dynamics",
      "Co-authored research paper on social support networks during the pandemic",
      "Published work accepted at ASONAM conference"
    ],
    tags: ["Research", "BERT", "NLP", "Survival Analysis", "Legal AI"],
    icon: "microscope",
    image: "/images/IIIT_Hyderabad_Logo.jpg"
  },
  {
    id: 4,
    year: "2023-2025",
    title: "GST Network (GSTN) – Software Engineer, R&D (BIFA Unit)",
    dates: "July 2023 – July 2025",
    location: "Delhi",
    description: [
      "Network Optimization: Reduced processing of 1.5 crore taxpayer networks from 4 days to <2 hours (99%+ improvement) using parallel computing",
      "Built Cancellation Risk Score Model with 70% recall for fraud detection",
      "Developed HSN code search engine with Word2Vec + Annoy for microsecond retrieval",
      "Created face authentication system using DeepFace + Neo4j vector indexing"
    ],
    tags: ["Graph ML", "Django", "MongoDB", "Neo4j", "Fraud Detection", "NLP"],
    icon: "rocket",
    image: "/images/gstn-logo.png"
  },
  {
    id: 5,
    year: "2025-Present",
    title: "GEP – Senior AI Data Scientist",
    dates: "July 2025 – Present",
    location: "Hyderabad",
    description: [
      "Leading AI/ML initiatives for enterprise procurement intelligence",
      "Building production-grade data products and ML systems at scale",
      "Driving experimentation and innovation in AI-powered decision-making",
      "Collaborating across teams to deliver high-impact solutions",
      "Architecting scalable ML pipelines processing millions of records"
    ],
    tags: ["AI/ML", "Data Science", "Production ML", "Enterprise AI"],
    icon: "brain",
    current: true,
    image: "/images/gep-logo-darkBg.png"
  }
];

export const experienceData = [
  {
    id: 1,
    company: "GEP",
    position: "Senior AI Data Scientist",
    duration: "Present",
    highlights: [
      "Architecting and deploying ML models for procurement intelligence",
      "Building scalable data pipelines processing millions of records",
      "Leading experimentation with cutting-edge AI techniques",
      "Collaborating with product and engineering teams on AI strategy"
    ],
    techStack: ["Python", "PyTorch", "scikit-learn", "AWS", "MLOps", "SQL", "Spark"],
    current: true
  },
  {
    id: 2,
    company: "GST Network (GSTN)",
    position: "Software Engineer – R&D (BIFA Unit)",
    duration: "July 2023 – 2024",
    highlights: [
      "Optimized 1.5 crore taxpayer network generation: 4 days → <2 hours (99%+ improvement)",
      "Developed ML-based Cancellation Risk Score Model achieving 70% recall for fraud detection",
      "Built HSN NLP search engine with Word2Vec + Annoy for microsecond-level retrieval",
      "Implemented face authentication system using DeepFace + Neo4j vector indexing"
    ],
    techStack: ["Python", "Django", "MongoDB", "Neo4j", "DeepFace", "Word2Vec", "Annoy", "VisJS"],
    current: false
  },
  {
    id: 3,
    company: "IIIT Hyderabad",
    position: "Research Associate – Precog Lab",
    duration: "Jan 2023 – June 2023",
    highlights: [
      "Developed AI for Legal Citation using BERT to assist judges in referencing past judgments",
      "Conducted survival analysis (Cox Regression) on COVID-19 online communities",
      "Co-authored accepted research paper on social support dynamics during the pandemic",
      "Gained expertise in transformer models, NLP pipelines, and statistical analysis"
    ],
    techStack: ["Python", "PyTorch", "BERT", "Transformers", "Cox Regression", "Pandas", "scikit-learn"],
    current: false
  },
  {
    id: 4,
    company: "Semusi Technologies",
    position: "Software Engineering Intern",
    duration: "May 2022 – July 2022 (Remote)",
    highlights: [
      "Integrated Apache DataSketches into PostgreSQL for high-speed analytics",
      "Built REST APIs with NodeJS + TypeScript to aggregate user data across platforms",
      "Analyzed 23M bank customer records using PySpark, GMM, KNN, and BERT embeddings",
      "Delivered production-ready data infrastructure improvements"
    ],
    techStack: ["NodeJS", "TypeScript", "PostgreSQL", "PySpark", "Apache DataSketches", "BERT", "GMM", "KNN"],
    current: false
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Intelligent Object Removal Image Preprocessing Pipeline",
    dates: "Jan 2023 – Apr 2023",
    description: "Automated image object removal using ML models. Leveraged Diffusers, Transformers, and RunwayML's Stable Diffusion Inpainting. Enabled intuitive natural language commands for image editing.",
    detailedDescription: [
      "Built end-to-end automated image preprocessing pipeline using Stable Diffusion Inpainting",
      "Integrated Hugging Face Diffusers and Transformers for state-of-the-art object removal",
      "Enabled natural language command interface for intuitive image editing workflows",
      "Achieved 95%+ accuracy in object detection and seamless inpainting results"
    ],
    tags: ["Computer Vision", "Stable Diffusion", "Inpainting", "Python", "ML", "Transformers"],
    image: "https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwQUklMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MHx8fHwxNzYzMjczNTc2fDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    title: "Advanced Sentiment Analysis Using Neural Networks",
    dates: "Apr 2022 – July 2022",
    description: "Performed sentiment classification on 430K Amazon product reviews. Implemented and compared RNN architectures (LSTM, GRU) using PyTorch. Improved baseline accuracy by 6% through text preprocessing and Word2Vec embeddings.",
    detailedDescription: [
      "Processed and analyzed 430,000+ Amazon product reviews for sentiment classification",
      "Implemented and compared LSTM and GRU architectures achieving 6% accuracy improvement",
      "Applied advanced text preprocessing: tokenization, lemmatization, stopword removal",
      "Utilized Word2Vec embeddings for semantic representation, achieving 89% validation accuracy"
    ],
    tags: ["NLP", "RNN", "LSTM", "GRU", "PyTorch", "Word2Vec", "Sentiment Analysis"],
    image: "https://images.unsplash.com/photo-1689443111384-1cf214df988a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxmdXR1cmlzdGljJTIwQUklMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MHx8fHwxNzYzMjczNTc2fDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 3,
    title: "GSTN AI/ML Projects Suite",
    dates: "July 2023 – Present",
    description: "Network Optimization: Parallel computing solution reducing 1.5 crore taxpayer network processing from 4 days to <2 hours. Fraud Detection: ML-based Cancellation Risk Score Model (70% recall). NLP Search: HSN code search with Word2Vec + Annoy (microsecond retrieval).",
    detailedDescription: [
      "Network Optimization: Achieved 99%+ improvement (4 days → <2 hours) for 15M+ taxpayer records using parallel computing",
      "Fraud Detection: Built ML-based risk scoring model with 70% recall, identifying high-risk entities",
      "NLP Search Engine: Developed Word2Vec + Annoy-powered HSN code search with microsecond response times",
      "Biometric Auth: Implemented DeepFace + Neo4j vector indexing for millisecond face authentication queries"
    ],
    tags: ["Graph ML", "Fraud Detection", "NLP", "Neo4j", "DeepFace", "Annoy", "Django", "MongoDB"],
    image: "https://images.unsplash.com/photo-1689443111070-2c1a1110fe82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxmdXR1cmlzdGljJTIwQUklMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MHx8fHwxNzYzMjczNTc2fDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 4,
    title: "Parameterized Posit Adder and Multiplier",
    dates: "Jan 2021 – Apr 2021",
    description: "Designed Posit number system converter and arithmetic modules. Achieved improved computational precision over traditional floating-point. Enhanced memory efficiency for numerical computations.",
    detailedDescription: [
      "Designed and implemented parameterized Posit number system converter modules",
      "Developed custom adder and multiplier circuits optimized for Posit arithmetic",
      "Achieved 20%+ improvement in computational precision over IEEE 754 floating-point",
      "Enhanced memory efficiency by 15% through hardware-aware design optimizations"
    ],
    tags: ["Digital Logic", "Posit Arithmetic", "Hardware Design", "Numerical Computing"],
    image: "https://images.unsplash.com/photo-1689443111130-6e9c7dfd8f9e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw0fHxmdXR1cmlzdGljJTIwQUklMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MHx8fHwxNzYzMjczNTc2fDA&ixlib=rb-4.1.0&q=85"
  }
];

export const researchData = [
  {
    id: 1,
    title: "Together Apart: Decoding Support Dynamics in Online COVID-19 Communities",
    authors: "Hitkul J, Aryamann Tomar, Ponnurangam K, et al.",
    venue: "Proceedings of the International Conference on Advances in Social Networks Analysis and Mining (ASONAM)",
    status: "Accepted",
    abstract: "This research investigates how online communities provided social support during the COVID-19 pandemic. Using survival analysis and network theory, we analyzed interaction patterns and support-seeking behaviors, revealing key insights into digital community resilience during global crises.",
    tags: ["Social Networks", "Survival Analysis", "COVID-19", "Community Dynamics", "Data Science"],
    image: "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8fHwxNzYzMjczNTgyfDA&ixlib=rb-4.1.0&q=85"
  }
];

export const skillsData = {
  "Data Science & Machine Learning": {
    skills: ["Python", "PyTorch", "scikit-learn", "TensorFlow", "BERT", "Transformers", "Word2Vec", "Sentiment Analysis", "RNNs (LSTM, GRU)", "CNNs", "Neural Networks", "Survival Analysis", "Clustering (GMM, KNN)", "Classification", "Regression", "Stable Diffusion", "Inpainting", "Image Processing"]
  },
  "Data Engineering & Backend": {
    skills: ["PostgreSQL", "MongoDB", "Neo4j (Graph DB)", "PySpark", "Apache DataSketches", "NodeJS", "TypeScript", "Django", "REST APIs", "Annoy", "FAISS"]
  },
  "Tools & Platforms": {
    skills: ["AWS (Solutions Architect Certified)", "Git", "GitHub", "Docker", "CI/CD", "DeepFace", "Neo4j", "Network Analysis", "Vector Similarity", "Statistical Modeling"]
  },
  "Frontend & Visualization": {
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "VisJS (network graphs)", "Django templates", "Responsive Design", "Component Architecture"]
  },
  "Soft Skills": {
    skills: ["Research & Publication", "Cross-functional Collaboration", "Teaching & Explaining Complex Ideas", "Problem-solving & Optimization", "Project Leadership", "Communication", "Team Mentoring"]
  }
};
