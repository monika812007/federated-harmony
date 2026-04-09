import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, CheckCircle2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const SAMPLE_DATA = [
  { age: 45, bp: 120, cholesterol: 220, glucose: 95, target: 0 },
  { age: 62, bp: 145, cholesterol: 280, glucose: 130, target: 1 },
  { age: 38, bp: 110, cholesterol: 190, glucose: 88, target: 0 },
  { age: 55, bp: 138, cholesterol: 260, glucose: 115, target: 1 },
  { age: 50, bp: 125, cholesterol: 240, glucose: 102, target: 0 },
];

export default function UploadData() {
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUpload = useCallback(() => {
    setUploaded(true);
    toast.success("Dataset uploaded successfully!", { description: "5 rows loaded for training." });
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-1">Upload Data</h1>
          <p className="text-muted-foreground">Upload your local dataset for federated training</p>
        </div>

        {/* Drop zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card
            className={`border-2 border-dashed transition-colors cursor-pointer ${
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleUpload(); }}
            onClick={handleUpload}
          >
            <CardContent className="py-16 flex flex-col items-center text-center">
              {uploaded ? (
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
              ) : (
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary-foreground" />
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">
                {uploaded ? "Dataset Uploaded!" : "Drag & Drop CSV File"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {uploaded ? "Your data is ready for local training" : "Or click to browse files"}
              </p>
              {!uploaded && (
                <Button variant="outline" className="rounded-xl">
                  <FileSpreadsheet className="w-4 h-4 mr-2" /> Select CSV
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Preview */}
        {uploaded && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Dataset Preview</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setUploaded(false)}>
                  <X className="w-4 h-4 mr-1" /> Clear
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        {Object.keys(SAMPLE_DATA[0]).map(k => (
                          <th key={k} className="px-4 py-3 text-left font-semibold capitalize">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_DATA.map((row, i) => (
                        <tr key={i} className="border-t border-border hover:bg-muted/50 transition-colors">
                          {Object.values(row).map((v, j) => (
                            <td key={j} className="px-4 py-3">{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-3">Showing 5 of 5 rows • 5 features</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
