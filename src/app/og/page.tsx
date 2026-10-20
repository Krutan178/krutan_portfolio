import { KlMark } from "@/components/kl-mark"

export default function Page() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="mx-auto flex h-screen flex-col items-center justify-center md:max-w-3xl">
        <KlMark className="size-32 text-foreground" />
      </div>
    </div>
  )
}
