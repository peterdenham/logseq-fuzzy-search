"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexer_1 = require("../src/indexer");
const node_fetch_1 = __importDefault(require("node-fetch"));
test('indexing adds document to MeiliSearch', async () => {
    const filePath = '__tests__/sample.md';
    await (0, indexer_1.indexFile)(filePath);
    await new Promise(r => setTimeout(r, 1000));
    const res = await (0, node_fetch_1.default)('http://127.0.0.1:7700/indexes/notes/search?q=Sample');
    const data = await res.json();
    expect(data.hits.length).toBeGreaterThan(0);
    expect(data.hits[0].title).toContain('Sample Page');
}, 15000);
