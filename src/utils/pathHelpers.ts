import { readFileSync } from 'fs';

export function extractContent(filePath: string): { title: string; body: string } {
  const raw = readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  const titleLine = lines.find(l => l.startsWith('# '));
  const title = titleLine ? titleLine.replace(/^#\s+/, '') : 'Untitled';
  
  const body = lines
    .filter(l => !l.trim().startsWith('{{') && !l.trim().startsWith(':::'))
    .join('\n');
  
  return { title, body };
}
