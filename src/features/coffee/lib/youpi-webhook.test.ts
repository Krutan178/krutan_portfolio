import { createHmac } from "node:crypto"

import { describe, expect, it } from "vitest"

import {
  verifyYoupiWebhook,
  YOUPI_SIGNATURE_MAX_AGE_MS,
} from "./youpi-webhook"

const SECRET = "whsec_test"
const BODY = JSON.stringify({
  event: "SUCCESS",
  orderId: "coffee-123",
  amount: "50.00",
  amountPaise: 5000,
  utr: "123456789012",
  paymentId: "pay-abc",
})

function sign(body: string) {
  return `sha256=${createHmac("sha256", SECRET).update(body).digest("hex")}`
}

function headers(overrides: Record<string, string | null> = {}) {
  return {
    signature: sign(BODY),
    event: "SUCCESS",
    deliveryId: "delivery-1",
    timestamp: String(Date.now()),
    ...overrides,
  }
}

describe("verifyYoupiWebhook", () => {
  it("accepts a fresh, correctly signed SUCCESS delivery", () => {
    const result = verifyYoupiWebhook(BODY, headers(), SECRET)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.payload.orderId).toBe("coffee-123")
      expect(result.deliveryId).toBe("delivery-1")
    }
  })

  it("rejects a tampered body", () => {
    const result = verifyYoupiWebhook(
      JSON.stringify({ event: "SUCCESS", orderId: "hacked" }),
      headers(),
      SECRET
    )

    expect(result).toMatchObject({ ok: false, reason: "signature" })
  })

  it("rejects missing headers", () => {
    const result = verifyYoupiWebhook(BODY, { ...headers(), signature: null }, SECRET)

    expect(result).toMatchObject({ ok: false, reason: "signature" })
  })

  it("rejects stale deliveries", () => {
    const result = verifyYoupiWebhook(
      BODY,
      headers({
        timestamp: String(Date.now() - YOUPI_SIGNATURE_MAX_AGE_MS - 1000),
      }),
      SECRET
    )

    expect(result).toMatchObject({ ok: false, reason: "timestamp" })
  })

  it("ignores non-SUCCESS events with a 200-style rejection", () => {
    const result = verifyYoupiWebhook(BODY, headers({ event: "FAILED" }), SECRET)

    expect(result).toMatchObject({ ok: false, reason: "event" })
  })

  it("falls back to paymentId when the delivery id is absent", () => {
    const result = verifyYoupiWebhook(
      BODY,
      headers({ deliveryId: null }),
      SECRET
    )

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.deliveryId).toBe("pay-abc")
    }
  })
})
