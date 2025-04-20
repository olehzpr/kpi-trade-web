import Link, { LinkProps } from "next/link";
import { ChevronLeft } from "lucide-react";
import { cx } from "class-variance-authority";
import { HTMLProps } from "react";

export default function GoBack({
  className,
  ...props
}: LinkProps & HTMLProps<HTMLAnchorElement>) {
  return (
    <Link
      className={cx(
        "flex items-center mb-4 py-1 text-primary hover:text-primary/80",
        className,
      )}
      {...props}
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      Назад
    </Link>
  );
}
