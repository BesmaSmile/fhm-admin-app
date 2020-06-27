
export function handleResponse(response) {
  console.log("handling")
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          const error = data || response.statusText;
          return Promise.reject(error);
      }
      return data;
  });
}
