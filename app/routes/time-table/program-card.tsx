export function ProgramCard() {
  return (
    <button className="m-auto block h-auto w-4/5 rounded-md bg-dark-300 p-5 text-left text-white hover:bg-dark-500">
      <div className="flex justify-between">
        <h1>とりしまりソケット</h1>
        <Bookmark />
      </div>
      {/*以下のmtの値を変更するとタイトルとタグに間隔が開きます*/}
      <div className="mt-3 flex">
        <div className="mr-1 w-auto rounded-md bg-dark-400 px-2 py-1 text-xs">
          <p>音楽祭</p>
        </div>
        <div className="mr-2 w-auto rounded-md bg-dark-400 px-2 py-1 text-xs">
          <p>実演</p>
        </div>
      </div>
    </button>
  )
}

function Bookmark() {
  const color = "transparent"
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
    </div>
  )
}
