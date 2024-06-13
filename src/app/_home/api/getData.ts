export const getData = async (endPoint: string) => {
  const response = await fetch(`${process.env.BASE_URL}${endPoint}`);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return response.json();
};
