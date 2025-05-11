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

const routes = [
  { icon: FiHome, label: "Dashboard", path: "/dashboard" },
  { icon: FiDollarSign, label: "Monthly Plan", path: "/dashboard/plan" },
  { icon: FiBarChart, label: "Goals", path: "/dashboard/goals" },
  { icon: FiSettings, label: "Settings", path: "/dashboard/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-zinc-200 bg-white p-2"
      style={{
        width: open ? 225 : "fit-content",
      }}
    >
      <Header open={open} />

      <div className="space-y-1">
        {routes.map(({ icon: Icon, label, path }) => (
          <SidebarItem
            key={label}
            Icon={Icon}
            title={label}
            path={path}
            active={pathname === path}
            open={open}
          />
        ))}
      </div>

      <CollapseToggle open={open} setOpen={setOpen} />
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
            ? "bg-zinc-200 text-zinc-900"
            : "text-zinc-500 hover:bg-zinc-100"
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
    <div className="mb-3 border-b border-zinc-200 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-zinc-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold text-zinc-900">
                SPNDR
              </span>
              <span className="block text-xs text-zinc-500">Personal App</span>
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
      className="grid size-10 shrink-0 place-content-center rounded-md bg-white"
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
      className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 transition-colors hover:bg-zinc-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform text-zinc-600 ${
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
            className="text-xs font-medium text-zinc-600"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
