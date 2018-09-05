// replaces html entities and replaces html tags
export function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value.replace(/<[^>]+>/g, '');
}
