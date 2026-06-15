import { Link } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbNavigationInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  breadcumbItems: BreadcrumbItem[];
}

export function BreadcrumbNavigation({
  breadcumbItems,
  className,
}: BreadcrumbNavigationInput) {
  return (
    <div className={className}>
      {breadcumbItems.map((breadcumbItem, index) => {
        return (
          <>
            {breadcumbItem.href === undefined ? (
              <span className="text-base text-zinc-400">
                {breadcumbItem.label}
              </span>
            ) : (
              <Link
                to={breadcumbItem.href!}
                className="text-base text-zinc-800"
              >
                {breadcumbItem.label}
              </Link>
            )}
            {index !== breadcumbItems.length - 1 && (
              <span className="mx-2 text-sm text-zinc-800">/</span>
            )}
          </>
        );
      })}
    </div>
  );
}
