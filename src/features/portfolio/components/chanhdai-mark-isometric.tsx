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
          {/* Top face of Letter K (Bottom-Left) */}
          <path d="M20 205L176 115L228 145L170.8 178L311.2 193L311.2 235L183.8 212.5L207.2 289L134.4 289L118.8 208L72 235Z" />
          {/* Top face of Letter L (Top-Right) */}
          <path d="M290.4 109L456.8 13L508.8 43L404.8 103L488 151L425.6 187Z" />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: "M20 205L176 115L228 145L170.8 178L311.2 193L311.2 235L183.8 212.5L207.2 289L134.4 289L118.8 208L72 235Z M290.4 109L456.8 13L508.8 43L404.8 103L488 151L425.6 187Z M228 145L228 171 M170.8 178L170.8 204 M311.2 235L311.2 261 M183.8 212.5L183.8 238.5 M207.2 289L207.2 315 M134.4 289L134.4 315 M118.8 208L118.8 234 M72 235L72 261 M20 205L20 231 M508.8 43L508.8 69 M404.8 103L404.8 129 M488 151L488 177 M425.6 187L425.6 213 M290.4 109L290.4 135 M228 171L170.8 204 M311.2 261L183.8 238.5 M207.2 315L134.4 315 M134.4 315L118.8 234 M118.8 234L72 261 M72 261L20 231 M508.8 69L404.8 129 M488 177L425.6 213 M425.6 213L290.4 135",
            },
            pressed: {
              d: "M20 219L176 129L228 159L170.8 192L311.2 207L311.2 249L183.8 226.5L207.2 303L134.4 303L118.8 222L72 249Z M290.4 123L456.8 27L508.8 57L404.8 117L488 165L425.6 201Z M228 159L228 171 M170.8 192L170.8 204 M311.2 249L311.2 261 M183.8 226.5L183.8 238.5 M207.2 303L207.2 315 M134.4 303L134.4 315 M118.8 222L118.8 234 M72 249L72 261 M20 219L20 231 M508.8 57L508.8 69 M404.8 117L404.8 129 M488 165L488 177 M425.6 201L425.6 213 M290.4 123L290.4 135 M228 171L170.8 204 M311.2 261L183.8 238.5 M207.2 315L134.4 315 M134.4 315L118.8 234 M118.8 234L72 261 M72 261L20 231 M508.8 69L404.8 129 M488 177L425.6 213 M425.6 213L290.4 135",
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
              d: "M228 145L170.8 178L170.8 204L228 171ZM311.2 235L183.8 212.5L183.8 238.5L311.2 261ZM207.2 289L134.4 289L134.4 315L207.2 315ZM134.4 289L118.8 208L118.8 234L134.4 315ZM118.8 208L72 235L72 261L118.8 234ZM72 235L20 205L20 231L72 261ZM508.8 43L404.8 103L404.8 129L508.8 69ZM488 151L425.6 187L425.6 213L488 177ZM425.6 187L290.4 109L290.4 135L425.6 213Z",
            },
            pressed: {
              d: "M228 159L170.8 192L170.8 204L228 171ZM311.2 249L183.8 226.5L183.8 238.5L311.2 261ZM207.2 303L134.4 303L134.4 315L207.2 315ZM134.4 303L118.8 222L118.8 234L134.4 315ZM118.8 222L72 249L72 261L118.8 234ZM72 249L20 219L20 231L72 261ZM508.8 57L404.8 117L404.8 129L508.8 69ZM488 165L425.6 201L425.6 213L488 177ZM425.6 201L290.4 123L290.4 135L425.6 213Z",
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
