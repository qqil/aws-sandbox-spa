export const withBasicAuth = (fetchFn: typeof fetch) => {
  return async (...args: Parameters<typeof fetch>) => {
    if (!args[1]) args[1] = {};

    const authorizationToken = localStorage.getItem("authorization_token");

    if (authorizationToken) {
      args[1].headers = {
        ...(args[1].headers ?? {}),
        Authorization: `Basic ${authorizationToken}`,
      };
    }

    const response = await fetchFn(...args);

    if ([401, 403].includes(response.status)) {
      const { message } = await response.json();
      throw new Error(`${response.status}: ${message}`);
    }

    return response;
  };
};
