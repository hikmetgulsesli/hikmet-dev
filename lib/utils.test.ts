import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    expect(cn('base', isActive && 'active')).toBe('base active');
  });

  it('should handle falsey values', () => {
    expect(cn('base', false && 'hidden', null, undefined, '')).toBe('base');
  });

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('should handle object syntax', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('should handle array syntax', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('should handle complex mixed inputs', () => {
    const isVisible = true;
    const isDisabled = false;
    expect(
      cn('base', ['array1', 'array2'], {
        visible: isVisible,
        disabled: isDisabled,
      })
    ).toBe('base array1 array2 visible');
  });
});
