/* eslint-disable vue/valid-v-else */
<template>
  <div class="container states text-center">
    <div v-if="!loading">
      <div v-if="error">
        <h2 class="error">Error: {{ error }}</h2>
      </div>
      <div v-else>
        <h1 class="text-center mt-5 text-warning">State Data</h1>
        <div class="row border border-primary" v-if="data && data.length">
          <div
            class="card text-center col-4 border border-danger"
            v-for="states in this.data"
            :key="states"
          >
            <h5 class="card-title mt-2">{{ states.state }}</h5>
            <p class="card-text mt-2 bt-3">
              Total population: {{ states.population }}
              <br />
              Total cases: {{ states.cases }}
              <br />
              Active Cases: {{ states.active }}
              <br />
              New Cases: {{ states.todayCases }}
              <br />
              New Deaths: {{ states.todayDeaths }}
              <br />
              Total Deaths: {{ states.deaths }}
              <br />
              Last Updated on:
              {{ new Date(states.updated).toLocaleString("en-US") }}
              <br />
              <br />
            </p>
          </div>
        </div>
        <h1 class="text-danger" v-else>No data!<br />Failed to load page!</h1>
      </div>
    </div>
    <h2 v-else class="text-success">Please wait.....<br />Loading data...</h2>
    <br /><br />
    <h3>data API: {{ url }}</h3>
  </div>
</template>

<script>
const url = "https://disease.sh/v3/covid-19/states";

export default {
  name: "States",
  data: () => ({
    loading: true,
    data: [],
    error: "",
    url: url,
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
  },
};
setTimeout(() => {}, 5000);
</script>

<style>
.states {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.error {
  color: red;
}
</style>
