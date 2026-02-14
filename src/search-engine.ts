import MiniSearch from 'minisearch';

interface BlockDoc {
  id: string;
  uuid: string;
  pageName: string;
  content: string;
}

let searchIndex: MiniSearch<BlockDoc> | null = null;

interface FlatBlock {
  uuid: string;
  content: string;
}

function flattenBlocks(blocks: any[]): FlatBlock[] {
  const result: FlatBlock[] = [];
  for (const block of blocks) {
    if (block.content?.trim()) {
      result.push({ uuid: block.uuid, content: block.content });
    }
    if (block.children?.length) result.push(...flattenBlocks(block.children));
  }
  return result;
}

function createIndex(): MiniSearch<BlockDoc> {
  return new MiniSearch<BlockDoc>({
    fields: ['pageName', 'content'],
    storeFields: ['uuid', 'pageName', 'content'],
    searchOptions: {
      fuzzy: 0.2,
      prefix: true,
      boost: { pageName: 2 }
    }
  });
}

let indexReady = false;
let indexPromise: Promise<void> | null = null;

export async function buildIndex(): Promise<void> {
  if (indexReady && searchIndex) return;
  if (indexPromise) return indexPromise;

  indexPromise = doBuildIndex();
  await indexPromise;
  indexPromise = null;
}

async function doBuildIndex(): Promise<void> {
  const idx = createIndex();

  const pages = await logseq.Editor.getAllPages();
  if (!pages) return;

  const docs: BlockDoc[] = [];

  const BATCH = 10;
  const filtered = pages.filter((p: any) => !p.name.startsWith('__'));

  for (let i = 0; i < filtered.length; i += BATCH) {
    const batch = filtered.slice(i, i + BATCH);
    const batchResults = await Promise.all(
      batch.map(async (page: any) => {
        const pageName = page.originalName || page.name;
        const blocks = await logseq.Editor.getPageBlocksTree(page.name);
        if (!blocks) return [];
        return flattenBlocks(blocks).map((b) => ({
          id: `${page.id}-${b.uuid}`,
          uuid: b.uuid,
          pageName,
          content: b.content
        }));
      })
    );
    for (const blocks of batchResults) {
      docs.push(...blocks);
    }
  }

  idx.addAll(docs);
  searchIndex = idx;
  indexReady = true;
  const journals = filtered.filter((p: any) => p['journal?']).length;
  console.log(`[Fuzzy Search] Indexed ${docs.length} blocks across ${filtered.length} pages (${journals} journals)`);
}

export function invalidateIndex(): void {
  indexReady = false;
}

export function isIndexReady(): boolean {
  return indexReady && searchIndex !== null;
}

export interface SearchResult {
  pageName: string;
  uuid: string;
  content: string;
  score: number;
}

export function search(query: string): SearchResult[] {
  if (!searchIndex || !query.trim()) return [];

  return searchIndex.search(query).slice(0, 15).map(result => ({
    pageName: result.pageName,
    uuid: result.uuid,
    content: result.content,
    score: result.score
  }));
}
