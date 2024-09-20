import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"

import { SendCommentDrawer } from "~/components/program/send-comment-drawer"
import { Program } from "~/services/program/program.type"

type Props = {
  program: Program
}

export function SendCommentButton({ program }: Props) {
  return (
    <SendCommentDrawer program={program}>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-sm bg-dark-300 p-3 text-primary-200"
      >
        <ChatBubbleLeftRightIcon className="size-7" />
        <p className="text-lg font-semibold">感想コメントを送る</p>
      </button>
    </SendCommentDrawer>
  )
}
