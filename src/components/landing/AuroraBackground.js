export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      data-testid="aurora-background"
    >
      {/* Warm cream base */}
      <div className="absolute inset-0" style={{ backgroundColor: '#FAF9F5' }} />

      {/* Soft static top wash so the fold always feels lit */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            'linear-gradient(180deg, rgba(232, 245, 233, 0.55) 0%, rgba(250, 249, 245, 0) 100%)',
        }}
      />

      {/* Drifting aurora blobs (green + saffron) */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />

      {/* Floating ambient orbs (desktop only) */}
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />

      {/* Grain overlay */}
      <div className="aurora-grain" />
    </div>
  );
}
