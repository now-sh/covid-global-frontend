<template>
  <div class="container historical text-center">
    <div v-if="!loading">
      <div v-if="error">
        <h2 class="error">Error: {{ error }}</h2>
      </div>
      <div v-else>
        <h1 class="text-center mt-5 text-warning">Historical Data</h1>

        <div class="row border border-primary" v-if="data && data.length">
          <div
            class="card text-center col-4 border border-danger"
            v-for="historical in this.data"
            :key="historical.province"
          >
            <h5 class="card-title mt-2 text-danger">
              {{ historical.province }} {{ historical.country }}
            </h5>
            <p class="card-text mt-2 bt-3">
              <span
                v-for="(value, key) in historical.timeline.cases"
                :key="key"
                class="text-warning"
              >
                Total Cases on: {{ key }} was {{ value }}<br />
              </span>
              <br /><br />
            </p>
          </div>
        </div>
        <h1 class="text-danger" v-else>No data!<br />Failed to load page!</h1>
      </div>
    </div>
    <h2 class="text-success" v-else>Please wait.....<br />Loading data...</h2>
  </div>
</template>

<script>
const url = "https://disease.sh/v3/covid-19/historical";

export default {
  name: "Historical",
  data: () => ({
    loading: true,
    data: [],
    error: ""
  }),
  async created() {
    this.loading = true;
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.data = json;
    } catch (error) {
      this.error = error.message;
    }
    this.loading = false;
  }
};
setTimeout(() => {}, 5000);
</script>

<style>
.historical {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.error {
  color: red;
}
</style>
