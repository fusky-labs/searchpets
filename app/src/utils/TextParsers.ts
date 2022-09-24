/**
 * Parse Regex input for decernable URLs and CSS names
 */
export function parseRegex(input?: string) {
  return input
    ?.replace(/(\s)|(\')/g, "-")
    .replace(/(\()|(\/)|(\))|(\.)|(\")|(,)|(\?)|(\!)|(\')/g, "")
    .toLowerCase()
}

/**
 * Parses array of data and appending "and" from the last item
 * in the inputted array. Used for image alt texts for screen
 * readers.
 */
export function a11yCharArray(input: string[] | undefined) {
  const lastItem = input!.length - 1
  const newArr = [...input!]
  newArr.splice(lastItem, lastItem)

  const appendAnd = input!
    .slice(lastItem)
    .toString()
    .replace(input![lastItem], `and ${input![lastItem]}`)

  if (input!.length > 2) {
    return `${newArr.join(", ")}, ${appendAnd}`
  }

  if (input!.length !== 1) {
    return `${newArr.join(", ")} ${appendAnd}`
  }

  return input!.toString()
}
