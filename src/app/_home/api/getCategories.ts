export async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
