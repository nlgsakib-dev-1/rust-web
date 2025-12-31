import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";
import { InfoItem } from "@/components/InfoItem";
import { Spinner } from "@/components/Spinner";
import { PreviewSection } from "@/components/PreviewSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatSize, truncateId } from "@/lib/format";
import { toast } from "sonner";
import { Search, Eye, Download, Share2, Link2 } from "lucide-react";

interface BlobInfo {
  id: string;
  size: number;
  chunk_count: number;
  subchunk_count: number;
  mime_type: string;
  detected_mime_type: string;
  available_locally: boolean;
}

// Demo data for showcase
const DEMO_BLOB: BlobInfo = {
  id: "a1b2c3d4e5f67890abcdef1234567890",
  size: 2516582,
  chunk_count: 4,
  subchunk_count: 16,
  mime_type: "image/png",
  detected_mime_type: "image/png",
  available_locally: true,
};

export default function Explorer() {
  const navigate = useNavigate();
  const [blobId, setBlobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [blobInfo, setBlobInfo] = useState<BlobInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchBlobInfo = async () => {
    if (!blobId.trim()) {
      toast.error("Please enter a Blob ID");
      return;
    }

    setLoading(true);
    setBlobInfo(null);
    setPreviewUrl(null);

    // Simulate API call - replace with actual API
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // In production: const response = await fetch(`/api/blob/${blobId}/info`);
      setBlobInfo({ ...DEMO_BLOB, id: blobId });
      toast.success("Blob info loaded successfully");
    } catch (error) {
      toast.error("Error fetching blob info");
    } finally {
      setLoading(false);
    }
  };

  const viewBlob = async () => {
    if (!blobInfo) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Demo preview - in production fetch actual blob
      setPreviewUrl(
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop"
      );
      toast.success("Blob loaded successfully");
    } catch (error) {
      toast.error("Error loading blob");
    } finally {
      setLoading(false);
    }
  };

  const downloadBlob = async () => {
    if (!blobInfo) return;
    toast.success("Download started");
    // In production: trigger actual download
  };

  const shareBlob = () => {
    if (!blobInfo) {
      toast.error("Please fetch blob info first");
      return;
    }
    navigate(`/share/${blobInfo.id}`);
  };

  const copyDirectLink = () => {
    if (!blobInfo) {
      toast.error("Please fetch blob info first");
      return;
    }
    const cdnUrl = `${window.location.origin}/cdn/${blobInfo.id}`;
    navigator.clipboard.writeText(cdnUrl);
    toast.success("CDN link copied to clipboard!");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchBlobInfo();
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <GlassCard>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              🌐 ONVM Blob Gateway
            </h1>
            <p className="text-lg text-muted-foreground">
              Decentralized Content Delivery Network
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <Input
              type="text"
              placeholder="Enter Blob ID (hex)"
              value={blobId}
              onChange={(e) => setBlobId(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-12 text-base border-2 border-border focus:border-primary"
            />
            <Button onClick={fetchBlobInfo} disabled={loading}>
              <Search className="h-4 w-4" />
              Fetch Info
            </Button>
          </div>

          {loading && <Spinner />}

          {blobInfo && !loading && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-muted rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-4">
                  Blob Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between p-3 bg-card rounded-lg">
                    <span className="font-semibold text-muted-foreground">ID</span>
                    <span className="font-mono text-foreground">
                      {truncateId(blobInfo.id)}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded-lg">
                    <span className="font-semibold text-muted-foreground">Size</span>
                    <span className="font-mono text-foreground">
                      {formatSize(blobInfo.size)}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded-lg">
                    <span className="font-semibold text-muted-foreground">Chunks</span>
                    <span className="font-mono text-foreground">
                      {blobInfo.chunk_count}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded-lg">
                    <span className="font-semibold text-muted-foreground">Subchunks</span>
                    <span className="font-mono text-foreground">
                      {blobInfo.subchunk_count}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded-lg">
                    <span className="font-semibold text-muted-foreground">MIME Type</span>
                    <span className="font-mono text-foreground">
                      {blobInfo.mime_type || "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded-lg">
                    <span className="font-semibold text-muted-foreground">Detected</span>
                    <span className="font-mono text-foreground">
                      {blobInfo.detected_mime_type || "Not detected"}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded-lg sm:col-span-2">
                    <span className="font-semibold text-muted-foreground">Local</span>
                    <span className="font-mono text-foreground">
                      {blobInfo.available_locally ? "Yes ✓" : "No"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <Button onClick={viewBlob} className="w-full">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button onClick={downloadBlob} className="w-full">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={shareBlob} variant="secondary" className="w-full">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={copyDirectLink} variant="secondary" className="w-full">
                    <Link2 className="h-4 w-4" />
                    CDN Link
                  </Button>
                </div>
              </div>

              {previewUrl && (
                <PreviewSection
                  content={previewUrl}
                  contentType={blobInfo.mime_type}
                />
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
