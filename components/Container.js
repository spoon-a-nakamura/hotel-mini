import styled from '@emotion/styled'
// import { device } from '../components/MediaQuery'

export default function Container({ children }) {
  console.log('Render Container')
  return (
    <Wrapper>
      <Main>{children}</Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 2%;
`

const Main = styled.main``
