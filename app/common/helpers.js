import Remarkable from 'remarkable';

export function convertToMarkdown(text) {
  let md = new Remarkable();
  return {__html: md.render(text)};
}
