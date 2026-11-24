export type Locale = 'en' | 'id';

export const profile = {
  name: 'M. Kaspul Anwar',
  handle: 'anwarpage',
  domain: 'anwar.dev',
  role: {
    en: 'Machine Learning & Software',
    id: 'Machine Learning & Software'
  },
  location: 'Banjarmasin, Indonesia',
  timezone: 'UTC+8',
  email: 'mkaspulanwar2002@gmail.com',
  resumeHref: '/documents/resume.pdf',
  githubHandle: 'anwarpage'
} as const;

export const navCopy = {
  en: {
    index: 'Index',
    projects: 'Projects',
    writing: 'Writing',
    beliefs: 'Beliefs',
    about: 'About'
  },
  id: {
    index: 'Beranda',
    projects: 'Proyek',
    writing: 'Tulisan',
    beliefs: 'Prinsip',
    about: 'Tentang'
  }
} as const;

export const bioCopy = {
  en: {
    label: 'Bio',
    shortTab: 'Brief',
    longTab: 'Extended',
    shortParagraphs: [
      'I am an Information Technology student at Universitas Islam Negeri Antasari Banjarmasin, working at the intersection of machine learning, data systems, and practical software.',
      'Most of my work starts from concrete local problems — assistive computer vision for Indonesian Rupiah banknotes, medical MRI segmentation, public-service portals, and resilient mobile apps.'
    ],
    longParagraphs: [
      'I am M. Kaspul Anwar, a final-year Information Technology student in Banjarmasin (GPA 3.90 / 4.00) focused on turning machine learning experiments into reliable software people can actually use.',
      'Alongside academic research in computer vision and NLP for low-resource regional languages, I intern as a Data Analyst & Scientist at Badan Pusat Statistik (BPS) Martapura and previously served as a Google Cloud Arcade Facilitator guiding 30+ learners through Vertex AI, BigQuery ML, and MLOps.',
      'Outside code, I care deeply about writing things down clearly, keeping systems smaller than they need to be, and building with patience.'
    ],
    portraits: [
      { src: '/profile/profile.avif', alt: 'M. Kaspul Anwar portrait' },
      { src: '/profile/profile-2.avif', alt: 'M. Kaspul Anwar working' },
      { src: '/profile/profile-3.avif', alt: 'M. Kaspul Anwar candid portrait' }
    ]
  },
  id: {
    label: 'Bio',
    shortTab: 'Ringkas',
    longTab: 'Lengkap',
    shortParagraphs: [
      'Saya mahasiswa Teknologi Informasi di Universitas Islam Negeri Antasari Banjarmasin yang fokus pada irisan antara machine learning, pengolahan data, dan rekayasa perangkat lunak.',
      'Sebagian besar karya saya berangkat dari persoalan nyata di sekitar — computer vision bantu hitung uang Rupiah, segmentasi citra MRI, portal layanan publik, hingga aplikasi mobile yang tangguh.'
    ],
    longParagraphs: [
      'Saya M. Kaspul Anwar, mahasiswa tingkat akhir Teknologi Informasi di Banjarmasin (IPK 3.90 / 4.00) yang berfokus membawa eksperimen machine learning menjadi perangkat lunak yang benar-benar dipakai.',
      'Selain riset kampus di bidang computer vision dan NLP untuk bahasa daerah, saya magang sebagai Data Analyst / Scientist di Badan Pusat Statistik (BPS) Martapura dan pernah menjadi Google Cloud Arcade Facilitator yang mendampingi 30+ peserta di jalur Vertex AI, BigQuery ML, dan MLOps.',
      'Di luar kode, saya senang merapikan catatan belajar, menjaga sistem tetap sederhana, dan mengerjakan sesuatu dengan tenang.'
    ],
    portraits: [
      { src: '/profile/profile.avif', alt: 'Potret M. Kaspul Anwar' },
      { src: '/profile/profile-2.avif', alt: 'M. Kaspul Anwar saat fokus bekerja' },
      { src: '/profile/profile-3.avif', alt: 'Potret candid M. Kaspul Anwar' }
    ]
  }
} as const;

