import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-full bg-[--color-canvas] text-[--color-text]" style={{ fontFamily: "var(--font-sans)" }}>
      <header className="sticky top-0 z-10 bg-[--color-canvas]/90 backdrop-blur border-b border-[--color-border]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-mono font-bold text-[--color-accent] text-sm tracking-tight">
            WL
          </Link>
          <Link to="/" className="font-mono text-xs text-[--color-muted] hover:text-[--color-text] transition-colors">
            ← home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-mono text-[--color-accent] text-xs tracking-widest uppercase mb-3">
          / contact
        </p>

        <h1
          className="font-mono font-extrabold text-[--color-text] mb-8 leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Get in Touch
        </h1>

        <p className="text-[--color-muted] text-lg leading-relaxed mb-12 max-w-2xl">
          I'm always open to new opportunities, collaborations, or just a chat about tech and nature.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 border border-[--color-border] rounded-sm">
            <span className="font-mono text-[--color-accent] text-sm">📧</span>
            <a
              href="mailto:your.email@example.com"
              className="font-mono text-[--color-text] hover:text-[--color-accent] transition-colors"
            >
              your.email@example.com
            </a>
          </div>

          <div className="flex items-center gap-4 p-4 border border-[--color-border] rounded-sm">
            <span className="font-mono text-[--color-accent] text-sm">🐙</span>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[--color-text] hover:text-[--color-accent] transition-colors"
            >
              github.com/yourusername
            </a>
          </div>

          <div className="flex items-center gap-4 p-4 border border-[--color-border] rounded-sm">
            <span className="font-mono text-[--color-accent] text-sm">🔗</span>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[--color-text] hover:text-[--color-accent] transition-colors"
            >
              linkedin.com/in/yourusername
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-[--color-border] max-w-5xl mx-auto px-6 py-8">
        <Link to="/" className="font-mono text-xs text-[--color-muted] hover:text-[--color-accent] transition-colors">
          ← back to home
        </Link>
      </footer>
    </div>
  );
}