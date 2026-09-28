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
          <path d="M15 190L70.43 158L131.39 193.2L131.39 122.8L175.73 97.2L186.82 186.8L342.01 193.2L297.67 218.8L175.73 218.8L236.7 254L181.28 286Z" />
          {/* Top face of Letter L (Top-Right) */}
          <path d="M203.45 81.2L258.87 49.2L369.72 113.2L469.49 55.6L524.92 87.6L369.72 177.2Z" />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: "M15 190L70.43 158L131.39 193.2L131.39 122.8L175.73 97.2L186.82 186.8L342.01 193.2L297.67 218.8L175.73 218.8L236.7 254L181.28 286Z M203.45 81.2L258.87 49.2L369.72 113.2L469.49 55.6L524.92 87.6L369.72 177.2Z M15 190L15 218 M181.28 286L181.28 314 M236.7 254L236.7 282 M297.67 218.8L297.67 246.8 M342.01 193.2L342.01 221.2 M175.73 97.2L175.73 125.2 M203.45 81.2L203.45 109.2 M369.72 177.2L369.72 205.2 M524.92 87.6L524.92 115.6 M469.49 55.6L469.49 83.6 M369.72 113.2L369.72 141.2 M181.28 314L236.7 282 M297.67 246.8L342.01 221.2 M15 218L181.28 314 M369.72 205.2L524.92 115.6 M524.92 115.6L469.49 83.6 M203.45 109.2L369.72 205.2",
            },
            pressed: {
              d: "M15 204L70.43 172L131.39 207.2L131.39 136.8L175.73 111.2L186.82 200.8L342.01 207.2L297.67 232.8L175.73 232.8L236.7 268L181.28 300Z M203.45 95.2L258.87 63.2L369.72 127.2L469.49 69.6L524.92 101.6L369.72 191.2Z M15 204L15 218 M181.28 300L181.28 314 M236.7 268L236.7 282 M297.67 232.8L297.67 246.8 M342.01 207.2L342.01 221.2 M175.73 111.2L175.73 125.2 M203.45 95.2L203.45 109.2 M369.72 191.2L369.72 205.2 M524.92 101.6L524.92 115.6 M469.49 69.6L469.49 83.6 M369.72 127.2L369.72 141.2 M181.28 314L236.7 282 M297.67 246.8L342.01 221.2 M15 218L181.28 314 M369.72 205.2L524.92 115.6 M524.92 115.6L469.49 83.6 M203.45 109.2L369.72 205.2",
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
              d: "M342.01 193.2L297.67 218.8L297.67 246.8L342.01 221.2ZM236.7 254L181.28 286L181.28 314L236.7 282ZM186.82 186.8L342.01 193.2L342.01 221.2L186.82 214.8ZM175.73 218.8L236.7 254L236.7 282L175.73 246.8ZM297.67 218.8L175.73 218.8L175.73 246.8L297.67 246.8ZM131.39 193.2L131.39 122.8L131.39 150.8L131.39 221.2ZM524.92 87.6L369.72 177.2L369.72 205.2L524.92 115.6ZM469.49 55.6L524.92 87.6L524.92 115.6L469.49 83.6ZM258.87 49.2L369.72 113.2L369.72 141.2L258.87 77.2Z",
            },
            pressed: {
              d: "M342.01 207.2L297.67 232.8L297.67 246.8L342.01 221.2ZM236.7 268L181.28 300L181.28 314L236.7 282ZM186.82 200.8L342.01 207.2L342.01 221.2L186.82 214.8ZM175.73 232.8L236.7 268L236.7 282L175.73 246.8ZM297.67 232.8L175.73 232.8L175.73 246.8L297.67 246.8ZM131.39 207.2L131.39 136.8L131.39 150.8L131.39 221.2ZM524.92 101.6L369.72 191.2L369.72 205.2L524.92 115.6ZM469.49 69.6L524.92 101.6L524.92 115.6L469.49 83.6ZM258.87 63.2L369.72 127.2L369.72 141.2L258.87 77.2Z",
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
