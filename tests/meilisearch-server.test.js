"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
test('MeiliSearch health endpoint returns 200', async () => {
    const res = await (0, node_fetch_1.default)('http://127.0.0.1:7700/health');
    expect(res.status).toBe(200);
}, 15000);
