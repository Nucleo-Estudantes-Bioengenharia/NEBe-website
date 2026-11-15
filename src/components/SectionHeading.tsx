export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold tracking-widest text-accent uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}
