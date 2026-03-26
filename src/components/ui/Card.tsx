interface CardProps {
  children: React.ReactNode;
  accentBorder?: boolean;
  className?: string;
}

export function Card({ children, accentBorder = false, className = "" }: CardProps) {
  return (
    <div
      className={`
        bg-white border border-gray-light rounded-none
        p-6 md:p-7
        transition-all duration-300
        hover:border-gray-dark hover:shadow-card-hover
        ${accentBorder ? "border-l-[3px] border-l-accent-red" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
