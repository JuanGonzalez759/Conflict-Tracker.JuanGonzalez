<template>
  <div class="map-container">
    <h3>{{ $t('conflict.location') }}</h3>
    <div ref="mapElement" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Props {
  countryCode?: string
  countryName?: string
}

const props = defineProps<Props>()
const mapElement = ref<HTMLElement | null>(null)
let map: L.Map | null = null

// Coordenadas de países principales (lat, lng)
const countryCoordinates: Record<string, [number, number]> = {
  'UKR': [48.3794, 31.1656],  // Ucrania
  'RUS': [61.5240, 105.3188], // Rusia
  'ISR': [31.0461, 34.8516],  // Israel
  'PSE': [31.9522, 35.2332],  // Palestina
  'SYR': [34.8021, 38.9968],  // Siria
  'USA': [37.0902, -95.7129], // Estados Unidos
  'CHN': [35.8617, 104.1954], // China
  'IRN': [32.4279, 53.6880],  // Irán
  'IRQ': [33.2232, 43.6793],  // Iraq
  'AFG': [33.9391, 67.7100],  // Afganistán
  'YEM': [15.5527, 48.5164],  // Yemen
  'LBY': [26.3351, 17.2283],  // Libia
  'SDN': [12.8628, 30.2176],  // Sudán
  'ETH': [9.1450, 40.4897],   // Etiopía
  'SOM': [5.1521, 46.1996],   // Somalia
  'COL': [4.5709, -74.2973],  // Colombia
  'MEX': [23.6345, -102.5528],// México
  'VEN': [6.4238, -66.5897],  // Venezuela
}

const initMap = () => {
  if (!mapElement.value) return

  // Obtener coordenadas del país o usar coordenadas por defecto
  const coords: [number, number] = props.countryCode 
    ? countryCoordinates[props.countryCode] || [20, 0]
    : [20, 0]

  // Crear el mapa
  map = L.map(mapElement.value).setView(coords, 5)

  // Añadir capa de tiles de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map)

  // Añadir marcador
  const marker = L.marker(coords).addTo(map)
  if (props.countryName) {
    marker.bindPopup(`<b>${props.countryName}</b>`).openPopup()
  }
}

const updateMap = () => {
  if (!map || !props.countryCode) return
  
  const coords: [number, number] = countryCoordinates[props.countryCode] || [20, 0]
  map.setView(coords, 5)
  
  // Limpiar marcadores previos
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map?.removeLayer(layer)
    }
  })
  
  // Añadir nuevo marcador
  const marker = L.marker(coords).addTo(map)
  if (props.countryName) {
    marker.bindPopup(`<b>${props.countryName}</b>`).openPopup()
  }
}

onMounted(() => {
  initMap()
})

watch(() => props.countryCode, () => {
  updateMap()
})
</script>

<style scoped>
.map-container {
  margin: 1rem 0;
}

.map-container h3 {
  margin-bottom: 0.5rem;
  color: #f0f0f0;
}

.map {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid #333;
  z-index: 0;
}
</style>
