import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityBadge } from "./SeverityBadge";
import { CloudRain, Flame, Wind, Thermometer, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Detection {
  id: string;
  type: "flood" | "drought" | "storm" | "heat";
  county: string;
  severity: "critical" | "high" | "medium" | "low";
  confidence: number;
  timestamp: string;
  description: string;
}

const detections: Detection[] = [
  {
    id: "1",
    type: "flood",
    county: "Kisumu",
    severity: "critical",
    confidence: 94,
    timestamp: "2 min ago",
    description: "Heavy rainfall detected. Lake Victoria water levels rising rapidly.",
  },
  {
    id: "2",
    type: "drought",
    county: "Turkana",
    severity: "critical",
    confidence: 91,
    timestamp: "15 min ago",
    description: "Severe drought conditions. Vegetation index at critical low.",
  },
  {
    id: "3",
    type: "storm",
    county: "Mombasa",
    severity: "high",
    confidence: 87,
    timestamp: "32 min ago",
    description: "Tropical storm approaching. Wind speeds increasing.",
  },
  {
    id: "4",
    type: "heat",
    county: "Garissa",
    severity: "high",
    confidence: 85,
    timestamp: "1 hour ago",
    description: "Extreme heat wave. Temperatures exceeding 45°C.",
  },
  {
    id: "5",
    type: "flood",
    county: "Nairobi",
    severity: "medium",
    confidence: 72,
    timestamp: "2 hours ago",
    description: "Flash flood risk in low-lying areas due to urban drainage overflow.",
  },
];

const typeIcons = {
  flood: CloudRain,
  drought: Flame,
  storm: Wind,
  heat: Thermometer,
};

const typeColors = {
  flood: "text-secondary bg-secondary/10",
  drought: "text-orange-500 bg-orange-500/10",
  storm: "text-purple-500 bg-purple-500/10",
  heat: "text-destructive bg-destructive/10",
};

export function RecentDetections() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent AI Detections</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest risk signals detected by AI models
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Live
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {detections.map((detection, index) => {
          const Icon = typeIcons[detection.type];
          return (
            <div
              key={detection.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 cursor-pointer",
                index === 0 && "ring-1 ring-destructive/20 bg-destructive/5"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  typeColors[detection.type]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm capitalize">{detection.type} Risk</span>
                  <SeverityBadge severity={detection.severity} size="sm" pulse={detection.severity === "critical"} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{detection.description}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span>{detection.county} County</span>
                  <span>•</span>
                  <span>{detection.confidence}% confidence</span>
                  <span>•</span>
                  <span>{detection.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
