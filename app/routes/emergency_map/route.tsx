import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"
import { Link } from "@remix-run/react"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"

// eslint-disable-next-line no-restricted-imports
import logo1 from "./svg/中高1F.svg"
// eslint-disable-next-line no-restricted-imports
import logo2 from "./svg/中高2F.svg"
// eslint-disable-next-line no-restricted-imports
import logo3 from "./svg/中高3F.svg"
// eslint-disable-next-line no-restricted-imports
import logo4 from "./svg/中高4／5F.svg"

export default function emap() {
  return (
    <>
      <header className="sticky top-0">
        <HeaderBar>
          <div className="flex items-center justify-around">
            <div className="p-2 text-2xl font-semibold text-white">
              <HeaderBarTitle>避難経路</HeaderBarTitle>
            </div>
            <div className="justify-center align-middle text-[1.65rem] text-white">
              <div className="flex justify-center">
                <Link to="/emergency">
                  <button className="flex rounded-md bg-[#00b06b]">
                    <div className="my-1 ml-2 size-11">
                      <ArrowLeftCircleIcon />
                    </div>
                    <div className="my-1 mb-2 ml-1.5 mr-3 font-semibold">
                      戻る
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </HeaderBar>
      </header>
      <main>
        <div className="mx-7 text-lg text-white">
          <p>1階</p>
          <div className="bg-[#ccc] p-3">
            <img src={logo1} alt="1階避難経路図"></img>
          </div>
          <br></br>
          <p>2階</p>
          <div className="bg-[#ccc] p-3">
            <img src={logo2} alt="2階避難経路図"></img>
          </div>
          <br></br>
          <p>3階</p>
          <div className="bg-[#ccc] p-3">
            <img src={logo3} alt="3階避難経路図"></img>
          </div>
          <br></br>
          <p>4・5階</p>
          <div className="bg-[#ccc] p-3">
            <img src={logo4} alt="4・5階避難経路図"></img>
          </div>
          <br></br>
          <p>
            ・講堂、百志館などからの避難は、実行委員の指示に従ってください。
          </p>
        </div>
      </main>
    </>
  )
}
