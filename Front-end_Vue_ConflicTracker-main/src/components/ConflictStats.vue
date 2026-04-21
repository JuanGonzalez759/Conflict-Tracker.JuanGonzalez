<template>
  <div class="stats-container">
    <div class="chart-wrapper">
      <h3>Distribución por Estado</h3>
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  active: number
  paused: number
  ended: number
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: ['Activos', 'Pausados', 'Finalizados'],
  datasets: [{
    data: [props.active, props.paused, props.ended],
    backgroundColor: [
      '#ff6b6b',  // Rojo vibrante para activos
      '#ffa726',  // Naranja vibrante para pausados
      '#66bb6a'   // Verde vibrante para finalizados
    ],
    borderWidth: 2,
    borderColor: '#1e1e1e'
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 15,
        font: {
          size: 13,
          family: 'Avenir, Helvetica, Arial, sans-serif'
        },
        color: '#e0e0e0'
      }
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
          return `${label}: ${value} (${percentage}%)`
        }
      },
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      titleColor: '#e0e0e0',
      bodyColor: '#e0e0e0',
      borderColor: '#404040',
      borderWidth: 1
    }
  }
}
</script>

<style scoped>
.stats-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.chart-wrapper {
  background: #1e1e1e;
  border: 1px solid #333;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  max-width: 400px;
  width: 100%;
}

.chart-wrapper h3 {
  margin: 0 0 20px 0;
  text-align: center;
  color: #f0f0f0;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
