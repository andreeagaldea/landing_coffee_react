import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './index.jsx'; 

vi.mock('./Hero', () => ({ default: () => <div data-testid="hero-section">Hero</div> }));
vi.mock('./Gallery', () => ({ default: () => <div data-testid="gallery-section">Gallery</div> }));
vi.mock('./Values', () => ({ default: () => <div data-testid="values-section">Values</div> }));
vi.mock('./Quiz', () => ({ default: () => <div data-testid="quiz-section">Quiz</div> }));

describe('Home Page', () => {
  it('should render all major sections of the homepage', () => {
    render(<Home />);

    expect(screen.getByTestId('hero-section')).toBeTruthy();
    expect(screen.getByTestId('gallery-section')).toBeTruthy();
    expect(screen.getByTestId('values-section')).toBeTruthy();
    expect(screen.getByTestId('quiz-section')).toBeTruthy();
  });

  it('should have the correct structure/order', () => {
    const { container } = render(<Home />);
    const sections = container.firstChild.children;
    
    expect(sections.length).toBe(4);
  });
});