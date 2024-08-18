import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { useFavorite } from "~/services/favorite/favorite-hook"
import { Program } from "~/services/program/program.type"

type Props = {
  program: Program
  size: "small" | "large"
}

export function FavoriteButton({ program, size }: Props) {
  const { isFavoriteProgram, favorProgram, disfavorProgram } = useFavorite()
  const isFavorite = isFavoriteProgram(program)
  const handleClick = () => {
    if (isFavorite) {
      disfavorProgram(program)
    } else {
      favorProgram(program)
    }
  }
  return (
    <button
      type="button"
      className={clsx(
        "-m-0.5 shrink-0 text-yellow",
        size === "small" && "size-10",
        size === "large" && "size-12"
      )}
      onClick={handleClick}
    >
      {isFavorite ? (
        <BookmarkIconSolid />
      ) : (
        <BookmarkIconOutline className="stroke-1" />
      )}
    </button>
  )
}
