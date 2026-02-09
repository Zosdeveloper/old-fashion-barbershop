import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, as: Component = "section" }, ref) => {
    return (
      <Component
        ref={ref}
        id={id}
        className={cn("section-padding", className)}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

export default Section;
