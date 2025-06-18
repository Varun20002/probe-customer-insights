
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const SettingsView = () => {
  const [isDark, setIsDark] = useState(true);
  const [emails, setEmails] = useState(['analyst@company.com']);
  const [newEmail, setNewEmail] = useState('');
  const [credentials, setCredentials] = useState({
    voiceAgentUrl: '',
    voiceAgentToken: '',
    slackWebhook: ''
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addEmail = () => {
    if (newEmail && !emails.includes(newEmail)) {
      setEmails([...emails, newEmail]);
      setNewEmail('');
      toast({
        title: "Email added",
        description: "Notification email has been added",
      });
    }
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
    toast({
      title: "Email removed",
      description: "Notification email has been removed",
    });
  };

  const saveCredentials = () => {
    toast({
      title: "Settings saved",
      description: "Your credentials have been updated",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-clash font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configure your DealProbe AI workspace</p>
      </div>

      {/* Dark Mode Toggle */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-xl font-clash font-semibold text-white">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Dark Mode</Label>
            <p className="text-sm text-gray-400">Toggle between light and dark themes</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="border-gray-600 text-gray-300"
          >
            {isDark ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </div>
      </div>

      {/* Notification Emails */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-xl font-clash font-semibold text-white">Notification Emails</h2>
        <p className="text-gray-400">Analysts who receive call completion alerts</p>
        
        <div className="space-y-3">
          {emails.map((email) => (
            <div key={email} className="flex items-center justify-between bg-brand-gray-900 rounded-lg p-3">
              <span className="text-white">{email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEmail(email)}
                className="text-brand-rose-500 hover:bg-brand-rose-500/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="analyst@company.com"
              className="bg-brand-gray-900 border-gray-600"
              onKeyPress={(e) => e.key === 'Enter' && addEmail()}
            />
            <Button 
              onClick={addEmail}
              disabled={!newEmail}
              className="bg-brand-indigo-600 hover:bg-brand-indigo-600/90"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* API Credentials */}
      <div className="glass-card p-6 space-y-6">
        <div>
          <h2 className="text-xl font-clash font-semibold text-white">API Credentials</h2>
          <p className="text-gray-400">Configure external service connections</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="voice-url">Voice Agent API URL</Label>
            <Input
              id="voice-url"
              value={credentials.voiceAgentUrl}
              onChange={(e) => setCredentials({...credentials, voiceAgentUrl: e.target.value})}
              placeholder="https://api.voiceagent.com"
              className="bg-brand-gray-900 border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="voice-token">Voice Agent API Token</Label>
            <Input
              id="voice-token"
              type="password"
              value={credentials.voiceAgentToken}
              onChange={(e) => setCredentials({...credentials, voiceAgentToken: e.target.value})}
              placeholder="••••••••••••••••"
              className="bg-brand-gray-900 border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input
              id="slack-webhook"
              type="password"
              value={credentials.slackWebhook}
              onChange={(e) => setCredentials({...credentials, slackWebhook: e.target.value})}
              placeholder="••••••••••••••••"
              className="bg-brand-gray-900 border-gray-600"
            />
          </div>
        </div>
        
        <Button 
          onClick={saveCredentials}
          className="bg-brand-indigo-600 hover:bg-brand-indigo-600/90"
        >
          Save Credentials
        </Button>
      </div>
    </div>
  );
};

export default SettingsView;
