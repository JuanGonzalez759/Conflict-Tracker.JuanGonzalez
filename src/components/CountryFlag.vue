<template>
  <span class="country-flag-wrapper" :title="countryName">
    <img 
      v-if="flagCode"
      :src="flagUrl" 
      :alt="`Bandera de ${countryName}`"
      class="flag-img"
      :class="sizeClass"
      @error="handleError"
    />
    <span v-else class="flag-fallback">{{ countryCode }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  countryCode: string
  countryName: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small'
})

const imageError = ref(false)

// Mapeo de códigos ISO 3166-1 alpha-3 (tu API) a alpha-2 (flagcdn)
const iso3ToIso2: Record<string, string> = {
  'UKR': 'ua',
  'RUS': 'ru',
  'ISR': 'il',
  'PSE': 'ps',
  'USA': 'us',
  'SYR': 'sy',
  'TUR': 'tr',
  'YEM': 'ye',
  'SAU': 'sa',
  'IRN': 'ir'
}

const flagCode = computed(() => {
  if (imageError.value) return null
  return iso3ToIso2[props.countryCode.toUpperCase()]
})

const flagUrl = computed(() => {
  if (!flagCode.value) return ''
  const sizes: Record<string, string> = {
    small: '24x18',
    medium: '40x30',
    large: '80x60'
  }
  const sizeStr = sizes[props.size] || sizes.small
  return `https://flagcdn.com/${sizeStr}/${flagCode.value}.png`
})

const sizeClass = computed(() => `flag-${props.size}`)

const handleError = () => {
  imageError.value = true
}
</script>

<style scoped>
.country-flag-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.flag-img {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  display: block;
}

.flag-small {
  width: 24px;
  height: 18px;
}

.flag-medium {
  width: 40px;
  height: 30px;
}

.flag-large {
  width: 80px;
  height: 60px;
}

.flag-fallback {
  font-size: 0.75rem;
  color: #999;
  font-weight: 600;
  padding: 2px 4px;
  background: #f5f5f5;
  border-radius: 3px;
}
</style>
