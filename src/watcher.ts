import * as chokidar from 'chokidar';
import { indexFile } from './indexer';
import * as crypto from 'crypto';
import * as path from 'path';
import fetch from 'node-fetch';

export function startWatcher(dir: string): chokidar.FSWatcher {
  const watcher = chokidar.watch(`${dir}/**/*.md`, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  
  watcher.on('add', filePath => indexFile(filePath));
  watcher.on('change', filePath => indexFile(filePath));
  watcher.on('unlink', async filePath => {
    const id = crypto
      .createHash('md5')
      .update(path.resolve(filePath))
      .digest('hex');
    await fetch(`http://127.0.0.1:7700/indexes/notes/documents/${id}`, { 
      method: 'DELETE' 
    });
  });
  
  return watcher;
}
