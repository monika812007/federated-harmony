import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Zap, Download, CheckCircle2, Clock, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_CLIENTS, MOCK_ROUNDS, fedAvg } from "@/lib/federated-store";
import { toast } from "sonner";

const statusConfig = {
  done: { label: "Trained", icon: CheckCircle2, variant: "default" as const },
  training: { label: "Training", icon: Clock, variant: "secondary" as const },
  idle: { label: "Idle", icon: Minus, variant: "outline" as const },
};

export default function Admin() {
  const [aggregated, setAggregated] = useState(false);

  const handleAggregate = () => {
    const weights = fedAvg(MOCK_CLIENTS);
    setAggregated(true);
    toast.success("Aggregation Complete!", {
      description: `Global weights: [${weights.map(w => w.toFixed(3)).join(", ")}]`,
    });
  };

  const lastRound = MOCK_ROUNDS[MOCK_ROUNDS.length - 1];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Panel</h1>
            <p className="text-muted-foreground">Manage clients and global model aggregation</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAggregate} className="gradient-bg text-primary-foreground rounded-xl hover:opacity-90">
              <Zap className="w-4 h-4 mr-2" /> Trigger Aggregation
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" /> Export Model
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid sm:grid-cols-3 gap-5">
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Global Accuracy</p>
              <p className="text-3xl font-bold">{(lastRound.globalAccuracy * 100).toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
              <p className="text-3xl font-bold">{MOCK_CLIENTS.filter(c => c.status === "done").length} / {MOCK_CLIENTS.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Data Points</p>
              <p className="text-3xl font-bold">{MOCK_CLIENTS.reduce((s, c) => s + c.dataRows, 0).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" /> Registered Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Organization</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Data Rows</th>
                    <th className="px-4 py-3 text-left font-semibold">Local Accuracy</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 py-3 text-left font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CLIENTS.map((client, i) => {
                    const cfg = statusConfig[client.status];
                    return (
                      <motion.tr
                        key={client.id}
                        className="border-t border-border hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <td className="px-4 py-3 font-medium">{client.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{client.email}</td>
                        <td className="px-4 py-3">{client.dataRows.toLocaleString()}</td>
                        <td className="px-4 py-3">{(client.localAccuracy * 100).toFixed(1)}%</td>
                        <td className="px-4 py-3">
                          <Badge variant={cfg.variant} className="rounded-lg">
                            <cfg.icon className="w-3 h-3 mr-1" /> {cfg.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{client.joinedAt}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
