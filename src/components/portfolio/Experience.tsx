import { portfolio } from "@/content/portfolio";
import { CONTAINER, Eyebrow, SectionTitle } from "@/components/promo/ui";

/*
  Experiencia: línea de tiempo vertical. En escritorio el título queda
  fijo a la izquierda (como las preguntas frecuentes de la landing) y la
  línea a la derecha; en móvil, uno debajo del otro.
*/
export default function Experience() {
  const e = portfolio.experience;
  return (
    <section id="experience" className={`${CONTAINER} scroll-mt-16 pb-16 md:pb-24`}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div data-reveal className="lg:sticky lg:top-[104px] lg:self-start">
          <Eyebrow>{e.eyebrow}</Eyebrow>
          <SectionTitle text={e.title} />
        </div>
        <ol className="m-0 list-none p-0">
          {e.items.map((item, i) => {
            const last = i === e.items.length - 1;
            return (
              <li
                key={item.company}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className={`relative pl-9 md:pl-11 ${last ? "" : "pb-4"}`}
              >
                {/* Línea entre puntos y punto de cada puesto. */}
                {!last && <span aria-hidden className="absolute -bottom-7 left-[7px] top-8 w-[2px] rounded-full bg-[#141414]/10" />}
                <span
                  aria-hidden
                  className="absolute left-0 top-7 h-4 w-4 rounded-full border-[3px] border-[#eeefef] bg-[#2e6aff] ring-2 ring-[#2e6aff]/25"
                />
                <article className="rounded-[24px] bg-white p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <h3 className="m-0 font-satoshi text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">{item.company}</h3>
                    <p className="m-0 rounded-full bg-[#eeefef] px-3 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                      {item.period}
                    </p>
                  </div>
                  <p className="m-0 mt-2 text-[17px] font-medium leading-snug text-ink">{item.role}</p>
                  <p className="m-0 mt-3 text-[16px] leading-[1.5] text-muted">{item.text}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
