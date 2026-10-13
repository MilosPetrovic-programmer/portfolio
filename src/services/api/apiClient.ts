export abstract class AppError extends Error {
  public abstract readonly code: string;
  public constructor(message: string, public readonly details?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NetworkError extends AppError {
  public readonly code = 'NETWORK_ERROR';
}

export class HttpError extends AppError {
  public readonly code = 'HTTP_ERROR';
  public constructor(message: string, public readonly status: number, details?: unknown) {
    super(message, details);
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  readonly body?: unknown;
  readonly timeoutMs?: number;
}

export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeoutMs = 10000, body, headers, ...customConfig } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal: controller.signal,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new HttpError(
        `Request failed with status ${response.status}`,
        response.status
      );
    }

    const data: unknown = await response.json();
    return data as T;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof AppError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Unknown network failure';
    throw new NetworkError(message, err);
  }
}
