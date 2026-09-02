/*
Home.tsx
- Main landing page with hero, about, skills, projects, and contact sections
- Skills filtering by category with show more/less
- Projects filtering by language with show more/less
- Responsive project cards: 
*/

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { PROJECTS } from "../data/projects";
import { SKILLS } from "../data/skills";

export default function Home() {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ALL");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("ALL");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [initialProjectsToShow, setInitialProjectsToShow] = useState(4);
  const INITIAL_SKILLS = 10;
  const location = useLocation();

  // Detect screen size and set initial project count
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setInitialProjectsToShow(2); // Mobile: show 1 per row, limit to 2 project cards initially
      } else if (width < 1024) {
        setInitialProjectsToShow(2); // Tablet: limit to 2 project cards initially
      } else {
        setInitialProjectsToShow(3); // Desktop: limit to 3 projects initially
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync visibleProjects when initialProjectsToShow changes
  useEffect(() => {
    setVisibleProjects(initialProjectsToShow);
  }, [initialProjectsToShow]);

  useEffect(() => {
    if (location.state?.fromProject) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        setTimeout(() => {
          projectsSection.scrollIntoView({ behavior: 'instant', block: 'start' });
        }, 50);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Flatten skills from categorized structure
  const allSkills = SKILLS.flatMap(category => 
    category.items.map(skill => ({
      name: skill,
      category: category.category
    }))
  );

  // Define priority for top 10 skills
  const skillPriority: Record<string, number> = {
    "TypeScript": 1,
    "JavaScript": 2,
    "React": 3,
    "Python": 4,
    "Java": 5,
    "HTML": 6,
    "CSS": 7,
    "Git": 8,
    "Active Directory": 9,
    "VPN & Networking": 10,
  };

// Sort skills by priority (top 10 first)
  const sortedSkills = [...allSkills].sort((a, b) => {
    const priorityA = skillPriority[a.name] || 999;
    const priorityB = skillPriority[b.name] || 999;
    return priorityA - priorityB;
  });

  const categoryColors: Record<string, string> = {
    "Languages": "#6cbf8a",
    "Frameworks & Libraries": "#4a9eff",
    "Tools & Platforms": "#f5a623",
    "IT & Support": "#9b59b6",
    "Customer Service": "#ff6b6b",
    "Documentation": "#e85d75"
  };

  // Get unique categories from SKILLS
  const skillCategories = ["ALL", ...SKILLS.map(c => c.category)];

  // Filter skills by category
  const filteredSkills = selectedSkillCategory === "ALL"
    ? sortedSkills
    : sortedSkills.filter(skill => skill.category === selectedSkillCategory);

  // Show 10 skills initially, or all if showAllSkills is true
  const visibleSkills = showAllSkills 
    ? filteredSkills 
    : filteredSkills.slice(0, INITIAL_SKILLS);

  const getTagColor = (lang: string) => {
    const colors: Record<string, string> = {
      "JavaScript": "#f7df1e",
      "HTML": "#e34f26",
      "CSS": "#264de4",
      "Java": "#b07219",
      "Gson": "#4c8c4a",
      "REST API": "#00b4d8",
      "LocalStorage": "#8a2be2",
      "Swing": "#2d8f4e",
      "MVC Pattern": "#d4a373",
      "Sockets": "#6a4c9c",
      "Networking": "#3a86ff",
      "JSON": "#f5a623",
      "Python": "#3776ab",
      "React": "#61dafb",
      "Node.js": "#339933",
      "Express": "#000000",
      "MongoDB": "#4c8c4a",
      "Firebase": "#ffca28",
      "Testing Library": "#e33332",
      "Selenium": "#43b02a",
      "Jest": "#c21325",
      "PowerShell": "#012456",
      "Active Directory": "#0072c6"
    };
    return colors[lang] || "#6cbf8a";
  };

  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const priorityA = (a as any).priority || 999;
    const priorityB = (b as any).priority || 999;
    return priorityA - priorityB;
  });

  const allLanguages = Array.from(
    new Set(PROJECTS.flatMap(p => p.langs))
  );

  const sortedLanguages = allLanguages.sort((a, b) => {
    const countA = PROJECTS.filter(p => p.langs.includes(a)).length;
    const countB = PROJECTS.filter(p => p.langs.includes(b)).length;
    return countB - countA;
  });

  const filteredProjects = selectedLanguage === "ALL"
    ? sortedProjects
    : sortedProjects.filter(p => p.langs.includes(selectedLanguage));

  const visibleProjectsList = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">WL</Link>
          <nav className="nav">
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-button"
            >
              about
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="nav-button"
            >
              skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="nav-button"
            >
              projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-button"
            >
              contact
            </button>
          </nav>
        </div>
      </header>

      <section id="hero" className="hero-section">
        <p className="hero-badge">// HELLO WORLD</p>
        <h1 className="hero-title">Wendy Logan</h1>
        <p className="hero-subtitle">
          IT professional passionate about software development, IT support, and helping people navigate technical challenges. Actively seeking new opportunities.
        </p>
        <button
          onClick={() => scrollToSection('projects')}
          className="hero-button"
        >
          view projects
        </button>
      </section>

      <section id="about" className="section">
        <p className="section-label">01 / ABOUT</p>
        <h2 className="section-title">Who I am</h2>
        <p className="section-description">
          I hold a B.S. in Information Sciences and Technology with a focus in Design and Development, and I'm currently working toward my CompTIA A+ certification.
        </p>
        <p className="section-description">
          I enjoy working across the stack — from building web interfaces to troubleshooting technical issues and helping people feel confident with technology.
        </p>
        <p className="section-description">
          When I'm not coding or studying for certs, you'll find me tending to my collection of indoor plants or being the fun aunt for my niece and nephew.
        </p>             
        <div className="about-grid">
          <span className="about-label">Degree</span>
          <span className="about-value">B.S. Information Sciences and Technology (IST)</span>
          
          <span className="about-label">Focus</span>
          <span className="about-value">Design and Development</span>
          
          <span className="about-label">Certifications</span>
          <span className="about-value">CompTIA A+ (In Progress)</span>
          
          <span className="about-label">Status</span>
          <span className="about-value">Open to work</span>
          
          <span className="about-label">Location</span>
          <span className="about-value">Lloyd Harbor, NY</span>
        </div>
      </section>

      <section id="skills" className="section">
        <p className="section-label">02 / SKILLS</p>
        <h2 className="section-title">What I bring</h2>
        <p className="section-description">
          Filter by category:
        </p>

        <div className="skills-filter">
          {skillCategories.map((category) => {
            const isActive = selectedSkillCategory === category;
            const color = category === "ALL" ? '#b9b9c6' : categoryColors[category];
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedSkillCategory(category);
                  setShowAllSkills(false);
                }}
                className={`skill-filter-button ${isActive ? 'active' : ''}`}
                style={{ 
                  '--filter-color': color,
                } as React.CSSProperties}
              >
                <span className="skill-dot" style={{ backgroundColor: color }} />
                {category}
              </button>
            );
          })}
        </div>

        <hr className="skill-divider" />

        <div className="skills-grid">
          {visibleSkills.map((skill) => {
            const color = categoryColors[skill.category] || '#6cbf8a';
            return (
              <span key={skill.name} className="skill-tag">
                <span className="skill-dot" style={{ backgroundColor: color }} />
                {skill.name}
              </span>
            );
          })}
        </div>

        {/* Show More / Show Less Controls */}
        <div>
          {filteredSkills.length > INITIAL_SKILLS && (
            <button
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="skill-toggle"
            >
              {showAllSkills ? '↑ show less' : `↓ show ${filteredSkills.length - INITIAL_SKILLS} more`}
            </button>
          )}

          <div className="skill-count">
            showing {visibleSkills.length} of {filteredSkills.length} skills
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <p className="section-label">03 / PROJECTS</p>
        <h2 className="section-title">Things I've built</h2>
        <p className="section-description">
          Filter by category:
        </p>

      <div className="projects-filter">
        <button
          onClick={() => {
            setSelectedLanguage("ALL");
            setVisibleProjects(initialProjectsToShow);
          }}
          className={`project-filter-button ${selectedLanguage === "ALL" ? 'all-active' : ''}`}
        >
          <span className="project-dot" style={{ backgroundColor: selectedLanguage === "ALL" ? 'var(--color-text-dim)' : 'var(--color-text-dimmer)' }} />
          ALL ({sortedProjects.length})
        </button>
        {sortedLanguages.map((lang) => {
          const count = sortedProjects.filter(p => p.langs.includes(lang)).length;
          const color = getTagColor(lang);
          const isActive = selectedLanguage === lang;
          return (
            <button
              key={lang}
              onClick={() => {
                setSelectedLanguage(lang);
                setVisibleProjects(initialProjectsToShow);
              }}
              className={`project-filter-button ${isActive ? 'active' : ''}`}
              style={{ 
                '--filter-color': color
              } as React.CSSProperties}
            >
              <span className="project-dot" style={{ backgroundColor: color }} />
              {lang} ({count})
            </button>
          );
        })}
      </div>

        <div className="projects-grid">
          {visibleProjectsList.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              state={{ fromProject: true }}
              className="project-card"
            >
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl || "https://github.com/wendylogan", "_blank");
                  }}
                  className="project-github-link"
                >
                  GitHub ↗
                </button>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.langs.map((lang) => {
                  const color = getTagColor(lang);
                  return (
                    <span key={lang} className="project-tag">
                      <span className="project-tag-dot" style={{ backgroundColor: color }} />
                      {lang}
                    </span>
                  );
                })}
              </div>
              <span className="project-details-link">view details →</span>
            </Link>
          ))}
        </div>

        <div>
          {hasMoreProjects && (
            <button
              onClick={() => {
                const newCount = Math.min(visibleProjects + 4, filteredProjects.length);
                setVisibleProjects(newCount);
              }}
              className="project-toggle"
            >
              ↓ show {filteredProjects.length - visibleProjects} more
            </button>
          )}

          {!hasMoreProjects && visibleProjects > initialProjectsToShow && (
            <button
              onClick={() => setVisibleProjects(initialProjectsToShow)}
              className="project-toggle"
            >
              ↑ show less
            </button>
          )}

          <div className="project-count">
            showing {visibleProjects} of {filteredProjects.length} projects
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="section-label">04 / CONTACT</p>
        <h2 className="section-title">Let's connect</h2>
        <p className="contact-text">
          I'm currently open to new opportunities in software development, IT support, and related roles. 
          If you have my resume, you already have my contact information — feel free to reach out.
        </p>
        <p className="contact-note">
          (For privacy, I don't share my email or phone publicly — but I'd love to hear from you through the channels on my resume.)
        </p>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-copyright">© {new Date().getFullYear()} Wendy Logan</p>
          <div className="footer-social">
            <a
              href="https://github.com/wendylogan"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/wendy-logan"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <span className="footer-built-with">built with React + Vite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}