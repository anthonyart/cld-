const test = require('node:test');
const assert = require('node:assert/strict');
const server = require('./server.js');

test('GET /api/health returns ok status', async (t) => {
  server.listen(0);
  const { port } = server.address();
  t.after(() => server.close());

  const res = await fetch(`http://localhost:${port}/api/health`);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.status, 'ok');
  assert.equal(typeof body.uptimeSeconds, 'number');
});

test('GET / serves index.html', async (t) => {
  server.listen(0);
  const { port } = server.address();
  t.after(() => server.close());

  const res = await fetch(`http://localhost:${port}/`);
  const body = await res.text();

  assert.equal(res.status, 200);
  assert.match(body, /<title>Claude Code Starter Kit<\/title>/);
});

test('path traversal outside public/ is rejected', async (t) => {
  server.listen(0);
  const { port } = server.address();
  t.after(() => server.close());

  const res = await fetch(`http://localhost:${port}/../server.js`);
  assert.notEqual(res.status, 200);
});
