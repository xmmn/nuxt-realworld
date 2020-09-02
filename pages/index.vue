<template>
  <div>
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Nuxt RealWorld</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container">
      <Logo />
      <h1 class="title">Nuxt RealWorld</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style>
.banner {
  background: #5cb85c;
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
    inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  margin-bottom: 2rem;
}

.banner p {
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300 !important;
  margin-bottom: 0px;
}

.banner h1 {
  color: #fff;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  font-weight: 700 !important;
  text-align: center;
  font-size: 3.5rem;
  padding-bottom: 0.5rem;
}

.logo-font {
  font-family: 'Titillium Web', sans-serif;
}
</style>
