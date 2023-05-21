export function useParseDate(date: string | Date) {
  const __d = new Date(date)
  const machineDate = __d.toISOString()
  const readableDate = __d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })

  return [machineDate, readableDate]
}
