export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <rect x="24" y="20" width="20" height="88" rx="2" />
      <path d="M52 64L84 24H106L68 70L108 108H86L52 74V64Z" />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="currentColor"><rect x="24" y="20" width="20" height="88" rx="2"/><path d="M52 64L84 24H106L68 70L108 108H86L52 74V64Z"/></svg>`
}
