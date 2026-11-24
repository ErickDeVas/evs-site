/**
 * Cloudflare Pages Functions Middleware for Geo-based Language Routing.
 * Brazil (BR) is routed to Portuguese; other countries are routed to English.
 */
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const currentPath = url.pathname;
  const langMatch = currentPath.match(/^\/(pt-BR|en)(?=\/|$)/);
  const hasLangPrefix = Boolean(langMatch);
  const pathWithoutLang = hasLangPrefix
    ? currentPath.replace(/^\/(pt-BR|en)(?=\/|$)/, '') || '/'
    : currentPath;

  // Let assets pass through untouched. Otherwise the locale redirect would
  // turn JS/CSS requests into HTML responses and prevent React from starting.
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
    const targetLang = country === 'BR' ? 'pt-BR' : 'en';
    const newPath = `/${targetLang}${currentPath === '/' ? '/' : currentPath}`;
    return Response.redirect(`${url.origin}${newPath}${url.search}`, 302);
  }

  // Keep the localized URL visible while serving the Vite SPA entry point.
  url.pathname = '/';
  return next(new Request(url.toString(), request));
}
