import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://krutan.site",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/Krutan178/krutan_portfolio/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem<Route>[] = []

export const MOBILE_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/",
  },
]

export const X_HANDLE = SOCIAL.x?.handle || ""
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "Krutan178/krutan_portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/Krutan178/krutan_portfolio"

export const SPONSORSHIP_URL = ""

export const UTM_PARAMS = {
  utm_source: "krutan.site",
}

/**
 * Buy-me-a-coffee receiver configuration.
 *
 * The plain UPI intent flow needs only a VPA. When the self-hosted YouPI PG
 * gateway (https://github.com/youpi-pg/YouPI-PG) is configured, payments go
 * through its verified checkout instead of an unconfirmed UPI intent.
 */
export const COFFEE = {
  payeeName: process.env.NEXT_PUBLIC_COFFEE_PAYEE_NAME || SITE_INFO.name,
  upiId: process.env.NEXT_PUBLIC_COFFEE_UPI_ID || "",
  gatewayUrl: process.env.NEXT_PUBLIC_YOUPI_GATEWAY_URL || "",
  merchantKey: process.env.NEXT_PUBLIC_YOUPI_MERCHANT_KEY || "",
}
