<template>
  <div class="bg-dark text-light min-vh-100">
    <header class="main text-center">
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="navbarSupportedContent" class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto">
              <li class="nav-item mt-1 ms-1 me-2">
                <router-link to="/" class="btn btn-primary"> Home </router-link>
              </li>
              <li class="nav-item mt-1 ms-1 me-2">
                <router-link to="/countries" class="btn btn-primary"> Countries </router-link>
              </li>
              <li class="nav-item mt-1 ms-1 me-2">
                <router-link to="/states" class="btn btn-primary"> States </router-link>
              </li>
              <li class="nav-item mt-1 ms-1 me-2">
                <router-link to="/historical" class="btn btn-primary"> Historical </router-link>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item mt-1 ms-1 me-2">
                <a
                  class="btn btn-primary"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  href="https://nys.casjay.coffee/"
                >
                  NYS
                </a>
              </li>
              <li class="nav-item mt-1 ms-1 me-2">
                <a
                  class="btn btn-primary"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  href="https://wherescovid.casjay.coffee/"
                >
                  WheresCovid
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main class="container-fluid mt-5 text-center">
      <router-view />
    </main>

    <footer class="mt-5 pt-5">
      <div class="text-center">
        <br />
        <br />Made with 💜💜💜💜💜💜 by
        <br />
        <a href="https://github.com/casjay" target="_blank" rel="noopener" class="text-primary">
          Jason M. Hempstead (Casjay)
        </a>
      </div>
      <div class="text-center">
        This is an open source project
        <br />
        <a
          href="https://github.com/now-sh/covid-global-frontend"
          target="_blank"
          rel="noopener"
          class="text-info"
        >
          Project source
        </a>
        <br /><br /><br />
      </div>

      <div class="text-center border-top border-danger pt-3" style="font-size: 1.2em">
        COVID-19 Data provided by:<br />
        <a
          href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
          target="_blank"
          rel="noopener"
          class="text-warning"
        >
          Johns Hopkins CSSE </a
        ><br />
        <a
          href="https://github.com/novelcovid/api"
          target="_blank"
          rel="noopener"
          class="text-warning"
        >
          disease.sh API
        </a>
      </div>
      <br />
    </footer>
  </div>
</template>

<script>
import { useLayoutStore } from './stores/layout'

export default {
  name: 'App',
  setup() {
    const layoutStore = useLayoutStore()
    return {
      layoutStore,
    }
  },
}
</script>

<style>
.error {
  color: #dc3545;
}

.router-link-active {
  background-color: #0d6efd !important;
  border-color: #0d6efd !important;
}
</style>
