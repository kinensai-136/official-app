type Props = {
  children: string
}

export function DayTip({ children }: Props) {
  return (
    <div className="sticky top-[calc(env(safe-area-inset-top)+8.5rem)] z-10 mx-20 my-5 rounded-sm border border-dark-300 bg-white/5 p-2 backdrop-blur">
      <p className="text-center text-white">{children}</p>
    </div>
  )
}
