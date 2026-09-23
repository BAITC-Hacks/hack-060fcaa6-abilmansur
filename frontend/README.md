# Frontend (to be built)

Next.js + Sigma.js / Graphology. Consumes the backend API (see `../backend/README.md`):

- Version board: `GET /investigations/{id}/board`
- Graph (Graphology `import()` format): `GET /investigations/{id}/versions/{vid}/graph?context=5`
- Time replay frames: `GET /investigations/{id}/versions/{vid}/timeline?bucket=day`
- Node questions: `POST /investigations/{id}/ask` → then SSE `GET /runs/{run_id}/events`
- Live progress: SSE `GET /investigations/{id}/events`
