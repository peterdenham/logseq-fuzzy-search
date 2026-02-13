import { buildIndex, search } from './search-engine';

function createSearchUI() {
  const container = document.getElementById('app') || document.createElement('div');
  container.id = 'app';
  container.innerHTML = '';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search notes...';
  input.style.cssText = 'width:100%;padding:8px;font-size:14px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;';

  const resultsList = document.createElement('ul');
  resultsList.style.cssText = 'list-style:none;padding:0;margin:8px 0 0 0;max-height:400px;overflow-y:auto;';

  let debounceTimer: ReturnType<typeof setTimeout>;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value.trim();
      resultsList.innerHTML = '';

      if (!query) return;

      const results = search(query);
      if (results.length === 0) {
        resultsList.innerHTML = '<li style="padding:8px;color:#999;">No results found</li>';
        return;
      }

      for (const hit of results) {
        const li = document.createElement('li');
        li.style.cssText = 'padding:8px;border-bottom:1px solid #eee;cursor:pointer;';
        li.innerHTML = `<strong>${hit.name}</strong><br><span style="color:#666;font-size:12px;">${hit.content.slice(0, 120)}...</span>`;
        li.addEventListener('click', () => {
          logseq.App.pushState('page', { name: hit.name });
          logseq.hideMainUI();
        });
        resultsList.appendChild(li);
      }
    }, 150);
  });

  container.appendChild(input);
  container.appendChild(resultsList);
  document.body.appendChild(container);

  setTimeout(() => input.focus(), 100);
}

function main() {
  logseq.provideStyle(`
    #logseq-meilisearch-search--logsearch {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }
    #app {
      background: white;
      border-radius: 8px;
      padding: 16px;
      width: 600px;
      max-width: 90vw;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }
  `);

  logseq.App.registerCommandPalette({
    key: 'open-search',
    label: 'Open MeiliSearch Search'
  }, async () => {
    await buildIndex();
    createSearchUI();
    logseq.showMainUI();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      logseq.hideMainUI();
    }
  });

  buildIndex();
}

logseq.ready(main).catch(console.error);
