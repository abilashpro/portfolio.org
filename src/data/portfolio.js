/**
 * Central content file for the portfolio.
 *
 * Everything that is personal or not yet known (links, email, resume,
 * screenshots, company details) lives here so it can be edited in one place.
 * Values marked `PLACEHOLDER` should be replaced with real information.
 */

// Resolve a file in /public against Vite's base path (e.g. /Portfolio/ on GitHub Pages).
const asset = (path) => (path ? import.meta.env.BASE_URL + path.replace(/^\//, '') : path)

export const profile = {
  name: 'Abilash',
  role: 'Frontend / React.js Developer',
  // Optional: put a photo in /public (e.g. /abilash.jpg) and set the path here.
  // Leave '' to show the workspace illustration instead.
  photo: asset('/abilash-avatar.webp'),
  tagline:
    'I build modern, responsive, and scalable web interfaces using React.js, JavaScript, Tailwind CSS, and modern UI technologies.',
  intro:
    'I specialize in building modern, responsive, reusable, and user-friendly web applications using React.js, JavaScript, Tailwind CSS, MUI, REST APIs, and modern frontend libraries.',
  focus:
    'My main focus is creating clean interfaces, reusable components, responsive layouts, mobile-friendly experiences, API-driven applications, and maintainable frontend architectures.',
}

// Set a value to '' to hide it.
export const links = {
  email: 'abilashab017@gmail.com',
  github: 'https://github.com/abilashpro',
  linkedin: 'https://www.linkedin.com/in/abilash-chinnaiah/',
  // Resume PDF lives in /public.
  resume: asset('/Abilash.pdf'),
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export const aboutHighlights = [
  'React.js development',
  'JavaScript development',
  'Responsive web design',
  'Mobile responsive development',
  'Reusable React components',
  'REST API integration',
  'Dynamic forms',
  'Form validation',
  'Dropdowns',
  'Modals',
  'Loaders',
  'Tabs',
  'Rich text editors',
  'UI optimization',
  'Cross-device compatibility',
]

// Stats derived from real portfolio content.
export const stats = [
  { value: '2.5+', label: 'Years of experience' },
  { value: '2', label: 'Featured projects' },
  { value: '16', label: 'Technologies & libraries' },
  { value: '3', label: 'Device classes targeted', note: 'Desktop · Tablet · Mobile' },
]

export const experience = {
  position: 'Frontend / React.js Developer',
  company: 'Misfits Change Makers Pvt Limited',
  period: '24 March 01 – Present',
  location: 'Chennai',
  groups: [
    {
      title: 'React & UI Development',
      items: [
        'Developed responsive web applications using React.js and JavaScript.',
        'Created reusable React components and feature modules.',
        'Built responsive layouts using Tailwind CSS.',
        'Developed dynamic forms, dropdowns, modals, tabs, loaders, and validation.',
      ],
    },
    {
      title: 'Responsive & Cross-Device',
      items: [
        'Implemented responsive designs for desktop, tablet, and mobile devices.',
        'Optimized UI behavior across different screen sizes.',
      ],
    },
    {
      title: 'API Integration',
      items: ['Integrated REST APIs into frontend applications.'],
    },
    {
      title: 'Rich Text Editor',
      items: [
        'Customized rich text editor functionality.',
        'Added emoji picker, mentions, and image upload functionality.',
      ],
    },
    {
      title: 'Frontend Libraries',
      items: [
        'Worked with Tippy.js for tooltips and contextual UI.',
        'Used Day.js for date-related functionality.',
        'Used SortableJS for drag-and-drop interactions.',
        'Used React Toastify for user notifications.',
      ],
    },
    {
      title: 'Debugging & Collaboration',
      items: [
        'Fixed issues related to form validation, API loading states, dropdown dependencies, image uploads, editor interactions, and responsive UI behavior.',
        'Used Git and GitHub for version control and collaborative development.',
      ],
    },
  ],
  stack: [
    'React.js',
    'JavaScript',
    'Tailwind CSS',
    'MUI',
    'REST APIs',
    'Laravel',
    'Summernote',
    'Tippy.js',
    'Day.js',
    'SortableJS',
    'React Toastify',
    'Git',
  ],
}

/**
 * Projects. To show real screenshots, put images in /public/projects/ and set
 * the paths below, e.g. desktop: asset('/projects/promo-desktop.webp').
 * Leave as null to show the neutral placeholder preview.
 */
export const projects = [
  {
    id: 'promo',
    name: 'Promzivo',
    badge: 'Fully Responsive',
    description:
      'Promzivo is a responsive web project focused on creating a clean and modern user interface that works smoothly across desktop, tablet, and mobile devices.',
    highlights: [
      'Responsive web design',
      'Mobile-first layouts',
      'Clean UI',
      'Responsive navigation',
      'Responsive sections',
      'Flexible grids',
      'Mobile-friendly components',
      'Cross-device compatibility',
    ],
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    liveUrl: 'https://abilashpro.github.io/Project-PR-2/',
    githubUrl: 'https://github.com/abilashpro/Project-PR-2',
    screenshots: {
      desktop: asset('/projects/promo-desktop.webp'),
      tablet: asset('/projects/promo-tablet.webp'),
      mobile: asset('/projects/promo-mobile.webp'),
    },
  },
  {
    id: 'dorsin',
    name: 'Darsin',
    badge: 'Responsive Mobile Design',
    description:
      'Darsin is a responsive web project where I focused on transforming the interface into a clean, responsive experience across desktop, tablet, and mobile screen sizes.',
    highlights: [
      'Responsive mobile view',
      'Desktop responsiveness',
      'Tablet layout',
      'Mobile navigation',
      'Responsive typography',
      'Responsive cards',
      'Flexible layouts',
      'Cross-device UI consistency',
    ],
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    liveUrl: 'https://abilashpro.github.io/Project-1/',
    githubUrl: 'https://github.com/abilashpro/Project-1',
    screenshots: {
      desktop: asset('/projects/dorsin-desktop.webp'),
      tablet: asset('/projects/dorsin-tablet.webp'),
      mobile: asset('/projects/dorsin-mobile.webp'),
    },
  },
]
