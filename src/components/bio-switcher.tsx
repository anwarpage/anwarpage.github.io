import { bioCopy } from '@/content/site';

export function BioSwitcher() {
  const paragraphs = bioCopy.en.shortParagraphs;

  return (
    <section aria-label="About" className="mt-6">
      <div className="space-y-4 text-[15.5px] leading-[1.7] text-[var(--text-copy)]">
        {paragraphs.map((text, index) => (
          <p key={index} className="text-pretty">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
