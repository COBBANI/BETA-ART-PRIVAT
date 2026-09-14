import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
export function NotFoundPage() {
  usePageMeta({ title: 'Not Found | Beta Art', description: 'The requested Beta Art page could not be found.', path: window.location.pathname });
  return <main className="page-shell"><p className="eyebrow">404</p><h1>Record not found.</h1><p className="page-lead">The page may have moved, or the plate may not be published.</p><Link className="button button-dark" to="/">Return to archive</Link></main>;
}
