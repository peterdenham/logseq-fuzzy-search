import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import fetch from 'node-fetch';

let meiliProc: ChildProcess | null = null;

export async function startMeili(): Promise<void> {
  const binPath = path.resolve(__dirname, '../assets/meilisearch-mac-x64');
  meiliProc = spawn(binPath, ['--no-analytics', '--http-addr', '127.0.0.1:7700'], {
    detached: false,
    stdio: 'ignore'
  });

  const maxAttempts = 20;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch('http://127.0.0.1:7700/health');
      if (res.ok) return;
    } catch (_) {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('MeiliSearch failed to start');
}

export function stopMeili(): void {
  if (meiliProc && !meiliProc.killed) {
    meiliProc.kill();
  }
}

export async function main() {
  await startMeili();
  console.log('MeiliSearch started successfully');
}

if (require.main === module) {
  main().catch(err => {
    console.error('Failed to start MeiliSearch:', err);
    process.exit(1);
  });
}
