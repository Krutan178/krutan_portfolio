import { unstable_cache } from "next/cache"

import type { Activity } from "@/registry/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export function getMockContributions(): Activity[] {
  const activities: Activity[] = []
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const dayOfWeek = d.getDay()
    const seed =
      (d.getFullYear() * 1000 + (d.getMonth() + 1) * 31 + d.getDate()) % 100
    let count = 0
    let level = 0
    if (dayOfWeek !== 0 && dayOfWeek !== 6 && seed % 3 !== 0) {
      if (seed > 85) {
        count = 12
        level = 3
      } else if (seed > 65) {
        count = 6
        level = 2
      } else if (seed > 40) {
        count = 3
        level = 1
      } else {
        count = 1
        level = 1
      }
    } else if (seed > 80) {
      count = 2
      level = 1
    }
    activities.push({ date: dateStr, count, level })
  }
  return activities
}

export const getCachedContributions = unstable_cache(
  async (username: string): Promise<Activity[]> => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL ||
        "https://github-contributions-api.jogruber.de/v4"

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const res = await fetch(`${apiUrl}/${username}?y=last`, {
        signal: controller.signal,
      }).finally(() => {
        clearTimeout(timeoutId)
      })

      if (!res.ok) {
        return getMockContributions()
      }
      const data = (await res.json()) as GitHubContributionsResponse
      return data.contributions && data.contributions.length > 0
        ? data.contributions
        : getMockContributions()
    } catch {
      return getMockContributions()
    }
  },
  ["github-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)
