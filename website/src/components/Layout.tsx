import { ArrowUpRight, Github, Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

import summary from '../data/sdk-summary.json';

export const REPOSITORY = 'https://github.com/epam/ai-dial-typescript-sdk';

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="DIAL SDK home">
      <img
        src={`${import.meta.env.BASE_URL}favicon.png`}
        alt=""
        width="26"
        height="26"
        aria-hidden="true"
      />
      <span>
        DIAL<span className="brand-sdk"> SDK</span>
      </span>
    </Link>
  );
}

export function Layout() {
  const { pathname, hash } = useLocation();
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    dialog.current?.close();
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) target.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    const title =
      pathname.replace(/\/+$/, '') === '/getting-started'
        ? 'Get started'
        : 'Your AI stack. Typed.';
    if (!pathname.startsWith('/api')) document.title = `${title} — DIAL SDK`;
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/api">API reference</NavLink>
            <a
              href={REPOSITORY}
              className="icon-link"
              aria-label="DIAL SDK on GitHub"
            >
              <Github size={20} />
            </a>
            <Link className="button button-small" to="/getting-started">
              Get started <ArrowUpRight size={16} />
            </Link>
          </nav>
          <button
            className="mobile-menu icon-button"
            aria-label="Open navigation"
            ref={menuButton}
            onClick={() => dialog.current?.showModal()}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="menu-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onClose={() => menuButton.current?.focus()}
      >
        <div className="menu-sheet">
          <div className="menu-heading">
            <span>Navigation</span>
            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            <Link to="/">Overview</Link>
            <Link to="/getting-started">Get started</Link>
            <Link to="/api">API reference</Link>
            <a href={REPOSITORY}>
              GitHub <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </dialog>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer container">
        <Brand />
        <p>TypeScript, connected to DIAL.</p>
        <div>
          <span>v{summary.version}</span>
          <a href={`${REPOSITORY}/blob/HEAD/LICENSE`}>{summary.license}</a>
          <a href={REPOSITORY}>
            GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </>
  );
}
