
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray-900">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-clash font-bold text-white">404</h1>
          <h2 className="text-2xl font-clash text-gray-300">Page Not Found</h2>
          <p className="text-gray-400">The page you're looking for doesn't exist.</p>
        </div>
        
        <Button 
          onClick={() => navigate("/app")}
          className="bg-brand-indigo-600 hover:bg-brand-indigo-600/90"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
