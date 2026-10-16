import { members } from "@/lib/members";

export type { Member } from "@/lib/members";
export { members, memberSlug } from "@/lib/members";

const featuredNames = ["FOOBU", "Hrafna", "Maxisle"];
export const featuredMembers = featuredNames.map(name => {
  const member = members.find(candidate => candidate.name === name);
  if (!member) throw new Error(`Featured member not found: ${name}`);
  return member;
});

export type Activity = { title: string; image: string; label: string; description: string };
export type Video = { title: string; thumbnail?: string; source: string; label: string };

export const activities: Activity[] = [
  { title: "Guild gatherings", image: "/images/events/Pogi-1600.webp", label: "In good company", description: "The people, screenshots, and stories that make an ordinary session worth remembering." },
  { title: "Shared adventures", image: "/images/events/AiyariaAura-1600.webp", label: "Any afternoon", description: "Roam the world at a pace that leaves room for detours, discoveries, and a little chaos." },
  { title: "GvG, gently", image: "/images/events/SchalxFoobu-1600.webp", label: "Together", description: "Show up, learn together, and keep the mood lighter than the scoreboard." },
  { title: "The long table", image: "/images/events/GPic-1600.webp", label: "A place to return to", description: "Different schedules and different paths, with a seat waiting whenever you return." },
  { title: "Guild Picture", image: "/images/events/Guild Picture-1600.webp", label: "Field note", description: "A moment captured at the long table, where every seat tells a story." },
  { title: "GuildPic", image: "/images/events/GuildPic-1600.webp", label: "Field note", description: "Wanderers gathered, the kind of afternoon that becomes a memory." },
  { title: "Astro Aura", image: "/images/events/AstroAura-1600.webp", label: "Under the same sky", description: "Night falls differently when you are not watching it alone." },
  { title: "Myxy", image: "/images/events/Myxy-1600.webp", label: "Field note", description: "A quiet moment between adventures, the kind worth keeping." },
  { title: "NikLei", image: "/images/events/NikLei-1600.webp", label: "Field note", description: "Paths cross in unexpected ways. This was one of them." },
  { title: "Sanji x Hue", image: "/images/events/SanjiXHue-1600.webp", label: "Field note", description: "Side by side, the journey feels lighter." },
  { title: "Schal x Foobu Art", image: "/images/events/SchalXFOOBUhART-1600.webp", label: "Field note", description: "Art imitates life, life imitates art. Sometimes both happen at once." },
  { title: "GPIC2", image: "/images/events/GPIC2-1600.webp", label: "Field note", description: "Another gathering, another story added to the collection." },
  { title: "Gpic3", image: "/images/events/Gpic3-1600.webp", label: "Field note", description: "The table grows. The stories deepen." },
  { title: "Hybrid Aura", image: "/images/events/Hybridaura-1600.webp", label: "Field note", description: "Where paths meet, something new begins." },
  { title: "First steps", image: "/images/events/1.JPG-1600.webp", label: "Where it began", description: "The first gathering. The first story. The rest followed." },
  { title: "Rozo LB", image: "/images/events/Rozo LB.png", label: "Field note", description: "Another page from the road, kept the way it happened." },
  { title: "Rozo LB2", image: "/images/events/rozo-lb2-v2.png", label: "Field note", description: "Same road, another moment worth keeping." },
  { title: "Cali Mid", image: "/images/events/Cali Mid.png", label: "Field note", description: "Caught mid-journey, right where the story lives." },
];

export const videos: Video[] = [
  { title: "Adobo Airlines", thumbnail: "/videos/videos/Ambón POV Adobo Airlines.jpg", source: "/videos/videos/Ambón POV Adobo Airlines.mp4", label: "Field note 01" },
  { title: "Mahjong Distraction", thumbnail: "/videos/videos/Ambón POV Mahjong Distraction.jpg", source: "/videos/videos/Ambón POV Mahjong Distraction.mp4", label: "Field note 02" },
  { title: "Aura Farm", thumbnail: "/videos/videos/Calialy Aura Farm.jpg", source: "/videos/videos/Calialy Aura Farm.mp4", label: "Field note 03" },
  { title: "Pictorial Gone Wrong", thumbnail: "/videos/videos/HyßrıðTheøry Pictorial Gone Wrong.jpg", source: "/videos/videos/HyßrıðTheøry Pictorial Gone Wrong.mp4", label: "Field note 04" },
  { title: "Denying Fanbrella", thumbnail: "/videos/videos/Schalsweiser Denying Fanbrella.jpg", source: "/videos/videos/Schalsweiser Denying Fanbrella.mp4", label: "Field note 05" },
  { title: "Ambón Succy Succy", source: "/videos/videos/Ambón Succy Succy.mp4", label: "Field note 06" },
  { title: "GvG Aura Walk", source: "/videos/videos/GvG Aura Walk.mp4", label: "Field note 07" },
  { title: "Lei's glorious moment", source: "/videos/videos/Lei's glorious moment.mp4", label: "Field note 08" },
];

