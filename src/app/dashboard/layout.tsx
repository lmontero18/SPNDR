import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { ModeToggle } from "@/components/layout/ModeToggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="absolute top-4 right-6 z-10">
          <ModeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
