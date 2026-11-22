import 'server-only';

import { Marked, Renderer } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { highlight } from 'sugar-high';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function autoEmbedYouTube(content: string): string {
  return content.replace(
    /^[ \t]*(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?[ \t\r]*$/gm,
    '<div class="embed-frame"><iframe src="https://www.youtube-nocookie.com/embed/$1" title="Project demonstration video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>'
  );
}

const renderer = new Renderer();

renderer.code = ({ text, lang }) => {
  const safeLang = (lang ?? '').trim().replace(/[^a-zA-Z0-9_+#.-]/g, '').toLowerCase();
  const displayLang = safeLang ? escapeHtml(safeLang) : 'code';
  const highlighted = highlight(text);
  return `<div class="code-block"><div class="code-block-bar"><span class="code-block-lang">${displayLang}</span><button type="button" class="code-copy-btn" data-copy-code="true">Copy</button></div><pre><code class="language-${escapeHtml(safeLang || 'text')}">${highlighted}</code></pre></div>`;
};

renderer.link = function ({ href, title, tokens }) {
  const text = this.parser.parseInline(tokens);
  if (href?.startsWith('mailto:')) {
    const address = href.slice('mailto:'.length);
    const domain = address.split('@')[1] ?? '';
    if (!/^[a-z0-9-]+(\.[a-z]{2,})+$/i.test(domain)) {
      return text;
    }
  }
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
  return `<a href="${escapeHtml(href ?? '')}"${titleAttr}>${text}</a>`;
};

const markdown = new Marked({
  gfm: true,
  breaks: false,
  async: false,
  renderer
});

const allowedTags = Array.from(
  new Set([
    ...sanitizeHtml.defaults.allowedTags,
    'div',
    'span',
    'img',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'button',
    'input',
    'details',
    'summary',
    'iframe'
  ])
);

const allowedAttributes: sanitizeHtml.IOptions['allowedAttributes'] = {
  ...sanitizeHtml.defaults.allowedAttributes,
  div: ['class', 'aria-hidden'],
  span: ['class', 'style', 'aria-hidden'],
  button: ['type', 'class', 'data-copy-code'],
  a: ['href', 'name', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
  input: ['type', 'checked', 'disabled'],
  ol: ['start'],
  ul: ['class'],
  li: ['class'],
  th: ['align'],
  td: ['align'],
  code: ['class'],
  iframe: [
    'src',
    'title',
    'allow',
    'allowfullscreen',
    'referrerpolicy',
    'loading'
  ]
};

const allowedClasses: sanitizeHtml.IOptions['allowedClasses'] = {
  div: ['code-block', 'code-block-bar', 'table-wrap', 'embed-frame'],
  span: ['code-block-lang', /^sh__/],
  button: ['code-copy-btn'],
  code: [/^language-/],
  ul: ['contains-task-list'],
  li: ['task-list-item']
};

function wrapTables(html: string): string {
  return html.replace(/<table>([\s\S]*?)<\/table>/gi, '<div class="table-wrap"><table>$1</table></div>');
}

export function renderMarkdownToHtml(content: string): string {
  const rawHtml = markdown.parse(autoEmbedYouTube(content));
  const html = typeof rawHtml === 'string' ? rawHtml : '';

  const sanitized = sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedClasses,
    allowedStyles: {
      span: {
        color: [/^var\(--sh-[a-z-]+\)$/]
      }
    },
    allowedIframeHostnames: [
      'www.youtube.com',
      'youtube.com',
      'www.youtube-nocookie.com',
      'youtube-nocookie.com'
    ],
    exclusiveFilter: (frame) => frame.tag === 'iframe' && !frame.attribs.src,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        target: '_blank',
        rel: 'noopener noreferrer'
      }),
      img: sanitizeHtml.simpleTransform('img', {
        loading: 'lazy',
        decoding: 'async'
      }),
      iframe: (_tagName, attribs) => ({
        tagName: 'iframe',
        attribs: {
          ...attribs,
          loading: 'lazy',
          referrerpolicy: 'strict-origin-when-cross-origin'
        }
      }),
      input: (_tagName, attribs) => ({
        tagName: 'input',
        attribs: {
          type: 'checkbox',
          disabled: 'disabled',
          ...(Object.prototype.hasOwnProperty.call(attribs, 'checked')
            ? { checked: 'checked' }
            : {})
        }
      })
    }
  });

  return wrapTables(sanitized);
}
