import Head from "next/head";
import { LayoutProps } from "./Layout";

interface PageContainerProps extends LayoutProps {
  title: string;
  description: string;
}

export function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="webiste" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <main id="__app-container">{children}</main>
    </>
  );
}
