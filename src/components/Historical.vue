<template>
  <div class="container historical text-center">
    <div v-if="!loading">
      <div v-if="error">
        <div class="alert alert-danger" role="alert">
          <h4>Error loading data</h4>
          <p>{{ error }}</p>
          <button class="btn btn-outline-danger btn-sm" @click="fetchData">Retry</button>
        </div>
      </div>
      <div v-else>
        <h1 class="text-center mt-5 text-warning">Historical Data (Last 30 Days)</h1>
        <div class="alert alert-info text-center mb-4">
          <small>
            <strong>Note:</strong> Historical COVID-19 data may be limited or outdated as many countries 
            have stopped regular reporting. This shows the most recent available data from the disease.sh API.
          </small>
        </div>

        <div class="row mb-4">
          <div class="col-md-6 offset-md-3">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control form-control-lg bg-dark text-light border-secondary"
              placeholder="Search countries/provinces..."
            />
          </div>
        </div>

        <div v-if="filteredData && filteredData.length" class="row g-4">
          <div
            v-for="historical in filteredData"
            :key="`${historical.country}-${historical.province || 'main'}`"
            class="col-lg-6 col-xl-4"
          >
            <div class="card bg-dark border-success text-light h-100">
              <div class="card-body">
                <h5 class="card-title text-success">
                  {{ historical.province ? `${historical.province}, ` : ''
                  }}{{ historical.country }}
                </h5>

                <div v-if="historical.timeline" class="timeline-data">
                  <!-- Recent Cases Trend -->
                  <div v-if="historical.timeline.cases" class="mb-3">
                    <h6 class="text-info">Recent Cases Timeline</h6>
                    <div class="timeline-scroll">
                      <div
                        v-for="(value, date) in getRecentEntries(historical.timeline.cases)"
                        :key="`cases-${date}`"
                        class="timeline-entry"
                      >
                        <small class="text-muted">{{ formatDate(date) }}</small>
                        <span class="text-warning ms-2">{{ formatNumber(value) }} cases</span>
                      </div>
                    </div>
                  </div>

                  <!-- Recent Deaths if available -->
                  <div v-if="historical.timeline.deaths" class="mb-3">
                    <h6 class="text-danger">Recent Deaths Timeline</h6>
                    <div class="timeline-scroll">
                      <div
                        v-for="(value, date) in getRecentEntries(historical.timeline.deaths)"
                        :key="`deaths-${date}`"
                        class="timeline-entry"
                      >
                        <small class="text-muted">{{ formatDate(date) }}</small>
                        <span class="text-danger ms-2">{{ formatNumber(value) }} deaths</span>
                      </div>
                    </div>
                  </div>

                  <!-- Stats Summary -->
                  <div class="stats-summary">
                    <div class="row text-center">
                      <div class="col-6">
                        <small class="text-muted">Latest Cases</small>
                        <div class="fw-bold text-warning">
                          {{ getLatestValue(historical.timeline.cases) }}
                        </div>
                      </div>
                      <div v-if="historical.timeline.deaths" class="col-6">
                        <small class="text-muted">Latest Deaths</small>
                        <div class="fw-bold text-danger">
                          {{ getLatestValue(historical.timeline.deaths) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="searchTerm" class="alert alert-info">
          No historical data found matching "{{ searchTerm }}"
        </div>

        <div v-else class="alert alert-warning">No historical data available</div>
      </div>
    </div>

    <div v-else class="text-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="text-success mt-3">Loading historical data...</h2>
    </div>

    <div class="text-center mt-4">
      <a
        href="https://disease.sh/v3/covid-19/historical"
        rel="noopener noreferrer nofollow"
        target="_blank"
        class="btn btn-outline-info btn-sm"
      >
        View Raw API Data
      </a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

const API_URL = 'https://disease.sh/v3/covid-19/historical?lastdays=30'

export default {
  name: 'Historical',
  setup() {
    const loading = ref(true)
    const data = ref([])
    const error = ref('')
    const searchTerm = ref('')

    const formatNumber = (num) => {
      if (!num) return '0'
      return new Intl.NumberFormat().format(num)
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A'
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }

    const getRecentEntries = (timeline) => {
      if (!timeline) return {}
      const entries = Object.entries(timeline)
      // Get last 5 entries
      return Object.fromEntries(entries.slice(-5))
    }

    const getLatestValue = (timeline) => {
      if (!timeline) return '0'
      const values = Object.values(timeline)
      return formatNumber(values[values.length - 1] || 0)
    }

    const filteredData = computed(() => {
      if (!searchTerm.value) return data.value
      return data.value.filter((item) => {
        const country = item.country?.toLowerCase() || ''
        const province = item.province?.toLowerCase() || ''
        const search = searchTerm.value.toLowerCase()
        return country.includes(search) || province.includes(search)
      })
    })

    const fetchData = async () => {
      loading.value = true
      error.value = ''

      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        data.value = Array.isArray(json) ? json : []
      } catch (err) {
        error.value = err.message
        console.error('Error fetching historical data:', err)
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
      searchTerm,
      filteredData,
      formatNumber,
      formatDate,
      getRecentEntries,
      getLatestValue,
      fetchData,
    }
  },
}
</script>

<style scoped>
.historical {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  margin-top: 60px;
}

.card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.timeline-scroll {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #495057;
  border-radius: 0.375rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.timeline-entry {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-entry:last-child {
  border-bottom: none;
}

.stats-summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #495057;
}

.error {
  color: #dc3545;
}
</style>
