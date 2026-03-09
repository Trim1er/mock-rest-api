const http = require('http');
const url = require('url');

const users = [
  { id: 1, name: 'Ari' },
  { id: 2, name: 'Blake' },
  { id: 3, name: 'Casey' }
];

const items = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, name: `item-${i + 1}`, price: (i + 1) * 3 }));

function parseIntSafe(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function getItems(query) {
  const page = parseIntSafe(query.page, 1);
  const limit = parseIntSafe(query.limit, 10);
  const sortBy = ['id', 'name', 'price'].includes(query.sortBy) ? query.sortBy : 'id';
  const order = query.order === 'desc' ? 'desc' : 'asc';

  const sorted = [...items].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const start = (page - 1) * limit;
  const paged = sorted.slice(start, start + limit);
  return { page, limit, sortBy, order, total: sorted.length, items: paged };
}

function handler(req, res) {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;

  if (path === '/users') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ users }));
  }

  if (path === '/items') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(getItems(parsed.query)));
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  http.createServer(handler).listen(port, () => console.log(`mock-rest-api on :${port}`));
}

module.exports = { handler, getItems };
