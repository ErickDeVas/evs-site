/**
 * Cloudflare Pages Middleware for country-based language routing.
 * Portuguese is served in Brazil, Portugal, Angola, Mozambique, and Timor-Leste.
 * All other countries and territories are served in English.
 */
const PORTUGUESE_COUNTRIES = new Set(['BR', 'PT', 'AO', 'MZ', 'TL']);
const LEGACY_SECTION_PATHS = {
  '/contato': '#contato',
  '/clientes': '#cl',
  '/sobre-erick': '#sobre',
};

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Keep one canonical hostname while leaving the non-www address usable.
  if (url.hostname === 'erickdevasconcelos.com') {
    url.hostname = 'www.erickdevasconcelos.com';
    url.protocol = 'https:';
    return new Response(null, {
      status: 301,
      headers: {
        Location: url.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

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
    const normalizedPath = currentPath.replace(/\/+$/, '') || '/';
    const legacyAnchor = LEGACY_SECTION_PATHS[normalizedPath];
    const newPath = legacyAnchor
      ? '/' + targetLang + '/' + legacyAnchor
      : '/' + targetLang + (currentPath === '/' ? '/' : currentPath);
    return new Response(null, {
      status: legacyAnchor ? 301 : 302,
      headers: {
        Location: url.origin + newPath + url.search,
        'Cache-Control': legacyAnchor ? 'public, max-age=3600' : 'no-store, no-cache, must-revalidate',
      },
    });
  }

  // Let Pages resolve the localized directory to its index.html. Rewriting to
  // /<language>/index.html makes Pages normalize back to /<language>/ and loops.
  const page = await next();
  const headers = new Headers(page.headers);
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return new Response(page.body, { status: page.status, statusText: page.statusText, headers });
}
