import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ShareLinkInputProps {
  value: string;
  label?: string;
}

export function ShareLinkInput({ value, label }: ShareLinkInputProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex gap-2">
      <Input
        readOnly
        value={value}
        className="flex-1 font-mono text-sm bg-card border-2 border-border"
        aria-label={label}
      />
      <Button variant="copy" size="sm" onClick={handleCopy}>
        <Copy className="h-4 w-4" />
        Copy
      </Button>
    </div>
  );
}
