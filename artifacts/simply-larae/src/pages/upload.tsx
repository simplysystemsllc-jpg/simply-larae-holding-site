import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload as UploadIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIntakeData, getServiceId, getSessionId, clearIntakeSession } from "@/lib/session";
import { useCreateSubmission } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const createSubmission = useCreateSubmission();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
    maxFiles: 1,
    maxSize: 5242880 // 5MB
  });

  const handleSubmit = async () => {
    if (!file) return;
    
    const intakeData = getIntakeData();
    const serviceId = getServiceId();
    
    if (!intakeData || !serviceId) {
      toast({ title: "Missing Data", description: "Please complete the questionnaire first.", variant: "destructive" });
      setLocation('/services');
      return;
    }

    setUploading(true);
    
    // Simulate photo upload delay
    setTimeout(() => {
      // Create final submission payload
      createSubmission.mutate({
        data: {
          serviceId: serviceId,
          intakeData: intakeData,
          sessionId: getSessionId(),
          selfieUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" // mock url
        }
      }, {
        onSuccess: (data) => {
          clearIntakeSession();
          setLocation(`/results/${data.id}`);
        },
        onError: () => {
          setUploading(false);
          toast({ title: "Error", description: "Failed to submit profile. Please try again.", variant: "destructive" });
        }
      });
    }, 2000);
  };

  return (
    <div className="w-full min-h-[90vh] bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-thin tracking-[0.15em] uppercase text-foreground mb-4">Final Step: The Canvas</h1>
          <p className="text-muted-foreground font-light leading-relaxed max-w-lg mx-auto">
            Upload a clear, well-lit selfie without makeup. This allows our concierge to accurately determine your undertones and facial structure.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 p-8 md:p-12 border border-border/50">
          
          <div className="mb-8 p-6 bg-secondary/20 rounded-2xl border border-secondary text-sm text-foreground/80 font-light flex items-start space-x-4">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium tracking-wide uppercase text-xs mb-2">Photo Guidelines</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Face a window with natural daylight</li>
                <li>Ensure face and neck are visible</li>
                <li>No makeup, filters, or harsh overhead lighting</li>
              </ul>
            </div>
          </div>

          {!previewUrl ? (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[300px]
                ${isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50 hover:bg-background/50'}`}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6">
                <UploadIcon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-lg font-light tracking-wide text-foreground mb-2">Drag & drop your selfie here</p>
              <p className="text-sm text-muted-foreground font-light">or click to browse from your device</p>
              <p className="text-xs text-muted-foreground/60 mt-4 uppercase tracking-widest">JPEG or PNG, max 5MB</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm mx-auto shadow-lg border border-border">
                <img src={previewUrl} alt="Selfie preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); setFile(null); setPreviewUrl(null); }}
                    disabled={uploading}
                    className="bg-white/90 hover:bg-white text-foreground rounded-full text-xs uppercase tracking-widest"
                  >
                    Replace Photo
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit} 
                disabled={uploading}
                className="w-full rounded-full h-14 uppercase tracking-widest text-sm bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all"
              >
                {uploading ? (
                  <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Processing Analysis...</>
                ) : (
                  <><CheckCircle2 className="w-5 h-5 mr-3" /> Submit Profile</>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
