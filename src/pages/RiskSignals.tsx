import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { SeverityBadge } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudRain, Flame, Wind, Thermometer, Search, Filter, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskSignal {
  id: string;
  county: string;
  type: "flood" | "drought" | "storm" | "heat";
  severity: "critical" | "high" | "medium" | "low";
  confidence: number;
  timestamp: string;
  status: "new" | "reviewed" | "alert_generated";
}

const signals: RiskSignal[] = [
  { id: "RS-001", county: "Kisumu", type: "flood", severity: "critical", confidence: 94, timestamp: "2025-02-02 14:32", status: "new" },
  { id: "RS-002", county: "Turkana", type: "drought", severity: "critical", confidence: 91, timestamp: "2025-02-02 14:15", status: "new" },
  { id: "RS-003", county: "Mombasa", type: "storm", severity: "high", confidence: 87, timestamp: "2025-02-02 13:58", status: "reviewed" },
  { id: "RS-004", county: "Garissa", type: "heat", severity: "high", confidence: 85, timestamp: "2025-02-02 13:30", status: "new" },
  { id: "RS-005", county: "Nairobi", type: "flood", severity: "medium", confidence: 72, timestamp: "2025-02-02 12:45", status: "alert_generated" },
  { id: "RS-006", county: "Nakuru", type: "flood", severity: "medium", confidence: 68, timestamp: "2025-02-02 12:20", status: "reviewed" },
  { id: "RS-007", county: "Kakamega", type: "storm", severity: "medium", confidence: 65, timestamp: "2025-02-02 11:55", status: "new" },
  { id: "RS-008", county: "Nyeri", type: "drought", severity: "low", confidence: 58, timestamp: "2025-02-02 11:30", status: "reviewed" },
  { id: "RS-009", county: "Machakos", type: "heat", severity: "low", confidence: 52, timestamp: "2025-02-02 10:45", status: "alert_generated" },
  { id: "RS-010", county: "Meru", type: "flood", severity: "low", confidence: 45, timestamp: "2025-02-02 10:15", status: "reviewed" },
];

const typeIcons = {
  flood: CloudRain,
  drought: Flame,
  storm: Wind,
  heat: Thermometer,
};

const typeLabels = {
  flood: "Flood",
  drought: "Drought",
  storm: "Storm",
  heat: "Heat Wave",
};

const statusLabels = {
  new: "New",
  reviewed: "Reviewed",
  alert_generated: "Alert Generated",
};

const statusColors = {
  new: "bg-secondary/10 text-secondary",
  reviewed: "bg-muted text-muted-foreground",
  alert_generated: "bg-success/10 text-success",
};

const RiskSignals = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filteredSignals = signals.filter((signal) => {
    const matchesSearch = signal.county.toLowerCase().includes(search.toLowerCase()) ||
      signal.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || signal.type === typeFilter;
    const matchesSeverity = severityFilter === "all" || signal.severity === severityFilter;
    return matchesSearch && matchesType && matchesSeverity;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Risk Signals</h1>
          <p className="text-muted-foreground">
            AI-detected climate risk signals requiring attention
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by county or signal ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Risk Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="drought">Drought</SelectItem>
                    <SelectItem value="storm">Storm</SelectItem>
                    <SelectItem value="heat">Heat Wave</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signals Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              {filteredSignals.length} Risk Signals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Signal ID</TableHead>
                    <TableHead>County</TableHead>
                    <TableHead>Risk Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-center">Confidence</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSignals.map((signal) => {
                    const Icon = typeIcons[signal.type];
                    return (
                      <TableRow key={signal.id} className="group">
                        <TableCell className="font-mono text-sm">{signal.id}</TableCell>
                        <TableCell className="font-medium">{signal.county}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span>{typeLabels[signal.type]}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <SeverityBadge severity={signal.severity} size="sm" />
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "font-medium",
                            signal.confidence >= 80 && "text-success",
                            signal.confidence >= 60 && signal.confidence < 80 && "text-warning",
                            signal.confidence < 60 && "text-muted-foreground"
                          )}>
                            {signal.confidence}%
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {signal.timestamp}
                        </TableCell>
                        <TableCell>
                          <span className={cn(
                            "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                            statusColors[signal.status]
                          )}>
                            {statusLabels[signal.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="btn-action opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={signal.status === "alert_generated"}
                          >
                            <Send className="h-3.5 w-3.5 mr-1.5" />
                            Generate Alert
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RiskSignals;
