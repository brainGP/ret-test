export const formatText = (str: string) => {
  if (str.length < 15) return str;

  return str.substring(0, 15) + "...";
};
