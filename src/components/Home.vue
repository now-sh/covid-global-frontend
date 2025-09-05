<template>
  <div id="home" class="container home">
    <div v-if="!loading">
      <div v-if="error">
        <h2 class="error">Error: {{ error }}</h2>
      </div>

      <div v-else class="text-center">
        <h1 class="text-center mt-5 text-warning">Global COVID-19 Statistics</h1>
        <div class="alert alert-info text-center mb-4">
          <small>
            <strong>Note:</strong> Many countries have reduced COVID-19 reporting frequency. 
            "Today's" numbers may show zero if no recent updates were reported.
          </small>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card bg-dark border-warning text-light">
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="stat-item">
                      <h5 class="text-info">Total Population</h5>
                      <h3>{{ formatNumber(data.population) }}</h3>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="stat-item">
                      <h5 class="text-warning">Total Cases</h5>
                      <h3>{{ formatNumber(data.cases) }}</h3>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="stat-item">
                      <h5 class="text-success">Total Recovered</h5>
                      <h3>{{ formatNumber(data.recovered) }}</h3>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="stat-item">
                      <h5 class="text-warning">Active Cases</h5>
                      <h3>{{ formatNumber(data.active) }}</h3>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="stat-item">
                      <h5 class="text-danger">Total Deaths</h5>
                      <h3>{{ formatNumber(data.deaths) }}</h3>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="stat-item">
                      <h5 class="text-primary">Total Tests</h5>
                      <h3>{{ formatNumber(data.tests) }}</h3>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="stat-item">
                      <h5 class="text-warning">Today's Cases</h5>
                      <h3>+{{ formatNumber(data.todayCases) }}</h3>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="stat-item">
                      <h5 class="text-danger">Today's Deaths</h5>
                      <h3>+{{ formatNumber(data.todayDeaths) }}</h3>
                    </div>
                  </div>
                </div>
                <hr class="border-warning" />
                <h6 class="text-muted">Last Updated: {{ formatDate(data.updated) }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="text-success mt-3">Loading global data...</h2>
    </div>

    <div class="text-center mt-4">
      <a
        href="https://disease.sh/v3/covid-19/all"
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
import { ref, onMounted } from 'vue'

const API_URL = 'https://disease.sh/v3/covid-19/all'

export default {
  name: 'Home',
  setup() {
    const loading = ref(true)
    const data = ref({})
    const error = ref('')

    const formatNumber = (num) => {
      if (!num) return 'N/A'
      return new Intl.NumberFormat().format(num)
    }

    const formatDate = (timestamp) => {
      if (!timestamp) return 'N/A'
      return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    const fetchData = async () => {
      loading.value = true
      error.value = ''

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
      fetchData,
    }
  },
}
</script>

<style scoped>
.home {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  margin-top: 60px;
}

.stat-item {
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.error {
  color: #dc3545;
}
</style>
