import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Values from './Values';

describe('Values Component', () => {
  
  it('should render the main title and accent line', () => {
    render(<Values />);
    
    const title = screen.getByText(/Philosophy of Flavor/i);
    expect(title).toBeTruthy();
    expect(title.tagName).toBe('H2');
  });

  it('should render all three philosophy cards', () => {
    render(<Values />);
    
    expect(screen.getByText(/Terroir & Origin/i)).toBeTruthy();
    expect(screen.getByText(/Roasting Alchemy/i)).toBeTruthy();
    expect(screen.getByText(/Brewing Rituals/i)).toBeTruthy();
  });

  it('should display the correct labels for each section', () => {
    render(<Values />);
    
    expect(screen.getByText(/Learn More/i)).toBeTruthy();
    expect(screen.getByText(/Watch Process/i)).toBeTruthy();
    expect(screen.getByText(/Brewing Guides/i)).toBeTruthy();
  });

  it('should apply the hover group class to the card containers', () => {
    const { container } = render(<Values />);
    
    const groupElements = container.querySelectorAll('.group');
    expect(groupElements.length).toBe(3);
  });
});