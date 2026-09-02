import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { PROJECTS } from "../data/projects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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
      "JSON": "#f5a623"
    };
    return colors[lang] || "#6cbf8a";
  };

  if (!project) {
    return (
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Project not found.</p>
        <Link
          to="/"
          state={{ fromProject: true }}
          className="not-found-link"
        >
          ← back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            WL
          </Link>
          <Link
            to="/"
            state={{ fromProject: true }}
            className="project-detail-back-link"
          >
            ← back to projects
          </Link>
        </div>
      </header>

      <main className="project-detail-main">
        <p className="project-detail-label">project</p>
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-description">{project.description}</p>

        <div className="project-detail-tags">
          {project.langs.map((lang) => {
            const color = getTagColor(lang);
            return (
              <span
                key={lang}
                className="project-detail-tag"
                style={{
                  border: `1px solid ${color}`,
                  backgroundColor: `${color}15`
                }}
              >
                {lang}
              </span>
            );
          })}
        </div>

        <div className="project-detail-screenshot">
          <p className="project-detail-screenshot-icon">📸</p>
          <p className="project-detail-screenshot-text">Screenshot coming soon</p>
        </div>

        <div className="project-detail-actions">
          <a
            href={project.githubUrl || "https://github.com/wendylogan"}
            target="_blank"
            rel="noreferrer"
            className="project-detail-github-btn"
          >
            view on GitHub →
          </a>
        </div>
      </main>

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