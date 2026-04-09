import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Network, BarChart3, Lock, Cpu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, title: "Privacy Preserving", desc: "Raw data never leaves client devices" },
  { icon: Network, title: "Federated Averaging", desc: "Aggregate model weights securely" },
  { icon: BarChart3, title: "Real-time Metrics", desc: "Track accuracy across training rounds" },
  { icon: Lock, title: "Secure Communication", desc: "Encrypted weight transmission" },
  { icon: Cpu, title: "Local Training", desc: "Train on-device with scikit-learn" },
  { icon: Users, title: "Multi-Client", desc: "Collaborate across organizations" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-foreground"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                top: `${10 + i * 12}%`,
                left: `${60 + i * 5}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Federated Machine Learning Platform
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-primary-foreground/80 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Collaboratively train ML models across multiple organizations without ever sharing raw data. Privacy-preserving, secure, and efficient.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 rounded-xl font-semibold shadow-lg"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-xl"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform enables secure collaborative model training using Federated Averaging (FedAvg)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-5">
                  <f.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-bg py-12">
        <div className="container mx-auto px-6 text-center text-primary-foreground/70">
          <p className="text-lg font-medium text-primary-foreground mb-2">FMLaaS Platform</p>
          <p>© 2024 Federated ML. Built for privacy-preserving machine learning.</p>
        </div>
      </footer>
    </div>
  );
}
