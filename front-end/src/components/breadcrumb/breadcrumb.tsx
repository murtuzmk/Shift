import { useBreadcrumb } from "@refinedev/core";
import { BreadcrumbOuter } from "./breadcrumb-outer";
import { BreadcrumbInner } from "./breadcrumb-inner";

export const BreadcrumbHeader = () => {
  const { breadcrumbs } = useBreadcrumb();
  return (
    <BreadcrumbOuter>
      {breadcrumbs.map((item, index) =>
        index == breadcrumbs.length - 1 ? (
          <BreadcrumbInner key={index} variant="page" label={item.label} />
        ) : (
          <BreadcrumbInner key={index} to={item.href} label={item.label} />
        )
      )}
    </BreadcrumbOuter>
  );
};
