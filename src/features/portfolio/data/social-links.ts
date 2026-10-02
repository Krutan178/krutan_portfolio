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
    href: "https://www.linkedin.com/in/krutan-lakeshri/",
    sameAs: true,
  },
  x: {
    title: "X",
    handle: "@Krutan_lakeshri",
    href: "https://x.com/Krutan_lakeshri",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
