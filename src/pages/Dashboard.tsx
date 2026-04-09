import { motion } from "framer-motion";
import { Users, RotateCcw, Target, TrendingUp, Upload, Cpu, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_CLIENTS, MOCK_ROUNDS, MOCK_ACTIVITIES } from "@/lib/federated-store";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const stats = [
  { label: "Total Clients", value: MOCK_CLIENTS.length, icon: Users, color: "from-blue-500 to-blue-600" },
  { label: "Training Rounds", value: MOCK_ROUNDS.length, icon: RotateCcw, color: "from-purple-500 to-purple-600" },
  { label: "Global Accuracy", value: `${(MOCK_ROUNDS[MOCK_ROUNDS.length - 1].globalAccuracy * 100).toFixed(1)}%`, icon: Target, color: "from-emerald-500 to-emerald-600" },
  { label: "Improvement", value: "+22.2%", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
];

const activityIcons = { upload: Upload, train: Cpu, aggregate: Shield, register: Users };

const chartData = MOCK_ROUNDS.map(r => ({
  round: `Round ${r.round}`,
  accuracy: +(r.globalAccuracy * 100).toFixed(1),
  clients: r.participatingClients,
}));

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your federated learning network</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground font-medium">{s.label}</span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                      <s.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Accuracy Over Rounds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(240, 80%, 62%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(240, 80%, 62%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
                    <XAxis dataKey="round" tick={{ fontSize: 12 }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid hsl(220, 15%, 90%)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area type="monotone" dataKey="accuracy" stroke="hsl(240, 80%, 62%)" fill="url(#accGrad)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_ACTIVITIES.map((a) => {
                const Icon = activityIcons[a.type];
                return (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">{a.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
