import fetch from 'node-fetch';
import { extractContent } from './utils/pathHelpers';
import * as path from 'path';
import * as crypto from 'crypto';

export async function indexFile(filePath: string): Promise<void> {
  const { title, body } = extractContent(filePath);
  const id = crypto.createHash('md5').update(path.resolve(filePath)).digest('hex');
  
  await fetch('http://127.0.0.1:7700/indexes/notes/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([{ id, title, content: body }])
  });
}
