import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface County {
  name: string;
  riskLevel: "critical" | "high" | "medium" | "low";
  riskScore: number;
}

const counties: County[] = [
  { name: "Kisumu", riskLevel: "critical", riskScore: 92 },
  { name: "Turkana", riskLevel: "critical", riskScore: 88 },
  { name: "Mandera", riskLevel: "high", riskScore: 76 },
  { name: "Garissa", riskLevel: "high", riskScore: 74 },
  { name: "Nairobi", riskLevel: "medium", riskScore: 58 },
  { name: "Mombasa", riskLevel: "medium", riskScore: 52 },
  { name: "Nakuru", riskLevel: "medium", riskScore: 48 },
  { name: "Kiambu", riskLevel: "low", riskScore: 32 },
  { name: "Machakos", riskLevel: "low", riskScore: 28 },
  { name: "Nyeri", riskLevel: "low", riskScore: 22 },
  { name: "Meru", riskLevel: "low", riskScore: 18 },
  { name: "Kakamega", riskLevel: "medium", riskScore: 45 },
];

const riskColors = {
  critical: "bg-destructive",
  high: "bg-orange-500",
  medium: "bg-accent",
  low: "bg-success",
};

export function RiskHeatMap() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">County Risk Map</CardTitle>
        <p className="text-sm text-muted-foreground">
          Current risk levels across monitored counties
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {counties.map((county) => (
            <div
              key={county.name}
              className={cn(
                "heatmap-cell relative flex flex-col items-center justify-center p-3 aspect-square",
                riskColors[county.riskLevel],
                county.riskLevel === "critical" && "text-destructive-foreground",
                county.riskLevel === "high" && "text-white",
                county.riskLevel === "medium" && "text-accent-foreground",
                county.riskLevel === "low" && "text-success-foreground"
              )}
            >
              <span className="text-xs font-medium truncate w-full text-center opacity-90">
                {county.name}
              </span>
              <span className="text-lg font-bold">{county.riskScore}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-destructive" />
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-orange-500" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-accent" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-success" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
