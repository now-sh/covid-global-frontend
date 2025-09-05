<template>
  <section class="home" aria-labelledby="global-stats-heading">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container" role="status" aria-live="polite">
      <div class="spinner-container">
        <div class="spinner-border" role="status" aria-label="Loading global COVID-19 data">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h2 class="loading-text">Loading global data...</h2>
        <p class="loading-subtitle">Fetching latest COVID-19 statistics</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container" role="alert" aria-live="assertive">
      <div class="alert alert-danger">
        <h2 id="error-heading">Error Loading Data</h2>
        <p>{{ error }}</p>
        <button class="btn btn-outline-danger" aria-describedby="error-heading" @click="fetchData">
          <span aria-hidden="true">🔄</span> Retry
        </button>
      </div>
    </div>

    <!-- Data Display -->
    <div v-else class="data-container">
      <header class="page-header text-center">
        <h1 id="global-stats-heading" class="page-title">
          Global COVID-19 Statistics
        </h1>
        <div class="alert alert-info">
          <p>
            <strong>Important:</strong> Many countries have reduced COVID-19 reporting frequency. 
            "Today's" numbers may show zero if no recent updates were reported.
          </p>
        </div>
      </header>

      <!-- Statistics Grid -->
      <div class="stats-grid" role="region" aria-labelledby="global-stats-heading">
        <div class="row g-3 g-md-4 justify-content-center">
          <!-- Population -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card population" tabindex="0" role="article" 
                     aria-label="Global population statistics">
              <div class="stat-icon" aria-hidden="true">👥</div>
              <h3 class="stat-label">Population</h3>
              <div class="stat-value" aria-live="polite">{{ formatNumber(data.population) }}</div>
            </article>
          </div>

          <!-- Total Cases -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card cases" tabindex="0" role="article" 
                     aria-label="Total COVID-19 cases worldwide">
              <div class="stat-icon" aria-hidden="true">🦠</div>
              <h3 class="stat-label">Total Cases</h3>
              <div class="stat-value" aria-live="polite">{{ formatNumber(data.cases) }}</div>
            </article>
          </div>

          <!-- Active Cases -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card active" tabindex="0" role="article" 
                     aria-label="Active COVID-19 cases">
              <div class="stat-icon" aria-hidden="true">⚠️</div>
              <h3 class="stat-label">Active Cases</h3>
              <div class="stat-value" aria-live="polite">{{ formatNumber(data.active) }}</div>
            </article>
          </div>

          <!-- Recovered -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card recovered" tabindex="0" role="article" 
                     aria-label="Total recovered cases">
              <div class="stat-icon" aria-hidden="true">✅</div>
              <h3 class="stat-label">Recovered</h3>
              <div class="stat-value" aria-live="polite">{{ formatNumber(data.recovered) }}</div>
            </article>
          </div>

          <!-- Deaths -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card deaths" tabindex="0" role="article" 
                     aria-label="Total COVID-19 deaths">
              <div class="stat-icon" aria-hidden="true">💀</div>
              <h3 class="stat-label">Deaths</h3>
              <div class="stat-value" aria-live="polite">{{ formatNumber(data.deaths) }}</div>
            </article>
          </div>

          <!-- Tests -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card tests" tabindex="0" role="article" 
                     aria-label="Total COVID-19 tests conducted">
              <div class="stat-icon" aria-hidden="true">🧪</div>
              <h3 class="stat-label">Tests</h3>
              <div class="stat-value" aria-live="polite">{{ formatNumber(data.tests) }}</div>
            </article>
          </div>

          <!-- Today's Cases -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card today-cases" tabindex="0" role="article" 
                     aria-label="New cases reported today">
              <div class="stat-icon" aria-hidden="true">📈</div>
              <h3 class="stat-label">Today's Cases</h3>
              <div class="stat-value" aria-live="polite">+{{ formatNumber(data.todayCases) }}</div>
            </article>
          </div>

          <!-- Today's Deaths -->
          <div class="col-6 col-sm-4 col-lg-3">
            <article
