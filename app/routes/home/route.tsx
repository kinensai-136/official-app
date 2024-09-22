import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { SearchButton } from "~/routes/home/search-button"
import { FavoriteSection } from "~/routes/home/sections/favorite-section"
import { RecommendSection } from "~/routes/home/sections/recommend-section"

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="space-y-5">
            <HeaderBarTitle>記念祭へようこそ！</HeaderBarTitle>
            <SearchButton />
          </div>
        </HeaderBar>
      </header>
      <main className="px-5">
        <RecommendSection />
        <FavoriteSection />
      </main>
    </>
  )
}
