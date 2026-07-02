type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  headingLevel?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  headingLevel = "h2",
}: SectionHeaderProps) {
  const TitleTag = headingLevel;

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
      <TitleTag className="mt-3 max-w-full break-words text-lg font-semibold text-ink-navy [overflow-wrap:anywhere] sm:text-4xl">
        {title}
      </TitleTag>
      {body ? (
        <p className="mt-4 break-words text-base leading-7 text-graphite sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}
