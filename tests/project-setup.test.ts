import { existsSync } from 'fs';

test('npm init creates package.json', () => {
  const exists = existsSync('package.json');
  expect(exists).toBe(true);
});
