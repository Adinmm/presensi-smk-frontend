import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  CheckSquare,
  GraduationCap,
  Home,
  LogOut,
  School,
  Settings,
  ScrollText,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/useGet";
import { useEffect } from "react";
import { LoadingOverlay } from "./utils/LoadingOverlay";
import { useLogOut } from "@/hooks/usePost";

const nav = [
  { to: "/", label: "Dashboard", icon: Home, end: true },
  { to: "/presensi", label: "Presensi Harian", icon: CheckSquare },
  { to: "/riwayat", label: "Riwayat", icon: ScrollText },
  { to: "/siswa", label: "Data Siswa", icon: Users },
  { to: "/kelas", label: "Kelas", icon: School },
  { to: "/laporan", label: "Laporan", icon: CalendarCheck },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const { data } = useGetMe();
  const { mutation } = useLogOut();

  const logout = () => {
    mutation.mutate();
  };

  return (
    <div className="flex h-screen bg-muted/30 ">
      {mutation.isPending && <LoadingOverlay />}
      <aside className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <div className="h-9 w-9 rounded-md bg-primary text-primary-foreground grid place-items-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-sm leading-tight">
              Presensi SMK
            </div>
            <div className="text-[11px] text-muted-foreground">
              Sistem Kehadiran
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 ">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )
              }
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-9 w-9 rounded-full bg-muted grid place-items-center text-sm font-semibold">
              {data?.data?.name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {data?.data?.name}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {data?.data?.role}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              aria-label="Keluar"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 border-b bg-background flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <span className="font-semibold text-sm">Presensi SMK</span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-1" />
            </Button>
            <nav>
              <NavLink key={nav[6].to} to={nav[6].to} end={nav[6].end}>
                <Settings className="h-4 w-4" />
              </NavLink>
            </nav>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 w-full mx-auto overflow-auto">
          <Outlet />
        </main>
        <nav className="md:hidden grid grid-cols-6 border-t bg-background sticky bottom-0">
          {nav.slice(0, 6).map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center py-2 text-[10px] gap-0.5",
                  isActive ? "text-primary" : "text-muted-foreground",
                )
              }
            >
              <n.icon className="h-4 w-4" />
              <span>{n.label.split(" ")[0]}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
