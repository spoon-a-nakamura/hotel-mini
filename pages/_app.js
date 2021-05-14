import App from 'next/app'
// import React, { useEffect, useReducer } from 'react'
// import { adobeLoader } from '../fonts/adobeLoader'

export default function App({ Component, pageProps }) {
  // // FilterReducer.jsファイルで定義したactionとStateの初期値を引数にしたReducer関数を、stateとdispatchに分割代入
  // const [state, dispatch] = useReducer(FilterReducer, initialStates)

  // // AdobeFontの読み込み
  // useEffect(() => {
  //   if (process.browser) adobeLoader(document)
  // }, [])
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
