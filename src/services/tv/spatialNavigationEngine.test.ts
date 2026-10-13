import { describe, it, expect } from 'vitest';
import {
  calculateNextFocus,
  STREAMING_CATALOG,
} from './spatialNavigationEngine';

describe('calculateNextFocus', () => {
  it('navigates right and updates column index', () => {
    const current = { rowIndex: 0, colIndex: 0 };
    const next = calculateNextFocus(current, 'right', STREAMING_CATALOG);
    expect(next).toEqual({ rowIndex: 0, colIndex: 1 });
  });

  it('clamps at right edge of row', () => {
    const current = { rowIndex: 0, colIndex: 3 };
    const next = calculateNextFocus(current, 'right', STREAMING_CATALOG);
    expect(next).toEqual({ rowIndex: 0, colIndex: 3 });
  });

  it('navigates down and preserves column index within boundary', () => {
    const current = { rowIndex: 0, colIndex: 2 };
    const next = calculateNextFocus(current, 'down', STREAMING_CATALOG);
    expect(next).toEqual({ rowIndex: 1, colIndex: 2 });
  });

  it('clamps at top edge when navigating up from row 0', () => {
    const current = { rowIndex: 0, colIndex: 1 };
    const next = calculateNextFocus(current, 'up', STREAMING_CATALOG);
    expect(next).toEqual({ rowIndex: 0, colIndex: 1 });
  });

  it('clamps at bottom row edge', () => {
    const current = { rowIndex: 1, colIndex: 1 };
    const next = calculateNextFocus(current, 'down', STREAMING_CATALOG);
    expect(next).toEqual({ rowIndex: 1, colIndex: 1 });
  });
});
