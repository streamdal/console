export const getJson = async (apiPath: string) => {
  const response = await fetch(
    `${import.meta.env.PUBLIC_API_URL || ""}${apiPath}`
  );

  if (response.ok || response.redirected) {
    return response.json();
  }

  throw Error("response not ok");
};