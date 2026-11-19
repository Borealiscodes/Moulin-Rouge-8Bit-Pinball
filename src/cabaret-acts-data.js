/**
 * src/cabaret-acts-data.js — Four-Act Parisian Cabaret Narrative, Table Bumpers & 8-Bit Chiptune Tracks
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

export const CABARET_ACTS = [
  {
    id: 1,
    slug: "opening-night",
    title: "Act I: Welcome to the Moulin Rouge (1899 Montmartre)",
    subtitle: "The Red Windmill spins above Paris as opening-night revelers flood the ballroom.",
    story:
      "A penniless poet steps beneath the glowing crimson sails of the Moulin Rouge. Launch the silver ball up the chandelier lane and strike the Red Windmill bumpers to reach 1,500 points!",
    targetScore: 1500,
    trackIndex: 0,
    trackName: "Track 1: Montmartre Can-Can Gallop (148 BPM)",
    feltTop: "#450a0a",
    feltBottom: "#7f1d1d",
    spotlightColor: "rgba(251, 191, 36, 0.22)",
    scoreMultiplier: 1,
  },
  {
    id: 2,
    slug: "elephant-boudoir",
    title: "Act II: The Elephant Boudoir (Rooftop Starlight)",
    subtitle: "High above the Montmartre rooftops, secret bohemian verses are whispered under sapphire moonlight.",
    story:
      "Inside the velvet Elephant tower overlooking Paris, truth, beauty, freedom, and love spark a forbidden romance. Bank shots off the Elephant Dome and Moon Bumpers to reach 4,000 points!",
    targetScore: 4000,
    trackIndex: 1,
    trackName: "Track 2: Elephant Serenade (96 BPM)",
    feltTop: "#172554",
    feltBottom: "#311042",
    spotlightColor: "rgba(56, 189, 248, 0.24)",
    scoreMultiplier: 1,
  },
  {
    id: 3,
    slug: "cabaret-tango",
    title: "Act III: Crimson Cabaret Tango (The Jealous Patron)",
    subtitle: "Rivalry erupts backstage as the wealthy Duke demands the star dancer's loyalty.",
    story:
      "Shadowy spotlights slash across the stage to the driving pulse of a Montmartre tango! Rally the ball across the high-voltage stage bumpers to reach 7,500 points!",
    targetScore: 7500,
    trackIndex: 2,
    trackName: "Track 3: Tango de Montmartre (124 BPM)",
    feltTop: "#3b0764",
    feltBottom: "#881337",
    spotlightColor: "rgba(244, 63, 94, 0.28)",
    scoreMultiplier: 2,
  },
  {
    id: 4,
    slug: "spectacular-finale",
    title: "Act IV: The Show Must Go On (Spectacular Curtain Call)",
    subtitle: "Golden confetti falls across Montmartre as the curtain rises on the grandest spectacle in Paris!",
    story:
      "Every bumper awards DOUBLE Spectacular points as golden spotlights sweep the velvet stage. Score 10,000+ points for the Curtain Call Finale and mint your SHA-256 Playbill Receipt!",
    targetScore: 10000,
    trackIndex: 3,
    trackName: "Track 4: Spectacular Finale Overture (156 BPM)",
    feltTop: "#713f12",
    feltBottom: "#991b1b",
    spotlightColor: "rgba(253, 224, 71, 0.34)",
    scoreMultiplier: 2,
  },
];

export const TABLE_BUMPERS = [
  { id: "windmill", label: "WINDMILL", x: 210, y: 145, r: 28, basePoints: 250, color: "#dc2626" },
  { id: "elephant", label: "ELEPHANT", x: 118, y: 205, r: 24, basePoints: 200, color: "#2563eb" },
  { id: "chandelier", label: "STAR", x: 302, y: 205, r: 24, basePoints: 200, color: "#d97706" },
  { id: "absinthe", label: "MUSE", x: 210, y: 255, r: 21, basePoints: 300, color: "#10b981" },
];
