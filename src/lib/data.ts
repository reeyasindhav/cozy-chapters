export type Mood = "Wonder" | "Tender" | "Nostalgic" | "Hopeful" | "Eerie" | "Quiet";

export const MOODS: Mood[] = ["Wonder", "Tender", "Nostalgic", "Hopeful", "Eerie", "Quiet"];

export const moodTint: Record<Mood, string> = {
  Wonder: "bg-moss",
  Tender: "bg-sand",
  Nostalgic: "bg-mist",
  Hopeful: "bg-moss",
  Eerie: "bg-mist",
  Quiet: "bg-sand",
};

export type Author = {
  slug: string;
  name: string;
  initials: string;
  tagline: string;
  bio: string;
  location: string;
  avatar: string;
  cover: string;
  followers: number;
  joined: string;
};

export type Story = {
  slug: string;
  title: string;
  mood: Mood;
  minutes: number;
  excerpt: string;
  author: string; // author slug
  cover: string;
  claps: number;
  published: string;
  tags: string[];
  body: string[];
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const authors: Author[] = [
  {
    slug: "mara-venn",
    name: "Mara Venn",
    initials: "MV",
    tagline: "Writes tender things about ordinary magic.",
    bio: "Mara Venn writes short fiction about maps, memory and the small rooms people build inside themselves. Her work has appeared in a handful of quiet magazines and one very loud newsletter.",
    location: "Porto, Portugal",
    avatar: "https://i.pravatar.cc/200?img=47",
    cover: u("1481627834876-b7833e8f5570", 1400),
    followers: 4820,
    joined: "March 2023",
  },
  {
    slug: "sora-bell",
    name: "Sora Bell",
    initials: "SB",
    tagline: "Rain, rooftops, and rooms that remember.",
    bio: "Sora Bell is a night-shift nurse who writes between rounds. She likes weather as a character and endings that arrive one sentence early.",
    location: "Osaka, Japan",
    avatar: "https://i.pravatar.cc/200?img=32",
    cover: u("1476234251651-f353703a034d", 1400),
    followers: 3110,
    joined: "July 2023",
  },
  {
    slug: "theo-okafor",
    name: "Theo Okafor",
    initials: "TO",
    tagline: "Libraries, ledgers, and lost things.",
    bio: "Theo Okafor collects abandoned index cards and turns them into stories. He believes every catalogue is a novel in disguise.",
    location: "Lagos, Nigeria",
    avatar: "https://i.pravatar.cc/200?img=12",
    cover: u("1507842217343-583bb7270b66", 1400),
    followers: 2740,
    joined: "January 2024",
  },
  {
    slug: "nia-calder",
    name: "Nia Calder",
    initials: "NC",
    tagline: "Gardens, grief, and gentle instructions.",
    bio: "Nia Calder writes in the second person because she likes company. Her stories are usually shorter than the walk home.",
    location: "Glasgow, Scotland",
    avatar: "https://i.pravatar.cc/200?img=45",
    cover: u("1490750967868-88aa4486c946", 1400),
    followers: 5290,
    joined: "October 2022",
  },
  {
    slug: "iris-wren",
    name: "Iris Wren",
    initials: "IW",
    tagline: "Trains that arrive from nowhere.",
    bio: "Iris Wren writes eerie little transit stories. She has missed every important train of her life and written about all of them.",
    location: "Ghent, Belgium",
    avatar: "https://i.pravatar.cc/200?img=26",
    cover: u("1470071459604-3b5ec3a7fe05", 1400),
    followers: 1980,
    joined: "May 2024",
  },
  {
    slug: "jon-bellamy",
    name: "Jon Bellamy",
    initials: "JB",
    tagline: "Slow seasons, empty windows, returning birds.",
    bio: "Jon Bellamy writes about the months nobody photographs. Former carpenter, current early riser.",
    location: "Vermont, USA",
    avatar: "https://i.pravatar.cc/200?img=59",
    cover: u("1441974231531-c6227db76b6e", 1400),
    followers: 2260,
    joined: "February 2023",
  },
];

const lorem = (title: string) => [
  `It began the way most small things begin — without ceremony, without witness, and entirely on a Tuesday.`,
  `There is a particular quality to attention that only arrives when nobody is watching. ${title} is a record of that quality, or an attempt at one. The kitchen light was on. The kettle had stopped complaining. Outside, the street performed its usual small errands.`,
  `She counted the things that had changed since morning: the angle of the shadow on the wall, the number of apples in the bowl, the weight of the letter in her pocket. Three changes. A whole day's worth.`,
  `What nobody tells you about keeping a record is that the record starts keeping you. You begin to live in a way that can be written down. You notice the shape of a sentence before you notice the shape of an afternoon.`,
  `By evening the question had softened into something she could carry. Not answered — carried. That was the trick of it, she decided. You don't finish these things. You just find a comfortable way to hold them while you make dinner.`,
  `And in the morning, the light came back, the way it always does, indifferent and generous, and she began again.`,
];

export const stories: Story[] = [
  {
    slug: "the-cartographer-of-small-things",
    title: "The Cartographer of Small Things",
    mood: "Wonder",
    minutes: 8,
    excerpt: "Every morning, Elian mapped the places that vanished when no one was looking.",
    author: "mara-venn",
    cover: u("1519681393784-d120267933ba"),
    claps: 1240,
    published: "Aug 12, 2026",
    tags: ["magical realism", "maps", "quiet"],
    body: lorem("The Cartographer of Small Things"),
  },
  {
    slug: "a-house-made-of-rain",
    title: "A House Made of Rain",
    mood: "Tender",
    minutes: 6,
    excerpt: "On the day the roof began to sing, June finally wrote to her sister.",
    author: "sora-bell",
    cover: u("1476234251651-f353703a034d"),
    claps: 980,
    published: "Aug 4, 2026",
    tags: ["family", "weather", "letters"],
    body: lorem("A House Made of Rain"),
  },
  {
    slug: "the-last-library-card",
    title: "The Last Library Card",
    mood: "Nostalgic",
    minutes: 12,
    excerpt: "There was one book left, and it remembered everyone who had borrowed it.",
    author: "theo-okafor",
    cover: u("1507842217343-583bb7270b66"),
    claps: 2130,
    published: "Jul 28, 2026",
    tags: ["libraries", "memory"],
    body: lorem("The Last Library Card"),
  },
  {
    slug: "instructions-for-a-moon-garden",
    title: "Instructions for a Moon Garden",
    mood: "Hopeful",
    minutes: 4,
    excerpt: "Plant the silver seeds at dusk. Water them with something you are ready to forgive.",
    author: "nia-calder",
    cover: u("1490750967868-88aa4486c946"),
    claps: 1610,
    published: "Jul 19, 2026",
    tags: ["second person", "gardens"],
    body: lorem("Instructions for a Moon Garden"),
  },
  {
    slug: "the-ocean-at-platform-nine",
    title: "The Ocean at Platform Nine",
    mood: "Eerie",
    minutes: 9,
    excerpt: "The train arrived wet, carrying the smell of a shore no map could find.",
    author: "iris-wren",
    cover: u("1470071459604-3b5ec3a7fe05"),
    claps: 870,
    published: "Jul 9, 2026",
    tags: ["strange", "transit"],
    body: lorem("The Ocean at Platform Nine"),
  },
  {
    slug: "when-the-sparrows-return",
    title: "When the Sparrows Return",
    mood: "Quiet",
    minutes: 7,
    excerpt: "By spring, the empty windows had learned to hold the morning light.",
    author: "jon-bellamy",
    cover: u("1441974231531-c6227db76b6e"),
    claps: 1120,
    published: "Jun 30, 2026",
    tags: ["seasons", "grief"],
    body: lorem("When the Sparrows Return"),
  },
  {
    slug: "the-inventory-of-tuesdays",
    title: "The Inventory of Tuesdays",
    mood: "Quiet",
    minutes: 5,
    excerpt: "He kept every Tuesday in a shoebox, folded neatly, in case one was needed again.",
    author: "mara-venn",
    cover: u("1495446815901-a7297e633e8d"),
    claps: 760,
    published: "Jun 21, 2026",
    tags: ["collections", "solitude"],
    body: lorem("The Inventory of Tuesdays"),
  },
  {
    slug: "a-brief-history-of-almost",
    title: "A Brief History of Almost",
    mood: "Nostalgic",
    minutes: 11,
    excerpt: "Two people, one platform, and forty years of nearly saying it.",
    author: "theo-okafor",
    cover: u("1512820790803-83ca734da794"),
    claps: 1890,
    published: "Jun 12, 2026",
    tags: ["love", "time"],
    body: lorem("A Brief History of Almost"),
  },
  {
    slug: "the-lighthouse-keeps-a-diary",
    title: "The Lighthouse Keeps a Diary",
    mood: "Wonder",
    minutes: 10,
    excerpt: "Entry 4,102: today the sea asked me a question and I pretended not to hear.",
    author: "iris-wren",
    cover: u("1506905925346-21bda4d32df4"),
    claps: 1450,
    published: "Jun 2, 2026",
    tags: ["sea", "diary"],
    body: lorem("The Lighthouse Keeps a Diary"),
  },
  {
    slug: "soft-machinery",
    title: "Soft Machinery",
    mood: "Tender",
    minutes: 3,
    excerpt: "The repair shop only fixed things that had been loved badly.",
    author: "nia-calder",
    cover: u("1500673922987-e212871fec22"),
    claps: 640,
    published: "May 24, 2026",
    tags: ["flash fiction", "repair"],
    body: lorem("Soft Machinery"),
  },
  {
    slug: "everything-the-fog-kept",
    title: "Everything the Fog Kept",
    mood: "Eerie",
    minutes: 8,
    excerpt: "The village agreed never to count its children on foggy mornings.",
    author: "jon-bellamy",
    cover: u("1487621167305-5d248087c724"),
    claps: 1030,
    published: "May 15, 2026",
    tags: ["folk horror", "village"],
    body: lorem("Everything the Fog Kept"),
  },
  {
    slug: "letters-to-the-woman-upstairs",
    title: "Letters to the Woman Upstairs",
    mood: "Hopeful",
    minutes: 6,
    excerpt: "For a year they exchanged notes through a gap in the floorboards.",
    author: "sora-bell",
    cover: u("1481627834876-b7833e8f5570"),
    claps: 1330,
    published: "May 3, 2026",
    tags: ["letters", "neighbours"],
    body: lorem("Letters to the Woman Upstairs"),
  },
];

export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
export const storiesByAuthor = (slug: string) => stories.filter((s) => s.author === slug);

export const collections = [
  {
    title: "Five minutes, one world",
    description: "Flash fiction you can finish before the kettle boils.",
    count: 24,
    cover: u("1495446815901-a7297e633e8d", 700),
  },
  {
    title: "Rain-soaked rooms",
    description: "Weather as a character. Windows as confessionals.",
    count: 18,
    cover: u("1476234251651-f353703a034d", 700),
  },
  {
    title: "Softly strange",
    description: "Magic that never explains itself, and never needs to.",
    count: 31,
    cover: u("1519681393784-d120267933ba", 700),
  },
];
