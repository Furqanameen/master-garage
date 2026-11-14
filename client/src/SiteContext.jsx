import { createContext, useContext } from 'react';
import { useApi } from './api.js';

const Ctx = createContext({ site: null, nav: null });
export const useSite = () => useContext(Ctx);

export function SiteProvider({ children }) {
  const site = useApi('/site');
  const nav = useApi('/nav');
  return <Ctx.Provider value={{ site: site.data, nav: nav.data }}>{children}</Ctx.Provider>;
}
