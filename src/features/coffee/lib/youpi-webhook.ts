import { createHmac, timingSafeEqual } from "node:crypto"

import { SITE_INFO } from "@/config/site"

/**
 * YouPI PG posts payment confirmations signed with an HMAC-SHA256 secret.
 * See https://github.com/youpi-pg/YouPI-PG (README: Merchant Integration).
 */
export const YOUPI_SIGNATURE_MAX_AGE_MS = 5 * 60 * 1000

type YoupiWebhookPayload = {
  event: string
  orderId: string
  amount: string
  amountPaise: number
  utr: string
  paymentId: string
}

type YoupiWebhookHeaders = {
  signature: string | null
  event: string | null
  deliveryId: string | null
  timestamp: string | null
}

type YoupiVerificationError = "signature" | "event" | "timestamp"

export type YoupiVerificationResult =
  | { ok: true; payload: YoupiWebhookPayload; deliveryId: string }
  | { ok: false; reason: YoupiVerificationError }

/**
 * Verifies the HMAC over the raw, unparsed request bytes and only accepts
 * fresh SUCCESS deliveries. A valid signature authenticates the message, not
 * the settlement — reconcile against the bank for anything that matters.
 */
export function verifyYoupiWebhook(
  rawBody: string,
  headers: YoupiWebhookHeaders,
  secret: string
): YoupiVerificationResult {
  if (!headers.signature || !headers.event || !headers.timestamp) {
    return { ok: false, reason: "signature" }
  }

  const expected = `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`
  const signature = Buffer.from(headers.signature)
  const expectedBuffer = Buffer.from(expected)

  if (
    signature.length !== expectedBuffer.length ||
    !timingSafeEqual(signature, expectedBuffer)
  ) {
    return { ok: false, reason: "signature" }
  }

  const timestamp = Number(headers.timestamp)
  if (
    !Number.isFinite(timestamp) ||
    Math.abs(Date.now() - timestamp) > YOUPI_SIGNATURE_MAX_AGE_MS
  ) {
    return { ok: false, reason: "timestamp" }
  }

  if (headers.event !== "SUCCESS") {
    return { ok: false, reason: "event" }
  }

  let payload: YoupiWebhookPayload
  try {
    payload = JSON.parse(rawBody) as YoupiWebhookPayload
  } catch {
    return { ok: false, reason: "signature" }
  }

  return {
    ok: true,
    deliveryId: headers.deliveryId || payload.paymentId,
    payload,
  }
}

const EMBED_COLOR = 0x22c55e

export function buildYoupiDiscordPayload(
  payload: YoupiWebhookPayload,
  receivedAt: Date
) {
  return {
    embeds: [
      {
        title: `Coffee received: ${payload.amount}`,
        url: SITE_INFO.url,
        description: `A supporter bought coffee through the YouPI checkout.`,
        color: EMBED_COLOR,
        fields: [
          { name: "Order", value: payload.orderId, inline: true },
          { name: "UTR", value: payload.utr, inline: true },
          { name: "Payment", value: payload.paymentId, inline: true },
        ],
        footer: { text: SITE_INFO.name },
        timestamp: receivedAt.toISOString(),
      },
    ],
    allowed_mentions: { parse: [] },
  }
}

export async function sendYoupiToDiscord(
  webhookUrl: string,
  payload: YoupiWebhookPayload
) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildYoupiDiscordPayload(payload, new Date())),
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(
      `Discord webhook responded with ${response.status} ${response.statusText}`
    )
  }
}
