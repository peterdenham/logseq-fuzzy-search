import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '../src/ui/SearchBar';

test('renders search input', () => {
  render(<SearchBar />);
  expect(screen.getByPlaceholderText(/search notes/i)).toBeInTheDocument();
});
