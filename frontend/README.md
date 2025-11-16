# Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and shadcn/ui components.

## Features

- 🎨 Modern UI with gradient effects and animations
- 📱 Fully responsive design
- 🌙 Dark theme optimized
- ⚡ Fast performance with React
- 🎯 Smooth scrolling navigation
- 📊 Interactive skill progress bars
- 📧 Contact form with validation
- 🎵 Music section showcase

## Tech Stack

- **Frontend Framework:** React 19
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Icons:** Lucide React
- **Build Tool:** Create React App with CRACO
- **Form Handling:** React Hook Form
- **Animations:** Custom CSS + Tailwind

## Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── button.jsx
│   │   │   ├── input.jsx
│   │   │   ├── textarea.jsx
│   │   │   ├── toast.jsx
│   │   │   └── toaster.jsx
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── JourneySection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ResearchSection.jsx
│   │   ├── ModernSkillsSection.jsx
│   │   ├── MusicSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Footer.jsx
│   │   └── SkillProgressBar.jsx
│   ├── data/
│   │   ├── content.js       # Portfolio content data
│   │   └── skillsProgress.js # Skills data with levels
│   ├── hooks/
│   │   ├── useTypewriter.js
│   │   ├── useInView.js
│   │   └── use-toast.js
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── craco.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── components.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
# or
yarn build
```

## Customization

### Update Personal Information

Edit `src/data/content.js` to update:
- Personal information (name, email, social links)
- Journey timeline
- Experience details
- Projects
- Research publications

### Update Skills

Edit `src/data/skillsProgress.js` to modify:
- Skill categories
- Individual skills with levels and years of experience
- Category icons and colors

### Styling

- Main colors and theme: `src/index.css`
- Component-specific styles: Individual component files
- Tailwind configuration: `tailwind.config.js`

## Sections

1. **Hero** - Introduction with typewriter effect
2. **Journey** - Timeline of education and career
3. **Experience** - Detailed work experience
4. **Projects** - Portfolio of technical projects
5. **Research** - Academic publications
6. **Skills** - Technical skills with progress bars
7. **Music** - Creative pursuits and hobbies
8. **Contact** - Contact form and social links

## License

All rights reserved.

## Contact

For any inquiries, please reach out through the contact form on the website.

