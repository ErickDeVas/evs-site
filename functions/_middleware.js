/**
 * Cloudflare Pages Functions Middleware for Geo-based Language Routing
 *
 * Brazil (BR) visitors are sent to Portuguese; all others to English.
 * Localized paths serve the SPA entry point so React can read the URL prefix
 * and load the matching translation bundle.
 */
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const country = request.cf?.country || 'XX';
  const targetLang = country === 'BR' ? 'pt-BR' : 'en';
  const currentPath = url.pathname;
  const hasLangPrefix = /^\/(pt-BR|en)(\/|$)/.test(currentPath);

  if (!hasLangPrefix) {
    const newPath = `/${targetLang}${currentPath === '/' ? '' : currentPath}`;
    return Response.redirect(`${url.origin}${newPath}${url.search}`, 302);
  }

  // Keep the visitor's URL intact while serving the Vite SPA shell.
  url.pathname = '/';
  return next(new Request(url.toString(), request));
}
