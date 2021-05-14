import Head from 'next/head'
import GlobalCss from '../components/GlobalCss'
import Container from '../components/Container'
import Splash from '../components/Splash'
import Main from '../components/Main'

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='content-language' content='ja' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='theme-color' content='#A9472E' />
        <meta name='robots' content='index,follow' />
        <meta name='author' content='スタジオスプーン' />
        <title>HotelMini</title>
        <meta
          name='description'
          content='「HotelMini」は、人気のない場所にあり、なかなか見つけることの出来ない高貴なホテル。そんなホテルで働く、個性豊かな使用人と高貴な宿泊客のことをこっそり紹介しちゃいます。'
        />
        <meta name='keywords' content='HotelMiniト, React, スタジオスプーン' />
        <link rel='canonical' href='https://hotel-mini.vercel.app/' />
        <link
          rel='shortcut icon'
          href='/images/common/favicon.png'
          type='image/png'
        />
        <link rel='apple-touch-icon' href='/images/common/favicon.png' />
        <meta property='og:site_name' content='HotelMini' />
        <meta property='og:title' content='HotelMini' />
        <meta
          property='og:image'
          content='https://hotel-mini.vercel.app/images/common/ogimg.png'
        />
        <meta
          property='og:description'
          content='「HotelMini」は、人気のない場所にあり、なかなか見つけることの出来ない高貴なホテル。そんなホテルで働く、個性豊かな使用人と高貴な宿泊客のことをこっそり紹介しちゃいます。'
        />
        <meta property='og:url' content='https://hotel-mini.vercel.app/' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='ja_JP' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='studio_spoon' />
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-FH2PEQRJ0V'
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FH2PEQRJ0V');`,
          }}
        ></script>
      </Head>
      <GlobalCss />
      <Splash />
      <Container>
        <Main />
      </Container>
    </>
  )
}
