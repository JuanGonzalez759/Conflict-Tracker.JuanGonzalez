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
.conflict-card { cursor: pointer; }

.conflict-card h3 { margin: 0; color: var(--text-color); font-size: 1.15rem; }

.conflict-info { display: flex; flex-direction: column; gap: 8px; }

.conflict-info p { margin: 0; color: var(--muted); font-size: 0.95rem; }

.status { display: inline-block; padding: 6px 12px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; }

.status-active { background: rgba(14,165,164,0.12); color: var(--accent); border: 1px solid rgba(14,165,164,0.18); }
.status-paused { background: rgba(250,204,21,0.08); color: #b45309; border: 1px solid rgba(250,204,21,0.12); }
.status-ended { background: rgba(34,197,94,0.08); color: #16a34a; border: 1px solid rgba(34,197,94,0.12); }

.countries-flags { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.more-countries { font-size: 0.75rem; color: var(--muted); background: rgba(15,23,36,0.02); padding: 4px 8px; border-radius: 8px; font-weight: 700; }

.view-details { color: var(--accent); font-size: 0.95rem; font-weight: 600; }
</style>