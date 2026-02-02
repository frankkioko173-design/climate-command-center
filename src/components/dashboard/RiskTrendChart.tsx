import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { date: "Jan 1", riskIndex: 42, alerts: 3 },
  { date: "Jan 8", riskIndex: 48, alerts: 5 },
  { date: "Jan 15", riskIndex: 55, alerts: 7 },
  { date: "Jan 22", riskIndex: 52, alerts: 4 },
  { date: "Jan 29", riskIndex: 68, alerts: 9 },
  { date: "Feb 5", riskIndex: 72, alerts: 12 },
  { date: "Feb 12", riskIndex: 65, alerts: 8 },
  { date: "Feb 19", riskIndex: 78, alerts: 15 },
  { date: "Feb 26", riskIndex: 71, alerts: 11 },
  { date: "Mar 4", riskIndex: 85, alerts: 18 },
  { date: "Mar 11", riskIndex: 79, alerts: 14 },
  { date: "Mar 18", riskIndex: 82, alerts: 16 },
];

export function RiskTrendChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Risk Index Trend</CardTitle>
        <p className="text-sm text-muted-foreground">
          National average risk index over the past 12 weeks
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(210, 100%, 65%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(210, 100%, 65%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 15%, 88%)" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(244, 10%, 45%)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(244, 10%, 45%)", fontSize: 12 }}
                dx={-10}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(240, 15%, 88%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
                }}
                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              />
              <Area
                type="monotone"
                dataKey="riskIndex"
                stroke="hsl(210, 100%, 65%)"
                strokeWidth={2.5}
                fill="url(#riskGradient)"
                name="Risk Index"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
