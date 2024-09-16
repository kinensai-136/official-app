import { ReactNode, useState } from "react"

import { Checkbox, Field, Label, Textarea } from "@headlessui/react"
import { CheckIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { Drawer } from "vaul"

import { Information } from "~/components/program/drawer-parts/information"
import { useComment } from "~/services/comment/comment-hook"
import { Program } from "~/services/program/program.type"

type Props = {
  program: Program
  children: ReactNode
}

export function SendCommentDrawer({ program, children }: Props) {
  const { sendComment } = useComment()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isAccepted, setIsAccepted] = useState(false)
  const handleClick = async () => {
    if (isAccepted && input.length > 0) {
      await sendComment({
        body: input,
        program: program,
      })
      setIsOpen(false)
    }
  }
  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} disablePreventScroll>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-dark-100/70" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-40 flex h-4/5 flex-col gap-2 border-t border-dark-300 bg-dark-200 px-6 py-4 pb-16 text-white focus:outline-none">
          <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-dark-400" />
          <div className="flex-1 space-y-3">
            <Drawer.Title>
              <p className="leading-none text-dark-600">{program.title} へ</p>
              <p className="text-2xl font-bold">感想コメントを送る</p>
            </Drawer.Title>
            <div className="grid grid-cols-2 gap-1">
              {[
                "👍 面白かった！",
                "🔥 凄すぎる！",
                "📣 応援してます！",
                "🎉 最高でした！",
              ].map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => setInput(text)}
                  className="rounded-sm bg-dark-300 p-3"
                >
                  {text}
                </button>
              ))}
            </div>
            <Textarea
              rows={5}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="ここまでの準備と練習お疲れ様でした！"
              className="w-full rounded-sm border border-primary-300 bg-dark-300 px-4 py-3 focus:outline-none"
            />
            <Information>
              一部の企画を除き、後日主催者へ匿名で伝えられます。良識あるコメントを心がけましょう。
            </Information>
            <Field className="flex items-center gap-2 px-px">
              <Checkbox
                checked={isAccepted}
                onChange={setIsAccepted}
                className="group size-6 rounded-[0.3rem] border border-dark-400 p-0.5 data-[checked]:border-primary-100 data-[checked]:bg-primary-100"
              >
                <CheckIcon className="stroke-2 opacity-0 group-data-[checked]:opacity-100" />
              </Checkbox>
              <Label>注意事項に同意する</Label>
            </Field>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className={clsx(
              "flex w-full items-center justify-center gap-3 rounded-sm p-3.5",
              isAccepted && input.length > 0
                ? "bg-primary-100 font-semibold text-white"
                : "bg-dark-300 text-dark-400"
            )}
          >
            <PaperAirplaneIcon className="size-7" />
            <p className="text-lg">コメントを送信</p>
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
