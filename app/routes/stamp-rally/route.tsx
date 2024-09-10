import { Plugins } from "@capacitor/core"
import { QrCodeIcon } from "@heroicons/react/24/solid"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import Card from "~/routes/stamp-rally/card"
import Point from "~/routes/stamp-rally/point"

const { BarcodeScanner } = Plugins

export default function Page() {
  const scan = async () => {
    const result = await BarcodeScanner.scan

    if (result.hasContent) {
      const response = await fetch("/api/stamp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrcode: result.content }),
      })

      const data = await response.json()

      if (data.success) {
        alert("スタンプを獲得しました")
      } else {
        alert("すでにスタンプを獲得しています")
      }
    }
  }
  return (
    <>
      <header className="sticky top-0">
        <HeaderBar>
          <HeaderBarTitle>スタンプラリー</HeaderBarTitle>
        </HeaderBar>
      </header>
      <main className="p-4">
        <div className="mx-4">
          <div className="mx-7 mt-4 text-center font-semibold text-white">
            <p>9つ全て集めると、記念祭オリジナル壁紙GET!</p>
          </div>
          <div className="flex items-center justify-center">
            <Card />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={scan}
            className="mt-6 flex items-center justify-center rounded-md bg-primary-200 px-5 py-4 text-lg text-white"
          >
            <div className="size-7">
              <QrCodeIcon />
            </div>
            <div className="ml-2 text-center text-sm">スタンプを集める</div>
          </button>
        </div>
        <Point />
        <div className="mx-2 mt-10">
          <div className="rounded-md border bg-dark-200 p-4">
            <div className="text-white">
              <div className="ml-1 mt-2 text-xl font-semibold">
                <h1>スタンプの集め方</h1>
              </div>
              <div className="my-3 ml-1">
                <ol className="">
                  <li className="my-2">
                    ①「スタンプの位置」に書かれている場所へ移動
                  </li>
                  <li className="my-2">
                    ②
                    上にあるカメラボタンを押してQRコードを読み取ると、スタンプGET
                  </li>
                  <li className="my-2">
                    ③ 9つ全て集めると、記念祭オリジナル壁紙GET!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
