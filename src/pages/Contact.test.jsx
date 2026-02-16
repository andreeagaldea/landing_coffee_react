import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from './Contact';
import * as contactService from '../services/contact';

vi.mock('../services/contact', () => ({
  sendContactMessage: vi.fn()
}));

describe('Contact Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows validation errors for empty fields on submit', async () => {
    render(<Contact />);
    
    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/first name is required/i)).toBeTruthy();
    expect(screen.getByText(/please enter a valid email address/i)).toBeTruthy();
  });

  it('submits the form successfully and clears inputs', async () => {
    contactService.sendContactMessage.mockResolvedValue({ success: true });
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John', name: 'firstName' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe', name: 'lastName' } });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: 'john@example.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'support', name: 'subject' } });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), { target: { value: 'Hello, this is a test message.', name: 'message' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/sending.../i)).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeTruthy();
    });

    expect(screen.getByPlaceholderText(/first name/i).value).toBe('');
  });

  it('shows error message when API fails', async () => {
    contactService.sendContactMessage.mockRejectedValue(new Error('API Down'));
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John', name: 'firstName' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe', name: 'lastName' } });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: 'john@example.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'support', name: 'subject' } });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), { target: { value: 'Valid message length here', name: 'message' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeTruthy();
    });
  });
});