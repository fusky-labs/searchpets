declare global {
  interface Window {
    gtag: any
  }
}

export const pageview = (url: any) => {
  window.gtag("config", process.env.GA, {
    page_path: url,
  })
}

export const event = ({ action, params }) => {
  window.gtag("event", action, params)
}
