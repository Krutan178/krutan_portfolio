import { USER } from "@/features/portfolio/data/user"

import { FlipSentences } from "./flip-sentences"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom flex flex-col border-x screen-line-bottom-border after:z-1 sm:flex-row sm:items-end">
      <div className="shrink-0 border-b border-line sm:border-r sm:border-b-0">
        <div className="p-4 sm:p-5">
          <div className="relative size-28 rounded-full sm:size-36">
            <img
              className="size-full rounded-[inherit] object-cover select-none"
              src={USER.avatar}
              alt={USER.displayName}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring-1 inset-ring-foreground/30 dark:inset-ring-foreground/10" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <div className="flex items-center gap-2 p-4 pb-2.5 sm:px-6">
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {USER.displayName}
          </h1>

          <VerifiedIcon className="size-4.5 select-none" aria-hidden />

          {USER.namePronunciationUrl && (
            <PronounceMyName
              namePronunciationUrl={USER.namePronunciationUrl}
            />
          )}
        </div>

        <FlipSentences className="h-10 border-t border-line py-2 pl-4 sm:px-6">
          {USER.flipSentences}
        </FlipSentences>
      </div>
    </div>
  )
}
