import { ChanhDaiMark } from "@/components/chanhdai-mark"

export default function Page() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="mx-auto flex h-screen flex-col items-center justify-center md:max-w-3xl">
        <ChanhDaiMark className="size-32 text-foreground" />
      </div>
    </div>
  )
}
