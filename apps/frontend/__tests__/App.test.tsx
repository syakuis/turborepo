import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Frontend App Component', () => {
  it('renders Hello, World! message', () => {
    render(<App />);
    const helloElement = screen.getByText(/Hello, World!/i);
    expect(helloElement).toBeTruthy();
  });

  it('renders app description', () => {
    render(<App />);
    const descriptionElement = screen.getByText(/Frontend App/i);
    expect(descriptionElement).toBeTruthy();
  });
});
