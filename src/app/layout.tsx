"use client";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar-ace";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sidebarData } from "@/data/sidebar-data";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
  <body>
    <SideBar>
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen w-screen h-screen bg-gray-200 dark:bg-neutral-900 rounded-tl-2xl border border-neutral-200">
        {/* Top spacer or header */}
        <div />
        {/* Main content (centered horizontally) */}
        <div className="flex flex-col items-center w-full h-full">
          {children}
        </div>
        {/* Bottom spacer or footer */}
        <div />
      </div>
    </SideBar>
  </body>
</html>

  );
}

function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {sidebarData.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div></div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 bg"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Components
      </motion.span>
    </Link>
  );
};
