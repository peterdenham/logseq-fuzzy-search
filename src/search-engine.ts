import MiniSearch from 'minisearch';

interface PageDoc {
  id: number;
  name: string;
  content: string;
}

let searchIndex: MiniSearch<PageDoc> | null = null;

function createIndex(): MiniSearch<PageDoc> {
  return new MiniSearch<PageDoc>({
    fields: ['name', 'content'],
    storeFields: ['name', 'content'],
    searchOptions: {
      fuzzy: 0.2,
      prefix: true,
      boost: { name: 2 }
    }
  });
}

export async function buildIndex(): Promise<void> {
  searchIndex = createIndex();

  const pages = await logseq.Editor.getAllPages();
  if (!pages) return;

  const docs: PageDoc[] = [];

  for (const page of pages) {
    if (page.name.startsWith('__')) continue;

    const blocks = await logseq.Editor.getPageBlocksTree(page.name);
    const content = blocks
      ?.map((b: any) => b.content || '')
      .join('\n') || '';

    docs.push({
      id: page.id,
      name: page.originalName || page.name,
      content
    });
  }

  searchIndex.addAll(docs);
  console.log(`[MeiliSearch] Indexed ${docs.length} pages`);
}

export function search(query: string): Array<{ name: string; content: string; score: number }> {
  if (!searchIndex || !query.trim()) return [];

  return searchIndex.search(query).slice(0, 15).map(result => ({
    name: result.name,
    content: result.content,
    score: result.score
  }));
}
