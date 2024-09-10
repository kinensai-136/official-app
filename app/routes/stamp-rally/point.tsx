import { CheckCircleIcon } from "@heroicons/react/24/solid"

export default function Point() {
  return (
    <div className="mx-2 mt-8">
      <div className="rounded-md border bg-dark-200 p-4">
        <div className="text-white">
          <div className="ml-1 mt-2 text-xl font-semibold">
            <h1>スタンプの位置</h1>
          </div>
          <div className="my-3 ml-1">
            <ul>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">高校校舎1階、家庭科室前</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">高校校舎2階、コミュニケーションルーム前</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">高校校舎3階、エレベーター付近</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">中学校舎1階、教材室前</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">中学校舎2階、学習室前</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">中学校舎3階、学習室付近</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">中学校舎5階、高校音楽室前</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">講堂2階、講堂入口付近</p>
              </li>
              <li className="mt-3 flex items-center">
                <div className="size-7 shrink-0 text-primary-200">
                  <CheckCircleIcon />
                </div>
                <p className="mx-1">中学グラウンド、ステージ付近</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
