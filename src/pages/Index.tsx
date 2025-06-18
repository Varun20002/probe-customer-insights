
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Phone, FileText, Shield } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import AuthModal from "@/components/auth/AuthModal";
import CSVUploadModal from "@/components/upload/CSVUploadModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);

  const features = [
    {
      icon: Upload,
      title: "Import Customers",
      description: "Drag-and-drop CSV or add manually"
    },
    {
      icon: Phone,
      title: "AI Calls & Transcribes",
      description: "LiveScript voice agent phones each customer, records consent, and generates transcripts"
    },
    {
      icon: FileText,
      title: "Download Report",
      description: "Individual one-pagers instantly available in the dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-gray-900">
      <Header onScheduleCalls={() => setShowAuthModal(true)} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Block */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-clash font-bold text-white leading-tight">
                Talk to customers before you sign the term sheet.
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Automated telephone interviews for VC due diligence, powered by AI voice agents.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brand-indigo-600 hover:bg-brand-indigo-600/90 text-white px-8 py-3 text-lg"
                onClick={() => setShowAuthModal(true)}
              >
                Schedule Calls
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-indigo-600 text-brand-indigo-600 hover:bg-brand-indigo-600/10 px-8 py-3 text-lg"
                onClick={() => setShowCSVModal(true)}
              >
                Upload CSV
              </Button>
            </div>
          </div>
          
          {/* Right Block - Placeholder for GIF */}
          <div className="animate-slide-up">
            <div className="glass-card p-8 text-center">
              <div className="aspect-video bg-gradient-to-br from-brand-indigo-600/20 to-brand-sky-400/20 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex justify-center space-x-4 text-brand-sky-400">
                    <Upload className="w-8 h-8" />
                    <span className="text-2xl">▶️</span>
                    <Phone className="w-8 h-8" />
                    <span className="text-2xl">▶️</span>
                    <FileText className="w-8 h-8" />
                  </div>
                  <p className="text-gray-400">CSV upload → AI voice calls → PDF reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-brand-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-clash font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300">
              Three simple steps to customer insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-brand-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-brand-indigo-600" />
                </div>
                <h3 className="text-xl font-clash font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Banner */}
      <section className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">GDPR</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">SEC</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <CSVUploadModal open={showCSVModal} onOpenChange={setShowCSVModal} />
    </div>
  );
};

export default Index;
