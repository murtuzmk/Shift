import { Link } from "react-router-dom";

const MenuLink = ({
  to,
  Icon,
  children,
  variant = "default",
  alt,
  image,
  onClick,
}: MenuLinkProps) => {
  const renderDefault = (
    <Link
      to={to}
      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </Link>
  );
  const renderActive = (
    <Link
      to={to}
      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </Link>
  );
  const renderIcon = (
    <Link
      to={to}
      className="flex items-center gap-2 text-lg font-semibold"
      onClick={onClick}
    >
      <img className="w-9" src={image} alt={alt} />
    </Link>
  );
  if (variant == "icon") return renderIcon;
  else if (variant == "active") return renderActive;
  return renderDefault;
};

export default MenuLink;
