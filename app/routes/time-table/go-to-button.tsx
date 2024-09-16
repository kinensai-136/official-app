import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"
import { Link } from "@remix-run/react"

type Props = {
  to: string
  children: string
}

export function GoToButton({ to, children }: Props) {
  return (
    <>
      <div className="h-20" />
      <div className="fixed inset-x-0 bottom-[calc(75px+env(safe-area-inset-bottom))] z-40 mx-auto px-4">
        <Link
          to={to}
          className="flex w-full items-center justify-center gap-4 rounded bg-primary-100 p-3.5 text-white"
        >
          <ArrowRightCircleIcon className="size-8" />
          <p className="text-lg font-medium">{children}へ行く</p>
        </Link>
      </div>
    </>
  )
}
