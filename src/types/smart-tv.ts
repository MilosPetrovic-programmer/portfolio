export type DPadDirection = 'up' | 'down' | 'left' | 'right';

export type KeyAction = DPadDirection | 'enter' | 'back';

export interface MediaItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly year: number;
  readonly rating: string;
  readonly duration: string;
  readonly badge?: string;
  readonly accentColor: string;
}

export interface MediaRow {
  readonly id: string;
  readonly title: string;
  readonly items: readonly MediaItem[];
}

export interface TVTelemetry {
  readonly fps: number;
  readonly memoryUsageMB: number;
  readonly drawCalls: number;
  readonly activeNodeId: string;
  readonly lastAction: string;
}

export interface TVFocusCoordinates {
  readonly rowIndex: number;
  readonly colIndex: number;
}
