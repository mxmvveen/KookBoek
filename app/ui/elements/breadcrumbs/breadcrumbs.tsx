import { Breadcrumb } from "@/app/lib/definitions";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import "./breadcrumbs.scss";

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div className="mt-16">
      {breadcrumbs.map((breadcrumb, key, array) => (
        <span key={key} className="breadcrumbs">
          <Link href={breadcrumb.url}>
            <MuiLink component="span" underline="hover" className="uppercase">
              <span className="font-semibold">{breadcrumb.label}</span>
            </MuiLink>
          </Link>
          {key < array.length - 1 && (
            <span className="font-semibold separator ml-0.5 mr-0.5"> / </span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
