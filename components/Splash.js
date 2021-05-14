import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

export default function Splash() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 7000)
    setTimeout(() => {
      setIsLoaded(true)
    }, 8000)
  }, [])
  return (
    <>
      <Wrapper isLoading={isLoading} isLoaded={isLoaded}>
        <Video autoPlay muted>
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
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  display: ${({ isLoaded }) => (isLoaded ? 'none' : 'block')};
  z-index: 100;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Source = styled.source``
