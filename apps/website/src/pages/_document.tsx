import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from "next/document"

export default class _ extends Document {
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
          <meta name="application-name" content="Searchpets!" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {/* prettier-ignore */}
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Searchpets!" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content="#7f5bd5" />
          {/* <link rel="shortcut icon" href="/static/favicon-96x96.png" /> */}
          {/* prettier-ignore */}
          {/* <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#7f5bd5" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
