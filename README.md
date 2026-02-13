# Logseq MeiliSearch Search Plugin

Full-text fuzzy search for Logseq powered by an embedded MeiliSearch server.

## Features

- **Embedded MeiliSearch** - No external installation required (macOS x64)
- **Incremental Indexing** - Automatically watches your graph for changes
- **Fuzzy Ranking** - Typo-tolerant search with relevance scoring
- **React UI** - Clean search interface integrated into Logseq

## Installation

1. **Copy this plugin to your Logseq plugins directory:**
   ```bash
   cp -r /Users/peterdenham/dev/logsearch ~/Documents/logseq-personal/.logseq/plugins/
   ```

2. **Enable the plugin in Logseq:**
   - Open Logseq Settings → Plugins
   - Find "MeiliSearch Search" and enable it

3. **Start using search:**
   - Press `Ctrl/Cmd + Shift + P` to open command palette
   - Run **"Open MeiliSearch Search"**
   - Type your query and see ranked results instantly

## Development

### Build
```bash
npm install
npm run build
```

### Test
```bash
npm test
```

### Stop MeiliSearch Server
```bash
bash scripts/stop-meili.sh
```

## Architecture

- **Background Process** (`src/background.ts`) - Spawns the MeiliSearch binary on plugin load
- **Indexer** (`src/indexer.ts`) - Extracts content from Markdown files and indexes to MeiliSearch
- **Watcher** (`src/watcher.ts`) - Monitors `pages/` directory for file changes
- **UI Components** (`src/ui/`) - React-based search bar and results panel
- **Main Entry** (`src/main.ts`) - Logseq plugin initialization

## Configuration

By default, the plugin:
- Runs MeiliSearch on `http://127.0.0.1:7700`
- Indexes all `.md` files in your Logseq graph
- Stores index data in `data.ms/`

## License

ISC
