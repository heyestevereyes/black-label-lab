import { portfolio } from "@/content/portfolio";
import { CONTAINER, Eyebrow, SectionTitle } from "@/components/promo/ui";

/* Skills: un grupo por fila, con su etiqueta y las herramientas en pills. */
export default function Skills() {
  const s = portfolio.skills;
  return (
    <section id="skills" className={`${CONTAINER} scroll-mt-16 pb-16 md:pb-24`}>
      <div data-reveal>
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <SectionTitle text={s.title} />
      </div>
      <div data-reveal className="mt-10 rounded-[28px] bg-white px-6 md:px-8">
        {s.groups.map((group, i) => (
          <div
            key={group.label}
            className={`grid gap-4 py-6 md:grid-cols-[200px_minmax(0,1fr)] md:items-center md:gap-8 md:py-8 ${
              i ? "border-t border-[#141414]/10" : ""
            }`}
          >
            <h3 className="m-0 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-muted">{group.label}</h3>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li key={item} className="rounded-full bg-[#eeefef] px-4 py-2 text-[15px] font-medium leading-tight text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
