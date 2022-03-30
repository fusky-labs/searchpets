// import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp;
