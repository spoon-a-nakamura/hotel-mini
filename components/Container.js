import styled from '@emotion/styled'
import { device } from '../components/MediaQuery'

export default function Container({ children }) {
  console.log('Render Container')
  return (
    <Wrapper>
      <Main>{children}</Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  @media ${device.underMobileL} {
    height: auto;
  }
`

const Main = styled.main`
  width: 100%;
  height: 100%;
  @media ${device.underMobileL} {
    height: auto;
  }
`
