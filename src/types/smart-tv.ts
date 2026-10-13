export type DPadDirection = 'up' | 'down' | 'left' | 'right';

export type KeyAction = DPadDirection | 'enter' | 'back';

export interface SpatialNode {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly isFocusable: boolean;
}

export interface FocusState {
  readonly currentFocusedId: string | null;
  readonly previousFocusedId: string | null;
}
