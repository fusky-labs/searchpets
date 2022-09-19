export default function ParseRegexId(output: string | undefined) {
  return output
    ?.replace(/(\s)|(\')/g, "-")
    .replace(/(\()|(\))|(\.)|(\")|(,)|(\?)|(\!)|(\')/g, "")
    .toLowerCase()
}
