type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url?: string;
  ogImage?: string;
  links?: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Shift",
  title: "Shift | Build your work schedule with ease",
  description:
    "Powerful scheduling, communication, and task delegation, ensuring smooth operations and enhancing collaboration among team members.",
};
