<template>
  <div class="conflict-detail-container">
    <div v-if="loading" class="loading">
      <p>{{ $t('conflict.loading') }}</p>
    </div>
    
    <div v-else-if="error" class="error">
      <Card>
        <h2>{{ $t('conflict.error') }}</h2>
        <p>{{ error }}</p>
      </Card>
    </div>
    
    <div v-else-if="conflict" class="conflict-detail">
      <Card class="detail-card">
        <template #header>
          <div class="header-content">
            <h1>{{ conflict.name }}</h1>
            <span :class="`status status-${conflict.status.toLowerCase()}`">
              {{ statusText }}
            </span>
          </div>
        </template>

        <div class="detail-content">
          <div class="info-section">
            <h3>{{ $t('conflict.startDate') }}</h3>
            <p class="date-info">{{ formattedDate }}</p>
          </div>

          <div v-if="hasCountries" class="info-section">
            <h3>{{ $t('conflict.countries') }}</h3>
            <div class="countries-list">
              <div 
                v-for="country in conflict.countries" 
                :key="country.id"
                class="country-item"
              >
                <CountryFlag 
                  :country-code="country.code"
                  :country-name="country.name"
                  size="medium"
                />
                <span class="country-name">{{ country.name }}</span>
              </div>
            </div>
          </div>

          <div v-if="conflict.description" class="info-section">
            <h3>{{ $t('conflict.description') }}</h3>
            <p class="description">{{ conflict.description }}</p>
          </div>
          
          <div v-else class="info-section">
            <p class="no-description">{{ $t('conflict.noDescription') }}</p>
          </div>

          <ConflictMap 
            v-if="firstCountry"
            :country-code="firstCountry.code"
            :country-name="firstCountry.name"
          />
        </div>

        <template #footer>
          <button @click="goBack" class="back-button">{{ $t('conflict.backToList') }}</button>
        </template>
      </Card>
    </div>
    
    <div v-else class="not-found">
      <Card>
        <h2>Conflicto no encontrado</h2>
        <p>El conflicto solicitado no existe o ha sido eliminado.</p>
        <button @click="goBack" class="back-button">Volver al listado</button>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useConflictsStore } from '../stores/conflicts'
import Card from '../components/Card.vue'
import CountryFlag from '../components/CountryFlag.vue'
import ConflictMap from '../components/ConflictMap.vue'
import { formatDate } from '../utils/dateFormatter'

const { t } = useI18n()

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
  description?: string
  countries?: Country[]
}

const route = useRoute()
const router = useRouter()
const store = useConflictsStore()
const { loading, error } = storeToRefs(store)
const conflict = ref<Conflict | null>(null)

const formattedDate = computed(() => 
  conflict.value ? formatDate(conflict.value.startDate) : ''
)

const hasCountries = computed(() => 
  conflict.value && conflict.value.countries && conflict.value.countries.length > 0
)

const firstCountry = computed(() => 
  conflict.value?.countries?.[0] || null
)

const statusText = computed(() => {
  if (!conflict.value) return ''
  return t(`conflict.status.${conflict.value.status}`) || conflict.value.status
})

const goBack = () => {
  router.push('/')
}

onMounted(async () => {
  const id = Number(route.params.id)
  conflict.value = await store.fetchConflictById(id)
})
</script>

<style scoped>
.conflict-detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 40px 20px;
}

.detail-card {
  margin-top: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.header-content h1 {
  margin: 0;
  font-size: 2rem;
  color: #f0f0f0;
}

.status {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.9rem;
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

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-section h3 {
  margin: 0 0 8px 0;
  color: #b0b0b0;
  font-size: 1rem;
  font-weight: 600;
}

.date-info {
  font-size: 1.1rem;
  color: #e0e0e0;
  margin: 0;
}

.countries-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #252525;
  border: 1px solid #333;
  border-radius: 8px;
  transition: all 0.2s;
}

.country-item:hover {
  background: #2c2c2c;
  border-color: #404040;
}

.country-name {
  font-size: 0.95rem;
  color: #e0e0e0;
  font-weight: 500;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #c0c0c0;
  margin: 0;
}

.no-description {
  color: #707070;
  font-style: italic;
  margin: 0;
}

.back-button {
  background: #168b86;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.3s;
}

.back-button:hover {
  background: #0b4643;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-content h1 {
    font-size: 1.5rem;
  }
}
</style>