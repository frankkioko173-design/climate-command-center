import { DashboardLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "@/components/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Check,
  MapPin,
  Users,
  MessageSquare,
  Clock,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SentAlert {
  id: string;
  county: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  sentAt: string;
  recipients: number;
  delivered: number;
  channels: string[];
  approvedBy: string;
}

const sentAlerts: SentAlert[] = [
  {
    id: "SA-001",
    county: "Nairobi",
    type: "Flood Warning",
    severity: "medium",
    sentAt: "Today, 10:45 AM",
    recipients: 245000,
    delivered: 238000,
    channels: ["SMS"],
    approvedBy: "Dr. Sarah Kimani",
  },
  {
    id: "SA-002",
    county: "Machakos",
    type: "Heat Advisory",
    severity: "low",
    sentAt: "Today, 09:30 AM",
    recipients: 112000,
    delivered: 109500,
    channels: ["SMS", "USSD"],
    approvedBy: "John Ochieng",
  },
  {
    id: "SA-003",
    county: "Meru",
    type: "Storm Alert",
    severity: "high",
    sentAt: "Yesterday, 4:15 PM",
    recipients: 156000,
    delivered: 152000,
    channels: ["SMS", "Voice"],
    approvedBy: "Dr. Sarah Kimani",
  },
  {
    id: "SA-004",
    county: "Kilifi",
    type: "Flood Warning",
    severity: "critical",
    sentAt: "Yesterday, 11:20 AM",
    recipients: 189000,
    delivered: 184500,
    channels: ["SMS", "Voice", "USSD"],
    approvedBy: "Mary Wanjiku",
  },
  {
    id: "SA-005",
    county: "Nyeri",
    type: "Drought Advisory",
    severity: "medium",
    sentAt: "Feb 1, 3:45 PM",
    recipients: 98000,
    delivered: 96000,
    channels: ["SMS"],
    approvedBy: "John Ochieng",
  },
];

const SentAlerts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sent Alerts</h1>
            <p className="text-muted-foreground">
              History of all alerts sent to citizens
            </p>
          </div>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <Check className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Alerts Today</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">1.2M</p>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                <MessageSquare className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">97.4%</p>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Alert ID</TableHead>
                    <TableHead>County</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead className="text-right">Delivered</TableHead>
                    <TableHead>Channels</TableHead>
                    <TableHead>Approved By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-mono text-sm">{alert.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {alert.county}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{alert.type}</TableCell>
                      <TableCell>
                        <SeverityBadge severity={alert.severity} size="sm" />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {alert.sentAt}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-sm">
                          <span className="font-medium">{(alert.delivered / 1000).toFixed(0)}K</span>
                          <span className="text-muted-foreground">/{(alert.recipients / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="text-xs text-success">
                          {((alert.delivered / alert.recipients) * 100).toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {alert.channels.map((channel) => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {alert.approvedBy}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SentAlerts;
