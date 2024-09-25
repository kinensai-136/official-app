type Props = {
  videoId: string
}

export function LiveEmbed({ videoId }: Props) {
  return (
    <div className="relative rounded outline outline-1 outline-dark-200">
      <div className="absolute top-0 h-1/3 w-full" />
      <div className="absolute bottom-0 h-1/3 w-full" />
      <iframe
        src={`https://youtube.com/embed/${videoId}?controls=0&playsinline=0&fs=1`}
        className="aspect-video w-full rounded"
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
