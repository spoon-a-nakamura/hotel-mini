import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'

export default function GlobalCss() {
  return (
    <Global
      styles={css`
        ${emotionReset}
        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: vdl-megamaru, -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          font-weight: 400;
          font-style: normal;
          color: #707070;
          width: 100%;
          height: 100%;
          background: #CE4833;
        }
        #__next {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
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
