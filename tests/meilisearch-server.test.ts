import fetch from 'node-fetch';

test('MeiliSearch health endpoint returns 200', async () => {
  const res = await fetch('http://127.0.0.1:7700/health');
  expect(res.status).toBe(200);
}, 15000);
