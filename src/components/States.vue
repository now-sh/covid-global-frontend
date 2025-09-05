<template>
  <div class="container states text-center">
    <div v-if="!loading">
      <div v-if="error">
        <div class="alert alert-danger" role="alert">
          <h4>Error loading data</h4>
          <p>{{ error }}</p>
          <button class="btn btn-outline-danger btn-sm" @click="fetchData">Retry</button>
        </div>
      </div>
      <div v-else>
        <h1 class="text-center mt-5 text-warning">
          <span role="img" aria-label="Medical symbols">😷 🏥 🦠 🧫</span>
          <br />
          US States Data
        </h1>

        <div class="row mb-4">
          <div class="col-md-6 offset-md-3">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control form-control-lg bg-dark text-light border-secondary"
              placeholder="Search US states..."
            />
          </div>
        </div>

        <div v-if="filteredData && filteredData.length" class="row g-4">
          <div v-for="state in filteredData" :key="state.state" class="col-lg-4 col-md-6">
            <div class="card bg-dark border-primary text-light h-100">
              <div class="card-body">
                <h5 class="card-title text-primary">{{ state.state }}</h5>
                <div class="row text-start g-2">
                  <div class="col-6">
                    <small class="text-secondary">Population</small>
                    <div class="fs-6 fw-bold text-info">{{ formatNumber(state.population) }}</div>
                  </div>
                  <div class="col-6">
                    <small class="text-secondary">Total Cases</small>
                    <div class="fs-6 fw-bold text-warning">{{ formatNumber(state.cases) }}</div>
                  </div>
                  <div class="col-6">
                    <small class="text-secondary">Cases Per Million</small>
                    <div class="fs-6 fw-bold text-info">{{ formatNumber(state.casesPerOneMillion) }}</div>
                  </div>
                  <div class="col-6">
                    <small class="text-secondary">Total Deaths</small>
                    <div class="fs-6 fw-bold text-danger">{{ formatNumber(state.deaths) }}</div>
                  </div>
                  <div class="col-12">
                    <small class="text-secondary">Deaths Per Million</small>
                    <div class="fs-6 fw-bold text-danger">{{ formatNumber(state.deathsPerOneMillion) }}</div>
                  </div>
                </div>
                <hr class="border-secondary" />
                <small class="text-muted"> 
                  Updated: {{ state.updated ? formatDate(state.updated) : 'Data from disease.sh API' }} 
                </small>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="searchTerm" class="alert alert-info">
          No states found matching "{{ searchTerm }}"
        </div>

        <div v-else class="alert alert-warning">No state data available</div>
      </div>
    </div>

    <div v-else class="text-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="text-success mt-3">Loading US states data...</h2>
    </div>

    <div class="text-center mt-4">
      <a
        href="https://disease.sh/v3/covid-19/states"
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

const API_URL = 'https://disease.sh/v3/covid-19/states'

export default {
  name: 'States',
  setup() {
    const loading = ref(true)
    const data = ref([])
    const error = ref('')
    const searchTerm = ref('')

    const formatNumber = (num) => {
      if (!num) return '0'
      return new Intl.NumberFormat().format(num)
    }

    const formatDate = (timestamp) => {
      if (!timestamp) return 'N/A'
      return new Date(timestamp).toLocaleDateString('en-US')
    }

    const filteredData = computed(() => {
      if (!searchTerm.value) return data.value
      return data.value.filter((state) =>
        state.state.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
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
        data.value = json
      } catch (err) {
        error.value = err.message
        console.error('Error fetching states data:', err)
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
      fetchData,
    }
  },
}
</script>

<style scoped>
.states {
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

.error {
  color: #dc3545;
}
</style>
