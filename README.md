# mock-rest-api

Mock REST API service with `/users` and `/items` endpoints.

## Next-step implemented
Added pagination and sorting on `/items`.

## Usage
```bash
npm install
npm start
```

Examples:
- `/items?page=2&limit=5`
- `/items?sortBy=price&order=desc&limit=10`
