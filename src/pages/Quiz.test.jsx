import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Quiz from './Quiz';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Quiz Component Tests', () => {
  
  beforeEach(() => {
    sessionStorage.clear();
    cleanup();
  });

  it('should start from step 2 if a value is saved in sessionStorage', () => {
    sessionStorage.setItem('quiz_first_answer', 'A');
    
    renderWithRouter(<Quiz />);

    expect(screen.getByText(/Step 2 of 3/i)).toBeTruthy();
  });

  it('should update progress bar when an option is clicked', () => {
    renderWithRouter(<Quiz />);
    
    expect(screen.getByText(/Step 1 of 3/i)).toBeTruthy();
    
    const firstOption = screen.getByText(/With a strong energy boost/i);
    fireEvent.click(firstOption);

    expect(screen.getByText(/Step 2 of 3/i)).toBeTruthy();
    expect(screen.getByText(/67% Completed/i)).toBeTruthy(); 
  });

  it('should display result screen and handle "Retake Quiz" button', () => {
    renderWithRouter(<Quiz />);

    fireEvent.click(screen.getByText(/With a strong energy boost/i));
    fireEvent.click(screen.getByText(/Dark, chocolatey & bold/i));
    fireEvent.click(screen.getByText(/Espresso or Moka Pot/i));

    expect(screen.getByText(/Your ideal aroma is/i)).toBeTruthy();

    const retakeButton = screen.getByText(/Retake Quiz/i);
    fireEvent.click(retakeButton);

    expect(screen.getByText(/Step 1 of 3/i)).toBeTruthy();
  });

  it('should navigate home when "Back Home" button is clicked', () => {
    const locationMock = vi.fn();
    delete window.location;
    window.location = { href: '' };

    renderWithRouter(<Quiz />);
    
    fireEvent.click(screen.getByText(/With a strong energy boost/i));
    fireEvent.click(screen.getByText(/Dark, chocolatey & bold/i));
    fireEvent.click(screen.getByText(/Espresso or Moka Pot/i));

    const backHomeButton = screen.getByText(/Back Home/i);
    fireEvent.click(backHomeButton);

    expect(window.location.href).toBe('/');
  });
});