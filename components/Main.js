import styled from '@emotion/styled'
import { device } from '../components/MediaQuery'

export default function Main() {
  return (
    <>
      <Wrapper>
        <List>
          <Character src='/images/character/01.webp' alt='' />
        </List>
        <List>
          <Character src='/images/character/02.webp' alt='' />
        </List>
        <List>
          <Character src='/images/character/03.webp' alt='' />
        </List>
        <List>
          <Character src='/images/character/04.webp' alt='' />
        </List>
        <List>
          <Character src='/images/character/05.webp' alt='' />
        </List>
        <List>
          <Character src='/images/character/06.webp' alt='' />
        </List>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  @media ${device.underMobileL} {
    padding: 2%;
  }
`
const List = styled.li`
  width: 47%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background: #fafafa;
  box-shadow: 10px 10px 100px rgba(0, 0, 0, 0.1);
  margin-bottom: 3%;
  &:not(:nth-child(2n)) {
    margin-right: 3%;
  }
  @media ${device.underMobileL} {
    width: 100%;
    &:not(:nth-child(2n)) {
      margin-right: 0;
    }
  }
  div {
    width: 50%;
  }
`
const Character = styled.img`
  width: 100%;
`
