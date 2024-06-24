export const setSessionStorage = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};
