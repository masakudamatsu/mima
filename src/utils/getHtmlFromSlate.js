import escapeHtml from 'escape-html';
import {Text} from 'slate';

export const getHtmlFromSlate = node => {
  // source: https://docs.slatejs.org/concepts/10-serializing
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // Uncomment if we use bold text
    // if (node.bold) {
    //   string = `<strong>${string}</strong>`;
    // }
    return string;
  }

  const children = node.children.map(n => getHtmlFromSlate(n)).join('');

  switch (node.type) {
    // Uncomment if we use <blockquote>
    // case 'quote':
    //   return `<blockquote><p>${children}</p></blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(
        node.url,
      )}" rel="noreferrer" target="_blank">${children}</a>`;
    default:
      return children;
  }
};
