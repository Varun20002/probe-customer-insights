
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Phone } from "lucide-react";
import { CustomersTable } from "@/components/dashboard/CustomersTable";
import CSVUploadModal from "@/components/upload/CSVUploadModal";
import AddCustomerModal from "@/components/dashboard/AddCustomerModal";
import { toast } from "@/hooks/use-toast";

const CustomersView = () => {
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleScheduleCalls = () => {
    toast({
      title: "Calls Scheduled",
      description: "Voice agent calls have been scheduled for selected customers",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-clash font-bold text-white">Customers</h1>
          <p className="text-gray-400 mt-1">Manage your customer interview pipeline</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => setShowCSVModal(true)}
            className="border-gray-600 text-gray-300 hover:bg-brand-gray-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowAddModal(true)}
            className="border-gray-600 text-gray-300 hover:bg-brand-gray-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
          
          <Button
            onClick={handleScheduleCalls}
            className="bg-brand-indigo-600 hover:bg-brand-indigo-600/90 text-white"
          >
            <Phone className="w-4 h-4 mr-2" />
            Schedule Calls
          </Button>
        </div>
      </div>

      <div className="glass-card p-6">
        <CustomersTable />
      </div>

      <CSVUploadModal open={showCSVModal} onOpenChange={setShowCSVModal} />
      <AddCustomerModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
};

export default CustomersView;
