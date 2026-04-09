import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-card rounded-3xl shadow-2xl p-10 border border-border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground">
            {isRegister ? "Join the federated network" : "Sign in to your dashboard"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
              <Label className="text-sm font-medium mb-1.5 block">Organization Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Hospital A" className="pl-10 h-12 rounded-xl" />
              </div>
            </motion.div>
          )}

          <div>
            <Label className="text-sm font-medium mb-1.5 block">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="admin@hospital.org" className="pl-10 h-12 rounded-xl" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1.5 block">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl gradient-bg text-primary-foreground text-base font-semibold hover:opacity-90 transition-opacity">
            {isRegister ? "Register" : "Sign In"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isRegister ? "Already have an account? Sign in" : "Don't have an account? Register"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
