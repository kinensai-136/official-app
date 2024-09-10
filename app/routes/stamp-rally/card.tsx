export default function Card() {
  return (
    <div className="mt-7 w-[90%] rounded-md border border-white bg-dark-300">
      <div className="flex">
        <div className="ml-auto mt-[10%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            {/*本来はこのdivがスタンプの要素になるため、
        その部分の実装時には変更する必要あり。
        以下の8つについては略します*/}
            <p>1</p>
          </div>
        </div>
        <div className="mt-[22.5%] w-[5%] justify-center border-t-2 border-dashed border-white text-white"></div>
        <div className="mt-[10%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>2</p>
          </div>
        </div>
        <div className="mt-[22.5%] w-[5%] border-t-2 border-dashed border-white text-white"></div>
        <div className="mr-auto mt-[10%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>3</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-[5%] w-[55%] -rotate-12 border-t-2 border-dashed border-white"></div>
      <div className="flex">
        <div className="ml-auto mt-[5%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>4</p>
          </div>
        </div>
        <div className="mt-[17.5%] w-[5%] border-t-2 border-dashed border-white text-white"></div>
        <div className="mt-[5%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>5</p>
          </div>
        </div>
        <div className="mt-[17.5%] w-[5%] border-t-2 border-dashed border-white text-white"></div>
        <div className="mr-auto mt-[5%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>6</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-[5%] w-[55%] -rotate-12 border-t-2 border-dashed border-white"></div>
      <div className="mb-4 flex">
        <div className="ml-auto mt-[5%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>7</p>
          </div>
        </div>
        <div className="mt-[17.5%] w-[5%] border-t-2 border-dashed border-white text-white"></div>
        <div className="mt-[5%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>8</p>
          </div>
        </div>
        <div className="mt-[17.5%] w-[5%] border-t-2 border-dashed border-white text-white"></div>
        <div className="mr-auto mt-[5%] aspect-square size-1/4 rounded-full border border-white">
          <div className="ml-[10%] mt-[10%] flex size-4/5 items-center justify-center rounded-full border border-white bg-yellow">
            <p>9</p>
          </div>
        </div>
      </div>
    </div>
  )
}
