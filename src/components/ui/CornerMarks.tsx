type CornerMode = "dark" | "light" | "ultra-light";

interface CornerMarksProps {
  mode?: CornerMode;
}

export function CornerMarks({ mode = "dark" }: CornerMarksProps) {
  const color =
    mode === "dark"
      ? "border-gray-medium/30"
      : "border-gray-medium/30";

  return (
    <>
      {/* Top-left */}
      <div
        className={`absolute top-6 left-6 w-6 h-6 border-t border-l ${color} max-sm:hidden`}
      />
      {/* Top-right */}
      <div
        className={`absolute top-6 right-6 w-6 h-6 border-t border-r ${color} max-sm:hidden`}
      />
      {/* Bottom-left */}
      <div
        className={`absolute bottom-6 left-6 w-6 h-6 border-b border-l ${color} max-sm:hidden`}
      />
      {/* Bottom-right */}
      <div
        className={`absolute bottom-6 right-6 w-6 h-6 border-b border-r ${color} max-sm:hidden`}
      />
    </>
  );
}
