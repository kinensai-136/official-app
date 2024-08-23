import toast from "react-hot-toast"

import { XMarkIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

export function showToast(message: string) {
  toast.custom(
    (t) => (
      <div
        className={clsx(
          "flex w-full items-center justify-between gap-8 rounded-sm bg-dark-300/80 pl-5 backdrop-blur-lg",
          t.visible ? "animate-enter" : "animate-leave"
        )}
      >
        <p className="font-medium text-white">{message}</p>
        <XMarkIcon
          className="size-16 p-5 text-dark-500"
          onClick={() => toast.remove(t.id)}
        />
      </div>
    ),
    { duration: 2000 }
  )
}
