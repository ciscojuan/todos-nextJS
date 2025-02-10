"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  path: string;
  icon: React.ReactNode;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
  const pathName = usePathname();
  return (
    <>
      {/* Active className:  */}
      <li>
        <Link
          href={path}
          className={`
            px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group 
             bg-gradient-to-r  hover:bg-sky-600  hover:text-white
            ${
              pathName === path
                ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400 "
                : ""
            }  
            `}
        >
          <div className="flex items-center">
          {icon}
          <span className="ml-3 ">{title}</span>
          </div>
        </Link>
      </li>
    </>
  );
};
