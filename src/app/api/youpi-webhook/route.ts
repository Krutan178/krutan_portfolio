import { NextResponse } from "next/server"

import {
  sendYoupiToDiscord,
  verifyYoupiWebhook,
  YOUPI_SIGNATURE_MAX_AGE_MS,
} from "@/features/coffee/lib/youpi-webhook"

// Serverless function instances can be recycled at any time, so this cache is
// best effort: it absorbs immediate replays, the bank statement remains the
// authoritative dedupe source.
const recentDeliveries = new Map<string, number>()

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const secret = process.env.YOUPI_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: "YouPI webhook is not configured" },
      { status: 503 }
    )
  }

  const rawBody = await request.text()
  const result = verifyYoupiWebhook(
    rawBody,
    {
      signature: request.headers.get("X-Gateway-Signature"),
      event: request.headers.get("X-Gateway-Event"),
      deliveryId: request.headers.get("X-Gateway-Delivery-Id"),
      timestamp: request.headers.get("X-Gateway-Timestamp"),
    },
    secret
  )

  if (!result.ok) {
    return NextResponse.json(
      { error: `Rejected: ${result.reason}` },
      { status: result.reason === "event" ? 200 : 401 }
    )
  }

  pruneRecentDeliveries()

  if (recentDeliveries.has(result.deliveryId)) {
    return NextResponse.json({ received: true, deduplicated: true })
  }
  recentDeliveries.set(result.deliveryId, Date.now())

  const discordWebhookUrl = process.env.YOUPI_DISCORD_WEBHOOK_URL
  if (discordWebhookUrl) {
    try {
      await sendYoupiToDiscord(discordWebhookUrl, result.payload)
    } catch (error) {
      // The payment is already authenticated; a failed notification must not
      // make the gateway retry.
      console.error("[youpi-webhook] discord delivery failed", error)
    }
  } else {
    console.log("[youpi-webhook]", result.payload)
  }

  return NextResponse.json({ received: true })
}

function pruneRecentDeliveries() {
  const now = Date.now()

  for (const [deliveryId, timestamp] of recentDeliveries) {
    if (now - timestamp > YOUPI_SIGNATURE_MAX_AGE_MS) {
      recentDeliveries.delete(deliveryId)
    }
  }
}
