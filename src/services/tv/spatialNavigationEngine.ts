import type {
  MediaRow,
  DPadDirection,
  TVFocusCoordinates,
} from '@/types/smart-tv';

export const STREAMING_CATALOG: readonly MediaRow[] = [
  {
    id: 'row-spotlight',
    title: 'Featured Premieres',
    items: [
      {
        id: 'media-1',
        title: 'Silicon Valley Chronicles',
        category: 'Systems Engineering',
        year: 2026,
        rating: '4.9 ★',
        duration: '1h 54m',
        badge: '4K HDR',
        accentColor: 'from-blue-600 to-indigo-900',
      },
      {
        id: 'media-2',
        title: 'Microservices in Chaos',
        category: 'Cloud Architecture',
        year: 2025,
        rating: '4.8 ★',
        duration: '2h 10m',
        badge: 'TOP 10',
        accentColor: 'from-violet-600 to-purple-950',
      },
      {
        id: 'media-3',
        title: 'The 60 FPS Canvas Horizon',
        category: 'Graphics & Embedded UI',
        year: 2026,
        rating: '5.0 ★',
        duration: '1h 35m',
        badge: 'EXCLUSIVE',
        accentColor: 'from-amber-600 to-orange-950',
      },
      {
        id: 'media-4',
        title: 'Memory Leaks & Garbage Collectors',
        category: 'Deep Tech',
        year: 2024,
        rating: '4.7 ★',
        duration: '1h 48m',
        badge: 'POPULAR',
        accentColor: 'from-emerald-600 to-teal-950',
      },
    ],
  },
  {
    id: 'row-architects',
    title: "Senior Architect's Picks",
    items: [
      {
        id: 'media-5',
        title: 'PHP 8.x: Clean Architecture',
        category: 'Enterprise Backend',
        year: 2025,
        rating: '4.9 ★',
        duration: '2h 20m',
        badge: 'MUST WATCH',
        accentColor: 'from-cyan-600 to-blue-950',
      },
      {
        id: 'media-6',
        title: 'LightningJS Under The Hood',
        category: 'Embedded WebGL',
        year: 2026,
        rating: '5.0 ★',
        duration: '1h 40m',
        badge: 'MASTERCLASS',
        accentColor: 'from-fuchsia-600 to-pink-950',
      },
      {
        id: 'media-7',
        title: 'Zero Any: The TypeScript Manifesto',
        category: 'Type Safety',
        year: 2026,
        rating: '4.9 ★',
        duration: '1h 25m',
        badge: 'TRENDING',
        accentColor: 'from-sky-600 to-slate-900',
      },
      {
        id: 'media-8',
        title: '10-Foot UI Spatial Algorithms',
        category: 'HCI & Navigation',
        year: 2025,
        rating: '4.8 ★',
        duration: '1h 50m',
        badge: 'NEW',
        accentColor: 'from-rose-600 to-red-950',
      },
    ],
  },
];

/**
 * Calculates next grid coordinates based on D-Pad navigation direction.
 * Clamps within boundary bounds to prevent off-screen navigation.
 */
export function calculateNextFocus(
  current: TVFocusCoordinates,
  direction: DPadDirection,
  catalog: readonly MediaRow[]
): TVFocusCoordinates {
  const rowCount = catalog.length;
  if (rowCount === 0) return current;

  let nextRow = current.rowIndex;
  let nextCol = current.colIndex;

  switch (direction) {
    case 'up':
      nextRow = Math.max(0, current.rowIndex - 1);
      break;
    case 'down':
      nextRow = Math.min(rowCount - 1, current.rowIndex + 1);
      break;
    case 'left':
      nextCol = Math.max(0, current.colIndex - 1);
      break;
    case 'right': {
      const itemsInRow = catalog[nextRow]?.items.length ?? 0;
      nextCol = Math.min(Math.max(0, itemsInRow - 1), current.colIndex + 1);
      break;
    }
  }

  // Ensure nextCol is valid for the target row
  const targetRowItemsCount = catalog[nextRow]?.items.length ?? 0;
  if (nextCol >= targetRowItemsCount) {
    nextCol = Math.max(0, targetRowItemsCount - 1);
  }

  return { rowIndex: nextRow, colIndex: nextCol };
}
