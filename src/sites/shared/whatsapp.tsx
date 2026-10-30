import type { CSSProperties, ReactNode } from "react";
import type { BrandConfig } from "@/templates/types";

/** wa.me link; without a number WhatsApp opens the contact picker. */
export function waLink(digits: string, text?: string): string {
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits.replace(/\D/g, "")}${query}`;
}

/* The digits WhatsApp buttons open: the business's own number when PLW has put
   the client's PLW number on the site's phone (brand.whatsapp), else the site phone. */
export function whatsappLink(brand: BrandConfig, text?: string): string {
  return waLink(brand.whatsapp || brand.phoneHref, text);
}

/** A WhatsApp-green link that opens the chat in a new tab. `className` sets its size and shape. */
export function WhatsAppButton({ href, className, style, children, ...rest }: {
  href: string;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={{ backgroundColor: "#25D366", ...style }} {...rest}>
      {children}
    </a>
  );
}
