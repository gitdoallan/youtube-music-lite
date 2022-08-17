import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('SearchBar component', () => {
  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ results: [] }) }));
  beforeEach(() => (render(<App />)));

  it('Search Input renders', () => {
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('It is possible to type on the search input', () => {
    const searchInput = screen.getByTestId('search-input');
    searchInput.value = 'britney';
    expect(searchInput.value).toBe('britney');
  });

  it('The search button renders', async () => {
    const btn = screen.getByRole('button', { name: 'Search' });
    expect(btn).toBeInTheDocument();
  });

  it('The form is triggering the Loading state when submitted', async () => {
    const btn = screen.getByRole('button', { name: 'Search' });
    btn.click();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  })

});
