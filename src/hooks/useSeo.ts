import { useEffect } from 'react';

const SITE_URL = 'https://liberty-marketing-hub.netlify.app';

interface SeoOptions {
  title: string;
  description?: string;
  noindex?: boolean;
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export const useSeo = ({ title, description, noindex }: SeoOptions) => {
  useEffect(() => {
    document.title = title;
    const url = `${SITE_URL}${window.location.pathname}`;

    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);
    setMeta('property', 'og:url', url);
    setLink('canonical', url);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }
  }, [title, description, noindex]);
};
