export const limitText = (text: string): string => {
  const maxLength = 80;
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}....`
  } 
  return text;
}; 