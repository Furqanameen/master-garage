import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';

/*
 * When the page is rendered inside the captured WordPress header/footer (window.__MM_SHELL__),
 * the shell links are plain anchors, so navigation is a normal page load. Using plain anchors
 * here too keeps every URL a real server-rendered page (good for SEO and keeps the shell in sync).
 */
export const inShell = () => typeof window !== 'undefined' && window.__MM_SHELL__ === true;

export function Link({ to, children, ...rest }) {
  if (inShell()) return <a href={to} {...rest}>{children}</a>;
  return <RouterLink to={to} {...rest}>{children}</RouterLink>;
}

export function NavLink({ to, end, children, ...rest }) {
  if (inShell()) return <a href={to} {...rest}>{children}</a>;
  return <RouterNavLink to={to} end={end} {...rest}>{children}</RouterNavLink>;
}
