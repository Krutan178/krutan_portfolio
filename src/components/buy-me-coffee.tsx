"use client"

import { useRef, useState } from "react"

import { CoffeeIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { COFFEE, SITE_INFO } from "@/config/site"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/events"
import { copyText } from "@/utils/copy"

type YoupiResponse = {
  status: string
  order_id: string
  amount_received: number | string
  utr?: string
}

declare global {
  interface Window {
    Youpi?: {
      pay(options: {
        order_id: string
        amount: number
        currency: string
        name: string
        description: string
        handler: (response: YoupiResponse) => void
        onClose: () => void
      }): void
    }
  }
}

export function BuyMeCoffee({ className }: { className?: string }) {
  const [amount, setAmount] = useState<number>(50)
  const [status, setStatus] = useState<"idle" | "starting" | "copied">("idle")
  const scriptRef = useRef<Promise<void> | null>(null)

  const loadedScript = () => {
    scriptRef.current ??= new Promise<void>((resolve, reject) => {
      const script = document.createElement("script")
      script.src = `${COFFEE.gatewayUrl}/youpi.js`
      script.dataset.youpiKey = COFFEE.merchantKey
      script.dataset.currency = "INR"
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load checkout"))
      document.head.appendChild(script)
    })

    return scriptRef.current
  }

  const upiIntent = (value: number) => {
    const params = new URLSearchParams({
      pa: COFFEE.upiId,
      pn: COFFEE.payeeName,
      am: value.toFixed(2),
      cu: "INR",
      tn: "Buy me a coffee",
    })

    return `upi://pay?${params.toString()}`
  }

  const payWithGateway = async (value: number) => {
    setStatus("starting")

    try {
      await loadedScript()

      window.Youpi?.pay({
        order_id: `coffee-${Date.now()}`,
        amount: value,
        currency: "INR",
        name: SITE_INFO.name,
        description: "Buy me a coffee",
        // The YouPI checkout modal owns the success/failure experience, so the
        // handlers only need to exist to satisfy the SDK contract.
        handler: () => {},
        onClose: () => {},
      })
    } catch {
      setStatus("idle")
    }
  }

  const payWithIntent = async (value: number) => {
    const isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent)

    if (isMobile) {
      window.location.href = upiIntent(value)
      return
    }

    // Desktop UPI intents are native-app protocol links, so fall back to
    // handing over the VPA for a manual transfer instead.
    if (await copyText(COFFEE.upiId)) {
      setStatus("copied")
    }
  }

  const pay = async (value: number) => {
    if (COFFEE.gatewayUrl && COFFEE.merchantKey) {
      trackEvent({
        name: "buy_me_coffee_pay",
        properties: { amount: value, mode: "gateway" },
      })
      await payWithGateway(value)
    } else {
      trackEvent({
        name: "buy_me_coffee_pay",
        properties: { amount: value, mode: "upi_intent" },
      })
      await payWithIntent(value)
    }
  }

  const isGateway = Boolean(COFFEE.gatewayUrl && COFFEE.merchantKey)

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          trackEvent({
            name: "buy_me_coffee_open",
            properties: {
              mode: COFFEE.gatewayUrl ? "gateway" : "upi_intent",
            },
          })
        } else {
          setStatus("idle")
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Buy me a coffee"
            className={cn(
              "text-muted-foreground transition-[color] hover:text-foreground",
              className
            )}
          />
        }
      >
        <CoffeeIcon />
        <span className="sr-only">Buy me a coffee</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy me a coffee</DialogTitle>
          <DialogDescription>
            {isGateway
              ? "Supports my work through a secure YouPI UPI checkout."
              : `Supports my work directly to UPI ID: ${COFFEE.upiId}`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {[25, 50, 100].map((preset) => (
            <Button
              key={preset}
              variant={preset === amount ? "default" : "outline"}
              onClick={() => setAmount(preset)}
            >
              ₹{preset}
            </Button>
          ))}
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">Custom amount</span>
          <input
            type="number"
            min={1}
            value={amount || ""}
            onChange={(event) => setAmount(Number(event.target.value) || 0)}
            className="border-input bg-background rounded-lg border px-3 py-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-xs" aria-live="polite">
            {status === "copied" ? "UPI ID copied to clipboard" : ""}
            {status === "starting" ? "Opening checkout..." : ""}
          </span>

          <Button
            disabled={amount < 1}
            onClick={() => pay(amount)}
            data-icon="inline-start"
          >
            <CoffeeIcon />
            Pay ₹{amount || 0}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
