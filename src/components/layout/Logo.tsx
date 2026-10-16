import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

/** Official artwork with transparent background and owner-approved white lettering. */
export function Logo({ src = siteConfig.brand.logo }: { src?: string | null }) {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label={`${siteConfig.name} — inicio`}
    >
      {src ? (
        <img
          src={src}
          alt={siteConfig.name}
          className="h-auto w-44 sm:w-52"
          width={1920}
          height={534}
        />
      ) : (
        <span className="font-display text-xl font-bold tracking-tight">{siteConfig.name}</span>
      )}
    </Link>
  );
}
