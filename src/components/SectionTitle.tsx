type SectionTitleProps = {
  id?: string;
  lines: string[];
  accentLines: number[];
};

export function SectionTitle({ id, lines, accentLines }: SectionTitleProps) {
  let position = 0;
  return (
    <h2 id={id}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, index) => {
          const Line = accentLines.includes(index) ? "em" : "span";
          return (
            <Line className="title-line" key={line}>
              {Array.from(line, (letter, offset) => (
                <span className="title-letter" key={offset} style={{ animationDelay: `${position++ * 24}ms` }}>{letter}</span>
              ))}
            </Line>
          );
        })}
      </span>
    </h2>
  );
}
