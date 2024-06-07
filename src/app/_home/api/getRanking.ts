export async function getRanking() {
  const res = await fetch(`${process.env.BASE_URL}/users/ranking`, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
