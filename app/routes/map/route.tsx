import { useRef, useState } from "react"
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch"

import { useThrottle } from "@uidotdev/usehooks"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { SelectFloorsButton } from "~/routes/map/select-floors-button"

export default function Page() {
  const [rawNowFloor, setNowFloor] = useState(2)
  const nowFloor = useThrottle(rawNowFloor, 0.1 * 1000)
  const ref = useRef<ReactZoomPanPinchRef>(null)
  const scrollToFloor = (floor: number) => {
    const minY = ref.current?.instance.bounds?.minPositionY ?? 0
    const maxY = ref.current?.instance.bounds?.maxPositionY ?? 0
    const x = ref.current?.state?.positionX ?? 0
    const scale = ref.current?.state?.scale ?? 1
    ref.current?.setTransform(x, ((minY - maxY) / 4) * (4 - floor), scale)
  }
  const handleTransform = (ref: ReactZoomPanPinchRef) => {
    const minY = ref.instance.bounds?.minPositionY ?? 0
    const maxY = ref.instance.bounds?.maxPositionY ?? 0
    const y = ref.state.positionY
    let floor = Math.floor(((y - minY) / (maxY - minY)) * 5)
    if (floor > 4) floor = 4
    if (floor < 0) floor = 0
    setNowFloor(floor)
  }
  return (
    <>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="flex justify-between">
            <HeaderBarTitle>マップ</HeaderBarTitle>
          </div>
        </HeaderBar>
      </header>
      <div className="fixed left-5 top-[calc(env(safe-area-inset-top)+95px)] z-40">
        <SelectFloorsButton nowFloor={nowFloor} scrollToFloor={scrollToFloor} />
      </div>
      <main className="fixed inset-0 m-auto h-dvh w-dvw">
        <TransformWrapper
          ref={ref}
          centerOnInit
          onTransformed={handleTransform}
        >
          <TransformComponent wrapperStyle={{ height: "100%", width: "100%" }}>
            <div className="h-dvh w-dvw bg-[#ffff00]" />
            <div className="h-dvh w-dvw bg-[#ff0000]" />
            <div className="h-dvh w-dvw bg-[#ff00ff]" />
            <div className="h-dvh w-dvw bg-[#0000ff]" />
            <div className="h-dvh w-dvw bg-[#00ffff]" />
          </TransformComponent>
        </TransformWrapper>
      </main>
    </>
  )
}
