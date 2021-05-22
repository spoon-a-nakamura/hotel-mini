import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
import { device } from '../components/MediaQuery'

export default function GlobalCss() {
  return (
    <Global
      styles={css`
        ${emotionReset}
        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: '游ゴシック Medium', 'Yu Gothic Medium', '游ゴシック体',
            YuGothic, sans-serif;
          font-weight: bold;
          font-style: normal;
          font-size: 18px;
          color: #fff;
          width: 100%;
          height: 100%;
          background: #ce4833;
          max-height: 100vh;
          overflow: hidden;
          @media ${device.underMobileL} {
            max-height: 100%;
            overflow: initial;
            height: auto;
          }
        }
        #__next {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          @media ${device.underMobileL} {
            height: auto;
          }
        }
        /* AdobeFont */
        /* html {
          visibility: hidden;
          opacity: 0;
          transition: opacity 1s ease;
        }
        html.wf-active {
          visibility: visible;
          opacity: 1;
        } */
        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
  )
}
