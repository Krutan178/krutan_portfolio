export function ChanhDaiWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 100"
      fill="currentColor"
      {...props}
    >
      <text
        x="0"
        y="75"
        fontFamily="monospace"
        fontWeight="800"
        fontSize="72"
        letterSpacing="0.1em"
      >
        KRUTAN
      </text>
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 100" fill="currentColor"><text x="0" y="75" font-family="monospace" font-weight="800" font-size="72" letter-spacing="0.1em">KRUTAN</text></svg>`
}
