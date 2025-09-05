<template>
  <div class="app-container">
    <!-- Skip to Content Link for Screen Readers -->
    <a href="#main-content" class="visually-hidden-focusable skip-link">
      Skip to main content
    </a>
    
    <header role="banner" class="app-header">
      <nav class="navbar navbar-expand-lg" role="navigation" aria-label="Main navigation">
        <div class="container">
          <!-- Brand/Logo -->
          <router-link to="/" class="navbar-brand" aria-label="COVID-19 Dashboard Home">
            <span class="brand-icon" aria-hidden="true">🦠</span>
            <span class="brand-text">COVID-19 Stats</span>
          </router-link>

          <!-- Mobile Menu Toggle -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation menu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Navigation Menu -->
          <div id="main-nav" class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" role="menubar">
              <li class="nav-item" role="none">
                <router-link to="/" class="nav-link" role="menuitem" aria-label="Global statistics">
                  <span class="nav-icon" aria-hidden="true">🌍</span>
                  <span class="nav-text">Global</span>
                </router-link>
              </li>
              <li class="nav-item" role="none">
                <router-link to="/countries" class="nav-link" role="menuitem" aria-label="Country statistics">
                  <span class="nav-icon" aria-hidden="true">🏳️</span>
                  <span class="nav-text">Countries</span>
                </router-link>
              </li>
              <li class="nav-item" role="none">
                <router-link to="/states" class="nav-link" role="menuitem" aria-label="US state statistics">
                  <span class="nav-icon" aria-hidden="true">🇺🇸</span>
                  <span class="nav-text">US States</span>
                </router-link>
              </li>
              <li class="nav-item" role="none">
                <router-link to="/historical" class="nav-link" role="menuitem" aria-label="Historical data">
                  <span class="nav-icon" aria-hidden="true">📈</span>
                  <span class="nav-text">Historical</span>
                </router-link>
              </li>
            </ul>
            
            <!-- External Links -->
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="menubar" aria-label="External resources">
              <li class="nav-item" role="none">
                <a
                  class="nav-link external-link"
                  href="https://nys.covid.casjay.coffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  aria-label="New York State COVID data (opens in new tab)"
                >
                  <span class="nav-text">NYS Data</span>
                  <span class="external-icon" aria-hidden="true">↗</span>
                </a>
              </li>
              <li class="nav-item" role="none">
                <a
                  class="nav-link external-link"
                  href="https://location.covid.casjay.coffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  aria-label="WheresCovid tracker (opens in new tab)"
                >
                  <span class="nav-text">WheresCovid</span>
                  <span class="external-icon" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main id="main-content" class="main-content" role="main" tabindex="-1">
      <div class="container">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer" role="contentinfo">
      <div class="container">
        <!-- Developer Info -->
        <section class="footer-section" aria-labelledby="developer-heading">
          <h2 id="developer-heading" class="visually-hidden">Developer Information</h2>
          <p class="developer-info">
            <span class="heart-icons" aria-label="Made with love">💜💜💜</span>
            <br />
            <span>Developed by </span>
            <a
              href="https://github.com/casjay"
              target="_blank"
              rel="noopener noreferrer"
              class="developer-link"
              aria-label="Jason M. Hempstead GitHub profile (opens in new tab)"
            >
              Jason M. Hempstead (Casjay)
            </a>
          </p>
        </section>

        <!-- Open Source Info -->
        <section class="footer-section" aria-labelledby="opensource-heading">
          <h2 id="opensource-heading" class="visually-hidden">Open Source Information</h2>
          <p class="opensource-info">
            <span>Open source project</span>
            <br />
            <a
              href="https://github.com/now-sh/covid-global-frontend"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
              aria-label="View source code on GitHub (opens in new tab)"
            >
              View Source Code
              <span aria-hidden="true">↗</span>
            </a>
          </p>
        </section>

        <!-- Data Sources -->
        <section class="footer-section data-sources" aria-labelledby="data-sources-heading">
          <h2 id="data-sources-heading" class="section-title">Data Sources</h2>
          <div class="sources-list">
            <a
              href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
              aria-label="Johns Hopkins CSSE dashboard (opens in new tab)"
            >
              Johns Hopkins CSSE
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://disease.sh/"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
              aria-label="disease.sh API documentation (opens in new tab)"
            >
              disease.sh API
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <!-- Copyright -->
        <div class="footer-bottom">
          <p class="copyright">
            <small>
              © {{ currentYear }} COVID-19 Statistics Dashboard. 
              Data accuracy subject to reporting limitations.
            </small>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useLayoutStore } from './stores/layout'
import { computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const layoutStore = useLayoutStore()
    const currentYear = computed(() => new Date().getFullYear())
    
    return {
      layoutStore,
      currentYear
    }
  }
}
</script>

<style scoped>
/* App Container */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--body-bg);
  color: var(--text-primary);
}

/* Skip Link for Accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: var(--text-primary);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  font-size: 0.875rem;
  font-weight: 600;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Header */
.app-header {
  background-color: var(--navbar-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--box-shadow);
}

/* Brand */
.navbar-brand {
  color: var(--primary-color) !important;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.navbar-brand:hover {
  color: var(--secondary-color) !important;
  transform: scale(1.05);
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  display: none;
}

/* Mobile: Show brand text on larger screens */
@media (min-width: 576px) {
  .brand-text {
    display: inline;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
  }
}

/* Navigation */
.navbar-toggler {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  background: transparent;
  border-radius: 0.375rem;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(189, 147, 249, 0.25);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28248, 248, 242, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Nav Links */
.nav-link {
  color: var(--text-primary) !important;
  font-weight: 500;
  padding: 0.75rem 1rem !important;
  border-radius: 0.375rem;
  margin: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.875rem;
}

.nav-link:hover {
  color: var(--primary-color) !important;
  background-color: rgba(189, 147, 249, 0.1);
  transform: translateY(-1px);
}

.nav-link:focus {
  box-shadow: 0 0 0 0.2rem rgba(189, 147, 249, 0.25);
}

/* Active nav link */
.router-link-active {
  background-color: var(--primary-color) !important;
  color: var(--text-primary) !important;
}

.router-link-active:hover {
  background-color: var(--button-primary-hover) !important;
}

/* Nav Icons */
.nav-icon {
  font-size: 1rem;
  display: none;
}

.nav-text {
  font-size: 0.875rem;
}

/* Show icons on mobile */
@media (max-width: 991.98px) {
  .nav-icon {
    display: inline;
  }
}

/* External Links */
.external-link {
  position: relative;
}

.external-icon {
  font-size: 0.75rem;
  margin-left: 0.25rem;
  opacity: 0.7;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem 0;
}

/* Mobile-first padding */
@media (max-width: 575.98px) {
  .main-content {
    padding: 1rem 0;
  }
}

/* Footer */
.app-footer {
  background-color: var(--navbar-bg);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
  padding: 2rem 0 1rem;
}

.footer-section {
  margin-bottom: 1.5rem;
  text-align: center;
}

.footer-section:last-child {
  margin-bottom: 0;
}

/* Footer headings (visually hidden) */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Footer content */
.developer-info,
.opensource-info {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.heart-icons {
  font-size: 1.2rem;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Footer links */
.developer-link,
.source-link {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.developer-link:hover,
.source-link:hover {
  color: var(--link-hover);
  text-decoration: underline;
}

/* Data Sources Section */
.data-sources {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.sources-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

/* Desktop: horizontal layout */
@media (min-width: 576px) {
  .sources-list {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }
}

/* Footer bottom */
.footer-bottom {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.copyright {
  color: var(--text-muted);
  margin: 0;
  font-size: 0.75rem;
}

/* High Contrast Support */
@media (prefers-contrast: high) {
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .router-link-active {
    border: 2px solid var(--text-primary);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .heart-icons {
    animation: none;
  }
  
  .nav-link,
  .navbar-brand,
  .skip-link {
    transition: none;
  }
}
</style>
