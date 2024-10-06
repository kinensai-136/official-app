import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { SearchButton } from "~/routes/home/search-button"
import { FavoriteSection } from "~/routes/home/sections/favorite-section"
import { InformationSection } from "~/routes/home/sections/information-section"
import { OptionsSection } from "~/routes/home/sections/options-section"
import { RecommendSection } from "~/routes/home/sections/recommend-section"
import { SurveySection } from "~/routes/home/sections/survey-section"

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="space-y-5">
            <HeaderBarTitle>本当にありがとう！</HeaderBarTitle>
            <SearchButton />
          </div>
        </HeaderBar>
      </header>
      <main className="px-5">
        <InformationSection>
          当アプリが対象とする「136周年記念祭」は2024年9月29日に終了いたしました。現在当アプリは閲覧専用モードとなっております。
        </InformationSection>
        <SurveySection />
        <RecommendSection />
        <FavoriteSection />
        <OptionsSection />
      </main>
    </>
  )
}
