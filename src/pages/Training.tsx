import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, CheckCircle2, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const TOTAL_ROUNDS = 5;
const STEPS = ["Distributing Model", "Local Training", "Collecting Weights", "Aggregating (FedAvg)", "Updating Global Model"];

export default function Training() {
  const [training, setTraining] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [accuracies, setAccuracies] = useState<number[]>([]);

  const startTraining = useCallback(() => {
    setTraining(true);
    setCompleted(false);
    setCurrentRound(1);
    setCurrentStep(0);
    setProgress(0);
    setAccuracies([]);
  }, []);

  useEffect(() => {
    if (!training) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < STEPS.length - 1) {
          setProgress(((prev + 1) / STEPS.length) * 100);
          return prev + 1;
        }
        // Round complete
        setAccuracies(acc => {
          const base = 72 + currentRound * 3.2 + Math.random() * 2;
          return [...acc, +base.toFixed(1)];
        });

        if (currentRound >= TOTAL_ROUNDS) {
          setTraining(false);
          setCompleted(true);
          setProgress(100);
          toast.success("Training Complete!", { description: "Global model has been updated." });
          return prev;
        }

        setCurrentRound(r => r + 1);
        setProgress(0);
        return 0;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [training, currentRound]);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold mb-1">Training</h1>
          <p className="text-muted-foreground">Start federated training across all connected clients</p>
        </div>

        {/* Controls */}
        <Card className="border-border">
          <CardContent className="p-8 text-center">
            {!training && !completed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Train</h3>
                <p className="text-muted-foreground mb-6">{TOTAL_ROUNDS} rounds • 5 clients • Logistic Regression</p>
                <Button onClick={startTraining} className="gradient-bg text-primary-foreground rounded-xl px-8 h-12 text-base hover:opacity-90">
                  Start Training
                </Button>
              </motion.div>
            )}

            {training && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-lg font-semibold">
                    Round {currentRound} / {TOTAL_ROUNDS}
                  </span>
                </div>
                <Progress value={progress} className="h-3 rounded-full" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-muted-foreground"
                  >
                    {STEPS[currentStep]}...
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {completed && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Training Complete!</h3>
                <p className="text-muted-foreground mb-6">
                  Final global accuracy: <span className="font-bold text-foreground">{accuracies[accuracies.length - 1]}%</span>
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={startTraining} variant="outline" className="rounded-xl">
                    <RotateCcw className="w-4 h-4 mr-2" /> Retrain
                  </Button>
                  <Button className="gradient-bg text-primary-foreground rounded-xl hover:opacity-90">
                    Download Model
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Round results */}
        {accuracies.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Round Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accuracies.map((acc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <span className="font-medium">Round {i + 1}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-bg transition-all duration-500"
                          style={{ width: `${acc}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-14 text-right">{acc}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
