<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>

  import Nav from './components/Nav.vue'

  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.min.css'

  Vue.use(VueMaterial)

  export default {
    name: 'App',
    components: {
      Nav
    }
  }

</script>

<style>

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
  @import url('https://unpkg.com/vue-material@beta/dist/vue-material.min.css');
  @import url('https://unpkg.com/vue-material@beta/dist/theme/default.css');

  :root {
    --md-theme-default-accent-on-background: rgba(68, 138, 255, 0.6);
  }

  html  {
    font-size: 0.625rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html * {
    -webkit-box-sizing: border-box; 
		-moz-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-o-box-sizing: border-box;
    box-sizing: border-box;
    color: #86868c;
  }

  .clearfix:after {
		content: "";
		display: table;
		clear: both;
	} 

  body {
    margin: 0;
  }

  #app {
    width: 100%;
    height: auto;
  }

  .hidden {
    position: absolute !important;
		visibility: hidden !important;
		z-index: -1 !important;
  }

  .container {
    display: block;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
  }

  .no-padding {
    padding: 0;
  }

  @media (min-width: 80.0625em) {
    .md-large-size-25 {
      flex-grow: 0;
      flex-basis: 25%;
      min-width: 25%;
      max-width: 25%;
    }

    .md-large-size-75 {
      flex-grow: 0;
      flex-basis: 75%;
      min-width: 75%;
      max-width: 75%;
    }

    .md-large-size-100 {
      flex-grow: 0;
      flex-basis: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  @media (min-width: 120.0625em) {

    .md-xlarge-size-25 {
      flex-grow: 0;
      flex-basis: 25%;
      min-width: 25%;
      max-width: 25%;
    }

    .md-xlarge-size-75 {
      flex-grow: 0;
      flex-basis: 75%;
      min-width: 75%;
      max-width: 75%;
    }

    .md-xlarge-size-100 {
      flex-grow: 0;
      flex-basis: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }


</style>
