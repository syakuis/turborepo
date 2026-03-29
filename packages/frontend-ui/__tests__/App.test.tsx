import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  it('renders Hello, World! message', () => {
    render(<App />);
    const helloElement = screen.getByText(/Hello, World!/i);
    expect(helloElement).toBeTruthy();
  });

  it('renders package description', () => {
    render(<App />);
    const descriptionElement = screen.getByText(/Frontend UI Package/i);
    expect(descriptionElement).toBeTruthy();
  });
});
