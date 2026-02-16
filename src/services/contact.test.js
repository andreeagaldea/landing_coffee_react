import { describe, it, expect, vi } from 'vitest';
import { sendContactMessage } from './contact';

describe('contact service', () => {
  it('sends data correctly and returns response', async () => {
    const mockData = { firstName: 'John', email: 'test@test.com' };
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 101, ...mockData }),
    });

    const result = await sendContactMessage(mockData);
    
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockData),
    }));
    expect(result.id).toBe(101);
  });

  it('throws error when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    await expect(sendContactMessage({})).rejects.toThrow('Server responded with status: 500');
  });
});