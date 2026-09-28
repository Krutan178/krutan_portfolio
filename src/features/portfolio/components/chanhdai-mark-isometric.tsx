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
          {/* Top face of Letter K */}
          <path d="M240 14L288 41.71L230.4 74.96L345.6 74.96L393.6 102.67L240 113.76L201.6 213.51L153.6 185.8L163.2 113.76L96 152.55L48 124.84Z" />
          {/* Top face of Letter L */}
          <path d="M441.6 130.38L489.6 158.09L345.6 241.22L441.6 296.64L393.6 324.35L249.6 241.22Z" />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: "M240 14L288 41.71L230.4 74.96L345.6 74.96L393.6 102.67L240 113.76L201.6 213.51L153.6 185.8L163.2 113.76L96 152.55L48 124.84Z M441.6 130.38L489.6 158.09L345.6 241.22L441.6 296.64L393.6 324.35L249.6 241.22Z M48 124.84L48 150.84M96 152.55L96 178.55M153.6 185.8L153.6 211.8M201.6 213.51L201.6 239.51M393.6 102.67L393.6 128.67M249.6 241.22L249.6 267.22M393.6 324.35L393.6 350.35M441.6 296.64L441.6 322.64 M48 150.84L96 178.55M153.6 211.8L201.6 239.51M249.6 267.22L393.6 350.35L441.6 322.64",
            },
            pressed: {
              d: "M240 28L288 55.71L230.4 88.96L345.6 88.96L393.6 116.67L240 127.76L201.6 227.51L153.6 199.8L163.2 127.76L96 166.55L48 138.84Z M441.6 144.38L489.6 172.09L345.6 255.22L441.6 310.64L393.6 338.35L249.6 255.22Z M48 138.84L48 150.84M96 166.55L96 178.55M153.6 199.8L153.6 211.8M201.6 227.51L201.6 239.51M393.6 116.67L393.6 128.67M249.6 255.22L249.6 267.22M393.6 338.35L393.6 350.35M441.6 310.64L441.6 322.64 M48 150.84L96 178.55M153.6 211.8L201.6 239.51M249.6 267.22L393.6 350.35L441.6 322.64",
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
              d: "M48 124.84L96 152.55L96 178.55L48 150.84ZM153.6 185.8L201.6 213.51L201.6 239.51L153.6 211.8ZM240 113.76L393.6 102.67L393.6 128.67L240 139.76ZM163.2 113.76L153.6 185.8L153.6 211.8L163.2 139.76ZM249.6 241.22L393.6 324.35L393.6 350.35L249.6 267.22ZM393.6 324.35L441.6 296.64L441.6 322.64L393.6 350.35ZM345.6 241.22L441.6 296.64L441.6 322.64L345.6 267.22Z",
            },
            pressed: {
              d: "M48 138.84L96 166.55L96 178.55L48 150.84ZM153.6 199.8L201.6 227.51L201.6 239.51L153.6 211.8ZM240 127.76L393.6 116.67L393.6 128.67L240 139.76ZM163.2 127.76L153.6 199.8L153.6 211.8L163.2 139.76ZM249.6 255.22L393.6 338.35L393.6 350.35L249.6 267.22ZM393.6 338.35L441.6 310.64L441.6 322.64L393.6 350.35ZM345.6 255.22L441.6 310.64L441.6 322.64L345.6 267.22Z",
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
