export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512 256"
      aria-hidden
      {...props}
    >
      {/* Letter K */}
      <path d="M32 0h64v256H32ZM160 0h64v64h-64ZM95 63h66v130H95ZM160 192h64v64h-64Z" />
      {/* Letter L */}
      <path d="M288 0h64v192h128v64H288Z" />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 256"><path d="M32 0h64v256H32ZM160 0h64v64h-64ZM95 63h66v130H95ZM160 192h64v64h-64ZM288 0h64v192h128v64H288Z"/></svg>`
}
