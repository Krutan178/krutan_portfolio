import { OpenPanel } from "@openpanel/web"

/**
 * Singleton sink for analytics. The real OpenPanel client only exists after
 * `initOpenPanel()` runs in a browser context; `op.track` degrades to a no-op
 * before that or when no client ID is configured.
 */
let instance: OpenPanel | null = null

export function initOpenPanel(clientId: string) {
  if (!instance) {
    instance = new OpenPanel({
      clientId,
      trackScreenViews: true,
      trackOutgoingLinks: true,
      trackAttributes: true,
    })
  }
}

export const op = {
  track: (name: string, properties?: Record<string, unknown>) => {
    instance?.track(name, properties)
  },
}
