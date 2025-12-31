interface InfoItemProps {
  label: string;
  value: string;
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <span className="font-mono text-foreground break-all">{value}</span>
    </div>
  );
}
