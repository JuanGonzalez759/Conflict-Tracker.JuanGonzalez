# Conflict Tracker Frontend (Vue 3 + Vite)

## Arquitectura desplegament
- Frontend SPA: Vue 3 + Vite
- Backend API: Spring Boot exposant `/api/v1`
- Persistència: PostgreSQL al núvol

## URL pública del Frontend
- Coloca aquí la teva URL pública des de Vercel/Netlify: `https://<your-frontend-url>`

## Variables d'entorn
El frontend llegeix l'URL de l'API des de `VITE_API_URL`.

### Local
Crea un fitxer `.env` al directori del projecte amb el contingut:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

### Producció
Configura aquesta variable a Vercel o Netlify amb l'URL del teu backend Spring Boot:

```env
VITE_API_URL=https://<your-backend-url>/api/v1
```

## Fitxers de routing SPA
- `vercel.json`: redirigeix totes les rutes a `index.html` per evitar 404 en refresh.
- `_redirects`: compatible amb Netlify.

## Execució
```bash
npm install
npm run build
npm run preview
```

## Canvis aplicats per desplegament
- S'han eliminat les crides a `http://localhost:8080/api/v1` i s'ha substituït per `import.meta.env.VITE_API_URL`.
- S'ha afegit un parser d'errors d'API per evitar que objectes d'error de Spring contaminin l'estat del store.
- S'ha afegit configuració SPA per evitar errors 404 en refrescar rutes internes.
