import type { Metadata } from "next";
import { honoraryMembers, members } from "@/lib/members";
import { HonoraryMembers } from "@/components/honorary-members";
import { MemberDirectory } from "@/components/member-directory";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Members", description: "Meet the Wanderers of Adobo Guild." };

export default function MembersPage() {
  return <main className="bg-paper text-forest"><div className="relative bg-forest"><SiteHeader /><PageIntro label="A living roster" title="Meet the Wanderers">A guild is a landscape made of people. Browse the real faces, paths, and small pieces of personality that make Adobo home.</PageIntro></div><section className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-10 lg:pt-24"><MemberDirectory members={members} /></section><section className="mx-auto max-w-[1440px] px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-28"><HonoraryMembers members={honoraryMembers} /></section><SiteFooter /></main>;
}
