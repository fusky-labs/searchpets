interface PageMetaProps {
  title?: string
  description?: string
}

export function usePageMeta({ title, description }: PageMetaProps) {
  const router = useRoute()

  const _SITE_NAME = "Searchpets!"
  const _DOMAIN = "searchpets.xyz"
  const _URL_PATH = router.fullPath

  const _TITLE = _URL_PATH !== "/" ? `${title} | ${_SITE_NAME}` : title
  const _SEO_URL = `https://${_DOMAIN}${_URL_PATH}`

  useSeoMeta({
    title: _TITLE,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "website",
    ogUrl: _SEO_URL,
    twitterTitle: title,
    twitterDescription: description
  })

  useHead({
    link: [{ rel: "canonical", href: _SEO_URL }]
  })
}
