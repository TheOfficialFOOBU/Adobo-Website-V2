import type { Metadata } from "next";
import { SkywardBondIntro } from "@/components/skyward-bond/intro";
import { SkywardBondGallery } from "@/components/skyward-bond/gallery";
import { SiteFooter } from "@/components/site-header";
import { resolveSkywardBondAchievements } from "@/lib/skyward-bond";

export const metadata: Metadata = {
  title: "Skyward Bond",
  description:
    "Served Hot. Earned Together. Step through the simmer, the serving, and the invitation into Adobo's Skyward Bond banquet hall.",
};

export default function SkywardBondPage() {
  const achievements = resolveSkywardBondAchievements();
  return (
    <main className="bg-[#090A0B] text-[#E9DCC6]">
      <SkywardBondIntro>
        <SkywardBondGallery achievements={achievements} embedded />
      </SkywardBondIntro>
      <SiteFooter />
    </main>
  );
}
