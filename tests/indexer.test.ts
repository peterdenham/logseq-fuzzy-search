import { indexFile } from '../src/indexer';
import fetch from 'node-fetch';

test('indexing adds document to MeiliSearch', async () => {
  const filePath = '__tests__/sample.md';
  await indexFile(filePath);
  
  await new Promise(r => setTimeout(r, 1000));
  
  const res = await fetch('http://127.0.0.1:7700/indexes/notes/search?q=Sample');
  const data: any = await res.json();
  expect(data.hits.length).toBeGreaterThan(0);
  expect(data.hits[0].title).toContain('Sample Page');
}, 15000);
