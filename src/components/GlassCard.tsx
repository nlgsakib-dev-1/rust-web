import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl shadow-card p-8 md:p-10 animate-fade-in",
        className
      )}
    >
      {children}
    </div>
  );
}
