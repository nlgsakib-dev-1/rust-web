interface PreviewSectionProps {
  content: string | null;
  contentType: string;
}

export function PreviewSection({ content, contentType }: PreviewSectionProps) {
  if (!content) return null;

  if (contentType.startsWith("image/")) {
    return (
      <div className="rounded-xl overflow-hidden bg-foreground/5 animate-fade-in">
        <img
          src={content}
          alt="Preview"
          className="w-full max-h-[500px] object-contain"
        />
      </div>
    );
  }

  if (contentType.startsWith("video/")) {
    return (
      <div className="rounded-xl overflow-hidden bg-foreground/5 animate-fade-in">
        <video src={content} controls className="w-full max-h-[500px]" />
      </div>
    );
  }

  if (contentType.startsWith("audio/")) {
    return (
      <div className="rounded-xl overflow-hidden bg-muted p-6 animate-fade-in">
        <audio src={content} controls className="w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-muted p-6 text-center text-muted-foreground animate-fade-in">
      Preview not available for this content type
    </div>
  );
}
