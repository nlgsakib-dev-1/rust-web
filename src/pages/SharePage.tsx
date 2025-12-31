import { useParams, Link } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";
import { InfoItem } from "@/components/InfoItem";
import { ShareLinkInput } from "@/components/ShareLinkInput";
import { Button } from "@/components/ui/button";
import { PreviewSection } from "@/components/PreviewSection";
import { truncateId } from "@/lib/format";
import { Download, Copy, Code, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Demo data - in production this would come from API
const DEMO_DATA = {
  id: "a1b2c3d4e5f67890abcdef1234567890",
  mimeType: "image/png",
  size: "2.4 MB",
  previewUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
};

export default function SharePage() {
  const { id } = useParams<{ id: string }>();
  const contentId = id || DEMO_DATA.id;
  
  const directLink = `${window.location.origin}/cdn/${contentId}`;
  const embedCode = `<img src="${directLink}" alt="ONVM Content">`;

  const handleCopyDirectLink = () => {
    navigator.clipboard.writeText(directLink);
    toast.success("Direct link copied to clipboard!");
  };

  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard!");
  };

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explorer
        </Link>

        <GlassCard>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              🌐 ONVM Shared Content
            </h1>
            <p className="text-lg text-muted-foreground">
              Decentralized Content Delivery Network
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-muted rounded-xl mb-8">
            <InfoItem label="Content ID" value={truncateId(contentId)} />
            <InfoItem label="Type" value={DEMO_DATA.mimeType} />
            <InfoItem label="Size" value={DEMO_DATA.size} />
          </div>

          <div className="mb-8">
            <PreviewSection
              content={DEMO_DATA.previewUrl}
              contentType={DEMO_DATA.mimeType}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button asChild>
              <a href={directLink} download>
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
            <Button variant="secondary" onClick={handleCopyDirectLink}>
              <Copy className="h-4 w-4" />
              Copy Direct Link
            </Button>
            <Button variant="secondary" onClick={handleCopyEmbedCode}>
              <Code className="h-4 w-4" />
              Copy Embed Code
            </Button>
          </div>

          <div className="bg-muted rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-foreground">Share Links</h3>
            <div className="space-y-3">
              <ShareLinkInput value={directLink} label="Direct link" />
              <ShareLinkInput value={embedCode} label="Embed code" />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
