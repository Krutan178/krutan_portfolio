"use client"

import { useEffect } from "react"

import { initOpenPanel } from "@/lib/openpanel"

/**
 * Boots the OpenPanel browser SDK when a client ID is configured. Screen
 * views carry referrer and UTM parameters, so the dashboard shows where
 * visits came from without extra wiring.
 */
export function Analytics() {
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID

    if (clientId) {
      initOpenPanel(clientId)
    }
  }, [])

  return null
}
