import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'
const buildUrl = (path: string) => `${apiBaseUrl}${path.startsWith('/') ? path : '/' + path}`

const parseApiError = async (response: Response) => {
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    try {
      const data = await response.json()
      if (typeof data === 'object' && data !== null) {
        return data.message ?? data.error ?? JSON.stringify(data)
      }
    } catch {
      // ignored
    }
  }
  return response.statusText || `HTTP ${response.status}`
}

export const useConflictsStore = defineStore('conflicts', () => {
  const conflicts = ref<Conflict[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  const fetchConflicts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(buildUrl('/conflicts'))
      if (!response.ok) throw new Error(await parseApiError(response))
      const data = await response.json()
      conflicts.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchConflictById = async (id: number): Promise<Conflict | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(buildUrl(`/conflicts/${id}`))
      if (!response.ok) throw new Error(await parseApiError(response))
      return await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return null
    } finally {
      loading.value = false
    }
  }

  const createConflict = async (conflictData: Omit<Conflict, 'id'>) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(buildUrl('/conflicts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conflictData)
      })
      if (!response.ok) throw new Error(await parseApiError(response))
      await fetchConflicts()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const filteredConflicts = computed(() => {
    if (!searchQuery.value) return conflicts.value
    return conflicts.value.filter(conflict =>
      conflict.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const activeConflictsCount = computed(() =>
    conflicts.value.filter(c => c.status === 'ACTIVE').length
  )

  const pausedConflictsCount = computed(() =>
    conflicts.value.filter(c => c.status === 'PAUSED').length
  )

  const endedConflictsCount = computed(() =>
    conflicts.value.filter(c => c.status === 'ENDED').length
  )

  const conflictStatsByStatus = computed(() => ({
    active: activeConflictsCount.value,
    paused: pausedConflictsCount.value,
    ended: endedConflictsCount.value
  }))

  return {
    conflicts,
    loading,
    error,
    searchQuery,
    fetchConflicts,
    fetchConflictById,
    createConflict,
    filteredConflicts,
    activeConflictsCount,
    pausedConflictsCount,
    endedConflictsCount,
    conflictStatsByStatus
  }
})