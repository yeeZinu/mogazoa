export async function getProducts(order: string) {
  const res = await fetch(`${process.env.BASE_URL}/products?order=${order}`, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
