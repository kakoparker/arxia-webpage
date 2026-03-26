interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[1px] px-2 py-[3px] bg-gray-lightest border border-gray-light text-gray-dark rounded-none">
      {children}
    </span>
  );
}
