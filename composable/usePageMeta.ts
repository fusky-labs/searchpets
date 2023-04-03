import { UseSeoMetaInput } from "@unhead/vue"

interface PageMetaProps {
  title: string
  description?: string
}

export function usePageMeta({ title, description }: PageMetaProps) {
  const router = useRoute()

  const SITE_NAME = "Searchpets!"
  const SITE_URL = `https://searchpets.xyz${router.fullPath}`

  const parseTitle = router.fullPath !== "/" ? `${title} - ${SITE_NAME}` : title

  useSeoMeta({
    title: parseTitle,
    description,
    ogTitle: parseTitle,
    ogSiteName: SITE_NAME,
    ogType: "website",
    ogDescription: description,
    ogUrl: SITE_URL,
    twitterCard: "summary",
    twitterTitle: parseTitle,
    twitterDescription: description
  })

  useHead({
    link: [{ rel: "canonical", href: SITE_URL }]
  })
}
