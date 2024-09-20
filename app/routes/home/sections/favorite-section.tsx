import { Link } from "@remix-run/react"

import { ProgramCard } from "~/components/program/program-card"
import { useFavorite } from "~/services/favorite/favorite-hook"

export function FavoriteSection() {
  const { favoritePrograms } = useFavorite()
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="px-0.5 text-xl font-medium text-white">お気に入り</h2>
        <p className="text-dark-600">{favoritePrograms.length}つを追加済み</p>
      </div>
      <ul className="-mb-3 flex gap-2 overflow-scroll pb-3">
        {favoritePrograms.length > 0 ? (
          favoritePrograms.map((program) => (
            <li key={program._id} className="w-56 min-w-56">
              <ProgramCard program={program} />
            </li>
          ))
        ) : (
          <p className="w-full p-4 text-center text-dark-400">
            まだお気に入りに何もありません
            <br />
            <Link to="/home/search" className="text-primary-300">
              企画を探して
            </Link>
            みませんか？
          </p>
        )}
      </ul>
    </section>
  )
}
