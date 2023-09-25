# Turborepo Template

## 명령

```
// 전체 빌드
turbo run build

// 특정 빌드
turbo run build --filter=green-admin-layout

// lint
turbo run lint

// test
turbo run test
```

## 참고 - delete

```
find . -name ".turbo" -type d -prune -exec rm -rf {} +
find . -name ".vite" -type d -prune -exec rm -rf {} +
find . -name "node_modules" -type d -prune -exec rm -rf {} +
find . -name "package-lock.json" -type f -exec rm -f {} +
find . -name "mockServiceWorker.js" -type f -exec rm -f {} +
```
