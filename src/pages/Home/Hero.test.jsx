import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from './Hero';
import Parallax from 'parallax-js';

class MockParallax {
  constructor() {
    this.destroy = vi.fn();
  }
}

vi.mock('parallax-js', () => {
  const ParallaxMock = vi.fn().mockImplementation(function() {
    this.destroy = vi.fn();
    return this;
  });
  return {
    default: ParallaxMock
  };
});

vi.mock('animejs', () => ({
  animate: vi.fn(),
  stagger: vi.fn(),
  splitText: vi.fn().mockReturnValue({
    chars: [document.createElement('span')], 
    words: [document.createElement('span')]
  }),
  createScope: vi.fn().mockReturnValue({
    add: vi.fn().mockImplementation((cb) => {
      cb(); 
      return { revert: vi.fn() };
    }),
    revert: vi.fn(),
  }),
}));

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the main headline and tag', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Pure/i)).toBeTruthy();
    expect(screen.getByText(/Artistry/i)).toBeTruthy();
    expect(screen.getByText(/Ethically sourced/i)).toBeTruthy();
  });

  it('should render all parallax layers including the coffee bag', () => {
    render(<Hero />);
    
    const coffeeBag = screen.getByAltText(/Coffee Bag/i);
    expect(coffeeBag).toBeTruthy();
    
    expect(screen.getByAltText(/coffe bean 1/i)).toBeTruthy();
    expect(screen.getByAltText(/coffe bean 3/i)).toBeTruthy();
    expect(screen.getByAltText(/coffe bean 4/i)).toBeTruthy();
  });

  it('should initialize Parallax on mount', () => {
    render(<Hero />);
    
    expect(Parallax).toHaveBeenCalled();
  });

  it('should clean up Parallax and animations on unmount', () => {
    const { unmount } = render(<Hero />);
    
    unmount();
    
    const parallaxInstance = vi.mocked(Parallax).mock.results[0].value;
    expect(parallaxInstance.destroy).toHaveBeenCalled();
  });
});