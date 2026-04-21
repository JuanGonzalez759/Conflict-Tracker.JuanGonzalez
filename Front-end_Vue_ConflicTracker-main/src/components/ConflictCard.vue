<template>
  <Card @click="handleClick" class="conflict-card">
    <template #header>
      <h3>{{ conflict.name }}</h3>
    </template>
    
    <div class="conflict-info">
      <p><strong>{{ $t('conflict.startDate') }}:</strong> {{ formattedDate }}</p>
      
      <div v-if="conflict.countries && conflict.countries.length > 0" class="countries-flags">
        <CountryFlag 
          v-for="country in conflict.countries.slice(0, 4)"
          :key="country.id"
          :country-code="country.code"
          :country-name="country.name"
          size="small"
        />
        <span v-if="conflict.countries.length > 4" class="more-countries">
          +{{ conflict.countries.length - 4 }}
        </span>
      </div>
      
      <span :class="`status status-${conflict.status.toLowerCase()}`">
        {{ statusText }}
      </span>
    </div>
    
    <template #footer>
      <span class="view-details">{{ $t('conflict.viewDetails') }} →</span>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from './Card.vue'
import CountryFlag from './CountryFlag.vue'
import { formatDateShort } from '../utils/dateFormatter'

interface Country {
  id: number
  name: string
  code: string
}

interface Conflict {
  id: number
  name: string
  startDate: string
  status: string
  countries?: Country[]
}

interface Props {
  conflict: Conflict
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewDetail: [id: number]
}>()

const formattedDate = computed(() => formatDateShort(props.conflict.startDate))

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const statusText = computed(() => {
  return t(`conflict.status.${props.conflict.status}`) || props.conflict.status
})

const handleClick = () => {
  emit('viewDetail', props.conflict.id)
}
</script>

<style scoped>
.conflict-card {
  cursor: pointer;
}

.conflict-card h3 {
  margin: 0;
  color: #f0f0f0;
  font-size: 1.2rem;
}

.conflict-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.conflict-info p {
  margin: 0;
  color: #b0b0b0;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background: #4a1a1a;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
}

.status-paused {
  background: #4a3a1a;
  color: #ffa726;
  border: 1px solid #ffa726;
}

.status-ended {
  background: #1a4a1a;
  color: #66bb6a;
  border: 1px solid #66bb6a;
}

.countries-flags {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.more-countries {
  font-size: 0.75rem;
  color: #b0b0b0;
  background: #2c2c2c;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
}

.view-details {
  color: #168b86;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>