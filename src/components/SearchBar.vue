<template>
  <div class="search-bar">
    <input 
      v-model="model" 
      type="text" 
      :placeholder="$t('home.search')" 
      class="search-input"
    />
    <button 
      v-if="model" 
      @click="clearSearch" 
      class="clear-button"
      title="Limpiar búsqueda"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const clearSearch = () => {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 14px 48px 14px 16px;
  font-size: 1rem;
  border: 2px solid #333;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  background: #1e1e1e;
  color: #e0e0e0;
}

.search-input:focus {
  border-color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.2);
}

.search-input::placeholder {
  color: #707070;
}

.clear-button {
  position: absolute;
  right: 12px;
  background: #2c2c2c;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  color: #a0a0a0;
  transition: all 0.2s;
}

.clear-button:hover {
  background: #3a3a3a;
  color: #e0e0e0;
}
</style>