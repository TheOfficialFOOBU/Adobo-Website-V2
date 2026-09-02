import { SectionLabel } from "@/components/site-header";

export function PageIntro({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return <section className="bg-forest px-6 pb-20 pt-40 text-paper lg:px-10 lg:pb-28 lg:pt-52"><div className="mx-auto max-w-[1440px]"><SectionLabel light>{label}</SectionLabel><h1 className="mt-6 max-w-5xl font-display text-[clamp(4rem,9vw,8rem)] leading-[.84] tracking-[-.07em]">{title}</h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">{children}</p></div></section>;
}
