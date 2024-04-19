import { Link } from "react-router-dom";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type BreadcrumbInnerProps = {
  variant?: "link" | "page";
  to?: string;
  label: string;
};

export const BreadcrumbInner = ({
  variant = "link",
  to = "/",
  label,
}: BreadcrumbInnerProps) => {
  const renderLink = (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to={to}>{label}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
  const renderPage = (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{label}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
  return variant == "link" ? renderLink : renderPage;
};
