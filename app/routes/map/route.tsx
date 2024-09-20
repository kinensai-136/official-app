import { useState } from "react"
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch"

import { useThrottle } from "@uidotdev/usehooks"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import Map1F from "~/routes/map/map-1f"
import Map2F from "~/routes/map/map-2f"
import Map3F from "~/routes/map/map-3f"
import Map45F from "~/routes/map/map-45f"
import { SelectFloorsButton } from "~/routes/map/select-floors-button"

export default function Page() {
  const [rawNowFloor, setRawNowFloor] = useState(2)
  const [mapRef, setMapRef] = useState<ReactZoomPanPinchRef | null>(null)
  const nowFloor = useThrottle(rawNowFloor, 0.1 * 1000)
  const scrollToFloor = (floor: number) => {
    const minY = mapRef?.instance.bounds?.minPositionY ?? 0
    const maxY = mapRef?.instance.bounds?.maxPositionY ?? 0
    const x = mapRef?.state?.positionX ?? 0
    const scale = mapRef?.state?.previousScale ?? 1
    mapRef?.setTransform(x, ((minY - maxY) / 4) * (4 - floor), scale)
  }
  const handleTransform = (ref: ReactZoomPanPinchRef) => {
    const minY = ref.instance.bounds?.minPositionY ?? 0
    const maxY = ref.instance.bounds?.maxPositionY ?? 0
    const y = ref.state.positionY
    let floor = Math.floor(((y - minY) / (maxY - minY)) * 5)
    if (floor > 4) floor = 4
    if (floor < 0) floor = 0
    setRawNowFloor(floor)
    setMapRef(ref)
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
        <TransformWrapper centerOnInit onTransformed={handleTransform}>
          <TransformComponent wrapperStyle={{ height: "100%", width: "100%" }}>
            <Map45F />
            <Map3F />
            <Map2F />
            <Map1F />
            <div className="flex h-dvh w-dvw items-center justify-center bg-dark-200">
              <p className="text-sm text-white">
                今後のアップデートで利用可能になります
              </p>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </main>
    </>
  )
}
