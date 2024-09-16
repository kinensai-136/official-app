import {
  ArrowRightCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import { Link } from "@remix-run/react"

export default function Page() {
  return (
    <div className="z-50">
      <div className="flex flex-col items-center text-yellow">
        <div className="mt-11 inline-block size-24">
          <ExclamationTriangleIcon />
        </div>
        <div className="mb-5 text-center text-[3rem] font-semibold">
          <h1>緊急情報</h1>
        </div>
      </div>
      <div className="text-dark-500">
        <hr></hr>
      </div>
      <div className="items-center">
        <div className="mx-10 my-5 text-start text-[1.7rem] font-semibold text-white">
          <p>
            災害など不測の事態が発生したため、通常の情報更新を停止しています。
          </p>
        </div>
        <div className="mx-[1.95rem] mt-10 text-start text-[1.8rem] font-semibold text-yellow">
          <p>・落ち着いて行動してください</p>
          <br></br>
          <p>・実行委員の指示に従ってください</p>
        </div>
        <div className="justify-center align-middle text-[1.65rem] text-white">
          <div className="flex justify-center">
            <Link to="/emergency_map">
              <button className="mx-10 mt-12 flex rounded-md bg-[#00b06b]">
                <div className="my-1 ml-2 size-11">
                  <ArrowRightCircleIcon />
                </div>
                <div className="my-1 mb-2 ml-1.5 mr-3 font-semibold">
                  避難経路を確認する
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
