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
              y: 16,
            },
          }}
          transition={transition}
        >
          {/* K top faces */}
          <path d="M222.20 128.58L277.63 160.58L55.93 288.58L0.51 256.58Z" />
          <path d="M222.20 192.58L277.63 224.58L166.78 288.58L111.36 256.58Z" />
          <path d="M333.05 192.58L388.48 224.58L333.05 256.58L277.63 224.58Z" />
          <path d="M166.78 288.58L222.20 320.58L166.78 352.58L111.36 320.58Z" />
          {/* L top faces */}
          <path d="M499.33 32.58L554.75 64.58L333.05 192.58L277.63 160.58Z" />
          <path d="M388.48 160.58L554.75 256.58L499.33 288.58L333.05 192.58Z" />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                // K outline
                "M222.20 128.58L277.63 160.58L222.20 192.58L277.63 224.58L333.05 192.58L388.48 224.58L333.05 256.58L277.63 224.58L277.63 224.58L333.05 256.58L277.63 288.58L222.20 320.58L166.78 352.58L111.36 320.58L166.78 288.58L111.36 256.58L55.93 288.58L0.51 256.58L222.20 128.58",
                // K vertical drop edges
                "M0.51 256.58V288.58",
                "M55.93 288.58V320.58",
                "M111.36 320.58V352.58",
                "M166.78 352.58V384.58",
                "M0.51 288.58L55.93 320.58",
                "M111.36 352.58L166.78 384.58",
                // L outline
                "M499.33 32.58L554.75 64.58L388.48 160.58L554.75 256.58L499.33 288.58L333.05 192.58L333.05 192.58L277.63 160.58L499.33 32.58",
                // L vertical drop edges
                "M333.05 192.58V224.58",
                "M499.33 288.58V320.58",
                "M554.75 256.58V288.58",
                "M333.05 224.58L499.33 320.58L554.75 288.58",
              ].join(""),
            },
            pressed: {
              d: [
                // K outline pressed (+16y on top)
                "M222.20 144.58L277.63 176.58L222.20 208.58L277.63 240.58L333.05 208.58L388.48 240.58L333.05 272.58L277.63 240.58L277.63 240.58L333.05 272.58L277.63 304.58L222.20 336.58L166.78 368.58L111.36 336.58L166.78 304.58L111.36 272.58L55.93 304.58L0.51 272.58L222.20 144.58",
                // K vertical drop edges
                "M0.51 272.58V288.58",
                "M55.93 304.58V320.58",
                "M111.36 336.58V352.58",
                "M166.78 368.58V384.58",
                "M0.51 288.58L55.93 320.58",
                "M111.36 352.58L166.78 384.58",
                // L outline pressed (+16y on top)
                "M499.33 48.58L554.75 80.58L388.48 176.58L554.75 272.58L499.33 304.58L333.05 208.58L333.05 208.58L277.63 176.58L499.33 48.58",
                // L vertical drop edges
                "M333.05 208.58V224.58",
                "M499.33 304.58V320.58",
                "M554.75 272.58V288.58",
                "M333.05 224.58L499.33 320.58L554.75 288.58",
              ].join(""),
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

      {/* Dashed background isometric grid lines */}
      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/* 3D Vertical Extrusion Drop Faces */}
      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        {/* K stem bottom drop face */}
        <motion.path
          variants={{
            normal: {
              d: "M0.51 256.58L55.93 288.58V320.58L0.51 288.58Z",
            },
            pressed: {
              d: "M0.51 272.58L55.93 304.58V320.58L0.51 288.58Z",
            },
          }}
          transition={transition}
        />
        {/* K lower arm drop face */}
        <motion.path
          variants={{
            normal: {
              d: "M111.36 320.58L166.78 352.58V384.58L111.36 352.58Z",
            },
            pressed: {
              d: "M111.36 336.58L166.78 368.58V384.58L111.36 352.58Z",
            },
          }}
          transition={transition}
        />
        {/* L foot front drop face */}
        <motion.path
          variants={{
            normal: {
              d: "M333.05 192.58L499.33 288.58V320.58L333.05 224.58Z",
            },
            pressed: {
              d: "M333.05 208.58L499.33 304.58V320.58L333.05 224.58Z",
            },
          }}
          transition={transition}
        />
        {/* L foot right end drop face */}
        <motion.path
          variants={{
            normal: {
              d: "M554.75 256.58L499.33 288.58V320.58L554.75 288.58Z",
            },
            pressed: {
              d: "M554.75 272.58L499.33 304.58V320.58L554.75 288.58Z",
            },
          }}
          transition={transition}
        />
      </g>

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />
    </motion.svg>
  )
}

export default ChanhDaiMarkIsometric
