/* eslint-disable */
<template>
  <div>
    <header class="main text-center">
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item mt-1 ml-1 rm-2">
              <b-button variant="primary" v-bind:to="{ path: '/' }"
                >Home
              </b-button>
            </li>
            <li class="nav-item mt-1 ml-1 rm-2">
              <b-button variant="primary" v-bind:to="{ path: 'countries' }"
                >Countries
              </b-button>
            </li>
            <li class="nav-item mt-1 ml-1 rm-2">
              <b-button variant="primary" v-bind:to="{ path: 'states' }"
                >States
              </b-button>
            </li>

            <li class="nav-item mt-1 ml-1 rm-2">
              <b-button variant="primary" v-bind:to="{ path: 'historical' }"
                >Historical
              </b-button>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mt-1 ml-1 rm-2">
              <b-button
                variant="primary"
                rel="noopener noreferrer nofollow"
                target="_blank"
                href="https://nys.casjay.now.sh/"
                >NYS
              </b-button>
            </li>
            <li class="nav-item mt-1 ml-1 rm-2">
              <b-button
                variant="primary"
                rel="noopener noreferrer nofollow"
                target="_blank"
                href="https://wherescovid.casjay.now.sh/"
                >WheresCovid
              </b-button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div>
      <slot id="app" class="container">
        <main class="container-fluid mt-5 text-center" size="14">
          <router-view />
        </main>
      </slot>
    </div>
    <div>
      <footer>
        <div class="purple-text text-center">
          <br />
          <br />Made with 💜💜💜💜💜💜 by
          <br />
          <a
            href="http://github.com/casjay"
            target="_blank"
            rel="noopener"
            class="text-primary"
          >
            Jason M. Hempstead (Casjay)</a
          >
        </div>
        <div class="purple-gradient text-center">
          This is an open source project
          <br />
          <a
            href="https://github.com/now-sh/covid-global-frontend"
            target="_blank"
            rel="noopener"
            class="text-info"
            >Project source</a
          >
          <br /><br /><br />
          <!-- <a
            href="https://discordapp.com/invite/z2wS84v"
            class="btn btn-success"
            rel="noopener noreferrer nofollow"
            target="_blank"
            >Support</a
          >
          <br />
          <br /> -->
          <br />
          <br />
        </div>
      </footer>
    </div>
    <!-- Footer --->
    <div class="text-center border-danger" style="font-size: 150%">
      COVID-19 Data provided by:<br />
      <a
        href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
        target="_blank"
        rel="noopener"
        >Johns Hopkins CSSE</a
      ><br />
      <a href="https://github.com/novelcovid/api" target="_blank" rel="noopener"
        >novelcovid API</a
      >
    </div>
    <div class="text-center border-danger" style="font-size: 125%"></div>
    <br />
    <!-- End Footer --->
  </div>
</template>
<script>
export default {
  name: "App",
  url: "/",
  computed: {
    layout() {
      return this.$store.getters.layout;
    },
  },
  components: {
    name: "App",
  },
  data() {
    return {
      isHovered: false,
      loading: true,
    };
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered;
      this.loading = false;
    },
    created() {},
  },
  render(h) {
    return h(this.ViewComponent);
  },
};
</script>
<style>
.error {
  color: red;
}
</style>