class="stat-card today-deaths" tabindex="0" role="article" 
                     aria-label="New deaths reported today">
              <div class="stat-icon" aria-hidden="true">📉</div>
              <h3 class="stat-label">Today's Deaths</h3>
              <div class="stat-value" aria-live="polite">+{{ formatNumber(data.todayDeaths) }}</div>
            </article>
          </div>
        </div>
      </div>

      <!-- Last Updated Info -->
      <footer class="data-footer text-center">
        <p class="update-time">
          <span class="update-icon" aria-hidden="true">🕒</span>
          <span>Last updated: <time :datetime="new Date(data.updated).toISOString()">{{ formatDate(data.updated) }}</time></span>
        </p>
        <a
          href="https://disease.sh/v3/covid-19/all"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline-info btn-sm api-link"
          aria-label="View raw API data (opens in new tab)"
        >
          <span aria-hidden="true">📊</span> View Raw API Data
        </a>
      </footer>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'

const API_URL = "https://disease.sh/v3/covid-19/all"

export default {
  name: "Home",
  setup() {
    const loading = ref(true)
    const data = ref({})
    const error = ref("")

    const formatNumber = (num) => {
      if (!num) return 'N/A'
      return new Intl.NumberFormat().format(num)
    }

    const formatDate = (timestamp) => {
      if (!timestamp) return 'N/A'
      return new Date(timestamp).toLocaleString("en-US", {
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const fetchData = async () => {
      loading.value = true
      error.value = ""
      
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        data.value = json
      } catch (err) {
        error.value = err.message
        console.error('Error fetching global data:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      loading,
      data,
      error,
      formatNumber,
      formatDate,
      fetchData
    }
  }
}
</script>

<style scoped>
/* Mobile-First Component Styles */
.home {
  padding: 1rem 0;
  min-height: 50vh;
}

/* Loading State */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  text-align: center;
}

.spinner-container {
  max-width: 300px;
  padding: 2rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.loading-text {
  font-size: 1.25rem;
  color: var(--success-color);
  margin-bottom: 0.5rem;
}

.loading-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

/* Error State */
.error-container {
  padding: 2rem 1rem;
  text-align: center;
}

/* Page Header */
.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--warning-color);
  margin-bottom: 1rem;
  font-weight: 700;
}

/* Stats Grid - Mobile First */
.stats-grid {
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
}

/* Mobile: Smaller cards */
@media (max-width: 575.98px) {
  .stat-card {
    padding: 0.75rem 0.5rem;
    min-height: 100px;
  }
}

/* Tablet and up: Larger cards */
@media (min-width: 768px) {
  .stat-card {
    padding: 1.5rem 1rem;
    min-height: 140px;
  }
}

.stat-card:hover,
.stat-card:focus {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-hover);
  outline: none;
}

.stat-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Stat Card Icons */
.stat-icon {
  font-size: clamp(1.25rem, 3vw, 2rem);
  margin-bottom: 0.5rem;
  display: block;
}

/* Stat Card Labels */
.stat-label {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Stat Card Values */
.stat-value {
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

/* Color-coded stat cards */
.stat-card.population {
  border-left: 4px solid var(--info-color);
}

.stat-card.cases {
  border-left: 4px solid var(--warning-color);
}

.stat-card.active {
  border-left: 4px solid var(--orange);
}

.stat-card.recovered {
  border-left: 4px solid var(--success-color);
}

.stat-card.deaths {
  border-left: 4px solid var(--danger-color);
}

.stat-card.tests {
  border-left: 4px solid var(--primary-color);
}

.stat-card.today-cases {
  border-left: 4px solid var(--yellow);
}

.stat-card.today-deaths {
  border-left: 4px solid var(--red);
}

/* Data Footer */
.data-footer {
  padding: 2rem 1rem;
  border-top: 1px solid var(--border-color);
  margin-top: 3rem;
}

.update-time {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.update-icon {
  margin-right: 0.5rem;
}

.api-link {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .stat-card {
    border-width: 2px;
  }
  
  .stat-card:focus {
    outline-width: 3px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .stat-card {
    transition: none;
  }
  
  .stat-card:hover {
    transform: none;
  }
}

/* Print Styles */
@media print {
  .loading-container,
  .spinner-border,
  .btn {
    display: none !important;
  }
  
  .stat-card {
    box-shadow: none;
    border: 1px solid #000;
    break-inside: avoid;
  }
  
  .page-title {
    color: #000 !important;
  }
}
</style>