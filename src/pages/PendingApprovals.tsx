import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { SeverityBadge } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CloudRain,
  Flame,
  Wind,
  Thermometer,
  MapPin,
  Clock,
  Check,
  X,
  Edit3,
  ChevronRight,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PendingAlert {
  id: string;
  signalId: string;
  county: string;
  type: "flood" | "drought" | "storm" | "heat";
  severity: "critical" | "high" | "medium" | "low";
  confidence: number;
  createdAt: string;
  messagePreview: string;
  estimatedRecipients: number;
  channels: string[];
}

const pendingAlerts: PendingAlert[] = [
  {
    id: "PA-001",
    signalId: "RS-001",
    county: "Kisumu",
    type: "flood",
    severity: "critical",
    confidence: 94,
    createdAt: "5 min ago",
    messagePreview: "⚠️ FLOOD WARNING - KISUMU COUNTY\n\nHeavy rainfall has been detected in the Lake Victoria basin. Water levels are rising rapidly...",
    estimatedRecipients: 145000,
    channels: ["SMS", "Voice"],
  },
  {
    id: "PA-002",
    signalId: "RS-002",
    county: "Turkana",
    type: "drought",
    severity: "critical",
    confidence: 91,
    createdAt: "18 min ago",
    messagePreview: "⚠️ DROUGHT ALERT - TURKANA COUNTY\n\nSevere drought conditions detected. Vegetation index at critical low. Water conservation measures required...",
    estimatedRecipients: 98000,
    channels: ["SMS"],
  },
  {
    id: "PA-003",
    signalId: "RS-003",
    county: "Mombasa",
    type: "storm",
    severity: "high",
    confidence: 87,
    createdAt: "45 min ago",
    messagePreview: "⚠️ STORM WARNING - MOMBASA COUNTY\n\nTropical storm approaching coastal areas. Secure loose objects and stay indoors...",
    estimatedRecipients: 215000,
    channels: ["SMS", "USSD"],
  },
  {
    id: "PA-004",
    signalId: "RS-004",
    county: "Garissa",
    type: "heat",
    severity: "high",
    confidence: 85,
    createdAt: "1 hour ago",
    messagePreview: "⚠️ HEAT WAVE ALERT - GARISSA COUNTY\n\nExtreme temperatures expected. Stay hydrated and avoid outdoor activities during peak hours...",
    estimatedRecipients: 76000,
    channels: ["SMS"],
  },
  {
    id: "PA-005",
    signalId: "RS-007",
    county: "Kakamega",
    type: "storm",
    severity: "medium",
    confidence: 65,
    createdAt: "2 hours ago",
    messagePreview: "⚠️ WEATHER ADVISORY - KAKAMEGA COUNTY\n\nModerate storm activity expected. Take precautionary measures...",
    estimatedRecipients: 112000,
    channels: ["SMS"],
  },
];

const typeIcons = {
  flood: CloudRain,
  drought: Flame,
  storm: Wind,
  heat: Thermometer,
};

const typeLabels = {
  flood: "Flood Risk",
  drought: "Drought Risk",
  storm: "Storm Risk",
  heat: "Heat Wave Risk",
};

const PendingApprovals = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState(pendingAlerts);

  const handleApprove = (id: string, county: string, recipients: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    toast({
      title: "Alert Approved & Sent",
      description: `Alert sent to ${recipients.toLocaleString()} recipients in ${county} County.`,
    });
  };

  const handleReject = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    toast({
      title: "Alert Rejected",
      description: "The alert has been rejected and archived.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pending Approvals</h1>
            <p className="text-muted-foreground">
              Human-in-the-loop review queue for AI-generated alerts
            </p>
          </div>
          <Badge variant="secondary" className="w-fit text-sm px-3 py-1">
            {alerts.length} alerts pending
          </Badge>
        </div>

        {/* Alerts Queue */}
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const Icon = typeIcons[alert.type];
            return (
              <Card
                key={alert.id}
                className={cn(
                  "animate-fade-in transition-all duration-200 hover:shadow-card-hover",
                  alert.severity === "critical" && "border-l-4 border-l-destructive"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Left: Alert Info */}
                    <div className="flex-1 space-y-3">
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            alert.type === "flood" && "bg-secondary/10 text-secondary",
                            alert.type === "drought" && "bg-orange-500/10 text-orange-500",
                            alert.type === "storm" && "bg-purple-500/10 text-purple-500",
                            alert.type === "heat" && "bg-destructive/10 text-destructive"
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-semibold">{typeLabels[alert.type]}</span>
                        </div>
                        <SeverityBadge
                          severity={alert.severity}
                          size="sm"
                          pulse={alert.severity === "critical"}
                        />
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {alert.county} County
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {alert.createdAt}
                        </div>
                      </div>

                      {/* Message Preview */}
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm font-mono whitespace-pre-wrap line-clamp-3">
                          {alert.messagePreview}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          <span>{alert.estimatedRecipients.toLocaleString()} recipients</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>Channels:</span>
                          {alert.channels.map((channel) => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>Confidence:</span>
                          <span className={cn(
                            "font-medium",
                            alert.confidence >= 80 && "text-success",
                            alert.confidence >= 60 && alert.confidence < 80 && "text-warning"
                          )}>
                            {alert.confidence}%
                          </span>
                        </div>
                        <span className="font-mono text-xs">{alert.signalId}</span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex lg:flex-col items-center gap-2 lg:min-w-[140px]">
                      <Button
                        className="btn-action flex-1 lg:w-full"
                        onClick={() => handleApprove(alert.id, alert.county, alert.estimatedRecipients)}
                      >
                        <Check className="h-4 w-4 mr-1.5" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 lg:w-full"
                        asChild
                      >
                        <a href="/alert-generator">
                          <Edit3 className="h-4 w-4 mr-1.5" />
                          Edit
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1 lg:w-full text-muted-foreground hover:text-destructive"
                        onClick={() => handleReject(alert.id)}
                      >
                        <X className="h-4 w-4 mr-1.5" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {alerts.length === 0 && (
            <Card className="animate-fade-in">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4">
                  <Check className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-1">All caught up!</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  No alerts pending approval. New alerts will appear here when AI detects risk signals.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PendingApprovals;
