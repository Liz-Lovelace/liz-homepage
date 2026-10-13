// Browser entry: hydrate the server-rendered HTML, after which links are handled in place.
import { hydrateRoot } from 'react-dom/client';
import { Router } from './router.jsx';
import App from './App.jsx';
import { installErrorReporting } from './report.js';
import './styles.css';

installErrorReporting();

hydrateRoot(
  document.getElementById('root'),
  <Router url={location.pathname + location.search}>
    <App />
  </Router>
);
