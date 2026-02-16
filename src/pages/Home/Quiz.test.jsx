import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Quiz from './Quiz';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('Home Quiz Section Tests', () => {
  
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('should render the first question correctly', () => {
    render(
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Find Your Perfect Blend/i)).toBeTruthy();
    expect(screen.getByText(/How do you usually start your morning?/i)).toBeTruthy();
  });

  it('should save answer to sessionStorage and navigate to /quiz on click', () => {
    render(
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    );

    const firstOption = screen.getByText(/With a strong energy boost/i);
    
    fireEvent.click(firstOption);

    expect(sessionStorage.getItem('quiz_first_answer')).toBe('A');

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/quiz');
  });

  it('should have the correct hover and transition classes', () => {
    render(
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    );

    const optionCard = screen.getByText(/With a strong energy boost/i).closest('button');
    
    expect(optionCard.className).toContain('hover:-translate-y-2');
    expect(optionCard.className).toContain('bg-[#151312]');
  });
});