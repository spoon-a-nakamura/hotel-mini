import { useState } from 'react'
import styled from '@emotion/styled'

export default function Splash() {
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [isVanished, setIsVanished] = useState(false)
  const finishVideo = () => {
    setTimeout(() => {
      setIsVideoEnded(true)
    }, 6000)
    setTimeout(() => {
      setIsVanished(true)
    }, 7000)
  }
  return (
    <>
      <Wrapper isVideoEnded={isVideoEnded} isVanished={isVanished}>
        <Video autoPlay muted onPlaying={() => finishVideo()}>
          <Source src='/movie/splash.mp4' type='video/mp4' />
        </Video>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #e95f4a;
  transition: opacity 1s ease-in-out;
  opacity: ${({ isVideoEnded }) => (isVideoEnded ? 0 : 1)};
  display: ${({ isVanished }) => (isVanished ? 'none' : 'block')};
  z-index: 100;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Source = styled.source``
