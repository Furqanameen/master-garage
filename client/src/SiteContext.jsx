import { createContext, useContext } from 'react';
import { useApi } from './api.js';

const Ctx = createContext({ site: null, nav: null, ready: false });
export const useSite = () => useContext(Ctx);

export function SiteProvider({ children }) {
  const site = useApi('/site');
  const nav = useApi('/nav');
  const ready = !site.loading && !nav.loading;
  return <Ctx.Provider value={{ site: site.data, nav: nav.data, ready }}>{children}</Ctx.Provider>;
}
