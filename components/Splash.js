import styled from '@emotion/styled'
import Lottie from 'lottie-react'
import splash from '../lottie/splash/splash.json'

export default function Splash() {
  return (
    <>
      <Wrapper>
        <Lottie animationData={splash} />
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background: #fafafa;
  padding: 20px;
  margin: 20px;
`
