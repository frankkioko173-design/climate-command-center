import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  Send,
  Clock,
  CheckCircle2,
  MapPin,
  Users,
  Settings,
  Zap,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { title: "Dashboard Overview", href: "/", icon: LayoutDashboard },
  { title: "Risk Signals", href: "/risk-signals", icon: AlertTriangle, badge: 12 },
  { title: "Alert Generator", href: "/alert-generator", icon: Send },
  { title: "Pending Approvals", href: "/pending-approvals", icon: Clock, badge: 5 },
  { title: "Sent Alerts", href: "/sent-alerts", icon: CheckCircle2 },
  { title: "Regions / Counties", href: "/regions", icon: MapPin },
  { title: "Users & Roles", href: "/users", icon: Users },
  { title: "Settings", href: "/settings", icon: Settings },
];

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-r-0">
        <SheetHeader className="h-16 flex flex-row items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Zap className="h-5 w-5 text-accent-foreground" />
            </div>
            <SheetTitle className="font-bold text-lg text-sidebar-foreground tracking-tight">
              CLIMAX
            </SheetTitle>
          </div>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary")} />
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
