import '@logseq/libs';
import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchBar from './ui/SearchBar';

function mount() {
  const container = document.createElement('div');
  container.id = 'logseq-meilisearch-container';
  document.body.appendChild(container);
  
  const root = createRoot(container);
  root.render(React.createElement(SearchBar));
}

function main() {
  logseq.ready(() => {
    logseq.App.registerCommandPalette({
      key: 'open-search',
      label: 'Open MeiliSearch Search'
    }, () => mount());
  });
}

main();
