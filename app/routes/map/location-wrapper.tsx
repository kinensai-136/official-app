import { ReactNode, useEffect, useMemo, useRef } from "react"
import { useControls } from "react-zoom-pan-pinch"

import { useSearchParams } from "@remix-run/react"

import { ProgramDrawer } from "~/components/program/program-drawer"
import { useProgram } from "~/services/program/program-hook"

type Props = {
  location: string
  children: ReactNode
}

export function LocationWrapper({ location, children }: Props) {
  const { programs } = useProgram()
  const { zoomToElement } = useControls()
  const [searchParams, setSearchParams] = useSearchParams()
  const elementId = useMemo(() => Math.random().toString(), [])
  const elementRef = useRef<SVGGElement>(null)
  const focusedLocation = searchParams.get("focusedLocation")
  const program = Object.values(programs)
    .flat()
    .find((program) => program.location === location)
  const handleClick = () => {
    setSearchParams((prev) => {
      prev.set("focusedLocation", location)
      return prev
    })
  }
  useEffect(() => {
    const children = elementRef.current?.children.item(0)
    if (children) {
      if (location === focusedLocation) {
        children.classList.add("fill-primary-100")
        setTimeout(() => zoomToElement(elementId, 3.0), 0.2 * 1000)
      } else {
        children.classList.remove("fill-primary-100")
      }
    }
    /**zoomToElementを依存配列に入れると、階層横断時に再度呼び出されてしまう
     * そのため依存配列から除外しているが、eslintは警告を出してきます
     */
  }, [location, elementId, focusedLocation])
  if (program) {
    return (
      <g id={elementId} ref={elementRef} onClick={handleClick}>
        <ProgramDrawer program={program}>{children}</ProgramDrawer>
      </g>
    )
  } else {
    return children
  }
}
