"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
test('npm init creates package.json', () => {
    const exists = (0, fs_1.existsSync)('package.json');
    expect(exists).toBe(true);
});
