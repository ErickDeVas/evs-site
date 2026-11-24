/**
 * Cloudflare Pages Functions Middleware for Geo-based Language Routing
 *
 * This file should be placed at /functions/_middleware.js in your Pages project.
 * It will automatically run on every request before your Pages content.
 *
 * Routes visitors based on Cloudflare's geoIP data:
 * - Brazil (BR) -> Portuguese (pt-BR)
 * - All other countries -> English (en)
 */

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // Get country from Cloudflare's cf object (automatically populated)
  const country = request.cf?.country || 'XX';
  const isBrazil = country === 'BR';

  // Determine target language
  const targetLang = isBrazil ? 'pt-BR' : 'en';

  // Check if URL already has a language prefix
  const currentPath = url.pathname;
  const hasLangPrefix = /^\/(pt-BR|en)(\/|$)/.test(currentPath);

  // If no language prefix, redirect to appropriate language version
  if (!hasLangPrefix) {
    const newPath = `/${targetLang}${currentPath === '/' ? '' : currentPath}`;
    const redirectUrl = `${url.origin}${newPath}${url.search}${url.hash}`;
    return Response.redirect(redirectUrl, 302);
  }

  // If already has language prefix, continue to the page
  return next();
}