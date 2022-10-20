import Link from "next/link"
import Container from "@/components/Base/Container"

export default function CharacterPage() {
  return (
    <Container wrap title="[character] | SP">
      <div>
        <Link href="/characters">
<a className="">YAYYYYYY</a>

				</Link>
      </div>
      <div className="flex items-center gap-6 mt-6">
        <div className="h-[175px] w-[175px] bg-purple-400 rounded-full"></div>
        <div className="flex flex-col gap-y-3">
          <h2 className="text-4xl">Character Name</h2>
          <span className="inline-block mr-auto text-sm px-3 py-1 bg-violet-700 rounded-2xl">
            Character with most comic appearances
          </span>
          <div className="flex gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl">123</span>{" "}
              <span className="text-sm">appearances</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl">123</span>{" "}
              <span className="text-sm">chapter arcs</span>
            </div>
          </div>
        </div>
      </div>
      <div>yes</div>
    </Container>
  )
}
