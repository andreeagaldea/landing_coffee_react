export const sendContactMessage = async (data) => {
  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
  }

  return await response.json();
};