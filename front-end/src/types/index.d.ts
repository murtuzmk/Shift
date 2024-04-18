export interface MenuContentProps {
  children: React.ReactNode<MenuLinkProps>;
}
export interface MenuLinkProps {
  to: string;
  Icon?: React.ElementType<MenuLinkIconProps> | string;
  image?: string;
  children?: string;
  variant?: "default" | "active" | "icon";
  alt?: string;
  onClick?: () => void;
}
export interface MenuLinkIconProps {
  className?: string;
}

export interface SidebarLinkProps {
  to: string;
  Icon?: React.ElementType<SidebarIconProps>;
  children: string;
  variant?: "default" | "active";
}
export interface SidebarIconProps {
  className?: string;
}

export type LayoutNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = LayoutNavItem;

export type LayoutNavItemsProps = {
  items?: LayoutNavItem[];
  children?: React.ReactNode;
};

export type MarketingConfig = {
  mainNav: LayoutNavItem[];
};

export type GenericError = {
  message: string | undefined;
  statusCode: number;
  statusText: string | undefined;
};

export type GenericResponse = {
  message?: string | undefined;
  statusCode: number;
  statusText: string | undefined;
};

export type ResponseError = Response & {
  message: string | undefined;
};

export type VerifiedUser = {
  user_id: string;
  sub?: string;
  email?: string;
  email_verified?: boolean;
  username?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  identities: {
    [key: string]: any;
  };
  app_metadata: {
    [key: string]: any;
  };
  user_metadata: {
    [key: string]: any;
  };
  picture?: string;
  name?: string;
  nickname?: string;
  multifactor?: string[];
  last_ip?: string;
  last_login?:
    | string
    | {
        [key: string]: any;
      };
  logins_count: number;
  blocked?: boolean;
  given_name?: string;
  family_name?: string;
};
