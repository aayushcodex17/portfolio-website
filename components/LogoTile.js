import Image from "next/image";

// Company logo on a brand-tinted tile (styles: .logo-tile in globals.css).
export default function LogoTile({ src, brand, fill, wide, className = "size-12" }) {
  return (
    <span className={`logo-tile block ${className}`} data-fill={fill ? "" : undefined} style={{ "--brand": brand ?? "var(--accent)" }}>
      <Image
        src={src}
        alt=""
        fill
        sizes="56px"
        unoptimized={src.endsWith(".svg")}
        className={fill ? "object-cover" : wide ? "object-contain p-[8%]" : "object-contain p-[14%]"}
      />
      <span className="logo-shine" aria-hidden="true" />
    </span>
  );
}
