import React, { useEffect, useState } from 'react';

type Hit = { id: string; title: string; content: string };

export default function ResultsPanel({ query }: { query: string }) {
  const [hits, setHits] = useState<Hit[]>([]);
  
  useEffect(() => {
    let cancelled = false;
    fetch(`http://127.0.0.1:7700/indexes/notes/search?q=${encodeURIComponent(query)}&limit=10`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) setHits(data.hits);
      })
      .catch(() => {
        if (!cancelled) setHits([]);
      });
    return () => { cancelled = true; };
  }, [query]);
  
  return (
    <ul style={{ listStyle: 'none', marginTop: '4px', padding: 0 }}>
      {hits.map(hit => (
        <li key={hit.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <strong>{hit.title}</strong>
          <p style={{ margin: '4px 0', color: '#666' }}>{hit.content.slice(0, 120)}…</p>
        </li>
      ))}
    </ul>
  );
}
