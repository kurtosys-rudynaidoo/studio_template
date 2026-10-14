# App Manager (`ksys-client-appManager`)

**Required default** shell for every Studio monorepo project.

- Loads product-page child widgets by GUID
- Emits co-deployed `shared.css` (not `bp-shared.css`)

```bash
# from monorepo root
npm run dev -- appManager
npm run build:stg
# → BuildResult/<host>/stg/appManager/{appManager.js,shared.css}
```

See `MONOREPO.md` and fill `config/env.config.cjs` → `childAppGuids` after deploying each child app.
