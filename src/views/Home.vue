<template>
  <div class="home">
    <header class="page-header">
      <h1>{{ $t('home.title') }}</h1>
      <p class="subtitle">{{ $t('home.subtitle') }}</p>
    </header>

    <div class="search-section">
      <SearchBar v-model="searchQuery" />
    </div>

    <div v-if="loading" class="loading">
      <p>{{ $t('home.loading') }}</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ $t('home.error') }}: {{ error }}</p>
    </div>
    
    <div v-else class="content">
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-value">{{ filteredConflicts.length }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-item active">
          <span class="stat-value">{{ activeConflictsCount }}</span>
          <span class="stat-label">{{ $t('home.stats.active') }}</span>
        </div>
      </div>

      <ConflictStats 
        v-if="conflicts.length > 0"
        :active="activeConflictsCount"
        :paused="pausedConflictsCount"
        :ended="endedConflictsCount"
      />

      <div v-if="filteredConflicts.length === 0" class="empty-state">
        <p>{{ $t('home.noResults') }}</p>
      </div>

      <div v-else class="conflicts-list">
        <ConflictCard
          v-for="conflict in filteredConflicts"
          :key="conflict.id"
          :conflict="conflict"
          @view-detail="viewDetail"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useConflictsStore } from '../stores/conflicts'
import SearchBar from '../components/SearchBar.vue'
import ConflictCard from '../components/ConflictCard.vue'
import ConflictStats from '../components/ConflictStats.vue'

const router = useRouter()
const store = useConflictsStore()

const { loading, error, searchQuery, filteredConflicts, conflicts, activeConflictsCount, pausedConflictsCount, endedConflictsCount } = storeToRefs(store)

onMounted(() => {
  store.fetchConflicts()
})

const viewDetail = (id: number) => {
  router.push(`/conflicts/${id}`)
}
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  margin: 0 0 12px 0;
  font-size: 2.5rem;
  color: #f0f0f0;
  font-weight: 700;
}

.subtitle {
  margin: 0;
  font-size: 1.1rem;
  color: #a0a0a0;
  font-weight: 400;
}

.search-section {
  max-width: 600px;
  margin: 0 auto 30px;
}

.loading, .error {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.1rem;
  color: #b0b0b0;
}

.error {
  color: #ff6b6b;
}

.stats-bar {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.stat-item {
  background: #1e1e1e;
  border: 1px solid #333;
  padding: 16px 32px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
}

.stat-item.active {
  background: #2a1a1a;
  border-color: #4a2a2a;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #f0f0f0;
  line-height: 1;
}

.stat-item.active .stat-value {
  color: #ff6b6b;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-top: 8px;
  text-transform: uppercase;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  font-size: 1.2rem;
  color: #707070;
}

.conflicts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .conflicts-list {
    grid-template-columns: 1fr;
  }
}
</style>