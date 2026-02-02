import { DashboardLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

const UsersRoles = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Users & Roles</h1>
          <p className="text-muted-foreground">
            Manage team members and access permissions
          </p>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Construction className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Coming Soon</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              User and role management features are currently under development.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersRoles;
