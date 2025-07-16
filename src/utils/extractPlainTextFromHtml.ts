import DOMPurify from 'dompurify';

export const extractPlainTextFromHtml = (htmlString: string): string => {
  
  const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br'];
  const allowedAttributes = [
    'href', 'target', 'title',
  ];

  const cleanHtml = DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
  });

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  return tempDiv.textContent || "";
};