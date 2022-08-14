declare global {
  interface Window {
    gtag: any
  }
}

export const pageView = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", process.env.GA, {
      page_path: url
    })
  }
}

export const event = ({ action, params }: any) => {
  window.gtag("event", action, params)
}
