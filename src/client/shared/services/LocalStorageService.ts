const SessionService = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    const value = localStorage?.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  },

  set: <T>(key: string, value: T): void => {
    const sessionValue = typeof value === 'boolean' ? String(value) : JSON.stringify(value);
    localStorage?.setItem(key, sessionValue);
  },

  delete: (key: string): void => {
    localStorage?.removeItem(key);
  },
};

export default SessionService;
