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
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  border-color: #404040;
}

.card-header {
  padding: 16px 20px;
  background: #252525;
  border-bottom: 1px solid #333;
  font-weight: 600;
  color: #e0e0e0;
}

.card-body {
  padding: 20px;
  color: #d0d0d0;
}

.card-footer {
  padding: 12px 20px;
  background: #1a1a1a;
  border-top: 1px solid #333;
}
</style>
