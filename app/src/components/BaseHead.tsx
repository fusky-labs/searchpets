import Head from "next/head";

interface IBaseHeadProps {
  title: string;
  description: string;
}

export default function BaseHead({ title, description}: IBaseHeadProps) {
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
          content="housepets, furry, comics, furry comics, animals, animal comic, fursuit"
        />
      </Head>
    </>
  );
};
