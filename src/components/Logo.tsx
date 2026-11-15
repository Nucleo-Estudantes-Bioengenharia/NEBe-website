import Image from "next/image";

import logo from "@/assets/logo.jpg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-xl bg-white px-2 py-1 ${className}`}
    >
      <Image
        src={logo}
        alt="NEBe"
        priority
        className="h-full w-auto"
        sizes="160px"
      />
    </span>
  );
}
