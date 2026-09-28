import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles for Krutan Lakeshri.
 */
export const SOCIAL = {
  github: {
    title: "GitHub",
    handle: "Krutan178",
    href: "https://github.com/Krutan178",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "krutan-lakeshri",
    href: "https://in.linkedin.com/in/krutan-lakeshri?trk=people-guest_people_search-card",
    sameAs: true,
  },
  x: {
    title: "X",
    handle: "@krutan",
    href: "https://x.com/",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
