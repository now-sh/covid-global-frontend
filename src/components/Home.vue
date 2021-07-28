<template>
  <div class="container home" id="home">
    <div v-if="!loading">
      <div v-if="error">
        <h2 class="error">Error: {{ error }}</h2>
      </div>

      <div v-else>
        <h1 class="text-center mt-5 text-warning">Global Stats</h1>
        <h3>
          Total population: {{ this.data.population }}
          <br />
          Total cases: {{ this.data.cases }}
          <br />
          Total Recovered: {{ this.data.recovered }}
          <br />
          Total Deaths: {{ this.data.deaths }}
          <br />
          Total Tests: {{ this.data.tests }}
          <br />
          Total Cases Today: {{ this.data.todayCases }}
          <br />
          Total Deaths Today: {{ this.data.todayDeaths }}
          <br />
          <br />
          <h5>
            Last Updated on:
            {{ new Date(this.data.updated).toLocaleString("en-US") }}
          </h5>
          <br />
          <br />
        </h3>
      </div>

      <!-- <h1 class="text-danger" v-else>No data!<br />Failed to load page!</h1> -->
    </div>

    <h2 class="text-success" v-else>Please wait.....<br />Loading data...</h2>
    <br /><br />
    <h3>
      <a
        href="https://disease.sh/v3/covid-19/all"
        rel="noopener noreferrer nofollow"
        target="_blank"
        >API: All</a
      >
    </h3>
  </div>
</template>

<script>
const url = "https://disease.sh/v3/covid-19/all";

export default {
  name: "Home",
  data: () => ({
    loading: true,
    data: [],
    error: "",
    url: url
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
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;

  margin-top: 60px;
}

.error {
  color: red;
}
</style>
