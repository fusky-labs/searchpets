import { parseRegex } from "@/utils/TextParsers"

export default function CharacterItem({ name }: { name?: string }) {
  return (
    <div className="px-3 py-2 rounded-md border-2" id={parseRegex(name)}>
      {name}
    </div>
  )
}
