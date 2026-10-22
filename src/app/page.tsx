import Link from "next/link";
import { activities, featuredMembers, videos } from "@/lib/content";
import { ActivityCard, VideoCard } from "@/components/media-card";
import { Faq } from "@/components/faq";
import { RulesPreview } from "@/components/rules-preview";
import { Arrow, SectionLabel, SiteFooter, SiteHeader } from "@/components/site-header";
import { MemberCard } from "@/components/member-card";
import { AdoboLogo } from "@/components/adobo-logo";
import { Reveal } from "@/components/reveal";

function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0414 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.176 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.176 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

export default function Home() {
  return <main className="overflow-hidden bg-paper text-forest">
    <section className="relative min-h-[720px] overflow-hidden bg-forest text-paper lg:min-h-[860px]">
      {/* Cinematic hero background video (Where Winds Meet gameplay). Falls back
          to the static poster when playback is unavailable or disabled. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          poster="/images/events/Guild Picture Aura.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hero-video object-cover w-full h-full"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        {/* Static poster shown instead of the video under reduced motion or on mobile. */}
        <div className="hero-poster-bg w-full h-full" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/45 to-forest/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/70 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-5 hidden border border-paper/15 md:block lg:inset-7" aria-hidden="true" />
      <div className="woven-line absolute inset-x-0 bottom-0 h-48 opacity-50" />
      <SiteHeader />
      <div className="relative mx-auto flex max-w-[1440px] flex-col px-6 pb-24 pt-48 lg:px-10 lg:pt-60">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,320px)] lg:gap-16">
          <div className="max-w-4xl min-w-0">
            <div className="hero-enter"><SectionLabel light>A GUILD IN WHERE WINDS MEET</SectionLabel></div>
            <h1 className="hero-enter mt-7 font-display text-[clamp(3.6rem,8.5vw,7.5rem)] leading-[.85] tracking-[-.06em]" style={{ animationDelay: "120ms" }}>Where we put FUN<br /><em className="font-normal text-gold">in FUNtastic.</em></h1>
            <p className="hero-enter mt-8 max-w-md text-lg leading-relaxed text-paper/80" style={{ animationDelay: "240ms" }}>A place for Wanderers who would rather enjoy the journey than chase the finish line.</p>
          </div>
          <div className="hero-enter flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-sm lg:justify-self-end lg:self-center" style={{ animationDelay: "320ms" }}>
            <Link href="https://discord.gg/NdZXkmYJnS" className="pressable group flex w-full items-center justify-center gap-3 bg-gold px-8 py-5 font-mono text-[11px] uppercase tracking-[.14em] text-forest transition-colors hover:bg-paper"><DiscordIcon /><span>Join Our Discord</span></Link>
            <Link href="/members" className="inline-flex w-full items-center justify-center gap-3 border border-paper/35 px-6 py-4 font-mono text-[10px] uppercase tracking-[.14em] text-paper/85 transition-colors hover:border-gold hover:text-gold">Meet the Wanderers</Link>
          </div>
        </div>
        <dl className="hero-enter mt-16 grid max-w-3xl grid-cols-1 gap-4 border-t border-paper/20 pt-6 sm:grid-cols-3 sm:gap-6" style={{ animationDelay: "420ms" }}>
          <div><dt className="sr-only">Roots</dt><dd className="font-mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-paper/65">A Filipino guild,<br />open to all wanderers</dd></div>
          <div><dt className="sr-only">Gatherings</dt><dd className="font-mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-paper/65">Nightly gatherings,<br />Manila time · UTC+8</dd></div>
          <div><dt className="sr-only">Creed</dt><dd className="font-mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-paper/65">Peace-first.<br />Fun-obsessed.</dd></div>
        </dl>
        <p className="absolute bottom-10 right-6 hidden w-48 text-right font-mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-paper/65 lg:block">Where the wind takes us, we make a little room for one more.</p>
      </div>
    </section>
    <section className="border-b border-border"><div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-36"><Reveal className="lg:col-span-7"><SectionLabel>Our pace</SectionLabel><h2 className="mt-6 max-w-3xl font-display text-5xl leading-[.95] tracking-[-.045em] sm:text-7xl">There is more than one way to move through a world.</h2></Reveal><Reveal delay={140} className="lg:col-span-4 lg:col-start-9 lg:self-end"><p className="max-w-md text-lg leading-relaxed text-sage">We gather for the detours: a climb that became a photo walk, a hard fight that became a very funny story, the familiar faces waiting at the end of an ordinary day.</p></Reveal></div></section>
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36"><div className="mb-14 flex items-end justify-between"><Reveal><div><SectionLabel>In good company</SectionLabel><h2 className="mt-4 font-display text-5xl tracking-[-.05em] sm:text-6xl">Ways we wander</h2></div></Reveal><Link href="/activities" className="group hidden items-center gap-3 border-b border-forest pb-2 font-mono text-[10px] uppercase tracking-[.14em] transition-colors hover:text-terracotta md:flex">See what&apos;s ahead <Arrow /></Link></div><div className="grid gap-5 md:grid-cols-12"><div className="md:col-span-7"><ActivityCard activity={activities[0]} large /></div><div className="flex flex-col justify-between border-y border-border py-6 md:col-span-5 md:border-y-0 md:border-l md:pl-10">{activities.slice(1, 4).map((activity, index) => <article key={activity.title} className="border-b border-border py-6 first:pt-0 last:border-0 last:pb-0"><p className="font-mono text-[10px] text-terracotta">0{index + 1}</p><h3 className="mt-1 font-display text-3xl">{activity.title}</h3><p className="mt-2 max-w-sm text-sm leading-relaxed text-sage">{activity.description}</p></article>)}</div></div></section>
    <section className="relative overflow-hidden bg-forest-deep px-6 py-28 text-paper lg:px-10 lg:py-44">
      <div className="absolute inset-0 paper-grain opacity-[.07]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-5 hidden border border-paper/10 md:block lg:inset-7" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal><SectionLabel light>The philosophy</SectionLabel></Reveal>
        <h2 className="mt-8 font-display text-[clamp(3rem,7.5vw,7rem)] leading-[.88] tracking-[-.06em]">
          <Reveal as="span" className="block">Different Wanderers.</Reveal>
          <Reveal as="span" className="block" delay={120}>Different paths.</Reveal>
          <Reveal as="span" className="block" delay={240}><em className="font-normal text-gold">One table.</em></Reveal>
        </h2>
        <Reveal delay={320}><p className="mx-auto mt-8 max-w-lg leading-relaxed text-paper/75">Some arrive for a duel. Some for a view. Some simply because a friend waved them over. There&apos;s a seat for every kind of journey.</p></Reveal>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36"><div className="grid gap-8 lg:grid-cols-12"><Reveal className="lg:col-span-5"><SectionLabel>Familiar faces</SectionLabel><h2 className="mt-4 font-display text-5xl leading-[.9] tracking-[-.05em] sm:text-6xl">A guild is a landscape made of people.</h2></Reveal><Reveal className="lg:col-span-4 lg:col-start-8" delay={120}><p className="max-w-md text-lg leading-relaxed text-sage">Our roster is less a lineup and more a growing collection of stories, side quests, and people who know when to send a good meme.</p></Reveal></div><div className="mt-16 grid gap-5 md:grid-cols-3">{featuredMembers.map((member, index) => <Reveal key={member.name} delay={index * 90}><MemberCard member={member} featured={index === 1} /></Reveal>)}</div><Link href="/members" className="group mt-12 inline-flex items-center gap-4 border-b border-forest pb-3 font-mono text-[10px] uppercase tracking-[.14em] transition-colors hover:text-terracotta">Meet the Wanderers <Arrow /></Link></section>
    <section className="bg-forest px-6 py-24 text-paper lg:px-10 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="mb-12 flex items-end justify-between"><Reveal><div><SectionLabel light>MOMENTS IN MOTION</SectionLabel><h2 className="mt-4 font-display text-5xl tracking-[-.05em] sm:text-6xl">Our journey,<br /><em className="font-normal text-gold">remembered.</em></h2></div></Reveal><Link href="/videos" className="hidden font-mono text-[10px] uppercase tracking-[.14em] text-gold transition-colors hover:text-paper md:block">Watch our journey &rarr;</Link></div><div className="grid gap-8 md:grid-cols-3">{videos.slice(0, 3).map((video, index) => <Reveal key={video.title} delay={index * 90}><VideoCard video={video} /></Reveal>)}</div></div></section>
    <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-36"><Reveal className="lg:col-span-4"><SectionLabel>Ask away</SectionLabel><h2 className="mt-4 font-display text-5xl leading-[.9] tracking-[-.05em] sm:text-6xl">A few things you might be wondering.</h2></Reveal><div className="lg:col-span-7 lg:col-start-6"><Faq /></div></section>
    <RulesPreview />
    <section className="relative overflow-hidden border-t border-border bg-gold px-6 py-24 lg:px-10 lg:py-36">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('/images/events/Myxy-1600.webp')] bg-cover bg-center opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1000px] text-center">
        <Reveal>
          <AdoboLogo size={120} className="mb-8 mx-auto opacity-70" aria-hidden="true" />
          <SectionLabel>There&apos;s room for you</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.9rem,6vw,5.5rem)] leading-[.9] tracking-[-.05em] text-forest">Ready to become a part of our journey?</h2>
          <p className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-forest/80">You don&apos;t have to be the strongest Wanderer. Just come as you are.</p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link href="https://discord.gg/NdZXkmYJnS" className="pressable group inline-flex items-center gap-5 bg-forest px-7 py-5 font-mono text-[10px] uppercase tracking-[.14em] text-paper transition-colors hover:bg-terracotta">Come wander with us <Arrow /></Link>
            <Link href="https://discord.gg/adobowwm" target="_blank" rel="noopener noreferrer" className="border-b border-forest/60 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-forest transition-colors hover:border-forest hover:text-terracotta">OR WRITE DISCORD.GG/ADOBOWWM</Link>
          </div>
          <p className="mt-8 font-mono text-[9px] uppercase tracking-[.16em] text-forest/60">Nightly gatherings · Manila time (UTC+8) · Come as you are</p>
        </Reveal>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
