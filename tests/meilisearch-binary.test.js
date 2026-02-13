"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
test('MeiliSearch binary is present', () => {
    expect((0, fs_1.existsSync)('assets/meilisearch-mac-x64')).toBe(true);
});
