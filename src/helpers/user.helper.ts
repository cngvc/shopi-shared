export const getCurrentUser = (header?: string) => {
  if (!header) return null;
  try {
    return JSON.parse(header);
  } catch (error) {
    return null;
  }
};
