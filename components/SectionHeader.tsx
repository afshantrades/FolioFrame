type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto min-w-0 max-w-3xl text-center"
          : "min-w-0 max-w-3xl text-left"
      }
    >
      {eyebrow ? (
        <p className="text-sm font-semibold text-graphite">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 max-w-full break-words text-lg font-semibold text-ink-navy [overflow-wrap:anywhere] sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 break-words text-base leading-7 text-graphite sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}