export const homeSectionCopy = {
  en: {
    selectedWork: { index: '01', title: 'Selected Work', all: 'All 10 projects' },
    writing: { index: '02', title: 'Writing', all: 'All notes & essays', externalTag: 'Medium' },
    beliefs: {
      index: '03',
      title: 'Principles',
      intro: 'A living list of values I try to build and live by.',
      readAll: 'Read all 8 beliefs'
    },
    elsewhere: {
      index: '04',
      title: 'Elsewhere',
      blurb:
        'Open to conversations around machine learning engineering, applied AI, and thoughtful product work.'
    }
  },
  id: {
    selectedWork: { index: '01', title: 'Karya Pilihan', all: 'Semua 10 proyek' },
    writing: { index: '02', title: 'Tulisan', all: 'Semua catatan & esai', externalTag: 'Medium' },
    beliefs: {
      index: '03',
      title: 'Prinsip',
      intro: 'Daftar nilai yang saya jaga dalam hidup dan saat membangun sistem.',
      readAll: 'Baca semua 8 prinsip'
    },
    elsewhere: {
      index: '04',
      title: 'Kontak & Kanal',
      blurb:
        'Terbuka untuk diskusi seputar machine learning engineering, riset AI terapan, maupun kolaborasi produk.'
    }
  }
} as const;

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/anwarpage', handle: 'github.com/anwarpage' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mkaspulanwar', handle: 'in/mkaspulanwar' },
  { label: 'Medium', href: 'https://medium.com/@mkaspulanwar', handle: '@mkaspulanwar' },
  { label: 'YouTube', href: 'https://www.youtube.com/@mkaspulanwar', handle: '@mkaspulanwar' },
  { label: 'Instagram', href: 'https://instagram.com/mkaspulanwar', handle: '@mkaspulanwar' }
] as const;

export const experiences = {
  en: [
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
  ],
  id: [
    {
      period: 'Agu 2026 – Jan 2027',
      role: 'Data Analyst / Scientist Intern',
      org: 'Badan Pusat Statistik (BPS)',
      location: 'Martapura, Indonesia',
      points: [
        'Mengolah data statistik daerah, analisis eksploratif, serta otomatisasi alur pelaporan.'
      ]
    },
    {
      period: 'Jun 2025 – Des 2025',
      role: 'Google Cloud Arcade Facilitator',
      org: 'Google Cloud Skills Boost',
      location: 'Remote',
      points: [
        'Menyelesaikan alur belajar Machine Learning Engineer (Vertex AI, BigQuery ML, MLOps) melalui 12 lab praktik.',
        'Memfasilitasi kelompok belajar mingguan untuk 30+ peserta lewat walkthrough lab dan sesi diskusi.'
      ]
    }
  ]
} as const;

export const education = {
  en: [
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
  ],
  id: [
    {
      period: 'Sep 2023 – Sekarang',
      degree: 'S1 Teknologi Informasi (S.Kom)',
      school: 'Universitas Islam Negeri Antasari Banjarmasin',
      meta: 'IPK 3.90 / 4.00',
      notes:
        'Fokus pada machine learning, natural language processing untuk bahasa daerah, sistem basis data, dan rekayasa perangkat lunak.'
    },
    {
      period: 'Jun 2018 – Jun 2021',
      degree: 'Matematika & Ilmu Pengetahuan Alam (MIPA)',
      school: 'SMA Islam Al Mazaya Banjarmasin',
      meta: 'Rata-rata 3.80 / 4.00',
      notes: ''
    }
  ]
} as const;

export const expertiseAreas = {
  en: [
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
  ],
  id: [
    {
      title: 'Machine Learning & Computer Vision',
      detail: 'Melatih, mengevaluasi, dan men-deploy model PyTorch, TensorFlow, YOLO, serta MediaPipe.'
    },
    {
      title: 'LLM & Alur Kerja AI',
      detail: 'Membangun pipeline transkripsi, ringkasan dokumen, RAG, dan alur agent berbasis tool.'
    },
    {
      title: 'Backend & Sistem Data',
      detail: 'Merancang layanan FastAPI, pipeline PostgreSQL, Supabase RLS, dan alur data yang rapi.'
    },
    {
      title: 'Antarmuka Web & Mobile',
      detail: 'Membangun aplikasi ringan dengan TypeScript/Next.js, SvelteKit, Kotlin Compose, dan Flutter.'
    }
  ]
} as const;

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

export const technicalNotes = {
  en: [
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
  ],
  id: [
    {
      title: 'Kualitas dataset mengalahkan ukuran model',
      note: 'Pada proyek deteksi uang Rupiah, memotret sendiri uang lecek dan minim cahaya menaikkan akurasi jauh lebih besar dibanding sekadar ganti arsitektur.'
    },
    {
      title: 'Offline-first sangat krusial di lapangan',
      note: 'Saat membangun HafalQ untuk koneksi seluler yang sering tidak stabil, cache fallback 30 hari jauh lebih bernilai daripada animasi mewah.'
    },
    {
      title: 'Ukur biaya cloud dengan skala trafik nyata',
      note: 'Membandingkan on-premise, hybrid, dan public cloud di tiga kampus Banjarmasin membuktikan asumsi cloud yang umum sering tidak cocok di skala lokal.'
    }
  ]
} as const;
