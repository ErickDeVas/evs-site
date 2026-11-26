/**
 * Cloudflare Pages Middleware for country-based language routing.
 * Portuguese is served in Brazil, Portugal, Angola, Mozambique, and Timor-Leste.
 * All other countries and territories are served in English.
 */
const PORTUGUESE_COUNTRIES = new Set(['BR', 'PT', 'AO', 'MZ', 'TL']);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const currentPath = url.pathname;
  const langMatch = currentPath.match(/^\/(pt-BR|en)(?=\/|$)/);
  const language = langMatch?.[1];
  const hasLangPrefix = Boolean(language);
  const pathWithoutLang = hasLangPrefix
    ? currentPath.replace(/^\/(pt-BR|en)(?=\/|$)/, '') || '/'
    : currentPath;

  // Serve assets directly so localized paths do not turn them into HTML.
  const isStaticAsset =
    pathWithoutLang === '/assets' ||
    pathWithoutLang.startsWith('/assets/') ||
    pathWithoutLang === '/translations' ||
    pathWithoutLang.startsWith('/translations/') ||
    /\.[^/]+$/.test(pathWithoutLang);

  if (isStaticAsset) {
    if (hasLangPrefix && pathWithoutLang !== currentPath) {
      url.pathname = pathWithoutLang;
      return next(new Request(url.toString(), request));
    }
    return next();
  }

  if (!hasLangPrefix) {
    const country = request.cf?.country || 'XX';
    const targetLang = PORTUGUESE_COUNTRIES.has(country) ? 'pt-BR' : 'en';
    const newPath = `/${targetLang}${currentPath === '/' ? '/' : currentPath}`;
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${url.origin}${newPath}${url.search}`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }

  // Serve the full localized HTML document at the language URL. This lets search
  // engines and AI crawlers read the page without relying on client-side document.write.
  url.pathname = `/${language}/index.html`;
  const page = await next(new Request(url.toString(), request));
  const headers = new Headers(page.headers);
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return new Response(page.body, { status: page.status, statusText: page.statusText, headers });
}
