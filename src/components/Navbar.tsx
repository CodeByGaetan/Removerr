"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/icon-512.png";

import { usePathname } from "next/navigation";
import { ToggleTheme } from "./ToggleTheme";

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <div className="h-20 border-b flex justify-between items-center">
      <Image src={Logo} className="ml-2 size-16" alt="Icon" />
      <div className="flex gap-1">
        <Link href="/movies" passHref>
          <Button variant={currentPath === "/movies" ? "default" : "outline"}>
            Films
          </Button>
        </Link>
        <Link href="/series" passHref>
          <Button variant={currentPath === "/series" ? "default" : "outline"}>
            Séries
          </Button>
        </Link>
      </div>
      <div className="mr-5">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
