import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { SearchButton } from "~/routes/_index/search-button"
import { FavoriteSection } from "~/routes/_index/sections/favorite-section"
import { RecommendSection } from "~/routes/_index/sections/recommend-section"

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
      <main className="space-y-5 px-5">
        <RecommendSection />
        <FavoriteSection />
      </main>
    </>
  )
}
