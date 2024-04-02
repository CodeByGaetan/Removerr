"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { ToggleTheme } from "./ToggleTheme";

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <div className="h-20 border-b flex justify-between items-center">
      <Image
        src="/logo.png"
        className="hidden lg:block ml-2"
        alt="Logo"
        width={220}
        height={50}
      />
      <Image
        src="/icon-512.png"
        className="lg:hidden ml-2"
        alt="Icon"
        width={70}
        height={50}
      />
      <div className="flex gap-1">
        <Link href="/movies" legacyBehavior passHref>
          <Button variant={currentPath === "/movies" ? "default" : "outline"}>
            Films
          </Button>
        </Link>
        <Link href="/series" legacyBehavior passHref>
          <Button variant={currentPath === "/series" ? "default" : "outline"}>
            Séries
          </Button>
        </Link>
      </div>

      <div className="flex justify-end mr-5 w-[55px] lg:w-[200px]">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
