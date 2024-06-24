export const setSessionStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const value = sessionStorage.getItem(key);
    return value ?? null;
  }
  return null;
};
