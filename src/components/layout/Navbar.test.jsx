import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('should render the logo and navigation links', () => {
    renderNavbar();
    
    expect(screen.getByAltText(/logo/i)).toBeTruthy();
    expect(screen.getByText(/home/i)).toBeTruthy();
    expect(screen.getByText(/contact/i)).toBeTruthy();
    expect(screen.getByText(/quiz/i)).toBeTruthy();
  });

  it('should toggle mobile menu when burger icon is clicked', () => {
    renderNavbar();
    
    const burgerButton = screen.getByRole('button');
    const navList = screen.getByRole('list');

    expect(navList.className).toContain('top-[-400px]');

    fireEvent.click(burgerButton);
    expect(navList.className).toContain('top-[60px]');

    fireEvent.click(burgerButton);
    expect(navList.className).toContain('top-[-400px]');
  });

  it('should close the mobile menu when a link is clicked', () => {
    renderNavbar();
    
    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);
    
    const homeLink = screen.getByText(/home/i);
    fireEvent.click(homeLink);
    expect(screen.getByRole('list').className).toContain('top-[-400px]');
    
    const contactLink = screen.getByText(/contact/i);
    fireEvent.click(contactLink);
    expect(screen.getByRole('list').className).toContain('top-[-400px]');
    
    const quizLink = screen.getByText(/quiz/i);
    fireEvent.click(quizLink);
    expect(screen.getByRole('list').className).toContain('top-[-400px]');
  });

  it('should set the --nav-height CSS variable on mount', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 80,
    });

    renderNavbar();

    const rootStyle = document.documentElement.style.getPropertyValue('--nav-height');
    expect(rootStyle).toBe('80px');
  });
});