"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const SearchBar_1 = __importDefault(require("../src/ui/SearchBar"));
test('renders search input', () => {
    (0, react_2.render)(react_1.default.createElement(SearchBar_1.default, null));
    expect(react_2.screen.getByPlaceholderText(/search notes/i)).toBeInTheDocument();
});
