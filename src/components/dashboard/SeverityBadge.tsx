import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: "critical" | "high" | "medium" | "low";
  size?: "sm" | "md";
  pulse?: boolean;
}

const severityConfig = {
  critical: {
    label: "Critical",
    className: "badge-critical",
  },
  high: {
    label: "High",
    className: "badge-high",
  },
  medium: {
    label: "Medium",
    className: "badge-medium",
  },
  low: {
    label: "Low",
    className: "badge-low",
  },
};

export function SeverityBadge({ severity, size = "md", pulse = false }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        pulse && "animate-pulse-soft"
      )}
    >
      <span
        className={cn(
          "rounded-full",
          size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
          severity === "critical" && "bg-destructive",
          severity === "high" && "bg-orange-500",
          severity === "medium" && "bg-accent",
          severity === "low" && "bg-success"
        )}
      />
      {config.label}
    </span>
  );
}
