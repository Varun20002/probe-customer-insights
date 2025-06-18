
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface CSVUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CSVUploadModal = ({ open, onOpenChange }: CSVUploadModalProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleFileUpload(csvFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
    }
  }, []);

  const handleFileUpload = (file: File) => {
    setUploadStatus('uploading');
    
    // Simulate file upload
    setTimeout(() => {
      setUploadStatus('success');
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed`,
      });
      
      setTimeout(() => {
        onOpenChange(false);
        setUploadStatus('idle');
      }, 2000);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-clash text-center">
            Upload Customer CSV
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-400 text-center">
            Upload a CSV file with columns: name, email, phone
          </div>

          {uploadStatus === 'success' ? (
            <div className="flex flex-col items-center space-y-4 py-8">
              <CheckCircle className="w-16 h-16 text-brand-emerald-500" />
              <div className="text-center">
                <h3 className="font-semibold text-lg">Upload Complete!</h3>
                <p className="text-gray-400">Your customers have been imported</p>
              </div>
            </div>
          ) : (
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
                ${isDragOver ? 'border-brand-indigo-600 bg-brand-indigo-600/10' : 'border-gray-600'}
                ${uploadStatus === 'uploading' ? 'opacity-50' : 'hover:border-brand-indigo-600 hover:bg-brand-indigo-600/5'}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadStatus === 'uploading' ? (
                <div className="space-y-4">
                  <div className="animate-spin mx-auto w-8 h-8 border-2 border-brand-indigo-600 border-t-transparent rounded-full"></div>
                  <p>Processing your file...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Drop your CSV file here</p>
                    <p className="text-gray-400 text-sm">or click to browse</p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="csv-upload"
                  />
                  <Button 
                    variant="outline" 
                    className="border-brand-indigo-600 text-brand-indigo-600 hover:bg-brand-indigo-600/10"
                    onClick={() => document.getElementById('csv-upload')?.click()}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CSVUploadModal;
