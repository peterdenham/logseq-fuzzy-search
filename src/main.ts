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

async function main() {
  console.log('[MeiliSearch Plugin] Initializing...');
  
  try {
    await startMeili();
    console.log('[MeiliSearch Plugin] MeiliSearch started successfully');
    
    const graphPath = await logseq.App.getCurrentGraph();
    if (graphPath?.path) {
      const pagesPath = `${graphPath.path}/pages`;
      startWatcher(pagesPath);
      console.log('[MeiliSearch Plugin] Watching:', pagesPath);
    }
  } catch (error) {
    console.error('[MeiliSearch Plugin] Failed to start:', error);
    logseq.UI.showMsg('MeiliSearch plugin failed to start. Check console for details.', 'error');
  }
  
  logseq.ready(() => {
    logseq.App.registerCommandPalette({
      key: 'open-search',
      label: 'Open MeiliSearch Search'
    }, () => mount());
    
    console.log('[MeiliSearch Plugin] Ready!');
  });
  
  logseq.beforeunload(async () => {
    stopMeili();
  });
}

main();
