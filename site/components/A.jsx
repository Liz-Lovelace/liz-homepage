// A link with a small icon in front: the site it leads to, or Liz's pink L for pages
// on this site. The icon is glued to the first word so it never ends up alone at the
// end of a line, and it sits outside the underline.

export default function A({ href, icon, children, ...rest }) {
  if (!icon) return <a href={href} {...rest}>{children}</a>;
  const img = <img className="icon" src={`/icons/${icon}`} alt="" width="16" height="16" fetchPriority="low" />;
  if (typeof children === 'string') {
    const i = children.indexOf(' ');
    const first = i < 0 ? children : children.slice(0, i);
    const tail = i < 0 ? '' : children.slice(i);
    return (
      <a href={href} {...rest}>
        <span className="nowrap">{img}{first}</span>{tail}
      </a>
    );
  }
  return <a href={href} {...rest}><span className="nowrap">{img}{children}</span></a>;
}

// For links that point back into this site.
export const LIZ = 'liz.svg';
