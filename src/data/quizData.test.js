import { describe, it, expect } from 'vitest';
import { calculateResult } from './quizData';

describe('Quiz Logic Tests', () => {
  it('should return result A when type A is dominant', () => {
    const answers = ['A', 'A', 'B'];
    expect(calculateResult(answers)).toBe('A');
  });

  it('should return result B when type B is dominant', () => {
    const answers = ['B', 'B', 'C'];
    expect(calculateResult(answers)).toBe('B');
  });

  it('should return MIX when there is a tie', () => {
    const answers = ['A', 'B', 'C'];
    expect(calculateResult(answers)).toBe('MIX');
  });
});