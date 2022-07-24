import { Toaster } from 'react-hot-toast'
import { StateContext } from '../context/stateContext'
import Layout from '../components/Layout'
import '../sass/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp