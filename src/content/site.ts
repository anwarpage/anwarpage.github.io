export const profile = {
  name: 'M. Kaspul Anwar',
  handle: 'anwarpage',
  domain: 'anwar.dev',
  role: 'Machine Learning & Software',
  timezone: 'UTC+8',
  email: 'mkaspulanwar2002@gmail.com',
  githubHandle: 'anwarpage'
} as const;

export const contentNavLinks = [
  { slug: 'about', label: 'Who I am' },
  { slug: 'work', label: "What I've built" },
  { slug: 'contributions', label: "Where I've contributed" },
  { slug: 'beliefs', label: 'What I believe' },
  { slug: 'writing', label: "What I've written" },
  { slug: 'contact', label: 'How to reach me' }
] as const;

export const bioCopy = {
  shortParagraphs: [
    'I am an Information Technology student at Universitas Islam Negeri Antasari Banjarmasin, working at the intersection of machine learning, data systems, and practical software.',
    'Most of my work starts from concrete local problems — assistive computer vision for Indonesian Rupiah banknotes, medical MRI segmentation, public-service portals, and resilient mobile apps.'
  ],
  longParagraphs: [
    'I am M. Kaspul Anwar, a final-year Information Technology student (GPA 3.90 / 4.00) focused on turning machine learning experiments into reliable software people can actually use.',
    'Alongside academic research in computer vision and NLP for low-resource regional languages, I intern as a Data Analyst & Scientist at Badan Pusat Statistik (BPS) Martapura and previously served as a Google Cloud Arcade Facilitator guiding 30+ learners through Vertex AI, BigQuery ML, and MLOps.',
    'Outside code, I care deeply about writing things down clearly, keeping systems smaller than they need to be, and building with patience.'
  ],
  portraits: [
    { src: '/profile/profile.avif', alt: 'M. Kaspul Anwar portrait' },
    { src: '/profile/profile-2.avif', alt: 'M. Kaspul Anwar working' },
    { src: '/profile/profile-3.avif', alt: 'M. Kaspul Anwar candid portrait' }
  ]
} as const;

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/anwarpage', handle: 'github.com/anwarpage' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mkaspulanwar', handle: 'in/mkaspulanwar' },
  { label: 'Medium', href: 'https://medium.com/@mkaspulanwar', handle: '@mkaspulanwar' },
  { label: 'YouTube', href: 'https://www.youtube.com/@mkaspulanwar', handle: '@mkaspulanwar' },
  { label: 'Instagram', href: 'https://instagram.com/mkaspulanwar', handle: '@mkaspulanwar' }
] as const;

export const experiences = [
  {
    period: 'Aug 2026 – Jan 2027',
    role: 'Data Analyst / Scientist Intern',
    org: 'Badan Pusat Statistik (BPS)',
    location: 'Martapura, Indonesia',
    points: [
      'Working with regional statistical datasets, exploratory analysis, and automated reporting workflows.'
    ]
  },
  {
    period: 'Jun 2025 – Dec 2025',
    role: 'Google Cloud Arcade Facilitator',
    org: 'Google Cloud Skills Boost',
    location: 'Remote',
    points: [
      'Completed the Machine Learning Engineer path covering Vertex AI, BigQuery ML, and MLOps across 12 hands-on labs.',
      'Facilitated weekly study groups for 30+ participants with practical walkthroughs and troubleshooting guides.'
    ]
  }
] as const;

export interface OrganizationEntry {
  period: string;
  role: string;
  org: string;
  location?: string;
  points: readonly string[];
}

export interface HonorEntry {
  year: string;
  title: string;
  issuer: string;
  note?: string;
}

export const organizations: readonly OrganizationEntry[] = [];

export const honors: readonly HonorEntry[] = [];

export const education = [
  {
    period: 'Sep 2023 – Present',
    degree: 'B.Sc. in Information Technology (S.Kom)',
    school: 'Universitas Islam Negeri Antasari Banjarmasin',
    meta: 'GPA 3.90 / 4.00',
    notes:
      'Focus on machine learning, natural language processing for low-resource regional languages, database systems, and software engineering.'
  },
  {
    period: 'Jun 2018 – Jun 2021',
    degree: 'Science & Mathematics (MIPA)',
    school: 'SMA Islam Al Mazaya Banjarmasin',
    meta: 'GPA 3.80 / 4.00',
    notes: ''
  }
] as const;

export const expertiseAreas = [
  {
    title: 'Machine Learning & Computer Vision',
    detail: 'Training, evaluating, and shipping PyTorch, TensorFlow, YOLO, and MediaPipe models.'
  },
  {
    title: 'LLM & AI Workflows',
    detail: 'Building transcription, summarization, RAG pipelines, and tool-using agent flows.'
  },
  {
    title: 'Backend & Data Systems',
    detail: 'Designing FastAPI services, PostgreSQL pipelines, Supabase RLS, and reproducible ETL.'
  },
  {
    title: 'Web & Mobile Interfaces',
    detail: 'Shipping focused TypeScript/Next.js, SvelteKit, Kotlin Jetpack Compose, and Flutter apps.'
  }
] as const;

export const toolkitGroups = [
  {
    label: 'Languages',
    items: ['Python', 'TypeScript', 'C++', 'Kotlin', 'Dart', 'SQL']
  },
  {
    label: 'ML & Data',
    items: ['PyTorch', 'TensorFlow', 'Ultralytics YOLO', 'OpenCV', 'MediaPipe', 'JupyterLab', 'Power BI']
  },
  {
    label: 'Web & Systems',
    items: ['Next.js', 'SvelteKit', 'FastAPI', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vercel']
  }
] as const;

export const technicalNotes = [
  {
    title: 'Dataset quality beats model size',
    note: 'In our Rupiah detection work, photographing crumpled and dim-lit notes by hand moved accuracy far more than swapping architectures.'
  },
  {
    title: 'Offline-first matters outside capital cities',
    note: 'When building HafalQ for students on unstable mobile connections, 30-day cache fallback mattered more than any animation.'
  },
  {
    title: 'Measure cloud cost against real traffic',
    note: 'Comparing on-premise, hybrid, and public cloud across three Banjarmasin campuses showed default cloud assumptions often miss local scale.'
  }
] as const;
