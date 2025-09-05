<template>
  <div class="countries text-center">
    <div v-if="!loading" class="container">
      <div v-if="error">
        <div class="alert alert-danger" role="alert">
          <h4>Error loading data</h4>
          <p>{{ error }}</p>
          <button class="btn btn-outline-danger btn-sm" @click="fetchData">Retry</button>
        </div>
      </div>
      <div v-else>
        <h1 class="text-center mt-5 text-warning">Countries Data</h1>

        <div class="row mb-4 justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control form-control-lg"
              placeholder="Search countries..."
              aria-label="Search countries by name"
            />
          </div>
        </div>

        <div v-if="filteredData && filteredData.length" class="row g-3 g-md-4">
          <div
            v-for="country in filteredData"
            :key="country.countryInfo._id || country.country"
            class="col-12 col-sm-6 col-lg-4 col-xl-3"
          >
            <article
class="card bg-dark border-warning text-light h-100" 
                     role="article" 
                     :aria-label="`COVID-19 statistics for ${country.country}`">
              <div class="card-body">
                <h5 class="card-title d-flex align-items-center justify-content-center gap-2">
                  <img
                    :alt="`${country.country} flag`"
                    height="32"
                    width="32"
                    :src="country.countryInfo.flag"
                    class="rounded"
                    loading="lazy"
                  />
                  {{ country.country }}
                </h5>
                <div class="row text-start">
                  <div class="col-6">
                    <small class="text-info">Cases</small>
                    <div class="fs-6 fw-bold">{{ formatNumber(country.cases) }}</div>
                  </div>
                  <div class="col-6">
                    <small class="text-success">Recovered</small>
                    <div class="fs-6 fw-bold">{{ formatNumber(country.recovered) }}</div>
                  </div>
                  <div class="col-6">
                    <small class="text-warning">New Cases</small>
                    <div class="fs-6 fw-bold">+{{ formatNumber(country.todayCases) }}</div>
                  </div>
                  <div class="col-6">
                    <small class="text-danger">Deaths</small>
                    <div class="fs-6 fw-bold">{{ formatNumber(country.deaths) }}</div>
                  </div>
                </div>
                <hr class="border-secondary" />
                <small class="text-muted"> Updated: {{ formatDate(country.updated) }} </small>
              </div>
            </article>
          </div>
        </div>

        <div v-else-if="searchTerm" class="alert alert-info">
          No countries found matching "{{ searchTerm }}"
        </div>

        <div v-else class="alert alert-warning">No country data available</div>
      </div>
    </div>

    <div v-else class="text-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="text-success mt-3">Loading countries data...</h2>
    </div>

    <div class="text-center mt-4">
      <a
        href="https://disease.sh/v3/covid-19/countries"
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

const API_URL = 'https://disease.sh/v3/covid-19/countries'

export default {
  name: 'Countries',
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
      return data.value.filter((country) =>
        country.country.toLowerCase().includes(searchTerm.value.toLowerCase())
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
        console.error('Error fetching countries data:', err)
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
.countries {
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
