import Head from "next/head"

export default function BaseHead({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="keywords"
          content="housepets, furry, searchpets, cartoon, comics, furry comics, animals, animal comic, fursuit"
        />
      </Head>
    </>
  )
}
