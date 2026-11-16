export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M14.5 8.5V6.8c0-.7.5-1.3 1.6-1.3H17V3h-1.7C12.8 3 11 4.5 11 7v1.5H9V11h2v10h3.5V11H17l.5-2.5h-3z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10A2.2 2.2 0 0 0 19.2 17V7A2.2 2.2 0 0 0 17 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.7A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9zm5.15-3.55a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95z" />
    </svg>
  );
}

export default function SocialLinks({ facebook, instagram, className = '' }) {
  if (!facebook && !instagram) return null;
  return (
    <p className={`social-links ${className}`.trim()}>
      {facebook ? (
        <a href={facebook} target="_blank" rel="noopener noreferrer" className="social-links__btn">
          <FacebookIcon />
          <span>Facebook</span>
        </a>
      ) : null}
      {instagram ? (
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="social-links__btn">
          <InstagramIcon />
          <span>Instagram</span>
        </a>
      ) : null}
    </p>
  );
}
