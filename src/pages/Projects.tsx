/*
Projects.tsx
- Display list of projects cards
- Each project card features project title, descriptiom, and tags for technical concepts
- Filtering by tag feature
- Show more dropdown
*/

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  // 👇 This should start at 4
  const [visibleProjects, setVisibleProjects] = useState(4);
  const INITIAL_PROJECTS = 4;

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

  // 👇 Only show up to visibleProjects count
  const visibleProjectsList = PROJECTS.slice(0, visibleProjects);
  
  // 👇 Check if there are more projects to show
  const hasMoreProjects = visibleProjects < PROJECTS.length;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a1628', 
      color: '#e8e8f0',
      fontFamily: 'monospace'
    }}>
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 10, 
        backgroundColor: 'rgba(10,22,40,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #576c97',
        padding: '1rem 1.5rem'
      }}>
        <div style={{ 
          maxWidth: '64rem', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ 
            fontWeight: 'bold', 
            color: '#6cbf8a', 
            fontSize: '1.25rem'
          }}>
            WL
          </Link>
          <Link to="/" style={{ 
            color: '#b9b9c6', 
            fontSize: '0.8rem'
          }}>
            ← home
          </Link>
        </div>
      </header>

      <section style={{ 
        maxWidth: '64rem', 
        margin: '0 auto', 
        padding: '5rem 1.5rem'
      }}>
        <p style={{ 
          color: '#6cbf8a', 
          fontSize: '0.8rem', 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase',
          marginBottom: '0.5rem'
        }}>
          / projects
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2.5rem'
        }}>
          <h1 style={{ 
            fontWeight: '800', 
            color: '#e8e8f0', 
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: '1.2'
          }}>
            My Projects
          </h1>
          <span style={{ color: '#4a6a8a', fontSize: '0.8rem' }}>
            {PROJECTS.length} total
          </span>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {visibleProjectsList.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              style={{
                border: '1px solid #3a5a7a',
                padding: '1.25rem',
                borderRadius: '0.375rem',
                transition: 'border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8a9aaa'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#3a5a7a'}
            >
              <h3 style={{ 
                color: '#e8e8f0', 
                fontSize: '1rem', 
                fontWeight: '700',
                marginBottom: '0.5rem'
              }}>
                {project.title}
              </h3>
              <p style={{ 
                color: '#b9b9c6', 
                fontSize: '0.8rem', 
                lineHeight: '1.6', 
                marginBottom: '0.75rem', 
                flex: 1 
              }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.langs.slice(0, 3).map((lang) => {
                  const color = getTagColor(lang);
                  return (
                    <span
                      key={lang}
                      style={{
                        color: '#e8e8f0',
                        border: '1px solid #4a6a8a',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        backgroundColor: 'transparent',
                        fontSize: '0.7rem'
                      }}
                    >
                      <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        flexShrink: 0
                      }} />
                      {lang}
                    </span>
                  );
                })}
                {project.langs.length > 3 && (
                  <span style={{
                    color: '#b9b9c6',
                    border: '1px solid #4a6a8a',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.7rem'
                  }}>
                    +{project.langs.length - 3}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Show More / Show Less - Exactly like Skills section */}
        {hasMoreProjects && (
          <button
            onClick={() => setVisibleProjects(prev => Math.min(prev + 4, PROJECTS.length))}
            style={{
              background: 'none',
              border: 'none',
              color: '#6cbf8a',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontFamily: 'monospace',
              textAlign: 'left',
              padding: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#8a9aaa'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6cbf8a'}
          >
            ↓ show {PROJECTS.length - visibleProjects} more
          </button>
        )}

        {!hasMoreProjects && visibleProjects > INITIAL_PROJECTS && (
          <button
            onClick={() => setVisibleProjects(INITIAL_PROJECTS)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6cbf8a',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontFamily: 'monospace',
              textAlign: 'left',
              padding: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#8a9aaa'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6cbf8a'}
          >
            ↑ show less
          </button>
        )}

        {/* Optional: Show count indicator */}
        <div style={{ 
          marginTop: '0.5rem',
          fontSize: '0.7rem',
          color: '#4a6a8a',
          fontFamily: 'monospace'
        }}>
          showing {visibleProjects} of {PROJECTS.length} projects
        </div>
      </section>

      <footer style={{ 
        borderTop: '1px solid #576c97',
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        <Link to="/" style={{ 
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          color: '#b9b9c6',
          textDecoration: 'none'
        }}>
          ← back to home
        </Link>
      </footer>
    </div>
  );
}