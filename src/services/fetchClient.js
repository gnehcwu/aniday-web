const URL = 'https://graphql.anilist.co';

export default async function fetchClient(query, variables) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables
    })
  });
  return await res.json();
}
