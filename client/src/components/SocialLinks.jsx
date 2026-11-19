function Ico({ d, size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path fill="currentColor" d={d} />
    </svg>
  );
}

export function FacebookIcon() {
  return <Ico d="M14.5 8.5V6.8c0-.7.5-1.3 1.6-1.3H17V3h-1.7C12.8 3 11 4.5 11 7v1.5H9V11h2v10h3.5V11H17l.5-2.5h-3z" />;
}

export function InstagramIcon() {
  return (
    <Ico d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10A2.2 2.2 0 0 0 19.2 17V7A2.2 2.2 0 0 0 17 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.7A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9zm5.15-3.55a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95z" />
  );
}

export function WhatsAppIcon() {
  return (
    <Ico d="M20 3.4A10.9 10.9 0 0 0 3.2 17.8L2 22l4.3-1.1A10.9 10.9 0 0 0 20 3.4zm-8 16.7a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.1zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6 0a7.4 7.4 0 0 1-2.2-1.4 8.1 8.1 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4.1 15.6 15.6 0 0 0 1.6.6 3.8 3.8 0 0 0 1.8.1 2.9 2.9 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.3z" />
  );
}

export function PhoneIcon() {
  return <Ico d="M6.6 3.8c.4-.4 1-.5 1.5-.3l2.2.9c.6.2 1 .8 1.1 1.4l.3 2.1c.1.6-.1 1.2-.6 1.6L9.7 11c.8 1.6 2.1 2.9 3.7 3.7l1.5-1.4c.4-.4 1-.6 1.6-.5l2.1.3c.6.1 1.2.5 1.4 1.1l.9 2.2c.2.5.1 1.1-.3 1.5l-1.3 1.3c-.5.5-1.2.7-1.9.6C12.2 19.3 4.7 11.8 3.2 6.6c-.1-.7.1-1.4.6-1.9z" />;
}

export function MapIcon() {
  return <Ico d="M12 2.5A6.2 6.2 0 0 0 5.8 8.7C5.8 13.4 12 21.5 12 21.5s6.2-8.1 6.2-12.8A6.2 6.2 0 0 0 12 2.5zm0 8.4A2.2 2.2 0 1 1 14.2 8.7 2.2 2.2 0 0 1 12 10.9z" />;
}

function Action({ href, kind, label, external, ariaLabel }) {
  return (
    <a
      href={href}
      className={`contact-actions__btn contact-actions__btn--${kind}`}
      aria-label={ariaLabel || undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {kind === 'facebook' && <FacebookIcon />}
      {kind === 'instagram' && <InstagramIcon />}
      {kind === 'whatsapp' && <WhatsAppIcon />}
      {kind === 'phone' && <PhoneIcon />}
      {kind === 'map' && <MapIcon />}
      <span>{label}</span>
    </a>
  );
}

/** Facebook, Maps, WhatsApp, Call, Instagram — brand-coloured action buttons. */
export default function ContactActions({
  site,
  facebook,
  instagram,
  variant = 'all',
  className = '',
}) {
  const fb = facebook ?? site?.social?.facebook;
  const ig = instagram ?? site?.social?.instagram;
  const social = variant === 'social';
  const items = [];

  if (!social && site?.mapUrl) items.push(<Action key="map" kind="map" href={site.mapUrl} label="Google Maps" external />);
  if (!social && site?.mobile) {
    items.push(
      <Action
        key="phone"
        kind="phone"
        href={`tel:${site.mobile}`}
        label="Call now"
        ariaLabel={`Call ${site.mobileDisplay || site.mobile}`}
      />,
    );
  }
  if (!social && site?.whatsapp) {
    items.push(
      <Action
        key="wa"
        kind="whatsapp"
        href={`https://wa.me/${site.whatsapp}`}
        label="WhatsApp"
        external
      />,
    );
  }
  if (fb) items.push(<Action key="fb" kind="facebook" href={fb} label="Facebook" external />);
  if (ig) items.push(<Action key="ig" kind="instagram" href={ig} label="Instagram" external />);
  if (!items.length) return null;

  return <div className={`contact-actions ${className}`.trim()}>{items}</div>;
}
