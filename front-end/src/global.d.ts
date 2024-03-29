interface MenuContentProps {
  children: React.ReactNode<MenuLinkProps>;
}
interface MenuLinkProps {
  to: string;
  Icon?: React.ElementType<MenuLinkIconProps> | string;
  image?: string;
  children?: string;
  variant?: "default" | "active" | "icon";
  alt?: string;
  onClick?: () => void;
}
interface MenuLinkIconProps {
  className?: string;
}

interface SidebarLinkProps {
  to: string;
  Icon?: React.ElementType<SidebarIconProps>;
  children: string;
  variant?: "default" | "active";
}
interface SidebarIconProps {
  className?: string;
}
