export const useTitleCase = ( words: string): string => {
  if (!words) {
    return "";
  };

  const splitStr = words.toLowerCase().split(" ");
  const result: string[] = [];

  for (let i = 0; i < splitStr.length; i++ ) {
    if (splitStr[i].length > 0 ) {
      result.push(splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1));
    } else {
      result.push("");
    }
  }

  return result.join(" ");
};