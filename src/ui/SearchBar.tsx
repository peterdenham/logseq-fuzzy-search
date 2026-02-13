import React, { useState } from 'react';
import ResultsPanel from './ResultsPanel';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  
  return (
    <div style={{ padding: '8px' }}>
      <input
        placeholder="Search notes…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: '100%', padding: '4px' }}
      />
      {query && <ResultsPanel query={query} />}
    </div>
  );
}
