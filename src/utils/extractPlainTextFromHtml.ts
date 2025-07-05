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
  tempDiv.innerHTML = cleanHtml;

  // let originalTagName= "p";
  // let plainTextContent = tempDiv.textContent || "";

  // if (tempDiv.firstElementChild) {
  //   originalTagName = tempDiv.firstElementChild.tagName.toLowerCase();
  //   plainTextContent = tempDiv.firstElementChild.textContent || "";
  // } 
  // const reconstructedHtml = `<${originalTagName}>${plainTextContent}</${originalTagName}>`;

  // const cleanFinalHtml = DOMPurify.sanitize(reconstructedHtml, {
  //   ALLOWED_TAGS: [originalTagName],
  //   ALLOWED_ATTR: []
  // });

  return tempDiv.textContent || "";
};