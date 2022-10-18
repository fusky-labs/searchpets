interface LightboxProps {
  show?: boolean
  comicIndex: number
  comicsArray?: any
}

export default function Lightbox(props: LightboxProps) {
  return (
    <div
      className={`fixed inset-0 z-[55] ${
        !props.show ? "opacity-0 pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <div id="contents" className="relative z-[55]">
        <div id="lower-third">
          <h2>Title</h2>
          <span>date</span>
          <span>chapter</span>
          <span>characters</span>
        </div>
      </div>
      <div
        id="backdrop"
        className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50"
      ></div>
    </div>
  )
}
