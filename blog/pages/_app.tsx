import { FC } from 'react'
import { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import 'styles/pages/base.scss'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default WrappedApp
