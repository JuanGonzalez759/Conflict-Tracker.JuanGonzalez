# Conflict Tracker Frontend (Vue 3 + Vite + Supabase)

## 🚀 Arquitectura de Despliegue

```
┌────────────────────────────────────────────┐
│   Frontend Layer (Vue 3 + Vite)            │
│   Vercel: https://conflict-tracker-juan-gonzalez-cgag.vercel.app
└────────────────┬─────────────────────────┘
                 │ VITE_API_URL
                 │
        ┌────────┴────────┐
        │                 │
        ↓                 ↓
   ┌────────────┐   ┌──────────────┐
   │  Spring    │   │  Supabase    │
   │  Boot API  │   │  (PostgreSQL)│
   │  /api/v1   │   │  https://cnblimsqcyvurigapfpc.supabase.co
   │  https://conflict-tracker-api-production.up.railway.app/api/v1 │
   └────────────┘   └──────────────┘
```

## Características

- ✅ SPA (Single Page Application) con Vue 3
- ✅ Vite para build rápido
- ✅ Integración con backend Spring Boot (`VITE_API_URL`)
- ✅ Integración con Supabase para datos auxiliares
- ✅ i18n (Internacionalización: Catalán, Español, Inglés)
- ✅ Pinia para gestión de estado
- ✅ Vue Router para navegación
- ✅ SPA routing (vercel.json, _redirects)

## Variables de Entorno

### Local Development (`.env.local`)

```env
# Backend API
VITE_API_URL=http://localhost:8080/api/v1

# Supabase (opcional para usar datos auxiliares)
VITE_SUPABASE_URL=https://cnblimsqcyvurigapfpc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_QvRxzn71vEZHpbrqtQbTww_NERqRN-6
```

### Producción (Vercel Environment Variables)

En el dashboard de Vercel:

```env
VITE_API_URL=https://conflict-tracker-api-production.up.railway.app/api/v1
VITE_SUPABASE_URL=https://cnblimsqcyvurigapfpc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_QvRxzn71vEZHpbrqtQbTww_NERqRN-6
```

También es importante que en Railway el backend tenga configurada la variable:

```env
FRONTEND_URL=https://conflict-tracker-juan-gonzalez-cgag.vercel.app
```

## Instalación y Ejecución

### Local

```bash
cd Conflict-Tracker.JuanGonzalez-main
npm install
npm run dev
```

Abre: http://localhost:5173

### Build Producción

```bash
npm run build
npm run preview
```

## 📋 Cambios Realizados para Despliegue

### 1. Variables de Entorno Dinámicas

**Error original:**
```typescript
const response = await fetch('http://localhost:8080/api/v1/conflicts')
```
- URL hardcodeada a localhost
- Imposible cambiar en producción sin recompilar

**Solución:**
- Usar `import.meta.env.VITE_API_URL` en `src/stores/conflicts.ts`
- Parser de errores para evitar que objetos Spring contaminen el estado

```typescript
const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'
const buildUrl = (path: string) => `${apiBaseUrl}${path}`

const parseApiError = async (response: Response) => {
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    try {
      const data = await response.json()
      return data.message ?? data.error ?? JSON.stringify(data)
    } catch { }
  }
  return response.statusText || `HTTP ${response.status}`
}
```

### 2. SPA Routing Configuration

**Error original:**
- F5 en ruta `/conflicts/1` devolvía 404
- Vercel/Netlify no sabían reescribir hacia `index.html`

**Solución:**

- **`vercel.json`**: Redirige todas las rutas a `index.html`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- **`_redirects`**: Compatible con Netlify
```
/*    /index.html   200
```

### 3. Supabase Integration (Opcional)

**Añadido:**
- `src/utils/supabase.ts`: Cliente de Supabase
- Variables de entorno para Supabase
- Capacidad de conectar con datos auxiliares

```typescript
// src/utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 4. TypeScript Vue Declarations

**Error original:**
```
TS7016: Could not find a declaration file for module './App.vue'
```

**Solución:**
- Crear `src/env.d.ts` con declaraciones de módulos Vue
- Actualizar `tsconfig.app.json` para incluir `**/*.d.ts`

```typescript
// src/env.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

## 📁 Estructura de Archivos Clave

```
src/
├── App.vue                 # Layout principal
├── main.ts                 # Entry point
├── env.d.ts                # Declaraciones TypeScript
├── stores/
│   └── conflicts.ts        # Pinia store con VITE_API_URL
├── utils/
│   └── supabase.ts         # Cliente Supabase
├── router/
│   └── index.ts            # Vue Router
├── views/
│   ├── Home.vue            # Listado de conflictos
│   └── ConflictDetail.vue  # Detalles de conflicto
└── components/
    ├── ConflictCard.vue
    ├── SearchBar.vue
    └── ...
.env.local                   # Variables locales (no commitar)
.env.example                 # Plantilla de variables
vercel.json                  # Config SPA routing (Vercel)
_redirects                   # Config SPA routing (Netlify)
```

## 🌐 Despliegue en Vercel

### Paso 1: Conectar GitHub

1. Ve a [Vercel](https://vercel.com)
2. Click "New Project"
3. Importa tu repositorio GitHub

### Paso 2: Configurar Entorno

En el dashboard de Vercel:
- Pestaña "Settings" > "Environment Variables"
- Agrega:
  - `VITE_API_URL`: URL de tu backend Railway
  - `VITE_SUPABASE_URL`: URL de Supabase
  - `VITE_SUPABASE_PUBLISHABLE_KEY`: Clave de Supabase

### Paso 3: Deploy

```bash
git push origin main
```

Vercel desplegará automáticamente.

## 📊 Conexión Backend-Frontend

### En Local

```bash
# Terminal 1: Backend (puerto 8080)
FRONTEND_URL=http://localhost:5173 mvn spring-boot:run

# Terminal 2: Frontend (puerto 5173)
npm run dev
```

### En Producción

1. Backend en Railway: `https://<backend>.railway.app`
2. Frontend en Vercel: `https://<frontend>.vercel.app`
3. CORS habilitado: Backend recibe `FRONTEND_URL=https://<frontend>.vercel.app`
4. Frontend conecta a: `VITE_API_URL=https://<backend>.railway.app/api/v1`

## 🔧 Troubleshooting

### Error: "404 on page refresh"
- Verifica `vercel.json` o `_redirects`
- Asegúrate que el sitio está desplegado en Vercel

### Error: "VITE_API_URL is undefined"
- Crea `.env.local` con `VITE_API_URL=...`
- En Vercel, configura la variable en "Environment Variables"

### Error: "CORS policy"
- Backend debe tener `FRONTEND_URL` correcto
- Debe coincidir exactamente con la URL de Vercel

## 📚 Documentación Adicional

Ver [Backend README](../conflict-tracker-api-main/DEPLOYMENT.md) para instrucciones del servidor.
