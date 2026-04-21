<template>
  <div id="app" class="app-layout">
    <header class="topbar">
      <div class="brand">ConflictTracker</div>
      <nav class="topnav">
        <router-link to="/">Inicio</router-link>
        <router-link to="/">Conflictos</router-link>
      </nav>
      <LanguageSelector class="lang-inline" />
    </header>

    <div class="main-area">
      <aside class="sidebar">
        <h3>Filtros</h3>
        <p class="muted">(Ajusta filtros desde aquí)</p>
      </aside>

      <main class="content">
        <router-view />
      </main>
    </div>

    <footer class="site-footer">© 2026 ConflictTracker</footer>
  </div>
</template>

<script setup lang="ts">
import LanguageSelector from './components/LanguageSelector.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: var(--text-color);
  background: var(--bg-1);
}

.topbar {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--edge);
  background: linear-gradient(90deg, var(--bg-1), var(--bg-2));
}

.brand {
  font-weight: 700;
  color: var(--accent);
}

.topnav a {
  margin-left: 1rem;
  color: var(--muted);
  text-decoration: none;
}

.lang-inline {
  margin-left: auto;
}

.main-area {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 1280px;
  margin: 1.5rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.sidebar {
  width: 260px;
  background: var(--panel);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.content {
  flex: 1;
  min-height: 60vh;
}

.site-footer {
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
