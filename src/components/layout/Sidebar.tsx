"use client";

import { useState } from "react";
import {
  FiHome,
  FiDollarSign,
  FiBarChart,
  FiSettings,
  FiChevronsRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

const routes = [
  { icon: FiHome, label: "Dashboard", path: "/dashboard" },
  { icon: FiDollarSign, label: "Monthly Plan", path: "/dashboard/plan" },
  { icon: FiBarChart, label: "Goals", path: "/dashboard/goals" },
  { icon: FiSettings, label: "Settings", path: "/dashboard/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const sidebarWidth = isMobile ? "fit-content" : open ? 225 : "fit-content";

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2"
      style={{ width: sidebarWidth }}
    >
      <Header open={open && !isMobile} />

      <div className="flex flex-col gap-y-1.5">
        {routes.map(({ icon: Icon, label, path }) => (
          <SidebarItem
            key={label}
            Icon={Icon}
            title={label}
            path={path}
            active={pathname === path}
            open={open && !isMobile}
          />
        ))}
      </div>

      {!isMobile && <CollapseToggle open={open} setOpen={setOpen} />}
    </motion.nav>
  );
}

const SidebarItem = ({
  Icon,
  title,
  path,
  active,
  open,
}: {
  Icon: IconType;
  title: string;
  path: string;
  active: boolean;
  open: boolean;
}) => {
  return (
    <Link href={path}>
      <motion.button
        layout
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          active
            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
            : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const Header = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold text-zinc-900 dark:text-white">
                SPNDR
              </span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                Personal App
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-white dark:bg-zinc-800"
    >
      <Image
        src="/logos/SPNDR-logo.svg"
        alt="SPNDR Logo"
        width={28}
        height={28}
        className="rounded"
      />
    </motion.div>
  );
};

const CollapseToggle = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)}
      className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 dark:border-zinc-700 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform text-zinc-600 dark:text-zinc-300 ${
              open && "rotate-180"
            }`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-zinc-600 dark:text-zinc-300"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
