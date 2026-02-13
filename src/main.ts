import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchBar from './ui/SearchBar';
import { startMeili, stopMeili } from './background';
import { startWatcher } from './watcher';

function mount() {
  const container = document.createElement('div');
  container.id = 'logseq-meilisearch-container';
  document.body.appendChild(container);
  
  const root = createRoot(container);
  root.render(React.createElement(SearchBar));
}

async function startBackendServices() {
  try {
    await startMeili();
    console.log('[MeiliSearch] Server started');
    
    const graphPath = await logseq.App.getCurrentGraph();
    if (graphPath?.path) {
      const pagesPath = `${graphPath.path}/pages`;
      startWatcher(pagesPath);
      console.log('[MeiliSearch] Watching:', pagesPath);
    }
  } catch (error) {
    console.error('[MeiliSearch] Failed to start:', error);
    logseq.UI.showMsg('MeiliSearch failed to start. Check console.', 'error');
  }
}

function main() {
  logseq.ready(() => {
    logseq.App.registerCommandPalette({
      key: 'open-search',
      label: 'Open MeiliSearch Search'
    }, () => mount());

    logseq.beforeunload(async () => {
      stopMeili();
    });

    startBackendServices();
  });
}

logseq.ready(main).catch(console.error);
