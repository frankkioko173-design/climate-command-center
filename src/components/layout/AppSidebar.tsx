import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <Zap className="h-5 w-5 text-accent-foreground" />
          </div>
          <span
            className={cn(
              "font-bold text-lg text-sidebar-foreground tracking-tight transition-opacity duration-200",
              collapsed ? "opacity-0 w-0" : "opacity-100"
            )}
          >
            CLIMAX
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            const linkContent = (
              <NavLink
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary")} />
                <span
                  className={cn(
                    "truncate transition-opacity duration-200",
                    collapsed ? "opacity-0 w-0" : "opacity-100"
                  )}
                >
                  {item.title}
                </span>
                {item.badge && !collapsed && (
                  <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground">
                    {item.badge}
                  </span>
                )}
                {item.badge && collapsed && (
                  <span className="absolute right-2 top-1 flex h-2 w-2 rounded-full bg-accent" />
                )}
              </NavLink>
            );

            return (
              <li key={item.href} className="relative">
                {collapsed ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-2">
                      {item.title}
                      {item.badge && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground">
                          {item.badge}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  linkContent
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
