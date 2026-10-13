export type Brand<K, T> = K & { readonly __brand: T };

export type RemoteData<T, E = Error> =
  | { readonly status: 'idle'; readonly data: null; readonly error: null }
  | { readonly status: 'loading'; readonly data: null; readonly error: null }
  | { readonly status: 'success'; readonly data: T; readonly error: null }
  | { readonly status: 'error'; readonly data: null; readonly error: E };

export type ThemeMode = 'light' | 'dark' | 'system';
