export const clientSide = typeof window !== "undefined"

export const mobileScreen =
  clientSide && window.matchMedia("(min-width: 768px)").matches
export const laptopScreen =
  clientSide && window.matchMedia("(min-width: 1300px)").matches
