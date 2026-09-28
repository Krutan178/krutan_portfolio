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
          <path d="M14.2 216.2L197.8 110.8L251.8 141.8L187 179L349 197.6L349 241L200.5 220.85L224.8 306.1L154.6 309.2L122.2 216.2L68.2 247.2Z" />
          {/* Top face of Letter L (Top-Right) */}
          <path d="M262.6 110.8L457 -0.8L511 30.2L381.4 104.6L457 148L392.2 185.2Z" />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: "M14.2 216.2L197.8 110.8L251.8 141.8L187 179L349 197.6L349 241L200.5 220.85L224.8 306.1L154.6 309.2L122.2 216.2L68.2 247.2Z M262.6 110.8L457 -0.8L511 30.2L381.4 104.6L457 148L392.2 185.2Z M251.8 141.8L251.8 167.8 M187 179L187 205 M349 241L349 267 M200.5 220.85L200.5 246.85 M224.8 306.1L224.8 332.1 M154.6 309.2L154.6 335.2 M122.2 216.2L122.2 242.2 M68.2 247.2L68.2 273.2 M14.2 216.2L14.2 242.2 M511 30.2L511 56.2 M381.4 104.6L381.4 130.6 M457 148L457 174 M392.2 185.2L392.2 211.2 M262.6 110.8L262.6 136.8 M251.8 167.8L187 205 M349 267L200.5 246.85 M224.8 332.1L154.6 335.2 M154.6 335.2L122.2 242.2 M122.2 242.2L68.2 273.2 M68.2 273.2L14.2 242.2 M511 56.2L381.4 130.6 M457 174L392.2 211.2 M392.2 211.2L262.6 136.8",
            },
            pressed: {
              d: "M14.2 230.2L197.8 124.8L251.8 155.8L187 193L349 211.6L349 255L200.5 234.85L224.8 320.1L154.6 323.2L122.2 230.2L68.2 261.2Z M262.6 124.8L457 13.2L511 44.2L381.4 118.6L457 162L392.2 199.2Z M251.8 155.8L251.8 167.8 M187 193L187 205 M349 255L349 267 M200.5 234.85L200.5 246.85 M224.8 320.1L224.8 332.1 M154.6 323.2L154.6 335.2 M122.2 230.2L122.2 242.2 M68.2 261.2L68.2 273.2 M14.2 230.2L14.2 242.2 M511 44.2L511 56.2 M381.4 118.6L381.4 130.6 M457 162L457 174 M392.2 199.2L392.2 211.2 M262.6 124.8L262.6 136.8 M251.8 167.8L187 205 M349 267L200.5 246.85 M224.8 332.1L154.6 335.2 M154.6 335.2L122.2 242.2 M122.2 242.2L68.2 273.2 M68.2 273.2L14.2 242.2 M511 56.2L381.4 130.6 M457 174L392.2 211.2 M392.2 211.2L262.6 136.8",
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
              d: "M251.8 141.8L187 179L187 205L251.8 167.8ZM349 241L200.5 220.85L200.5 246.85L349 267ZM224.8 306.1L154.6 309.2L154.6 335.2L224.8 332.1ZM154.6 309.2L122.2 216.2L122.2 242.2L154.6 335.2ZM122.2 216.2L68.2 247.2L68.2 273.2L122.2 242.2ZM68.2 247.2L14.2 216.2L14.2 242.2L68.2 273.2ZM511 30.2L381.4 104.6L381.4 130.6L511 56.2ZM457 148L392.2 185.2L392.2 211.2L457 174ZM392.2 185.2L262.6 110.8L262.6 136.8L392.2 211.2Z",
            },
            pressed: {
              d: "M251.8 155.8L187 193L187 205L251.8 167.8ZM349 255L200.5 234.85L200.5 246.85L349 267ZM224.8 320.1L154.6 323.2L154.6 335.2L224.8 332.1ZM154.6 323.2L122.2 230.2L122.2 242.2L154.6 335.2ZM122.2 230.2L68.2 261.2L68.2 273.2L122.2 242.2ZM68.2 261.2L14.2 230.2L14.2 242.2L68.2 273.2ZM511 44.2L381.4 118.6L381.4 130.6L511 56.2ZM457 162L392.2 199.2L392.2 211.2L457 174ZM392.2 199.2L262.6 124.8L262.6 136.8L392.2 211.2Z",
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
