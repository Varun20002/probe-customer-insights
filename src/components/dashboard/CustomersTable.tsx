
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const mockCustomers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    status: 'completed' as const,
    scheduledAt: '2024-06-15 14:30',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    status: 'scheduled' as const,
    scheduledAt: '2024-06-18 10:00',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    status: 'imported' as const,
    scheduledAt: null,
  },
];

const getStatusBadge = (status: string) => {
  const variants = {
    imported: { className: "bg-brand-slate-500/20 text-brand-slate-500", text: "Imported" },
    scheduled: { className: "bg-brand-sky-400/20 text-brand-sky-400", text: "Scheduled" },
    completed: { className: "bg-brand-emerald-500/20 text-brand-emerald-500", text: "Completed" },
  };
  
  const variant = variants[status as keyof typeof variants] || variants.imported;
  
  return (
    <Badge className={variant.className}>
      {variant.text}
    </Badge>
  );
};

export function CustomersTable() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-300">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Email</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Phone</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Scheduled At</th>
              <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-800 hover:bg-brand-gray-800/50">
                <td className="py-3 px-4 text-white font-medium">{customer.name}</td>
                <td className="py-3 px-4 text-gray-300">{customer.email}</td>
                <td className="py-3 px-4 text-gray-300">{customer.phone}</td>
                <td className="py-3 px-4">{getStatusBadge(customer.status)}</td>
                <td className="py-3 px-4 text-gray-300">
                  {customer.scheduledAt || '—'}
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" className="text-brand-sky-400 hover:bg-brand-sky-400/10">
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
