<template>
  <div id="app">
    <LanguageSelector class="language-selector-fixed" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import LanguageSelector from './components/LanguageSelector.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e0e0e0;
  background-color: #0f0f0f;
  min-height: 100vh;
  position: relative;
}

.language-selector-fixed {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