export const faqs = [
  ["Is Adobo competitive?", "We can enjoy GvG without making it the whole point. People matter more than results, and a good laugh is always a valid outcome."],
  ["Can casual players join?", "Yes. Adobo is for Wanderers finding their own rhythm, whether that means weeknight visits, weekend adventures, or the occasional hello."],
  ["Do I need to be highly active?", "No attendance sheet, no pressure. The path will still be here when you have time to wander again."],
  ["What kind of people are you looking for?", "Warm, respectful people with a sense of humor who would rather share a story than prove a point."],
] as const;

export const rules = [
  ["01. Respect Everyone", "Treat every member with respect. Friendly banter and jokes are welcome, but harassment, bullying, discrimination, personal attacks, and deliberately making others uncomfortable are not.\n\nWe want Adobo to be a place where everyone feels welcome."],
  ["02. No Unnecessary Drama", "Leave the drama outside the guild.\n\nMisunderstandings happen, and not everyone will always get along. If you have a problem with another member, handle it maturely or ask an officer for help. Do not create public arguments, spread rumors, or turn personal issues into guild problems."],
  ["03. Play Your Way, Respect Others", "We're a casual and stress-free guild. There are no expectations to play every day or keep up with everyone else's progress.\n\nPlay at your own pace, but don't shame others for being more casual, more active, stronger, weaker, experienced, or new to the game.\n\nEveryone enjoys the game differently."],
  ["04. Have Fun, But Don't Ruin It for Others", "We love joking around, laughing when we lose, and laughing even harder when we win.\n\nHave fun and be chaotic when the moment calls for it, but know the difference between harmless fun and behavior that ruins someone else's experience."],
  ["05. No Toxicity During Guild Activities", "Whether we win or lose, keep it respectful.\n\nDon't blame, insult, or single out members for mistakes. We can always improve, learn, and try again. Losing is part of the game, and nobody should be afraid to join an activity because they're worried about being flamed."],
  ["06. Help When You Can", "You don't have to be an expert or carry everyone.\n\nIf you can help a fellow Adobo member with content, answer a question, or share useful information, we encourage you to do so. A good guild grows because its members support each other."],
  ["07. Don't Take Advantage of Others", "Be fair when dealing with guild members.\n\nScamming, intentionally misleading others, exploiting members, or taking advantage of someone's trust will not be tolerated. Respect the time, effort, and generosity of others."],
  ["08. Keep Guild Spaces Comfortable", "Please use common sense in guild chat, Discord, and other community spaces.\n\nAvoid excessive spam, disruptive behavior, inappropriate content, or anything that makes the community uncomfortable. Friendly conversations are encouraged, just remember that this is a shared space."],
  ["09. Communicate and Be Considerate", "You don't have to be active 24/7, but communication goes a long way.\n\nIf you've signed up for an activity or committed to something, try your best to show up. If something comes up, let the group know when possible. Respect other people's time just as you would want yours respected."],
  ["10. Listen to the Leadership Team", "Guild leaders and officers are here to help maintain a healthy community, not to control how you play the game.\n\nIf an issue requires intervention, please respect their decisions. You can always raise concerns respectfully, but repeated disregard for guild rules or leadership decisions may result in disciplinary action."],
  ["11. One Guild, One Community", "At the end of the day, we're here to enjoy the game together.\n\nYou don't need to be the strongest player. You don't need to be the most active. You don't need to win every fight.\n\nJust be respectful, have fun, and don't make the game worse for the people around you."],
] as const;

