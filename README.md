# Abilash — Frontend / React.js Developer Portfolio

React + JavaScript + Tailwind CSS (v4) portfolio, built with Vite, Framer Motion and lucide-react.

## Run

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Personalize

All personal content lives in **`src/data/portfolio.js`**. Search for `PLACEHOLDER`:

| What | Where |
| --- | --- |
| Email, GitHub, LinkedIn | `links` |
| Resume | Put your PDF at `public/resume.pdf` (or change `links.resume`) |
| Company, dates, location | `experience` |
| Project live / GitHub links | `projects[].liveUrl`, `projects[].githubUrl` (empty = disabled button) |
| Project screenshots | Put images in `public/projects/` and set `projects[].screenshots.desktop / tablet / mobile` |

Until screenshots are added, Promo and Dorsin show neutral layout wireframes labelled "Layout preview".

## Contact form

There is no backend. A valid submission opens the visitor's email client with the message pre-filled
(`mailto:`). To send directly, replace `onSubmit` in `src/components/Contact.jsx` with a call to your API or a form service.

## Structure

```
src/
├── components/
│   ├── Navbar, Hero, About, Skills, Experience, Projects,
│   │   ResponsiveShowcase, Services, DevelopmentProcess,
│   │   ResumeCTA, Contact, Footer (.jsx)
│   └── ui/  Reveal, SectionHeading, DeviceMockups, BrandIcons
├── data/portfolio.js
├── App.jsx
├── main.jsx
└── index.css
```
