<template>
  <div class="card-wrapper">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.card-wrapper {
  background: var(--panel);
  border: 1px solid var(--edge);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.card-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(16,24,40,0.08);
  border-color: var(--edge);
}

.card-header {
  padding: 14px 18px;
  background: transparent;
  border-bottom: 1px solid rgba(15,23,36,0.04);
  font-weight: 700;
  color: var(--text-color);
}

.card-body {
  padding: 16px;
  color: var(--text-color);
}

.card-footer {
  padding: 12px 16px;
  background: transparent;
  border-top: 1px solid rgba(15,23,36,0.04);
}
</style>
