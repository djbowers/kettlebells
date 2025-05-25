import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { useCountdownTimer } from './useCountdownTimer';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('should initialize with correct starting values', () => {
  const { result } = renderHook(() => useCountdownTimer(5));

  expect(result.current[0]).toBe('5:00');
  expect(result.current[1].milliseconds).toBe(300000);
  expect(result.current[1].paused).toBe(false);
});

it('should count down when not paused', () => {
  const { result } = renderHook(() => useCountdownTimer(1));

  act(() => vi.advanceTimersByTime(1000));

  expect(result.current[0]).toBe('0:59');
  expect(result.current[1].milliseconds).toBe(59000);
});

it('should not count down when paused', () => {
  const { result } = renderHook(() =>
    useCountdownTimer(1, { defaultPaused: true }),
  );

  act(() => vi.advanceTimersByTime(1000));

  expect(result.current[0]).toBe('1:00');
  expect(result.current[1].milliseconds).toBe(60000);
});

it('should pause and resume counting', () => {
  const { result } = renderHook(() => useCountdownTimer(1));

  act(() => result.current[1].pause());
  act(() => vi.advanceTimersByTime(1000));

  expect(result.current[0]).toBe('1:00');

  act(() => result.current[1].play());
  act(() => vi.advanceTimersByTime(1000));

  expect(result.current[0]).toBe('0:59');
});

it('should reset timer to initial value', () => {
  const { result } = renderHook(() => useCountdownTimer(2));

  act(() => vi.advanceTimersByTime(1000));

  expect(result.current[0]).toBe('1:59');

  act(() => result.current[1].reset());

  expect(result.current[0]).toBe('2:00');
  expect(result.current[1].milliseconds).toBe(120000);
});

it('should reset timer to new value', () => {
  const { result } = renderHook(() => useCountdownTimer(2));

  act(() => result.current[1].reset(3));

  expect(result.current[0]).toBe('3:00');
  expect(result.current[1].milliseconds).toBe(180000);
});

it('should use custom time format', () => {
  const { result } = renderHook(() =>
    useCountdownTimer(1, { timeFormat: 'ss.S' }),
  );

  expect(result.current[0]).toBe('60.0');
});

it('should not count when disabled', () => {
  const { result } = renderHook(() => useCountdownTimer(1, { disabled: true }));

  act(() => vi.advanceTimersByTime(1000));

  expect(result.current[0]).toBe('1:00');
  expect(result.current[1].milliseconds).toBe(60000);
});
