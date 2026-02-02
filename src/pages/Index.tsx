import {
  AlertTriangle,
  Clock,
  Send,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import {
  MetricCard,
  RiskTrendChart,
  RiskHeatMap,
  RecentDetections,
} from "@/components/dashboard";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Real-time climate risk intelligence across all monitored regions
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Risk Signals"
            value={24}
            change={{ value: 12, trend: "up" }}
            icon={AlertTriangle}
            iconColor="text-destructive"
            iconBgColor="bg-destructive/10"
          />
          <MetricCard
            title="Pending Approvals"
            value={5}
            change={{ value: 3, trend: "down" }}
            icon={Clock}
            iconColor="text-warning"
            iconBgColor="bg-warning/20"
          />
          <MetricCard
            title="Alerts Sent Today"
            value={18}
            change={{ value: 25, trend: "up" }}
            icon={Send}
            iconColor="text-success"
            iconBgColor="bg-success/10"
          />
          <MetricCard
            title="High-Risk Counties"
            value={7}
            change={{ value: 2, trend: "up" }}
            icon={MapPin}
            iconColor="text-secondary"
            iconBgColor="bg-secondary/10"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RiskTrendChart />
          <RiskHeatMap />
        </div>

        {/* Recent Detections */}
        <RecentDetections />
      </div>
    </DashboardLayout>
  );
};

export default Index;
