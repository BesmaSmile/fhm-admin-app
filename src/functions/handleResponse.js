
export function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          const error =( data && data.error )|| response.statusText;
          return Promise.reject(error);
      }
      return data;
  });
}
