import TopNav from "../components/TopNav"

import "bootstrap/dist/css/bootstrap.min.css"
import "antd/dist/antd.css"
import "../public/css/style.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
        <TopNav/>
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
