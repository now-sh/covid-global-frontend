/* eslint-disable vue/valid-v-else */
<template>
  <div class="countries text-center">
    <div class="container" v-if="!loading">
      <div v-if="error">
        <h2 class="error">Error: {{ error }}</h2>
      </div>
      <div v-else>
        <h1 class="text-center mt-5 text-warning">Global Data</h1>
        <div
          class="row justify-content-center align-items-center"
          v-if="data && data.length"
        >
          <div
            class="card text-center col-md-4 border border-danger"
            v-for="countries in this.data"
            :key="countries"
          >
            <h5 class="card-title mt-2">
              <img
                :alt="countries"
                height="32"
                width="32"
                :src="countries.countryInfo.flag"
              />
              {{ countries.country }}
            </h5>
            <p class="card-text mt-2 bt-3">
              Total cases: {{ countries.cases }}
              <br />
              TotalRecovered: {{ countries.recovered }}
              <br />
              NewCases: {{ countries.todayCases }}
              <br />
              TotalDeaths: {{ countries.deaths }}
              <br />
              Last Updated on:
              {{ new Date(countries.updated).toLocaleString("en-US") }}
              <br /><br />
            </p>
          </div>
        </div>
        <h1 class="text-danger" v-else>No data!<br />Failed to load page!</h1>
      </div>
    </div>
    <h2 class="text-success" v-else>Please wait.....<br />Loading data...</h2>
    <br />
    <h3>
      <a
        href="https://disease.sh/v3/covid-19/countries"
        rel="noopener noreferrer nofollow"
        target="_blank"
        >API: Countries</a
      >
    </h3>
  </div>
</template>

<script>
const url = "https://disease.sh/v3/covid-19/countries";

export default {
  name: "Country",
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
.countries {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.error {
  color: red;
}
</style>
