"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import ThemeTogglerSwitch from "../switch/ThemeTogglerSwitch";
import { Cross as Hamburger } from "hamburger-react";
import Image from "next/image";


// ------------ types --------------
// props type

// navlink type
type navlink = {
  label: string;
  href: string;
  isFilled?: boolean;
};

// navlinks array
const navlinksArray: Array<navlink> = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  {
    label: "Contact",
    href: "/contact",
    isFilled: true,
  },
];
const MainNavbar = () => {
  const [showNavlinks, setShowNavlinks] = useState(false);
  // responsive navlinks ref
  const navlinks = useRef<null | HTMLUListElement>(null);
  // pathname
  const pathname = usePathname();

  useEffect(() => {
    if (navlinks.current) {
      if (showNavlinks && window.innerWidth < 992) {
        navlinks.current.style.height = navlinks.current?.scrollHeight + "px";
      } else if (!showNavlinks && window.innerWidth < 992) {
        navlinks.current.style.height = 0 + "px";
      } else {
        navlinks.current.style.height = navlinks.current?.scrollHeight + "px";
      }
    }
  }, [showNavlinks]);

  return (
    <nav className={twMerge("px-6 dark:bg-[#191C30]")}>
      {/* =========== container ===========  */}
      <div className="text-inherit max-w-2xl-container mx-auto py-6 flex gap-x-5 items-center justify-between  max-lg:flex-col max-lg:items-stretch">
        {/* -------------- logo and hamburger ------------------ */}
        <div className="text-inherit max-lg:flex justify-between items-center gap-2 ">
          <Link href={"/"} className="  ">
            <Image
              src={"/assets/images/icons/logoLight.PNG"}
              alt=""
              width={400}
              height={50}
              className="aspect-[7.87/1] dark:hidden object-contain h-12"
            />
            <Image
              src={"/assets/images/icons/logoDark.PNG"}
              alt=""
              width={400}
              height={50}
              className="aspect-[7.87/1] hidden dark:inline-block object-contain h-12"
            />
          </Link>
          <div className="lg:hidden flex justify-center items-center gap-2">
            <ThemeTogglerSwitch />
            <Hamburger
              toggled={showNavlinks}
              toggle={setShowNavlinks}
              size={30}
            />
          </div>
        </div>

        {/* -------------- navigation links --------------- */}
        <ul
          className={` text-inherit flex items-center gap-x-8 gap-y-2    overflow-hidden max-lg:hidden   `}
        >
          {navlinksArray.map((navlink) => {
            const isActive = pathname === navlink.href;
            return (
              <li
                className={cn(
                  `py-1 relative  `,
                  isActive && !navlink.isFilled
                    ? " text-[#3F72AF] after:w-full"
                    : "after:w-0",
                  navlink.isFilled
                    ? ""
                    : "after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:bg-[#3F72AF] after:duration-150 hover:after:w-full"
                )}
                key={navlink.label}
              >
                <Link
                  href={navlink.href}
                  className={cn(
                    "text-inherit font-semibold text-[13px]",
                    navlink.isFilled &&
                      "py-2 px-4 rounded-full text-white bg-[#3F72AF] tracking-wider dark:text-[#191C30] "
                  )}
                >
                  {navlink.label}
                </Link>
              </li>
            );
          })}
          <li className="flex justify-center items-center">
            <ThemeTogglerSwitch />
          </li>
        </ul>

        {/* ---------- navlinks and start project responsive for mobile and tablets ---------  */}
        <ul
          className={` text-inherit flex items-center gap-x-8 gap-y-2 duration-300 flex-col   overflow-hidden lg:hidden h-0  `}
          ref={navlinks}
        >
          {navlinksArray.map((navlink) => {
            const isActive = pathname === navlink.href;
            return (
              <li
                className={cn(
                  `py-1 relative  `,
                  isActive && !navlink.isFilled
                    ? " text-[#3F72AF] after:w-full"
                    : "after:w-0",
                  navlink.isFilled
                    ? ""
                    : "after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:bg-[#3F72AF] after:duration-150 hover:after:w-full"
                )}
                key={navlink.label}
              >
                <Link
                  href={navlink.href}
                  className={cn(
                    "text-inherit font-semibold text-[13px]",
                    navlink.isFilled &&
                      "py-2 px-4 rounded-full text-white bg-[#3F72AF] tracking-wider dark:text-[#191C30] "
                  )}
                >
                  {navlink.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
