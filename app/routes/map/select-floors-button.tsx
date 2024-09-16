import clsx from "clsx"

type Props = {
  nowFloor: number
  scrollToFloor: (floor: number) => void
}

export function SelectFloorsButton({ nowFloor, scrollToFloor }: Props) {
  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex flex-col rounded-full border border-dark-300 bg-dark-200/60 p-0.5 backdrop-blur-sm">
        {["4-5", "3", "2", "1"].map((floor, index) => (
          <Item
            key={floor}
            floor={4 - index}
            label={`${floor}F`}
            nowFloor={nowFloor}
            scrollToFloor={scrollToFloor}
          />
        ))}
      </div>
      <div className="flex flex-col rounded-full border border-dark-300 bg-dark-200/60 p-0.5 backdrop-blur-sm">
        <Item
          floor={0}
          label="模擬店"
          nowFloor={nowFloor}
          scrollToFloor={scrollToFloor}
        />
      </div>
      <Selector nowFloor={nowFloor} />
    </div>
  )
}

function Item({
  floor,
  label,
  nowFloor,
  scrollToFloor,
}: {
  floor: number
  label: string
  nowFloor: number
  scrollToFloor: (floor: number) => void
}) {
  return (
    <button onClick={() => scrollToFloor(floor)}>
      <div className="flex size-14 items-center justify-center">
        <p
          className={
            nowFloor === floor ? "font-medium text-white" : "text-dark-500"
          }
        >
          {label}
        </p>
      </div>
    </button>
  )
}

function Selector({ nowFloor }: { nowFloor: number }) {
  const styles = [
    "translate-y-[calc(400%+15px)]",
    "translate-y-[300%]",
    "translate-y-[200%]",
    "translate-y-[100%]",
    "translate-y-[000%]",
  ]
  return (
    <div
      className={clsx(
        "absolute right-[3px] top-0.5 size-14 rounded-full bg-white/20 transition",
        styles[nowFloor]
      )}
    />
  )
}
