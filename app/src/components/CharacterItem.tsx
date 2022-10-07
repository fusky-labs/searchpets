import { parseRegex } from "@/utils/TextParsers"

export default function CharacterItem({ name }: { name?: string }) {
  return (
    <div
      className="px-3 py-2 rounded-md border-2 flex justify-between items-center"
      id={parseRegex(name)}
      role="listitem"
      aria-label={`${name} has appeared 0 times overall`}
    >
      <span className="sr-only">{`${name} has appeared 0 times overall`}</span>
      <span>{name}</span>
      <span className="rounded-2xl py-1 px-2.5 bg-purple-900">0</span>
    </div>
  )
}
