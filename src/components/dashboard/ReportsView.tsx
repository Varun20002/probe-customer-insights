
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockReports = [
  {
    id: '1',
    customerName: 'John Smith',
    callDate: '2024-06-15',
    sentiment: 'Positive' as const,
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    callDate: '2024-06-14',
    sentiment: 'Neutral' as const,
  },
  {
    id: '3',
    customerName: 'Mike Chen',
    callDate: '2024-06-13',
    sentiment: 'Concern' as const,
  },
];

const getSentimentBadge = (sentiment: string) => {
  const variants = {
    Positive: { className: "bg-brand-emerald-500/20 text-brand-emerald-500", text: "Positive" },
    Neutral: { className: "bg-brand-slate-500/20 text-brand-slate-500", text: "Neutral" },
    Concern: { className: "bg-brand-rose-500/20 text-brand-rose-500", text: "Concern" },
  };
  
  const variant = variants[sentiment as keyof typeof variants] || variants.Neutral;
  
  return (
    <Badge className={variant.className}>
      {variant.text}
    </Badge>
  );
};

const ReportsView = () => {
  const handleDownload = (customerName: string) => {
    toast({
      title: "Download started",
      description: `Downloading report for ${customerName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-clash font-bold text-white">Reports</h1>
        <p className="text-gray-400 mt-1">Download and view customer interview summaries</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockReports.map((report) => (
          <div key={report.id} className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white text-lg">{report.customerName}</h3>
                <p className="text-gray-400 text-sm">Called on {report.callDate}</p>
              </div>
              {getSentimentBadge(report.sentiment)}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-gray-600 text-gray-300 hover:bg-brand-gray-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-brand-indigo-600 hover:bg-brand-indigo-600/90"
                onClick={() => handleDownload(report.customerName)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsView;
