import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Gallery from './Gallery';

vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide-mock">{children}</div>,
}));

vi.mock('swiper/modules', () => ({
  Navigation: () => null,
  Autoplay: () => null,
}));

describe('Gallery Component', () => {
  
  it('should render the gallery section title', () => {
    render(<Gallery />);
    expect(screen.getByText(/Explore Our Origins/i)).toBeTruthy();
  });

  it('should render coffee bean cards from data', () => {
    render(<Gallery />);
    const beanTitles = screen.getAllByText(/Ethiopia/i);
    expect(beanTitles.length).toBeGreaterThan(0);
  });

  it('should open the modal when "Discover Story" is clicked', () => {
    render(<Gallery />);
    
    const discoveryButtons = screen.getAllByText(/Discover Story/i);
    fireEvent.click(discoveryButtons[0]);

    expect(screen.getByText(/Origin Spotlight/i)).toBeTruthy();

    const ethiopiaElements = screen.getAllByText(/Ethiopia/i);
    expect(ethiopiaElements.length).toBeGreaterThan(1);
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should close the modal when clicking the close button', () => {
    render(<Gallery />);
    
    fireEvent.click(screen.getAllByText(/Discover Story/i)[0]);
    
    const closeButton = screen.getByLabelText(/close modal/i);
    
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Origin Spotlight/i)).toBeNull();
    
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should close the modal when clicking on the backdrop', () => {
    render(<Gallery />);
    
    fireEvent.click(screen.getAllByText(/Discover Story/i)[0]);
    expect(screen.getByText(/Origin Spotlight/i)).toBeTruthy();
    
    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);

    expect(screen.queryByText(/Origin Spotlight/i)).toBeNull();
  });
});