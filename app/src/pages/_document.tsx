import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from "next/document"
import Script from "next/script"

export default class SearchpetsApp extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:wght@300;400;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          />
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA}`}
            strategy="worker"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
          <meta name="application-name" content="Searchpets" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Searchpets" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#7f5bd5" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#7f5bd5" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon-180x180.png" />
          <link rel="icon" sizes="192x192" href="/static/android-chrome-192x192.png" />
          <link rel="icon" sizes="512x512" href="/static/android-chrome-512x512.png" />
          <link rel="shortcut icon" href="/static/favicon-96x96.png" />
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#7f5bd5" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
