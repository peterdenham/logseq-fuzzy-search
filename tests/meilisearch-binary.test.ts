import { existsSync } from 'fs';

test('MeiliSearch binary is present', () => {
  expect(existsSync('assets/meilisearch-mac-x64')).toBe(true);
});
