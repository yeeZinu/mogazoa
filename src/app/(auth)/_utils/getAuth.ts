type GetAuthParams = {
  path: string;
  body: { [key: string]: string | number };
};

const getAuth = async ({ path, body }: GetAuthParams) => {
  const result = await fetch(`${process.env.BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await result.json();

  return { result, data };
};

export default getAuth;
