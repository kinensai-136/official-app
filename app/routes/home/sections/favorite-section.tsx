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
        {favoritePrograms.map((program) => (
          <li key={program._id} className="w-56 min-w-56">
            <ProgramCard program={program} />
          </li>
        ))}
      </ul>
    </section>
  )
}
