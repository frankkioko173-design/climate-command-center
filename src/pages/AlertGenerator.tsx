import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { SeverityBadge } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CloudRain,
  MapPin,
  MessageSquare,
  Languages,
  Users,
  Radio,
  Send,
  X,
  Edit3,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AlertGenerator = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState("english");
  const [audience, setAudience] = useState("county");
  const [channels, setChannels] = useState<string[]>(["sms"]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");

  const aiGeneratedMessage = {
    english: `⚠️ FLOOD WARNING - KISUMU COUNTY

Heavy rainfall has been detected in the Lake Victoria basin. Water levels are rising rapidly.

IMMEDIATE ACTIONS:
• Move to higher ground immediately
• Avoid rivers, streams, and low-lying areas
• Do not attempt to cross flooded roads
• Prepare emergency supplies

Stay tuned for updates. For emergencies, call 999.

- Kenya Meteorological Department`,
    kiswahili: `⚠️ ONYO LA MAFURIKO - KAUNTI YA KISUMU

Mvua kubwa imegunduliwa katika bonde la Ziwa Victoria. Viwango vya maji vinapanda kwa haraka.

HATUA ZA HARAKA:
• Nenda eneo la juu mara moja
• Epuka mito na maeneo ya chini
• Usijaribu kuvuka barabara zilizofurika
• Andaa vifaa vya dharura

Endelea kusikiliza kwa habari zaidi. Kwa dharura, piga 999.

- Idara ya Hali ya Hewa Kenya`,
  };

  const currentMessage = aiGeneratedMessage[language as keyof typeof aiGeneratedMessage];

  const handleChannelToggle = (channel: string) => {
    setChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const handleApprove = () => {
    toast({
      title: "Alert Approved & Sent",
      description: "The alert has been sent to 145,000 recipients in Kisumu County.",
    });
  };

  const handleReject = () => {
    toast({
      title: "Alert Rejected",
      description: "The alert has been rejected and moved to archive.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Alert Generator</h1>
          <p className="text-muted-foreground">
            Review, edit, and approve AI-generated alerts before sending
          </p>
        </div>

        {/* Alert Context Card */}
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <CloudRain className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Flood Risk Signal</p>
                  <p className="text-sm text-muted-foreground">RS-001 • 94% confidence</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Kisumu County</span>
              </div>
              <SeverityBadge severity="critical" pulse />
              <span className="text-sm text-muted-foreground ml-auto">
                Detected 5 minutes ago
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* AI Generated Message */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-lg font-semibold">AI-Generated Alert</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                  Regenerate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {currentMessage}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{currentMessage.length} characters</span>
                <span className="mx-2">•</span>
                <span>Estimated {Math.ceil(currentMessage.length / 160)} SMS segments</span>
              </div>
            </CardContent>
          </Card>

          {/* Editable Message */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg font-semibold">Edit Message</CardTitle>
                </div>
                <Button
                  variant={isEditing ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (!isEditing) {
                      setEditedMessage(currentMessage);
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? "Cancel Edit" : "Enable Editing"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={isEditing ? editedMessage : currentMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                disabled={!isEditing}
                className={cn(
                  "min-h-[240px] font-mono text-sm resize-none",
                  !isEditing && "bg-muted/30 cursor-not-allowed"
                )}
              />
              {isEditing && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>{editedMessage.length} characters</span>
                  <span className="mx-2">•</span>
                  <span className={editedMessage.length > 480 ? "text-destructive" : ""}>
                    {Math.ceil(editedMessage.length / 160)} SMS segments
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Configuration Options */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Language */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base font-medium">Language</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="kiswahili">Kiswahili</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Audience */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base font-medium">Audience</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="county">County (Kisumu)</SelectItem>
                  <SelectItem value="region">Western Region</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Est. 145,000 recipients
              </p>
            </CardContent>
          </Card>

          {/* Channels */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base font-medium">Channels</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: "sms", label: "SMS" },
                  { id: "voice", label: "Voice Call" },
                  { id: "ussd", label: "USSD Push" },
                ].map((channel) => (
                  <div key={channel.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={channel.id}
                      checked={channels.includes(channel.id)}
                      onCheckedChange={() => handleChannelToggle(channel.id)}
                    />
                    <Label htmlFor={channel.id} className="text-sm font-normal cursor-pointer">
                      {channel.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                This alert will be sent to <strong className="text-foreground">145,000 recipients</strong> via{" "}
                <strong className="text-foreground">{channels.join(", ").toUpperCase()}</strong>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleReject}>
                  <X className="h-4 w-4 mr-1.5" />
                  Reject
                </Button>
                <Button variant="outline">
                  <Edit3 className="h-4 w-4 mr-1.5" />
                  Save Draft
                </Button>
                <Button className="btn-action" onClick={handleApprove}>
                  <Send className="h-4 w-4 mr-1.5" />
                  Approve & Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlertGenerator;
