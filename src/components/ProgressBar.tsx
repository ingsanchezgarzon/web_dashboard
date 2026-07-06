export function ProgressBar({
  progress,
  accentHex,
  size = 'sm',
}: {
  progress: number;
  accentHex: string;
  size?: 'sm' | 'md';
}) {
  const height = size === 'sm' ? 'h-1' : 'h-1.5';
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-neutral-100 overflow-hidden`}>
        <div
          className={`${height}`}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%`, backgroundColor: accentHex }}
        />
      </div>
    </div>
  );
}
