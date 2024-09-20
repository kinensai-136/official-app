import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { ProgramCard } from "~/components/program/program-card"
import { CategoriesSelect } from "~/routes/home_.search/categories-select"
import { NotFoundCard } from "~/routes/home_.search/not-found-card"
import { SearchInput } from "~/routes/home_.search/search-input"
import { TagsSelect } from "~/routes/home_.search/tags-select"
import { useSearch } from "~/routes/home_.search/use-search"

export default function Page() {
  const { setText, setCategories, setTags, validTags, searchedPrograms } =
    useSearch()
  return (
    <>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="space-y-4">
            <div className="flex justify-between">
              <HeaderBarTitle>企画を探す</HeaderBarTitle>
              <CategoriesSelect onSelect={setCategories} />
            </div>
            <SearchInput onChange={setText} />
            <TagsSelect validTags={validTags} onSelect={setTags} />
          </div>
        </HeaderBar>
      </header>
      <main className="space-y-5 px-5 pt-2">
        <div className="w-full space-y-3">
          {searchedPrograms.length > 0 ? (
            searchedPrograms.map((program) => (
              <ProgramCard key={program._id} program={program} />
            ))
          ) : (
            <NotFoundCard />
          )}
        </div>
      </main>
    </>
  )
}
