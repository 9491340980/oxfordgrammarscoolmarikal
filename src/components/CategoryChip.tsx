const TINTS: Record<string, string> = {
  Announcement: "bg-amber-soft text-amber",
  Event: "bg-coral-soft text-coral",
  Achievement: "bg-leaf-soft text-leaf",
  Circular: "bg-ink-100 text-ink",
};

const ICONS: Record<string, string> = {
  Announcement: "📣",
  Event: "🎉",
  Achievement: "🏆",
  Circular: "📄",
};

export default function CategoryChip({ category }: { category: string }) {
  return (
    <span className={`chip ${TINTS[category] ?? "bg-ink-100 text-ink"}`}>
      <span>{ICONS[category] ?? "📌"}</span>
      {category}
    </span>
  );
}
