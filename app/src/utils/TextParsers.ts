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
  const appendAdd = input!
    .slice(lastItem)
    .toString()
    .replace(input![lastItem], `and ${input![lastItem]}`)

  const newArr = [...input!]

  newArr.splice(lastItem, lastItem)

  if (newArr!.length !== 1) {
    return `${newArr.join(", ")}, ${appendAdd}`
  }

  return `${newArr.join(", ")} ${appendAdd}`
}
