import { Link } from "react-router-dom";

const SidebarLink = ({
  to,
  Icon,
  children,
  variant = "default",
}: SidebarLinkProps) => {
  const renderDefault = (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Link>
  );
  const renderActive = (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Link>
  );
  return variant == "active" ? renderActive : renderDefault;
};

export default SidebarLink;
