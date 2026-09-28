"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * 3D Isometric "KL" Interactive Monogram Button for Krutan Lakeshri.
 * Follows cursor position with dynamic radial spotlight and plays mechanical click sound on tap.
 */
export function ChanhDaiMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `kl-face-pattern-${id}`,
    faceFill: `kl-face-fill-${id}`,
    stroke: `kl-stroke-${id}`,
    radialGradient: `kl-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.g
          id={ids.faceFill}
          variants={{
            normal: {
              y: 0,
            },
            pressed: {
              y: 14,
            },
          }}
          transition={transition}
        >
          {/* Top face of Letter K (Bottom-Left, Rotated 90 Deg CCW) */}
          <path d="M25 195L191.4 291L243.4 261L186.2 228L331.8 210L326.6 171L196.6 186L222.6 111L155 108L123.8 192L77 165Z" />
          {/* Top face of Letter L (Top-Right, Rotated 90 Deg CCW) */}
          <path d="M331.8 108L503.4 207L555.4 177L435.8 108L529.4 54L477.4 24Z" />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: "M25 195L191.4 291L243.4 261L186.2 228L331.8 210L326.6 171L196.6 186L222.6 111L155 108L123.8 192L77 165Z M331.8 108L503.4 207L555.4 177L435.8 108L529.4 54L477.4 24Z M25 195L25 219 M191.4 291L191.4 315 M243.4 261L243.4 285 M186.2 228L186.2 252 M331.8 210L331.8 234 M196.6 186L196.6 210 M222.6 111L222.6 135 M331.8 108L331.8 132 M503.4 207L503.4 231 M555.4 177L555.4 201 M435.8 108L435.8 132 M529.4 54L529.4 78 M25 219L191.4 315 M191.4 315L243.4 285 M186.2 252L331.8 234 M196.6 210L222.6 135 M331.8 132L503.4 231 M503.4 231L555.4 201 M435.8 132L529.4 78",
            },
            pressed: {
              d: "M25 209L191.4 305L243.4 275L186.2 242L331.8 224L326.6 185L196.6 200L222.6 125L155 122L123.8 206L77 179Z M331.8 122L503.4 221L555.4 191L435.8 122L529.4 68L477.4 38Z M25 209L25 219 M191.4 305L191.4 315 M243.4 275L243.4 285 M186.2 242L186.2 252 M331.8 224L331.8 234 M196.6 200L196.6 210 M222.6 125L222.6 135 M331.8 122L331.8 132 M503.4 221L503.4 231 M555.4 191L555.4 201 M435.8 122L435.8 132 M529.4 68L529.4 78 M25 219L191.4 315 M191.4 315L243.4 285 M186.2 252L331.8 234 M196.6 210L222.6 135 M331.8 132L503.4 231 M503.4 231L555.4 201 M435.8 132L529.4 78",
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/* Dashed background isometric grid line */}
      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/* 3D Drop Walls (Extrusion) */}
      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <motion.path
          variants={{
            normal: {
              d: "M25 195L191.4 291L191.4 315L25 219ZM191.4 291L243.4 261L243.4 285L191.4 315ZM186.2 228L331.8 210L331.8 234L186.2 252ZM196.6 186L222.6 111L222.6 135L196.6 210ZM331.8 108L503.4 207L503.4 231L331.8 132ZM503.4 207L555.4 177L555.4 201L503.4 231ZM435.8 108L529.4 54L529.4 78L435.8 132Z",
            },
            pressed: {
              d: "M25 209L191.4 305L191.4 315L25 219ZM191.4 305L243.4 275L243.4 285L191.4 315ZM186.2 242L331.8 224L331.8 234L186.2 252ZM196.6 200L222.6 125L222.6 135L196.6 210ZM331.8 122L503.4 221L503.4 231L331.8 132ZM503.4 221L555.4 191L555.4 201L503.4 231ZM435.8 122L529.4 68L529.4 78L435.8 132Z",
            },
          }}
          transition={transition}
        />
      </g>

      {/* Top faces with hatch fill */}
      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      {/* Wireframe strokes with cursor-tracking spotlight */}
      <use href={`#${ids.stroke}`} stroke="var(--stroke)" strokeWidth="1.5" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} strokeWidth="1.5" />
    </motion.svg>
  )
}

export default ChanhDaiMarkIsometric
