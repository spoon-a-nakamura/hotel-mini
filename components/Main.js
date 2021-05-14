import styled from '@emotion/styled'
import Lottie from 'lottie-react'
import character1 from '../lottie/character/01.json'
import character2 from '../lottie/character/02.json'
import character3 from '../lottie/character/03.json'
import character4 from '../lottie/character/04.json'
import character5 from '../lottie/character/05.json'
import character6 from '../lottie/character/06.json'

export default function Main() {
  return (
    <>
      <Wrapper>
        <List>
          <Lottie animationData={character1} />
        </List>
        <List>
          <Lottie animationData={character2} />
        </List>
        <List>
          <Lottie animationData={character3} />
        </List>
        <List>
          <Lottie animationData={character4} />
        </List>
        <List>
          <Lottie animationData={character5} />
        </List>
        <List>
          <Lottie animationData={character6} />
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
  flex-direction: column;
`
const List = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background: #fafafa;
  padding: 20px;
  margin: 20px;
  box-shadow: 10px 10px 100px rgba(0, 0, 0, 0.1);
  div {
    width: 50%;
  }
`
